import { useState, useMemo } from "react";

// ─── Google Fonts ────────────────────────────────────────────────────────────
const FONT_LINK = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');`;

// ─── Design tokens ───────────────────────────────────────────────────────────
// Deep ink dark UI. Coral punch accent. Syne display. The signature is the
// animated dot-grid punch card on every client card — physical meets digital.
const CSS = `
${FONT_LINK}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ink:      #0D0D1A;
  --surface:  #14142A;
  --card:     #1C1C38;
  --card2:    #22224A;
  --border:   rgba(255,255,255,0.07);
  --border2:  rgba(255,255,255,0.12);
  --punch:    #E94560;
  --punch2:   #ff6b84;
  --teal:     #00C9B1;
  --gold:     #F5B942;
  --white:    #F0F0FA;
  --dim:      #7878A0;
  --muted:    #4A4A72;
  --radius:   10px;
  --radius-lg:16px;
  --radius-xl:22px;
  --shadow:   0 4px 24px rgba(0,0,0,0.35);
  --shadow-sm:0 2px 8px rgba(0,0,0,0.25);
  --font-display: 'Syne', sans-serif;
  --font-body:    'Inter', sans-serif;
}

html, body { height: 100%; }
body {
  font-family: var(--font-body);
  background: var(--ink);
  color: var(--white);
  font-size: 14px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--surface); }
::-webkit-scrollbar-thumb { background: var(--muted); border-radius: 3px; }

/* ─── Layout ─────────────────────────────────────────────────────────────── */
.app { display: flex; min-height: 100vh; }

.sidebar {
  width: 220px; min-width: 220px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column;
  position: sticky; top: 0; height: 100vh; overflow: hidden;
}
.sidebar-logo {
  padding: 24px 20px 20px;
  border-bottom: 1px solid var(--border);
}
.logo-text {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  color: var(--white); letter-spacing: -0.5px;
}
.logo-text em { color: var(--punch); font-style: normal; }
.logo-tagline { font-size: 10px; color: var(--dim); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 3px; }

.sidebar-nav { padding: 16px 12px; flex: 1; }
.nav-section-label {
  font-size: 10px; font-weight: 600; color: var(--muted);
  letter-spacing: 1.4px; text-transform: uppercase;
  padding: 0 8px 8px;
}
.nav-btn {
  display: flex; align-items: center; gap: 9px;
  width: 100%; padding: 9px 12px;
  border: none; background: none; cursor: pointer;
  border-radius: var(--radius); color: var(--dim);
  font-family: var(--font-body); font-size: 13.5px; font-weight: 500;
  transition: all 0.14s; text-align: left; margin-bottom: 2px;
}
.nav-btn:hover { background: var(--card); color: var(--white); }
.nav-btn.active { background: rgba(233,69,96,0.15); color: var(--punch2); }
.nav-btn.active .nav-icon { color: var(--punch); }
.nav-icon { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }
.nav-badge {
  margin-left: auto; background: var(--punch);
  color: #fff; font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 10px; min-width: 18px; text-align: center;
}

.sidebar-footer {
  padding: 14px 12px;
  border-top: 1px solid var(--border);
}
.business-pill {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px; background: var(--card);
  border-radius: var(--radius); border: 1px solid var(--border);
}
.biz-avatar {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, var(--punch), #a0162e);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-size: 13px; font-weight: 700;
  color: #fff; flex-shrink: 0;
}
.biz-name { font-size: 12.5px; font-weight: 600; color: var(--white); }
.biz-plan { font-size: 11px; color: var(--dim); }

/* ─── Main ────────────────────────────────────────────────────────────────── */
.main { flex: 1; display: flex; flex-direction: column; overflow-y: auto; }

.topbar {
  position: sticky; top: 0; z-index: 20;
  background: rgba(13,13,26,0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 0 28px; height: 58px;
  display: flex; align-items: center; justify-content: space-between;
}
.topbar-left { display: flex; flex-direction: column; }
.topbar-title { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: var(--white); }
.topbar-sub { font-size: 11.5px; color: var(--dim); }
.topbar-actions { display: flex; gap: 8px; align-items: center; }

.page { padding: 24px 28px; flex: 1; }

/* ─── Buttons ─────────────────────────────────────────────────────────────── */
.btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: var(--radius);
  font-family: var(--font-body); font-size: 13px; font-weight: 600;
  cursor: pointer; border: none; transition: all 0.14s; white-space: nowrap;
}
.btn-punch { background: var(--punch); color: #fff; }
.btn-punch:hover { background: var(--punch2); }
.btn-teal { background: var(--teal); color: var(--ink); }
.btn-teal:hover { filter: brightness(1.1); }
.btn-ghost {
  background: transparent; color: var(--dim);
  border: 1px solid var(--border2);
}
.btn-ghost:hover { color: var(--white); border-color: var(--dim); background: var(--card); }
.btn-dark { background: var(--card2); color: var(--white); border: 1px solid var(--border2); }
.btn-dark:hover { background: var(--card); }
.btn-danger { background: rgba(233,69,96,0.15); color: var(--punch); border: 1px solid rgba(233,69,96,0.3); }
.btn-danger:hover { background: rgba(233,69,96,0.25); }
.btn-sm { padding: 5px 11px; font-size: 12px; border-radius: 7px; }
.btn-xs { padding: 3px 9px; font-size: 11px; border-radius: 6px; }
.btn-icon {
  width: 34px; height: 34px; padding: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; border-radius: var(--radius);
  background: var(--card); border: 1px solid var(--border2);
  cursor: pointer; color: var(--dim); transition: all 0.14s;
}
.btn-icon:hover { color: var(--white); border-color: var(--dim); }

/* ─── Stat cards ──────────────────────────────────────────────────────────── */
.stats-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 24px; }
.stat-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 18px 20px;
  display: flex; flex-direction: column; gap: 6px;
  position: relative; overflow: hidden;
}
.stat-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
}
.stat-punch::before { background: var(--punch); }
.stat-teal::before { background: var(--teal); }
.stat-gold::before { background: var(--gold); }
.stat-blue::before { background: #5B8DEF; }
.stat-label { font-size: 10.5px; font-weight: 600; color: var(--dim); text-transform: uppercase; letter-spacing: 0.9px; }
.stat-value { font-family: var(--font-display); font-size: 30px; font-weight: 700; color: var(--white); line-height: 1; }
.stat-note { font-size: 11px; color: var(--dim); }

/* ─── THE SIGNATURE: Punch dot grid ─────────────────────────────────────────
   Each dot = one session. Filled coral = used. Ring = remaining.
   This is the thing people remember about PackedIn.                          */
.punch-grid {
  display: flex; flex-wrap: wrap; gap: 5px;
  padding: 12px 0 4px;
}
.punch-dot {
  width: 14px; height: 14px; border-radius: 50%;
  transition: transform 0.15s, opacity 0.15s;
}
.punch-dot.used {
  background: var(--punch);
  box-shadow: 0 0 6px rgba(233,69,96,0.5);
}
.punch-dot.remaining {
  background: transparent;
  border: 2px solid var(--muted);
}
.punch-dot.remaining:hover {
  border-color: var(--punch2);
  transform: scale(1.2);
  cursor: pointer;
}
.punch-dot.just-used {
  animation: popIn 0.35s ease;
}
@keyframes popIn {
  0%   { transform: scale(0.4); opacity:0.4; }
  60%  { transform: scale(1.25); }
  100% { transform: scale(1); opacity:1; }
}

/* ─── Client cards ────────────────────────────────────────────────────────── */
.clients-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px,1fr)); gap: 16px; }
.client-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 18px 20px;
  cursor: pointer; transition: border-color 0.14s, transform 0.14s, box-shadow 0.14s;
  position: relative; overflow: hidden;
}
.client-card:hover {
  border-color: var(--border2);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}
.client-card.low-sessions { border-color: rgba(245,185,66,0.35); }
.client-card.no-sessions  { border-color: rgba(233,69,96,0.35); }
.client-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
.client-avatar {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-size: 15px; font-weight: 700;
  flex-shrink: 0;
}
.client-name { font-weight: 700; font-size: 14.5px; color: var(--white); }
.client-service { font-size: 11.5px; color: var(--dim); margin-top: 1px; }
.session-count-row { display: flex; align-items: baseline; gap: 5px; margin-top: 12px; }
.sessions-remaining { font-family: var(--font-display); font-size: 26px; font-weight: 700; }
.sessions-remaining.zero { color: var(--punch); }
.sessions-remaining.low  { color: var(--gold); }
.sessions-remaining.ok   { color: var(--teal); }
.sessions-label { font-size: 12px; color: var(--dim); }
.package-name-badge {
  display: inline-block; margin-top: 6px;
  padding: 2px 9px; border-radius: 20px;
  font-size: 11px; font-weight: 600;
  background: var(--card2); color: var(--dim); border: 1px solid var(--border2);
}
.card-footer {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 14px; padding-top: 12px;
  border-top: 1px solid var(--border);
}
.last-session { font-size: 11px; color: var(--dim); }
.redeem-btn {
  padding: 6px 14px; border-radius: 8px;
  background: rgba(233,69,96,0.15); color: var(--punch2);
  border: 1px solid rgba(233,69,96,0.25);
  font-size: 12px; font-weight: 700;
  cursor: pointer; transition: all 0.14s;
  font-family: var(--font-body);
}
.redeem-btn:hover { background: var(--punch); color: #fff; border-color: var(--punch); }
.redeem-btn:disabled {
  opacity: 0.35; cursor: not-allowed;
  background: rgba(255,255,255,0.04); color: var(--muted);
  border-color: var(--border);
}

/* ─── Modal ───────────────────────────────────────────────────────────────── */
.overlay {
  position: fixed; inset: 0;
  background: rgba(5,5,15,0.75);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 100; padding: 16px;
}
.modal {
  background: var(--card); border: 1px solid var(--border2);
  border-radius: var(--radius-xl);
  width: 100%; max-width: 520px; max-height: 92vh; overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0,0,0,0.55);
}
.modal-header {
  padding: 22px 24px 18px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: flex-start; justify-content: space-between;
}
.modal-title { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: var(--white); }
.modal-sub { font-size: 12px; color: var(--dim); margin-top: 3px; }
.modal-body { padding: 20px 24px; }
.modal-footer {
  padding: 16px 24px; border-top: 1px solid var(--border);
  display: flex; gap: 10px; justify-content: flex-end;
}

/* ─── Forms ───────────────────────────────────────────────────────────────── */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group.span-2 { grid-column: span 2; }
.form-label { font-size: 11.5px; font-weight: 600; color: var(--dim); letter-spacing: 0.3px; }
.form-input, .form-select, .form-textarea {
  padding: 9px 12px;
  background: var(--surface); border: 1px solid var(--border2);
  border-radius: var(--radius); color: var(--white);
  font-family: var(--font-body); font-size: 13px;
  outline: none; transition: border-color 0.14s;
}
.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: var(--punch);
}
.form-input::placeholder { color: var(--muted); }
.form-select option { background: var(--card); }
.form-textarea { resize: vertical; min-height: 72px; }
.form-hint { font-size: 11px; color: var(--muted); }

/* ─── Filter bar ──────────────────────────────────────────────────────────── */
.filter-bar { display: flex; gap: 10px; margin-bottom: 18px; align-items: center; flex-wrap: wrap; }
.search-wrap { position: relative; flex: 1; min-width: 200px; }
.search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 14px; pointer-events: none; }
.search-input {
  width: 100%; padding: 8px 12px 8px 33px;
  background: var(--card); border: 1px solid var(--border2);
  border-radius: var(--radius); color: var(--white);
  font-family: var(--font-body); font-size: 13px; outline: none;
  transition: border-color 0.14s;
}
.search-input:focus { border-color: var(--punch); }
.search-input::placeholder { color: var(--muted); }
.filter-select2 {
  padding: 8px 12px; background: var(--card); border: 1px solid var(--border2);
  border-radius: var(--radius); color: var(--white);
  font-family: var(--font-body); font-size: 13px; cursor: pointer; outline: none;
}

/* ─── Package cards ───────────────────────────────────────────────────────── */
.packages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px,1fr)); gap: 14px; }
.pkg-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 18px 20px;
  transition: border-color 0.14s;
  position: relative;
}
.pkg-card:hover { border-color: var(--border2); }
.pkg-name { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--white); margin-bottom: 4px; }
.pkg-sessions-badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 10px; border-radius: 20px;
  background: rgba(233,69,96,0.12); color: var(--punch2);
  border: 1px solid rgba(233,69,96,0.2);
  font-size: 12px; font-weight: 700; margin-bottom: 10px;
}
.pkg-price { font-family: var(--font-display); font-size: 24px; font-weight: 800; color: var(--white); }
.pkg-price-note { font-size: 11px; color: var(--dim); margin-top: 2px; }
.pkg-meta { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border); }
.pkg-meta-row { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px; }
.pkg-meta-label { color: var(--dim); }
.pkg-meta-value { color: var(--white); font-weight: 600; }
.pkg-actions { display: flex; gap: 7px; margin-top: 14px; }

/* ─── Client detail ───────────────────────────────────────────────────────── */
.client-detail-header {
  display: flex; align-items: center; gap: 16px;
  padding: 20px 24px 16px; border-bottom: 1px solid var(--border);
}
.client-detail-avatar {
  width: 52px; height: 52px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-size: 20px; font-weight: 700;
  flex-shrink: 0;
}
.detail-name { font-family: var(--font-display); font-size: 20px; font-weight: 700; }
.detail-service { font-size: 12.5px; color: var(--dim); margin-top: 2px; }
.section-title {
  font-size: 10.5px; font-weight: 700; color: var(--dim);
  text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 10px;
}
.history-list { display: flex; flex-direction: column; gap: 6px; max-height: 200px; overflow-y: auto; }
.history-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px; background: var(--surface);
  border-radius: 8px; border: 1px solid var(--border); font-size: 12.5px;
}
.history-dot {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
}
.history-dot.session { background: var(--punch); }
.history-dot.purchase { background: var(--teal); }
.history-action { flex: 1; color: var(--white); }
.history-date { color: var(--dim); font-size: 11px; }

/* ─── Purchase package flow ───────────────────────────────────────────────── */
.pkg-option {
  display: flex; align-items: center; gap: 14px;
  padding: 12px 14px; border-radius: var(--radius);
  border: 1.5px solid var(--border2); background: var(--surface);
  cursor: pointer; transition: all 0.14s; margin-bottom: 8px;
}
.pkg-option:hover { border-color: var(--punch2); background: var(--card); }
.pkg-option.selected { border-color: var(--punch); background: rgba(233,69,96,0.08); }
.pkg-option-info { flex: 1; }
.pkg-option-name { font-weight: 700; font-size: 14px; }
.pkg-option-detail { font-size: 12px; color: var(--dim); margin-top: 2px; }
.pkg-option-price { font-family: var(--font-display); font-weight: 700; font-size: 17px; color: var(--teal); }

/* ─── Tags / pills ────────────────────────────────────────────────────────── */
.tag {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600;
  letter-spacing: 0.2px;
}
.tag-punch { background: rgba(233,69,96,0.15); color: var(--punch2); border: 1px solid rgba(233,69,96,0.2); }
.tag-teal  { background: rgba(0,201,177,0.12); color: var(--teal);   border: 1px solid rgba(0,201,177,0.2); }
.tag-gold  { background: rgba(245,185,66,0.12); color: var(--gold);  border: 1px solid rgba(245,185,66,0.2); }
.tag-muted { background: var(--card2); color: var(--dim); border: 1px solid var(--border2); }

/* ─── Alert banner ────────────────────────────────────────────────────────── */
.alert-banner {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 13px 16px; border-radius: var(--radius);
  margin-bottom: 16px; border: 1px solid;
}
.alert-banner.warn { background: rgba(245,185,66,0.08); border-color: rgba(245,185,66,0.25); color: var(--gold); }
.alert-banner.danger { background: rgba(233,69,96,0.08); border-color: rgba(233,69,96,0.25); color: var(--punch2); }
.alert-text strong { display: block; margin-bottom: 2px; font-size: 13px; }
.alert-text span { font-size: 12px; opacity: 0.8; }

/* ─── Empty state ─────────────────────────────────────────────────────────── */
.empty-state { text-align: center; padding: 56px 24px; color: var(--dim); }
.empty-icon { font-size: 42px; margin-bottom: 14px; }
.empty-title { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: var(--white); margin-bottom: 6px; }
.empty-sub { font-size: 13px; margin-bottom: 22px; color: var(--dim); }

/* ─── Divider ─────────────────────────────────────────────────────────────── */
.divider { height: 1px; background: var(--border); margin: 16px 0; }

/* ─── Toast ───────────────────────────────────────────────────────────────── */
.toast-wrap {
  position: fixed; bottom: 24px; right: 24px; z-index: 200;
  display: flex; flex-direction: column; gap: 8px;
}
.toast {
  background: var(--card2); border: 1px solid var(--border2);
  border-radius: var(--radius); padding: 11px 16px;
  font-size: 13px; color: var(--white);
  box-shadow: var(--shadow); display: flex; align-items: center; gap: 10px;
  animation: slideUp 0.25s ease;
  max-width: 300px;
}
.toast.success .toast-icon { color: var(--teal); }
.toast.warn    .toast-icon { color: var(--gold); }
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

/* ─── Misc util ───────────────────────────────────────────────────────────── */
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-8  { gap: 8px; }
.gap-12 { gap: 12px; }
.ml-auto { margin-left: auto; }
.mt-4  { margin-top: 4px; }
.mt-8  { margin-top: 8px; }
.mt-16 { margin-top: 16px; }
.mb-16 { margin-bottom: 16px; }
.text-dim { color: var(--dim); }
.text-punch { color: var(--punch); }
.text-teal  { color: var(--teal); }
.text-gold  { color: var(--gold); }
.fw-700 { font-weight: 700; }
.font-display { font-family: var(--font-display); }
`;

