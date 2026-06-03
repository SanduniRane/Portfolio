/* vault-core.js
   Shared utilities for the Secure Password Wallet (Neon theme)
   - PBKDF2 (200k) -> AES-GCM (256)
   - IndexedDB vault storage (id:1) with base64 fields: salt, iv, ciphertext
   - Session key exported/imported via sessionStorage (base64) for single-tab session persistence
   - Utility functions for base64/buffer/string
*/

/* ---------- helpers ---------- */
function bufToBase64(buf){
  const bytes = new Uint8Array(buf);
  let str = "";
  for (let i=0;i<bytes.length;i++) str += String.fromCharCode(bytes[i]);
  return btoa(str);
}
function base64ToBuf(b64){
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i=0;i<bin.length;i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}
const strToBuf = s => new TextEncoder().encode(s);
const bufToStr = b => new TextDecoder().decode(b);

/* ---------- IndexedDB ---------- */
const DB_NAME = "secureVaultDB_neon_v1";
const STORE_NAME = "vaultStore_neon";

function openDB(){
  return new Promise((resolve,reject)=>{
    const req = indexedDB.open(DB_NAME,1);
    req.onupgradeneeded = e => {
      const idb = e.target.result;
      if (!idb.objectStoreNames.contains(STORE_NAME)) idb.createObjectStore(STORE_NAME,{keyPath:"id"});
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}

async function getStoredVault(){
  const db = await openDB();
  return new Promise((res,rej)=>{
    const tx = db.transaction(STORE_NAME,"readonly");
    const st = tx.objectStore(STORE_NAME);
    const r = st.get(1);
    r.onsuccess = () => res(r.result || null);
    r.onerror = () => rej(r.error);
  });
}

async function putStoredVault(obj){
  const db = await openDB();
  return new Promise((res,rej)=>{
    const tx = db.transaction(STORE_NAME,"readwrite");
    const st = tx.objectStore(STORE_NAME);
    const r = st.put(Object.assign({id:1}, obj));
    r.onsuccess = () => res(true);
    r.onerror = () => rej(r.error);
  });
}

/* ---------- Crypto: derive / import / export ---------- */
const PBKDF2_ITERS = 200000;

async function deriveKeyFromPassword(password, saltBuffer){
  const keyMaterial = await crypto.subtle.importKey(
    "raw", strToBuf(password), "PBKDF2", false, ["deriveKey"]
  );
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: saltBuffer, iterations: PBKDF2_ITERS, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true, // extractable so we can export to sessionStorage
    ["encrypt","decrypt"]
  );
  return key;
}

async function exportRawKeyToBase64(key){
  const raw = await crypto.subtle.exportKey("raw", key);
  return bufToBase64(raw);
}
async function importRawKeyFromBase64(b64){
  const buf = base64ToBuf(b64);
  return crypto.subtle.importKey("raw", buf, { name: "AES-GCM" }, true, ["encrypt","decrypt"]);
}

/* ---------- Encrypt / Decrypt ---------- */
async function encryptWithKey(key, obj){
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name:"AES-GCM", iv }, key, strToBuf(JSON.stringify(obj)));
  return { iv: bufToBase64(iv.buffer), ciphertext: bufToBase64(ct) };
}
async function decryptWithKey(key, ciphertext_b64, iv_b64){
  const ct = base64ToBuf(ciphertext_b64);
  const iv = new Uint8Array(base64ToBuf(iv_b64));
  const plain = await crypto.subtle.decrypt({ name:"AES-GCM", iv }, key, ct);
  return JSON.parse(bufToStr(plain));
}

/* ---------- Session helpers ---------- */
function saveSessionKeyBase64(b64){ sessionStorage.setItem("sessionMasterKey", b64); }
function getSessionKeyBase64(){ return sessionStorage.getItem("sessionMasterKey"); }
function clearSessionKey(){ sessionStorage.removeItem("sessionMasterKey"); }

/* ---------- Utility ---------- */
function escapeHtml(s){ return (s||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;"); }

//
// Expose to global (non-module)
window.vaultCore = {
  openDB, getStoredVault, putStoredVault,
  deriveKeyFromPassword, exportRawKeyToBase64, importRawKeyFromBase64,
  encryptWithKey, decryptWithKey,
  saveSessionKeyBase64, getSessionKeyBase64, clearSessionKey,
  bufToBase64, base64ToBuf, escapeHtml
};
