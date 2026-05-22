// public/js/home.js - BRILLE ERP lightweight home

document.addEventListener('DOMContentLoaded', async () => {
  const $ = (sel) => document.querySelector(sel);
  const safe = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const chips = $('#scopeChips');
  const dept = $('#scopeDept');
  const pos = $('#scopePos');
  const updated = $('#homeUpdated');
  try {
    const d = new Date();
    if (updated) updated.textContent = `Updated ${d.toLocaleString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}`;
  } catch {}
  try {
    const res = await fetch('/api/account', { credentials: 'include', cache: 'no-store' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return;
    if (dept) dept.textContent = data.department || 'Customers';
    if (pos) pos.textContent = data.position || 'Member';
    const allowed = Array.isArray(data.allowedPages) ? data.allowedPages : [];
    if (chips) {
      chips.innerHTML = allowed.length
        ? allowed.map((name) => `<span class="home-scope-chip">${safe(name)}</span>`).join('')
        : '<span class="home-scope-chip">Default access</span>';
    }
  } catch (error) {
    console.warn('[home] failed to load account summary', error);
  }
  try { if (window.feather) feather.replace(); } catch {}
});