// ─── Seed data ────────────────────────────────────────────────────────────────
const today = new Date();
const daysAgo = (d) => new Date(today.getTime() - d * 86400000).toISOString().split("T")[0];
const fmt = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });

const AVATAR_COLORS = [
  ["#E94560","#7a0d20"], ["#00C9B1","#006b60"], ["#5B8DEF","#1a3d8a"],
  ["#F5B942","#8a6010"], ["#9B59B6","#4a1a6b"], ["#2ECC71","#0e6b30"],
  ["#E67E22","#7a3a0a"], ["#E91E8C","#7a0840"],
];

const INITIAL_PACKAGES = [
  { id: 1, name: "Single Session",       sessions: 1,  price: 65,  validDays: 30,  note: "One-time use" },
  { id: 2, name: "5-Session Pack",       sessions: 5,  price: 295, validDays: 90,  note: "Save $30 vs. single" },
  { id: 3, name: "10-Session Block",     sessions: 10, price: 550, validDays: 180, note: "Best value — save $100" },
  { id: 4, name: "Monthly Unlimited",    sessions: 99, price: 199, validDays: 30,  note: "Unlimited for 30 days" },
  { id: 5, name: "3-Session Intro",      sessions: 3,  price: 150, validDays: 45,  note: "New client special" },
];

