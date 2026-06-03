"""
Invoice Pipeline — Main Runner (Days 2 + 3 + 4)
Layers 1 → 2 → 3 → 4 → 5 → Storage

Run:  python run_pipeline.py
Then: python dashboard/app.py   (open http://localhost:5000)

AUTO-CLEANUP: Old database data is removed at the START of each new session
"""

import sys
import os
import logging
from pathlib import Path
import io
import sqlite3

from dotenv import load_dotenv

from ingestion.email_ingestor   import scan_local_folder, run_ingestion
from ocr.pdf_extractor          import process_all
from extraction.field_extractor import extract_all
from validation.validator       import validate_all
from routing.router             import load_rules, route_all, apply_routing
from data.storage               import init_db, save_all, get_stats

load_dotenv()

# ─────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────

SAMPLE_DIR = Path(os.getenv("SAMPLE_DIR", "sample_invoices"))
DB_PATH    = os.getenv("DB_PATH", "data/invoices.db")
USE_IMAP   = os.getenv("USE_IMAP", "false").lower() in ("1", "true", "yes")

# ─────────────────────────────────────────────
# LOGGING
# ─────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s — %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("logs/pipeline.log", mode="w"),
    ]
)

log = logging.getLogger(__name__)

# ─────────────────────────────────────────────
# OPTIONAL: Windows UTF-8 fix
# ─────────────────────────────────────────────

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

# ─────────────────────────────────────────────
# CLEAR OLD DATA FROM DATABASE
# ─────────────────────────────────────────────

def clear_old_data(db_path: str):
    """Remove old data from database before processing new invoices.

    Uses `init_db` to open the DB so filesystem fallback logic applies
    (temp-file / in-memory) and avoids raising a disk I/O error here.
    """
    path = Path(db_path)

    if not path.exists():
        log.info("[INIT] No old database found - starting fresh")
        return

    try:
        # Use storage.init_db which implements robust fallbacks on failure
        conn = init_db(db_path)
        cur = conn.cursor()

        # Get count of old records
        old_count = cur.execute("SELECT COUNT(*) FROM invoices").fetchone()[0]

        if old_count > 0:
            log.info(f"[CLEANUP] Found {old_count} old invoice(s) in database")

            # Delete all old data
            cur.execute("DELETE FROM audit_log")
            cur.execute("DELETE FROM invoices")
            # Reset AUTOINCREMENT counters so IDs start from 1 on next run
            try:
                cur.execute("DELETE FROM sqlite_sequence WHERE name='invoices'")
                cur.execute("DELETE FROM sqlite_sequence WHERE name='audit_log'")
            except Exception:
                # sqlite_sequence may not exist; ignore if so
                pass
            conn.commit()

            log.info(f"[CLEANUP] Removed {old_count} old invoice(s)")
            log.info("[CLEANUP] Database cleared - ready for new data")
        else:
            log.info("[INIT] Database exists but is empty - ready for new data")

        conn.close()
    except Exception as e:
        log.error(f"[ERROR] Could not clear old data: {e}")
        raise

# ─────────────────────────────────────────────
# DATABASE INITIALIZATION
# ─────────────────────────────────────────────

def init_database(db_path: str):
    """Initialize database schema via `init_db` (uses fallback logic)."""
    try:
        conn = init_db(db_path)
        conn.close()
        log.info("[INIT] Database schema ready")
    except Exception as e:
        log.error(f"[ERROR] Failed to initialize database: {e}")
        raise

# ─────────────────────────────────────────────
# STATS DISPLAY
# ─────────────────────────────────────────────

def display_stats_summary(stats):
    print()
    print("─" * 50)
    print("Total invoices : {}".format(stats.get('total', 0)))
    print("Pending        : {}".format(stats.get('pending', 0)))
    print("Approved       : {}".format(stats.get('approved', 0)))
    print("Flagged        : {}".format(stats.get('flagged', 0)))
    print("─" * 50)
    print()

# ─────────────────────────────────────────────
# MAIN PIPELINE
# ─────────────────────────────────────────────

def main():
    print()
    print("=" * 65)
    print("  INVOICE PROCESSING PIPELINE  —  Full Stack (Days 2–4)")
    print("=" * 65)

    # STEP 0: Clear old data and initialize database
    print("\n[STEP 0] Database Preparation")
    print("-" * 40)
    clear_old_data(DB_PATH)
    init_database(DB_PATH)
    print("[SUCCESS] Database ready for new invoices")

    # ── Test Data Overview ─────────────────────────────
    print("\n[TEST DATA]")
    print("-" * 40)
    print("5 sample PDF invoices will be processed...\n")

    # ── Layer 1: Ingestion ─────────────────────────────
    print("\n[LAYER 1] Email Ingestion")
    print("-" * 40)

    if USE_IMAP:
        print("Attempting IMAP ingestion...")
        pdf_paths = run_ingestion()
        if not pdf_paths:
            print("Fallback to local folder")
            pdf_paths = scan_local_folder(SAMPLE_DIR)
    else:
        pdf_paths = scan_local_folder(SAMPLE_DIR)

    if not pdf_paths:
        print("No PDFs found. Add invoices to sample_invoices/")
        sys.exit(1)

    # ── Layer 2: OCR ───────────────────────────────────
    print("\n[LAYER 2] OCR + PDF Parsing")
    print("-" * 40)
    ocr_results = process_all(pdf_paths)

    # ── Layer 3: Extraction ────────────────────────────
    print("\n[LAYER 3] Field Extraction")
    print("-" * 40)
    invoices = extract_all(ocr_results)

    # ── Layer 4: Validation ────────────────────────────
    print("\n[LAYER 4] Validation + Rules Engine")
    print("-" * 40)
    conn = init_db(DB_PATH)
    results = validate_all(invoices, DB_PATH)

    # ── Storage ────────────────────────────────────────
    print("\n[STORAGE] Persisting records")
    print("-" * 40)
    save_all(conn, invoices, results)

    # ── Layer 5: Routing ──────────────────────────────
    print("\n[LAYER 5] Workflow + Routing")
    print("-" * 40)
    rules = load_rules()
    decisions = route_all(invoices, results, rules)
    apply_routing(conn, invoices, decisions)

    # ── Final Stats ────────────────────────────────────
    stats = get_stats(conn)
    conn.close()

    print("\n" + "=" * 65)
    print("  PIPELINE COMPLETE  —  FULL REPORT")
    print("=" * 65)

    for inv, result, decision in zip(invoices, results, decisions):
        icon = "✓" if result.is_valid else "⚑"

        print(f"\n  {icon} {inv.filename}")
        print(f"      Vendor     : {inv.vendor_name or '—'}")
        print(f"      Invoice #  : {inv.invoice_number or '—'}")
        print(f"      Due Date   : {inv.due_date or 'MISSING'}")
        print(f"      Total      : ${inv.total_amount or 0:,.2f}")
        print(f"      Line Items : {len(inv.line_items)}")
        print(f"      Confidence : {inv.confidence:.0%}")
        print(f"      Approver   : {decision.approver} [{decision.rule_label}]")
        print(f"      Status     : {result.status.upper()}")

        for reason in result.flag_reasons:
            print(f"      ⚠ {reason}")

    print("\n" + "=" * 65)
    print("  STATISTICS")
    print("=" * 65)

    display_stats_summary(stats)

    print(f"  Pipeline value : ${stats.get('total_value', 0):,.2f}")
    print(f"  Database       : {DB_PATH}")

    print("\n  ✓ Pipeline complete!")
    print("  Dashboard: python scripts/dashboard_display.py")
    print("\n" + "=" * 65)


if __name__ == "__main__":
    main()
