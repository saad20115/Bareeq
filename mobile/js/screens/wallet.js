// ===========================
// SCREEN: Account / Profile (حسابي)
// ===========================

function renderWallet() {
  const carsCount = BAREEQ_DATA.savedCars ? BAREEQ_DATA.savedCars.length : 0;
  const locsCount = BAREEQ_DATA.savedLocations ? BAREEQ_DATA.savedLocations.length : 0;

  return `
  <div class="screen animate-in" style="background:var(--teal-dark);min-height:100%;font-family:var(--font);">
    
    <!-- HEADER -->
    <div class="screen-header" style="background:var(--teal-dark);border:none;">
      <button class="icon-btn invisible"></button>
      <span class="header-title" style="color:white;font-size:16px;">حسابي</span>
      <button class="icon-btn" onclick="navigate('home')">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
    </div>

    <div class="screen-body" style="padding:4px 16px 100px;">
      
      <!-- PROFILE SUMMARY -->
      <div class="bk-fade-up" style="display:flex;align-items:center;gap:16px;margin-bottom:24px;
                  background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);
                  border-radius:20px;padding:20px;">
        <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--gold),#e8a842);
                    display:flex;align-items:center;justify-content:center;font-size:32px;
                    border:2px solid rgba(255,255,255,0.4);flex-shrink:0;">
          👨
        </div>
        <div style="flex:1;">
          <div style="font-size:18px;font-weight:800;color:white;margin-bottom:4px;">محمد عبدالله</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.7);margin-bottom:6px;direction:ltr;text-align:right;">+966 50 123 4567</div>
          <span style="font-size:10px;background:rgba(255,255,255,0.15);color:white;padding:3px 8px;border-radius:999px;">عضو منذ 2023</span>
        </div>
      </div>

      <!-- POINTS BALANCE -->
      <div class="bk-fade-up" style="background:linear-gradient(135deg,rgba(245,197,24,0.15),rgba(245,197,24,0.05));
                  border:1px solid rgba(245,197,24,0.3);border-radius:20px;padding:20px;
                  display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
        <div style="text-align:right;">
          <div style="font-size:12px;font-weight:700;color:var(--gold);margin-bottom:4px;">رصيد النقاط (بريق مكافآت)</div>
          <div style="font-size:24px;font-weight:800;color:white;">1,000 <span style="font-size:12px;font-weight:600;">نقطة</span></div>
        </div>
        <div style="width:48px;height:48px;border-radius:50%;background:rgba(245,197,24,0.2);
                    display:flex;align-items:center;justify-content:center;font-size:24px;">⭐</div>
      </div>

      <!-- ACCOUNT MENU -->
      <div class="bk-fade-up" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
                  border-radius:20px;overflow:hidden;margin-bottom:24px;">
        
        ${menuItem('سياراتي المحفوظة', '🚙', `${carsCount} سيارات`, true)}
        ${menuItem('عناويني المحفوظة', '📍', `${locsCount} مواقع`, true)}
        ${menuItem('طرق الدفع', '💳', 'بطاقتين', true)}
        
      </div>

      <div class="bk-fade-up" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
                  border-radius:20px;overflow:hidden;margin-bottom:24px;">
        
        ${menuItem('الإعدادات', '⚙️', '', true)}
        ${menuItem('المساعدة والدعم', '🎧', '', true)}
        ${menuItem('الشروط والأحكام', '📄', '', false)}
        
      </div>

      <!-- LOGOUT -->
      <div class="bk-fade-up" style="text-align:center;">
        <button style="background:rgba(239,68,68,0.1);color:#fca5a5;border:1px solid rgba(239,68,68,0.3);
                       padding:14px 30px;border-radius:999px;font-size:14px;font-weight:700;
                       cursor:pointer;font-family:var(--font);display:inline-flex;align-items:center;gap:8px;">
          <span>تسجيل الخروج</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
        </button>
      </div>

    </div>
  </div>`;
}

function menuItem(title, icon, subtitle, borderBottom) {
  return `
  <div style="display:flex;align-items:center;padding:16px;cursor:pointer;
              ${borderBottom ? 'border-bottom:1px solid rgba(255,255,255,0.1);' : ''}">
    <div style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.1);
                display:flex;align-items:center;justify-content:center;font-size:18px;margin-left:12px;">
      ${icon}
    </div>
    <div style="flex:1;">
      <div style="font-size:14px;font-weight:700;color:white;">${title}</div>
    </div>
    ${subtitle ? `<div style="font-size:12px;color:rgba(255,255,255,0.5);margin-left:8px;">${subtitle}</div>` : ''}
    <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" width="18" height="18" style="transform:scaleX(-1);">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  </div>`;
}