const INITIAL_CLIENTS = [
  {
    id: 1, name: "Jordan Mitchell",  service: "Personal Training", colorIdx: 0,
    phone: "615-441-2200", email: "jordan@email.com", notes: "Prefers early morning. Knee injury — no high-impact.",
    activePackage: { packageId: 3, packageName: "10-Session Block", totalSessions: 10, remaining: 2 },
    history: [
      { type: "session",  note: "Strength training", date: daysAgo(2) },
      { type: "session",  note: "HIIT circuit",       date: daysAgo(5) },
      { type: "session",  note: "Legs & core",        date: daysAgo(9) },
      { type: "session",  note: "Upper body",         date: daysAgo(14) },
      { type: "session",  note: "Cardio intervals",   date: daysAgo(18) },
      { type: "session",  note: "Full body",          date: daysAgo(23) },
      { type: "session",  note: "Mobility focus",     date: daysAgo(28) },
      { type: "session",  note: "Strength",           date: daysAgo(35) },
      { type: "purchase", note: "10-Session Block purchased — $550", date: daysAgo(40) },
    ],
  },
  {
    id: 2, name: "Aaliyah Stevens",  service: "Massage Therapy", colorIdx: 1,
    phone: "615-882-7710", email: "aaliyah@email.com", notes: "Swedish and deep tissue. Prefers 60-min sessions.",
    activePackage: { packageId: 2, packageName: "5-Session Pack", totalSessions: 5, remaining: 3 },
    history: [
      { type: "session",  note: "60-min deep tissue",  date: daysAgo(3) },
      { type: "session",  note: "Swedish massage",     date: daysAgo(17) },
      { type: "purchase", note: "5-Session Pack purchased — $295", date: daysAgo(20) },
    ],
  },
  {
    id: 3, name: "Marcus Delgado",   service: "Dog Grooming", colorIdx: 2,
    phone: "615-234-9900", email: "marcus@email.com", notes: "Brings Benny (golden retriever). Anxious dog — go slow.",
    activePackage: { packageId: 5, packageName: "3-Session Intro", totalSessions: 3, remaining: 1 },
    history: [
      { type: "session",  note: "Bath + trim",      date: daysAgo(8) },
      { type: "session",  note: "Full groom",       date: daysAgo(22) },
      { type: "purchase", note: "3-Session Intro purchased — $150", date: daysAgo(25) },
    ],
  },
  {
    id: 4, name: "Priya Sharma",     service: "Personal Training", colorIdx: 3,
    phone: "615-667-4411", email: "priya@email.com", notes: "Training for 10K run. Focuses on endurance.",
    activePackage: { packageId: 2, packageName: "5-Session Pack", totalSessions: 5, remaining: 5 },
    history: [
      { type: "purchase", note: "5-Session Pack purchased — $295", date: daysAgo(4) },
    ],
  },
  {
    id: 5, name: "Devon Clarke",     service: "Tutoring", colorIdx: 4,
    phone: "615-991-3322", email: "devon@email.com", notes: "SAT prep. Strong in math, needs help with reading.",
    activePackage: { packageId: 3, packageName: "10-Session Block", totalSessions: 10, remaining: 7 },
    history: [
      { type: "session",  note: "Reading comprehension", date: daysAgo(6) },
      { type: "session",  note: "Math — algebra",        date: daysAgo(13) },
      { type: "session",  note: "Practice test review",  date: daysAgo(20) },
      { type: "purchase", note: "10-Session Block purchased — $550", date: daysAgo(22) },
    ],
  },
  {
    id: 6, name: "Simone Okafor",    service: "Massage Therapy", colorIdx: 5,
    phone: "615-774-5500", email: "simone@email.com", notes: "Monthly maintenance client. Very punctual.",
    activePackage: { packageId: 4, packageName: "Monthly Unlimited", totalSessions: 99, remaining: 99 },
    history: [
      { type: "session",  note: "90-min Swedish",    date: daysAgo(5) },
      { type: "session",  note: "Hot stone add-on",  date: daysAgo(12) },
      { type: "purchase", note: "Monthly Unlimited purchased — $199", date: daysAgo(15) },
    ],
  },
  {
    id: 7, name: "Tyler Reed",       service: "Personal Training", colorIdx: 6,
    phone: "615-228-1199", email: "tyler@email.com", notes: "Weight loss goal. Tracks macros.",
    activePackage: null,
    history: [
      { type: "session",  note: "Assessment session",  date: daysAgo(45) },
      { type: "purchase", note: "Single Session purchased — $65", date: daysAgo(45) },
    ],
  },
  {
    id: 8, name: "Keiko Tanaka",     service: "Tutoring", colorIdx: 7,
    phone: "615-334-8870", email: "keiko@email.com", notes: "AP Chemistry. Very motivated student.",
    activePackage: { packageId: 2, packageName: "5-Session Pack", totalSessions: 5, remaining: 4 },
    history: [
      { type: "session",  note: "Electrochemistry",   date: daysAgo(7) },
      { type: "purchase", note: "5-Session Pack purchased — $295", date: daysAgo(10) },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getInitials(name) { return name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(); }
function sessionStatus(remaining) {
  if (remaining === 0)   return "zero";
  if (remaining <= 2)    return "low";
  return "ok";
}
function sessionColor(status) {
  if (status === "zero") return "var(--punch)";
  if (status === "low")  return "var(--gold)";
  return "var(--teal)";
}

// ─── PunchDotGrid — the signature element ─────────────────────────────────────
function PunchDotGrid({ total, remaining, lastRedeemedIdx, onRedeem }) {
  const isUnlimited = total >= 99;
  if (isUnlimited) {
    return (
      <div style={{ marginTop:12, fontSize:12, color:"var(--teal)", fontWeight:600, letterSpacing:"0.3px" }}>
        ∞ Unlimited package active
      </div>
    );
  }
  const used = total - remaining;
  return (
    <div className="punch-grid">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`punch-dot ${i < used ? "used" : "remaining"} ${i === lastRedeemedIdx ? "just-used" : ""}`}
          title={i < used ? `Session ${i+1} — used` : `Session ${i+1} — remaining`}
          onClick={i === used && onRedeem ? onRedeem : undefined}
        />
      ))}
    </div>
  );
}

