"""
Layer 6 — Status Dashboard (Flask)
Serves a live web UI showing all invoices with:
  - Summary stat cards (total / pending / approved / flagged / value)
  - Searchable, filterable invoice table
  - One-click Approve button per invoice
  - Full audit log

Run:  python dashboard/app.py
Then open:  http://localhost:5000
"""

import sys
import json
import sqlite3
import logging
from pathlib import Path
from flask import Flask, render_template, redirect, url_for, flash, request, session
import os

# Make sure project root is on the path
sys.path.insert(0, str(Path(__file__).parent.parent))

from data.storage import init_db, get_all_invoices, get_stats, update_status
import data.storage as storage
import sqlite3

log = logging.getLogger(__name__)

app = Flask(__name__, template_folder="templates")
app.secret_key = "invoice-pipeline-dev-secret"   # change for production
app.config['TEMPLATES_AUTO_RELOAD'] = True  # Auto-reload templates on change

DB_PATH = Path(__file__).parent.parent / "data" / "invoices.db"
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")


# Note: Dashboard intentionally does NOT clear the database on startup.
# It displays the current database contents to avoid showing 0 totals
# when the dashboard is started separately from the pipeline.


# ── Jinja filter: parse JSON strings in templates ────────────────────────────

@app.template_filter("fromjson")
def fromjson_filter(value):
    """Allow {{ value | fromjson }} in templates to parse stored JSON lists."""
    if not value:
        return []
    try:
        return json.loads(value)
    except (json.JSONDecodeError, TypeError):
        return []


# ── Helper ────────────────────────────────────────────────────────────────────

def get_conn() -> sqlite3.Connection:
    """Open (or create) the DB and return a connection."""
    try:
        return init_db(str(DB_PATH))
    except Exception:
        # Defensive fallback: if DB initialization fails inside the
        # container, fall back to an in-memory DB so the dashboard can
        # still serve and show a helpful message instead of raising 500.
        log.exception("Database init failed — falling back to in-memory DB for dashboard")
        conn = sqlite3.connect(":memory:")
        conn.row_factory = sqlite3.Row
        try:
            conn.execute(storage.CREATE_TABLE_SQL)
            conn.execute(storage.CREATE_LOG_TABLE_SQL)
            conn.commit()
        except Exception:
            pass
        return conn


def get_audit_log(conn: sqlite3.Connection, limit: int = 50) -> list[dict]:
    rows = conn.execute(
        "SELECT * FROM audit_log ORDER BY timestamp DESC LIMIT ?", (limit,)
    ).fetchall()
    return [dict(r) for r in rows]


# ── Routes ────────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    conn       = get_conn()
    stats      = get_stats(conn)
    invoices   = get_all_invoices(conn)
    audit_log  = get_audit_log(conn)
    conn.close()

    return render_template(
        "index.html",
        stats=stats,
        invoices=invoices,
        audit_log=audit_log,
        current_status=request.args.get("status", ""),
    )


@app.route("/approve/<int:invoice_id>", methods=["POST"])
def approve(invoice_id: int):
    """Mark an invoice as approved."""
    conn = get_conn()
    row  = conn.execute("SELECT * FROM invoices WHERE id = ?", (invoice_id,)).fetchone()

    if not row:
        flash("Invoice not found.", "error")
    elif row["status"] != "pending":
        flash(f"Invoice is already '{row['status']}' — cannot approve.", "error")
    else:
        update_status(conn, invoice_id, "approved", approver=row["approver"])
        flash(
            f"✓ Invoice #{row['invoice_number'] or invoice_id} "
            f"({row['vendor_name']}) approved and assigned to {row['approver']}.",
            "success"
        )

    conn.close()
    return redirect(url_for("index"))


# `/reset-database` route removed to prevent dashboard from clearing stored invoices.


@app.route("/health")
def health():
    """Simple health check endpoint for Docker."""
    return {"status": "ok", "db": str(DB_PATH)}


@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    if request.method == "POST":
        pwd = request.form.get("password", "")
        if pwd and pwd == ADMIN_PASSWORD:
            session['is_admin'] = True
            flash("Admin login successful.", "success")
            return redirect(url_for('admin'))
        else:
            flash("Invalid admin password.", "error")
            return redirect(url_for('admin_login'))
    return render_template('admin.html')


@app.route('/admin')
def admin():
    if not session.get('is_admin'):
        return redirect(url_for('admin_login'))
    conn = get_conn()
    stats = get_stats(conn)
    conn.close()
    return render_template('admin.html', stats=stats)


@app.route('/admin/reset', methods=['POST'])
def admin_reset():
    if not session.get('is_admin'):
        flash('Unauthorized', 'error')
        return redirect(url_for('admin_login'))
    conn = get_conn()
    try:
        cur = conn.cursor()
        count_before = cur.execute("SELECT COUNT(*) FROM invoices").fetchone()[0]
        cur.execute("DELETE FROM audit_log")
        cur.execute("DELETE FROM invoices")
        try:
            cur.execute("DELETE FROM sqlite_sequence WHERE name='invoices'")
            cur.execute("DELETE FROM sqlite_sequence WHERE name='audit_log'")
        except Exception:
            pass
        conn.commit()
        flash(f"✓ Database reset by admin. Removed {count_before} invoices.", 'success')
    except Exception as e:
        flash(f"Error resetting DB: {e}", 'error')
    finally:
        try:
            conn.close()
        except Exception:
            pass
    return redirect(url_for('admin'))


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    print()
    print("=" * 55)
    print("  Invoice Dashboard — starting on http://localhost:5000")
    print("  Press Ctrl+C to stop")
    print("=" * 55)
    print()
    app.run(host="0.0.0.0", port=5000, debug=True)
