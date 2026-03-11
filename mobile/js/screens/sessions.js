// ===========================
// SCREEN: Session Tracker
// ===========================
function renderSessions() {
  const up = BAREEQ_DATA.userPackage;
  const sessions = BAREEQ_DATA.sessions;
  const completed = sessions.filter(s => s.status === 'completed').length;
  const upcoming = 0;
  const pending = sessions.filter(s => s.status === 'pending').length;
  const total = sessions.length;

  // Donut
  const r = 55, cx = 70, cy = 70;
  const circ = 2 * Math.PI * r;
  const compDash = (completed / total) * circ;
  const upDash = (upcoming / total) * circ;

  return `
  <div class="screen animate-in">
    <div class="screen-header">
      <button class="icon-btn" onclick="navigate('wallet')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
      <span class="header-title">متابعة الجلسات</span>
      <button class="icon-btn invisible"></button>
    </div>
    <div class="screen-body">

      <!-- Package info strip -->
      <div class="card-teal" style="padding:14px 16px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div class="circle circle-md circle-gold" style="font-size:20px;">✨</div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:700;color:white;">${up.package_name}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.7);">${up.car_label} • تنتهي ${up.expires_at}</div>
          </div>
          <div class="expires-badge">${up.days_remaining} يوم متبق</div>
        </div>
      </div>

      <!-- Donut + Legend -->
      <div class="card-teal" style="padding:16px;">
        <div style="display:flex;align-items:center;gap:16px;">
          <div class="donut-wrap" style="width:140px;height:140px;">
            <svg viewBox="0 0 140 140">
              <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="14"/>
              <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#22c55e" stroke-width="14"
                stroke-dasharray="${compDash} ${circ - compDash}" stroke-linecap="round"/>
              <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="14"
                stroke-dasharray="${(pending / total) * circ} ${circ - (pending / total) * circ}"
                stroke-dashoffset="${-compDash}" stroke-linecap="round"/>
            </svg>
            <div class="donut-center">
              <div style="font-size:24px;font-weight:700;color:white;">${completed}/${total}</div>
              <div style="font-size:9px;color:rgba(255,255,255,0.7);">جلسات</div>
            </div>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;gap:10px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:10px;height:10px;border-radius:50%;background:#22c55e;"></div>
              <span style="font-size:12px;color:white;">مكتملة: ${completed}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:10px;height:10px;border-radius:50%;background:#3b82f6;"></div>
              <span style="font-size:12px;color:white;">قادمة: ${upcoming}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.3);"></div>
              <span style="font-size:12px;color:white;">غير محددة: ${pending}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sessions List -->
      <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.9);margin:10px 0 8px;">الجلسات التفصيلية</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${sessions.map((s, i) => {
    if (s.status === 'completed') {
      return `
            <div style="background:rgba(74,222,128,0.12);border:1px solid rgba(74,222,128,0.3);
                   border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:12px;">
              <div style="width:48px;height:48px;border-radius:50%;background:rgba(74,222,128,0.2);
                   display:flex;align-items:center;justify-content:center;font-size:18px;color:#4ade80;">✓</div>
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:600;color:white;">جلسة ${i + 1} — ${s.type}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.6);">${s.date} • ${s.time}</div>
                <div class="stars">★★★★${s.rating >= 5 ? '★' : '☆'}</div>
              </div>
              <div style="text-align:left;">
                <div style="font-size:11px;color:#4ade80;font-weight:600;">+${s.points} ⭐</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.4);">0 ر.س</div>
              </div>
            </div>`;
    } else {
      return `
            <div style="background:rgba(255,255,255,0.08);border:1px dashed rgba(255,255,255,0.2);
                   border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:12px;">
              <div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.1);
                   border:2px dashed rgba(255,255,255,0.3);display:flex;align-items:center;
                   justify-content:center;font-size:18px;color:rgba(255,255,255,0.4);">○</div>
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:700;color:white;">جلسة ${i + 1} — ${s.type}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.5);">لم يُجدوَل بعد</div>
              </div>
              <button onclick="navigate('scheduler', { packageId: ${up.package_id}, totalWashes: ${up.remaining_washes} })"
                style="background:transparent;border:1.5px solid rgba(255,255,255,0.4);border-radius:999px;
                       padding:6px 14px;color:white;font-size:12px;font-weight:600;font-family:var(--font);">
                جدول ←
              </button>
            </div>`;
    }
  }).join('')}
      </div>

      <!-- Points total -->
      <div style="background:rgba(245,197,24,0.15);border:1px solid rgba(245,197,24,0.3);
                  border-radius:12px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;margin-top:4px;">
        <span style="font-size:13px;color:rgba(255,255,255,0.9);font-weight:600;">إجمالي النقاط المكتسبة</span>
        <span style="font-size:18px;font-weight:700;color:var(--gold);">60 ⭐ <span style="font-size:12px;color:rgba(255,255,255,0.6);">من 240</span></span>
      </div>
    </div>
  </div>`;
}