// ─── Toast system ─────────────────────────────────────────────────────────────
let toastId = 0;
function useToasts() {
  const [toasts, setToasts] = useState([]);
  function push(msg, type = "success") {
    const id = ++toastId;
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }
  return [toasts, push];
}

// ─── Modal wrapper ────────────────────────────────────────────────────────────
function Modal({ title, sub, onClose, children, footer }) {
  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">{title}</div>
            {sub && <div className="modal-sub">{sub}</div>}
          </div>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ clients, packages, onNavigate, onRedeem }) {
  const active   = clients.filter(c => c.activePackage);
  const noSess   = clients.filter(c => c.activePackage && c.activePackage.remaining === 0);
  const lowSess  = clients.filter(c => c.activePackage && c.activePackage.remaining > 0 && c.activePackage.remaining <= 2 && c.activePackage.totalSessions < 99);
  const noPackage= clients.filter(c => !c.activePackage);
  const totalRev = clients.reduce((sum,c) => {
    const paid = c.history.filter(h=>h.type==="purchase").reduce((s,h) => {
      const m = h.note.match(/\$(\d+)/);
      return s + (m ? parseInt(m[1]) : 0);
    }, 0);
    return sum + paid;
  }, 0);

  // Recent activity across all clients
  const recentActivity = clients.flatMap(c =>
    c.history.map(h => ({ ...h, clientName: c.name, clientId: c.id }))
  ).sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,6);

  return (
    <div className="page">
      <div className="stats-row">
        <div className="stat-card stat-teal">
          <div className="stat-label">Active Clients</div>
          <div className="stat-value">{active.length}</div>
          <div className="stat-note">with session packages</div>
        </div>
        <div className={`stat-card ${noSess.length > 0 ? "stat-punch" : "stat-blue"}`}>
          <div className="stat-label">Need Renewal</div>
          <div className="stat-value">{noSess.length}</div>
          <div className="stat-note">zero sessions remaining</div>
        </div>
        <div className={`stat-card ${lowSess.length > 0 ? "stat-gold" : "stat-blue"}`}>
          <div className="stat-label">Running Low</div>
          <div className="stat-value">{lowSess.length}</div>
          <div className="stat-note">1–2 sessions left</div>
        </div>
        <div className="stat-card stat-blue">
          <div className="stat-label">Total Collected</div>
          <div className="stat-value">${totalRev.toLocaleString()}</div>
          <div className="stat-note">across all clients</div>
        </div>
      </div>

      {noSess.length > 0 && (
        <div className="alert-banner danger">
          <span style={{fontSize:18}}>🚫</span>
          <div className="alert-text">
            <strong>{noSess.map(c=>c.name).join(", ")} {noSess.length === 1 ? "has" : "have"} 0 sessions remaining</strong>
            <span>Sell a new package before their next appointment.</span>
          </div>
          <button className="btn btn-punch btn-sm" style={{marginLeft:"auto", flexShrink:0}} onClick={()=>onNavigate("clients")}>View</button>
        </div>
      )}
      {lowSess.length > 0 && (
        <div className="alert-banner warn">
          <span style={{fontSize:18}}>⏳</span>
          <div className="alert-text">
            <strong>{lowSess.map(c=>c.name).join(", ")} {lowSess.length === 1 ? "has" : "have"} 1–2 sessions left</strong>
            <span>Good time to mention a package renewal.</span>
          </div>
          <button className="btn btn-dark btn-sm" style={{marginLeft:"auto", flexShrink:0}} onClick={()=>onNavigate("clients")}>View</button>
        </div>
      )}

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
        {/* Quick redeem */}
        <div style={{background:"var(--card)", border:"1px solid var(--border)", borderRadius:"var(--radius-lg)", padding:20}}>
          <div className="flex items-center justify-between mb-16">
            <div>
              <div style={{fontFamily:"var(--font-display)", fontWeight:700, fontSize:14}}>Quick Redeem</div>
              <div style={{fontSize:12, color:"var(--dim)", marginTop:3}}>Clients ready for a session</div>
            </div>
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:8}}>
            {active.filter(c => c.activePackage.remaining > 0).slice(0,5).map(c => {
              const st = sessionStatus(c.activePackage.remaining === 99 ? 99 : c.activePackage.remaining);
              return (
                <div key={c.id} style={{display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"var(--surface)", borderRadius:"var(--radius)", border:"1px solid var(--border)"}}>
                  <div className="client-avatar" style={{width:32,height:32,fontSize:12,
                    background:`linear-gradient(135deg, ${AVATAR_COLORS[c.colorIdx][0]}, ${AVATAR_COLORS[c.colorIdx][1]})`,
                    borderRadius:8}}>
                    {getInitials(c.name)}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600, fontSize:13}}>{c.name}</div>
                    <div style={{fontSize:11, color:"var(--dim)"}}>{c.service}</div>
                  </div>
                  <div style={{fontFamily:"var(--font-display)", fontWeight:700, fontSize:15, color: sessionColor(st)}}>
                    {c.activePackage.remaining >= 99 ? "∞" : c.activePackage.remaining}
                  </div>
                  <button className="redeem-btn" onClick={() => onRedeem(c.id)}>Use</button>
                </div>
              );
            })}
            {active.filter(c=>c.activePackage.remaining>0).length === 0 && (
              <div style={{textAlign:"center", padding:"20px", color:"var(--dim)", fontSize:13}}>
                No active sessions to redeem.
              </div>
            )}
          </div>
        </div>

        {/* Recent activity */}
        <div style={{background:"var(--card)", border:"1px solid var(--border)", borderRadius:"var(--radius-lg)", padding:20}}>
          <div className="flex items-center justify-between mb-16">
            <div>
              <div style={{fontFamily:"var(--font-display)", fontWeight:700, fontSize:14}}>Recent Activity</div>
              <div style={{fontSize:12, color:"var(--dim)", marginTop:3}}>Sessions and purchases</div>
            </div>
          </div>
          <div className="history-list">
            {recentActivity.map((h,i) => (
              <div key={i} className="history-item">
                <div className={`history-dot ${h.type}`} />
                <div className="history-action">
                  <span style={{fontWeight:600}}>{h.clientName}</span>
                  <span style={{color:"var(--dim)"}}> — {h.note}</span>
                </div>
                <div className="history-date">{fmt(h.date)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Client List ──────────────────────────────────────────────────────────────
function ClientList({ clients, packages, onRedeem, onBuyPackage, addClient, removeClient }) {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd]   = useState(false);
  const [lastRedeemedDots, setLastRedeemedDots] = useState({});
  const [form, setForm] = useState({ name:"", service:"Personal Training", phone:"", email:"", notes:"" });
  const [buyModal, setBuyModal] = useState(null); // clientId
  const [selectedPkg, setSelectedPkg] = useState(null);

  const SERVICES = ["Personal Training","Massage Therapy","Dog Grooming","Tutoring","Hair Styling","Nail Tech","Esthetics","Acupuncture","Other"];

  const filtered = useMemo(() => clients.filter(c => {
    const q = search.toLowerCase();
    if (q && !c.name.toLowerCase().includes(q) && !c.service.toLowerCase().includes(q)) return false;
    if (filter === "active"   && !c.activePackage) return false;
    if (filter === "low"      && (!c.activePackage || c.activePackage.remaining > 2 || c.activePackage.remaining === 0 || c.activePackage.totalSessions >= 99)) return false;
    if (filter === "zero"     && (!c.activePackage || c.activePackage.remaining !== 0)) return false;
    if (filter === "inactive" && c.activePackage) return false;
    return true;
  }), [clients, search, filter]);

  const sel = selected ? clients.find(c => c.id === selected) : null;

  function handleRedeem(id) {
    const c = clients.find(x => x.id === id);
    if (!c || !c.activePackage || c.activePackage.remaining === 0) return;
    const used = c.activePackage.totalSessions - c.activePackage.remaining;
    setLastRedeemedDots(p => ({ ...p, [id]: used }));
    onRedeem(id);
    setTimeout(() => setLastRedeemedDots(p => { const n={...p}; delete n[id]; return n; }), 800);
  }

  function doAdd() {
    if (!form.name.trim()) return;
    addClient({ ...form, id: Date.now(), colorIdx: Math.floor(Math.random() * AVATAR_COLORS.length), activePackage: null, history: [] });
    setShowAdd(false);
    setForm({ name:"", service:"Personal Training", phone:"", email:"", notes:"" });
  }

  function doBuy(clientId) {
    if (!selectedPkg) return;
    onBuyPackage(clientId, selectedPkg);
    setBuyModal(null); setSelectedPkg(null);
  }

  return (
    <div className="page">
      <div className="filter-bar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="Search clients…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="filter-select2" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All clients</option>
          <option value="active">Active package</option>
          <option value="low">Running low (1–2)</option>
          <option value="zero">Zero sessions</option>
          <option value="inactive">No package</option>
        </select>
        <button className="btn btn-punch" onClick={() => setShowAdd(true)}>+ Add Client</button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          <div className="empty-title">No clients found</div>
          <div className="empty-sub">Try a different search or add a new client.</div>
          <button className="btn btn-punch" onClick={() => setShowAdd(true)}>+ Add First Client</button>
        </div>
      ) : (
        <div className="clients-grid">
          {filtered.map(c => {
            const st = c.activePackage ? sessionStatus(c.activePackage.remaining >= 99 ? 99 : c.activePackage.remaining) : "zero";
            const canRedeem = c.activePackage && c.activePackage.remaining > 0;
            const lastSess = c.history.filter(h => h.type === "session")[0];
            return (
              <div
                key={c.id}
                className={`client-card ${st === "low" ? "low-sessions" : ""} ${!c.activePackage || st === "zero" ? "no-sessions" : ""}`}
                onClick={() => setSelected(c.id)}
              >
                <div className="client-card-header">
                  <div className="client-avatar" style={{
                    background: `linear-gradient(135deg, ${AVATAR_COLORS[c.colorIdx][0]}, ${AVATAR_COLORS[c.colorIdx][1]})`
                  }}>{getInitials(c.name)}</div>
                  <div style={{flex:1}}>
                    <div className="client-name">{c.name}</div>
                    <div className="client-service">{c.service}</div>
                  </div>
                  {c.activePackage && (
                    <span className={`tag tag-${st === "zero" ? "punch" : st === "low" ? "gold" : "teal"}`} style={{fontSize:10}}>
                      {c.activePackage.remaining >= 99 ? "∞ Unlimited" : `${c.activePackage.remaining} left`}
                    </span>
                  )}
                </div>

                {c.activePackage ? (
                  <>
                    <div className="session-count-row">
                      <div className={`sessions-remaining ${st}`}>
                        {c.activePackage.remaining >= 99 ? "∞" : c.activePackage.remaining}
                      </div>
                      <div className="sessions-label">
                        {c.activePackage.remaining >= 99 ? "unlimited sessions" : `of ${c.activePackage.totalSessions} sessions remaining`}
                      </div>
                    </div>
                    <span className="package-name-badge">{c.activePackage.packageName}</span>
                    <PunchDotGrid
                      total={c.activePackage.totalSessions}
                      remaining={c.activePackage.remaining}
                      lastRedeemedIdx={lastRedeemedDots[c.id]}
                      onRedeem={e => { e.stopPropagation(); handleRedeem(c.id); }}
                    />
                  </>
                ) : (
                  <div style={{marginTop:14, padding:"10px 12px", background:"var(--surface)", borderRadius:"var(--radius)", border:"1px solid var(--border)", fontSize:12, color:"var(--dim)"}}>
                    No active package — <span style={{color:"var(--punch)"}}>sell one to start</span>
                  </div>
                )}

                <div className="card-footer">
                  <div className="last-session">
                    {lastSess ? `Last session ${fmt(lastSess.date)}` : "No sessions yet"}
                  </div>
                  <div style={{display:"flex", gap:6}}>
                    {!c.activePackage || c.activePackage.remaining === 0 ? (
                      <button className="btn btn-teal btn-sm" onClick={e => { e.stopPropagation(); setBuyModal(c.id); setSelectedPkg(null); }}>
                        Sell Package
                      </button>
                    ) : (
                      <button
                        className="redeem-btn"
                        disabled={!canRedeem}
                        onClick={e => { e.stopPropagation(); handleRedeem(c.id); }}
                      >
                        Use Session
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Client detail modal */}
      {sel && (
        <Modal title="" sub="" onClose={() => setSelected(null)}
          footer={
            <>
              <button className="btn btn-danger btn-sm" onClick={() => { removeClient(sel.id); setSelected(null); }}>Remove</button>
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Close</button>
              <button className="btn btn-teal btn-sm" onClick={() => { setBuyModal(sel.id); setSelectedPkg(null); setSelected(null); }}>Sell Package</button>
              <button className="btn btn-punch" onClick={() => { handleRedeem(sel.id); }}
                disabled={!sel.activePackage || sel.activePackage.remaining === 0}>
                Use Session
              </button>
            </>
          }>
          <div className="client-detail-header">
            <div className="client-detail-avatar" style={{
              background: `linear-gradient(135deg, ${AVATAR_COLORS[sel.colorIdx][0]}, ${AVATAR_COLORS[sel.colorIdx][1]})`
            }}>{getInitials(sel.name)}</div>
            <div>
              <div className="detail-name">{sel.name}</div>
              <div className="detail-service">{sel.service}</div>
              {sel.phone && <div style={{fontSize:12, color:"var(--dim)", marginTop:4}}>{sel.phone} · {sel.email}</div>}
            </div>
            {sel.activePackage && (
              <div style={{marginLeft:"auto", textAlign:"right"}}>
                <div className={`sessions-remaining ${sessionStatus(sel.activePackage.remaining >= 99 ? 99 : sel.activePackage.remaining)}`}
                  style={{fontSize:32}}>
                  {sel.activePackage.remaining >= 99 ? "∞" : sel.activePackage.remaining}
                </div>
                <div style={{fontSize:11, color:"var(--dim)"}}>sessions left</div>
              </div>
            )}
          </div>
          <div className="modal-body" style={{padding:"16px 24px"}}>
            {sel.activePackage && (
              <>
                <div className="section-title">Current Package</div>
                <div style={{padding:"12px 14px", background:"var(--surface)", borderRadius:"var(--radius)", border:"1px solid var(--border)", marginBottom:16}}>
                  <div style={{fontWeight:700, marginBottom:4}}>{sel.activePackage.packageName}</div>
                  <PunchDotGrid total={sel.activePackage.totalSessions} remaining={sel.activePackage.remaining} />
                </div>
              </>
            )}
            {sel.notes && (
              <>
                <div className="section-title">Notes</div>
                <div style={{fontSize:13, color:"var(--dim)", padding:"10px 12px", background:"var(--surface)", borderRadius:"var(--radius)", borderLeft:"3px solid var(--punch)", marginBottom:16}}>
                  {sel.notes}
                </div>
              </>
            )}
            <div className="section-title">History</div>
            <div className="history-list">
              {sel.history.map((h,i) => (
                <div key={i} className="history-item">
                  <div className={`history-dot ${h.type}`} />
                  <div className="history-action">{h.note}</div>
                  <div className="history-date">{fmt(h.date)}</div>
                </div>
              ))}
              {sel.history.length === 0 && <div style={{color:"var(--dim)", fontSize:13, padding:"8px 0"}}>No history yet.</div>}
            </div>
          </div>
        </Modal>
      )}

      {/* Sell package modal */}
      {buyModal && (
        <Modal
          title={`Sell Package — ${clients.find(c=>c.id===buyModal)?.name}`}
          sub="Choose a package to assign to this client"
          onClose={() => { setBuyModal(null); setSelectedPkg(null); }}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => { setBuyModal(null); setSelectedPkg(null); }}>Cancel</button>
              <button className="btn btn-teal" disabled={!selectedPkg} onClick={() => doBuy(buyModal)}>
                Assign Package
              </button>
            </>
          }>
          <div>
            {packages.map(p => (
              <div key={p.id} className={`pkg-option ${selectedPkg?.id === p.id ? "selected" : ""}`}
                onClick={() => setSelectedPkg(p)}>
                <div className="pkg-option-info">
                  <div className="pkg-option-name">{p.name}</div>
                  <div className="pkg-option-detail">
                    {p.sessions >= 99 ? "Unlimited sessions" : `${p.sessions} sessions`} · valid {p.validDays} days · {p.note}
                  </div>
                </div>
                <div className="pkg-option-price">${p.price}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Add client modal */}
      {showAdd && (
        <Modal title="Add Client" sub="They'll show up in your client list immediately"
          onClose={() => setShowAdd(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="btn btn-punch" onClick={doAdd} disabled={!form.name.trim()}>Add Client</button>
            </>
          }>
          <div className="form-grid">
            <div className="form-group span-2">
              <label className="form-label">Full Name *</label>
              <input className="form-input" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} placeholder="Alex Johnson" />
            </div>
            <div className="form-group span-2">
              <label className="form-label">Service Type</label>
              <select className="form-select" value={form.service} onChange={e => setForm(f=>({...f,service:e.target.value}))}>
                {SERVICES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-input" value={form.phone} onChange={e => setForm(f=>({...f,phone:e.target.value}))} placeholder="615-000-0000" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} placeholder="client@email.com" />
            </div>
            <div className="form-group span-2">
              <label className="form-label">Notes</label>
              <textarea className="form-textarea" value={form.notes} onChange={e => setForm(f=>({...f,notes:e.target.value}))} placeholder="Preferences, health notes, anything useful…" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Packages page ────────────────────────────────────────────────────────────
function PackagesPage({ packages, setPackages, clients }) {
  const [showAdd, setShowAdd]   = useState(false);
  const [editPkg, setEditPkg]   = useState(null);
  const [form, setForm] = useState({ name:"", sessions:5, price:"", validDays:90, note:"" });

  function resetForm() { setForm({ name:"", sessions:5, price:"", validDays:90, note:"" }); }

  function save() {
    const pkg = {
      ...form, id: editPkg ? editPkg.id : Date.now(),
      sessions: parseInt(form.sessions) || 5,
      price: parseFloat(form.price) || 0,
      validDays: parseInt(form.validDays) || 90,
    };
    if (editPkg) setPackages(p => p.map(x => x.id === editPkg.id ? pkg : x));
    else         setPackages(p => [...p, pkg]);
    setShowAdd(false); setEditPkg(null); resetForm();
  }

  function openEdit(pkg) {
    setEditPkg(pkg); setForm({ ...pkg, price: String(pkg.price) }); setShowAdd(true);
  }

  function remove(id) { setPackages(p => p.filter(x => x.id !== id)); }

  function timesUsed(pkgId) {
    return clients.filter(c => c.history.some(h => h.type === "purchase" && h.note.includes(packages.find(p=>p.id===pkgId)?.name || "___"))).length;
  }

  return (
    <div className="page">
      <div className="filter-bar">
        <div style={{flex:1}}>
          <div style={{fontFamily:"var(--font-display)", fontWeight:700, fontSize:15}}>Your Packages</div>
          <div style={{fontSize:12, color:"var(--dim)", marginTop:2}}>{packages.length} packages defined</div>
        </div>
        <button className="btn btn-punch" onClick={() => { setEditPkg(null); resetForm(); setShowAdd(true); }}>+ New Package</button>
      </div>

      {packages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <div className="empty-title">No packages yet</div>
          <div className="empty-sub">Create your first package to start selling sessions.</div>
          <button className="btn btn-punch" onClick={() => { resetForm(); setShowAdd(true); }}>+ Create Package</button>
        </div>
      ) : (
        <div className="packages-grid">
          {packages.map(p => (
            <div key={p.id} className="pkg-card">
              <div className="pkg-sessions-badge">
                <span>●</span>
                {p.sessions >= 99 ? "Unlimited" : `${p.sessions} sessions`}
              </div>
              <div className="pkg-name">{p.name}</div>
              <div className="pkg-price">${p.price}</div>
              <div className="pkg-price-note">
                {p.sessions < 99 && p.sessions > 1 ? `$${(p.price/p.sessions).toFixed(2)} per session` : "flat rate"}
              </div>
              <div className="pkg-meta">
                <div className="pkg-meta-row">
                  <span className="pkg-meta-label">Valid for</span>
                  <span className="pkg-meta-value">{p.validDays} days</span>
                </div>
                <div className="pkg-meta-row">
                  <span className="pkg-meta-label">Sold to</span>
                  <span className="pkg-meta-value">{timesUsed(p.id)} clients</span>
                </div>
                {p.note && (
                  <div style={{marginTop:8, fontSize:12, color:"var(--dim)", fontStyle:"italic"}}>
                    {p.note}
                  </div>
                )}
              </div>
              <div className="pkg-actions">
                <button className="btn btn-dark btn-sm" onClick={() => openEdit(p)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => remove(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <Modal
          title={editPkg ? "Edit Package" : "New Package"}
          sub={editPkg ? `Editing "${editPkg.name}"` : "Define a session package to sell to clients"}
          onClose={() => { setShowAdd(false); setEditPkg(null); resetForm(); }}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => { setShowAdd(false); setEditPkg(null); resetForm(); }}>Cancel</button>
              <button className="btn btn-punch" onClick={save} disabled={!form.name.trim() || !form.price}>Save Package</button>
            </>
          }>
          <div className="form-grid">
            <div className="form-group span-2">
              <label className="form-label">Package Name *</label>
              <input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="10-Session Block" />
            </div>
            <div className="form-group">
              <label className="form-label">Number of Sessions</label>
              <input className="form-input" type="number" min="1" value={form.sessions} onChange={e=>setForm(f=>({...f,sessions:e.target.value}))} placeholder="10" />
              <span className="form-hint">Enter 99 for unlimited</span>
            </div>
            <div className="form-group">
              <label className="form-label">Price ($) *</label>
              <input className="form-input" type="number" min="0" step="0.01" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} placeholder="550" />
            </div>
            <div className="form-group">
              <label className="form-label">Valid For (days)</label>
              <input className="form-input" type="number" min="1" value={form.validDays} onChange={e=>setForm(f=>({...f,validDays:e.target.value}))} placeholder="180" />
            </div>
            <div className="form-group">
              <label className="form-label">Per-session cost</label>
              <div style={{padding:"9px 12px", background:"var(--surface)", border:"1px solid var(--border2)", borderRadius:"var(--radius)", fontSize:13, color:"var(--teal)", fontWeight:700}}>
                {form.price && form.sessions && parseInt(form.sessions) < 99
                  ? `$${(parseFloat(form.price)/parseInt(form.sessions)).toFixed(2)} / session`
                  : form.sessions >= 99 ? "Unlimited rate" : "—"}
              </div>
            </div>
            <div className="form-group span-2">
              <label className="form-label">Short Description</label>
              <input className="form-input" value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder="Best value — save $100" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Settings page ────────────────────────────────────────────────────────────
function SettingsPage({ bizName, setBizName, bizService, setBizService }) {
  const [name, setName] = useState(bizName);
  const [svc, setSvc]   = useState(bizService);
  const [saved, setSaved] = useState(false);

  function save() {
    setBizName(name); setBizService(svc);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  const PLANS = [
    { name: "Starter",    price: "$19/mo",  features: ["Up to 50 active clients","Unlimited packages","Session tracking","Punch card grid"] },
    { name: "Pro",        price: "$39/mo",  features: ["Unlimited clients","Client-facing portal","Expiration reminders","Stripe online sales"], current: false },
  ];

  return (
    <div className="page">
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
        {/* Business info */}
        <div style={{background:"var(--card)", border:"1px solid var(--border)", borderRadius:"var(--radius-lg)", padding:22}}>
          <div style={{fontFamily:"var(--font-display)", fontWeight:700, fontSize:15, marginBottom:16}}>Business Info</div>
          <div className="form-grid cols-1" style={{gridTemplateColumns:"1fr"}}>
            <div className="form-group">
              <label className="form-label">Business Name</label>
              <input className="form-input" value={name} onChange={e=>setName(e.target.value)} placeholder="Your business name" />
            </div>
            <div className="form-group">
              <label className="form-label">Service Type</label>
              <input className="form-input" value={svc} onChange={e=>setSvc(e.target.value)} placeholder="Personal Training, Massage, etc." />
            </div>
          </div>
          <div style={{marginTop:16}}>
            <button className="btn btn-punch" onClick={save}>{saved ? "✓ Saved" : "Save Changes"}</button>
          </div>
        </div>

        {/* Plan */}
        <div style={{background:"var(--card)", border:"1px solid var(--border)", borderRadius:"var(--radius-lg)", padding:22}}>
          <div style={{fontFamily:"var(--font-display)", fontWeight:700, fontSize:15, marginBottom:16}}>Your Plan</div>
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            {PLANS.map((plan, i) => (
              <div key={plan.name} style={{
                padding:"14px 16px", borderRadius:"var(--radius)",
                border: i === 0 ? "1.5px solid var(--punch)" : "1px solid var(--border2)",
                background: i === 0 ? "rgba(233,69,96,0.07)" : "var(--surface)",
                position:"relative"
              }}>
                {i === 0 && <span style={{position:"absolute", top:10, right:10}} className="tag tag-punch">Current</span>}
                <div style={{fontFamily:"var(--font-display)", fontWeight:700, fontSize:15}}>{plan.name}</div>
                <div style={{fontFamily:"var(--font-display)", fontWeight:800, fontSize:22, color: i === 0 ? "var(--punch)" : "var(--dim)", marginTop:2}}>{plan.price}</div>
                <div style={{marginTop:10, display:"flex", flexDirection:"column", gap:5}}>
                  {plan.features.map(f => (
                    <div key={f} style={{display:"flex", alignItems:"center", gap:7, fontSize:12, color: i===0?"var(--white)":"var(--dim)"}}>
                      <span style={{color: i===0?"var(--teal)":"var(--muted)"}}>✓</span> {f}
                    </div>
                  ))}
                </div>
                {i === 1 && <button className="btn btn-ghost btn-sm" style={{marginTop:12, width:"100%"}}>Upgrade to Pro</button>}
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div style={{background:"var(--card)", border:"1px solid var(--border)", borderRadius:"var(--radius-lg)", padding:22, gridColumn:"span 2"}}>
          <div style={{fontFamily:"var(--font-display)", fontWeight:700, fontSize:15, marginBottom:8}}>About PackedIn</div>
          <div style={{fontSize:13, color:"var(--dim)", lineHeight:1.7}}>
            PackedIn is built for independent service pros — personal trainers, massage therapists, dog groomers, tutors,
            barbers, and anyone else who sells sessions. No bloated salon software. No percentage cut of your revenue.
            Just a clean tool to sell packages, track sessions, and know exactly where every client stands.
            <br/><br/>
            <span style={{color:"var(--white)"}}>$19/month. Flat. No transaction fees. Ever.</span>
          </div>
          <div style={{marginTop:16, display:"flex", gap:10}}>
            <span className="tag tag-teal">Version 1.0</span>
            <span className="tag tag-muted">Built for solos</span>
            <span className="tag tag-punch">Zero transaction fees</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]         = useState("dashboard");
  const [clients, setClients]   = useState(INITIAL_CLIENTS);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [bizName, setBizName]   = useState("Your Studio");
  const [bizService, setBizService] = useState("Personal Training");
  const [toasts, pushToast]     = useToasts();

  // Metrics for badges
  const needRenewal  = clients.filter(c => c.activePackage && c.activePackage.remaining === 0).length;
  const runningLow   = clients.filter(c => c.activePackage && c.activePackage.remaining > 0 && c.activePackage.remaining <= 2 && c.activePackage.totalSessions < 99).length;
  const urgentCount  = needRenewal + runningLow;

  function redeemSession(clientId) {
    setClients(prev => prev.map(c => {
      if (c.id !== clientId || !c.activePackage || c.activePackage.remaining === 0) return c;
      const newRemaining = c.activePackage.remaining >= 99 ? 99 : c.activePackage.remaining - 1;
      const newPkg = newRemaining === 0 ? null : { ...c.activePackage, remaining: newRemaining };
      const client = clients.find(x => x.id === clientId);
      pushToast(`Session used — ${client?.name || "Client"} has ${newRemaining >= 99 ? "∞" : newRemaining} remaining`, "success");
      if (newRemaining === 1) pushToast(`⚠ ${client?.name} has 1 session left — mention a renewal`, "warn");
      if (newRemaining === 0) pushToast(`🚫 ${client?.name} is out of sessions — sell a package`, "warn");
      return {
        ...c,
        activePackage: newPkg,
        history: [{ type:"session", note:"Session redeemed", date: new Date().toISOString().split("T")[0] }, ...c.history],
      };
    }));
  }

  function buyPackage(clientId, pkg) {
    setClients(prev => prev.map(c => {
      if (c.id !== clientId) return c;
      const client = clients.find(x => x.id === clientId);
      pushToast(`${pkg.name} sold to ${client?.name || "client"} — $${pkg.price}`, "success");
      return {
        ...c,
        activePackage: { packageId: pkg.id, packageName: pkg.name, totalSessions: pkg.sessions, remaining: pkg.sessions },
        history: [{ type:"purchase", note:`${pkg.name} purchased — $${pkg.price}`, date: new Date().toISOString().split("T")[0] }, ...c.history],
      };
    }));
  }

  function addClient(client) {
    setClients(prev => [...prev, client]);
    pushToast(`${client.name} added`, "success");
  }
  function removeClient(id) {
    const c = clients.find(x => x.id === id);
    setClients(prev => prev.filter(x => x.id !== id));
    pushToast(`${c?.name || "Client"} removed`, "warn");
  }

  const pageTitle = {
    dashboard: { title: "Dashboard",  sub: "Overview of your client sessions" },
    clients:   { title: "Clients",    sub: `${clients.length} total clients` },
    packages:  { title: "Packages",   sub: `${packages.length} packages defined` },
    settings:  { title: "Settings",   sub: bizName },
  };

  const navItems = [
    { id:"dashboard", icon:"⬛", label:"Dashboard" },
    { id:"clients",   icon:"👥", label:"Clients",  badge: urgentCount > 0 ? urgentCount : null },
    { id:"packages",  icon:"📦", label:"Packages" },
    { id:"settings",  icon:"⚙️", label:"Settings" },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-text">Packed<em>In</em></div>
            <div className="logo-tagline">Session Packages</div>
          </div>
          <div className="sidebar-nav">
            <div className="nav-section-label">Menu</div>
            {navItems.map(item => (
              <button key={item.id} className={`nav-btn ${page===item.id?"active":""}`} onClick={()=>setPage(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            ))}
          </div>
          <div className="sidebar-footer">
            <div className="business-pill">
              <div className="biz-avatar">{bizName.slice(0,2).toUpperCase()}</div>
              <div>
                <div className="biz-name">{bizName}</div>
                <div className="biz-plan">Starter Plan · $19/mo</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="main">
          <div className="topbar">
            <div className="topbar-left">
              <div className="topbar-title">{pageTitle[page].title}</div>
              <div className="topbar-sub">{pageTitle[page].sub}</div>
            </div>
            <div className="topbar-actions">
              {urgentCount > 0 && (
                <button className="btn btn-danger btn-sm" onClick={()=>setPage("clients")}>
                  ⚠ {urgentCount} client{urgentCount>1?"s":""} need attention
                </button>
              )}
            </div>
          </div>

          {page === "dashboard" && (
            <Dashboard
              clients={clients} packages={packages}
              onNavigate={setPage} onRedeem={redeemSession}
            />
          )}
          {page === "clients" && (
            <ClientList
              clients={clients} packages={packages}
              onRedeem={redeemSession} onBuyPackage={buyPackage}
              addClient={addClient} removeClient={removeClient}
            />
          )}
          {page === "packages" && (
            <PackagesPage packages={packages} setPackages={setPackages} clients={clients} />
          )}
          {page === "settings" && (
            <SettingsPage
              bizName={bizName} setBizName={setBizName}
              bizService={bizService} setBizService={setBizService}
            />
          )}
        </main>
      </div>

      {/* Toasts */}
      <div className="toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span className="toast-icon">{t.type==="success"?"✓":"⚠"}</span>
            {t.msg}
          </div>
        ))}
      </div>
    </>
  );
}
