// ===========================
// SCREEN: Purchase Success
// ===========================
function renderPurchaseSuccess() {
    const pkg = BAREEQ_DATA.purchasedPackage || BAREEQ_DATA.packages[0];
    const addonsTotal = getAddonTotal ? getAddonTotal() : 0;
    const total = pkg.price + addonsTotal;

    return `
  <div class="screen animate-in" style="background:var(--teal-dark);min-height:100%;">
    <div class="screen-header" style="background:var(--teal-dark);">
      <button class="icon-btn invisible"></button>
      <span class="header-title">تم الشراء بنجاح</span>
      <button class="icon-btn invisible"></button>
    </div>

    <div class="screen-body" style="align-items:center;padding-top:24px;">

      <!-- Animated success circle -->
      <div style="position:relative;margin-bottom:20px;">
        <div style="width:110px;height:110px;border-radius:50%;
             background:linear-gradient(135deg,rgba(74,222,128,0.25),rgba(74,222,128,0.1));
             border:3px solid rgba(74,222,128,0.5);
             display:flex;align-items:center;justify-content:center;
             animation:successPulse 1.5s ease infinite;">
          <div style="width:78px;height:78px;border-radius:50%;background:#22c55e;
               display:flex;align-items:center;justify-content:center;
               box-shadow:0 0 30px rgba(74,222,128,0.5);">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"
                 width="38" height="38">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>
        <!-- Confetti dots -->
        ${['🟠', '🟡', '⚪', '🟢', '🔵'].map((c, i) => `
          <div style="position:absolute;font-size:14px;animation:confetti${i} 2s ease ${i * 0.2}s infinite;
               top:${[-20, -10, 95, 100, 80][i]}px;left:${[-10, 100, 110, -20, 45][i]}px;">${c}</div>
        `).join('')}
      </div>

      <div style="font-size:22px;font-weight:700;color:white;text-align:center;margin-bottom:6px;">
        اشتراكك جاهز! 🎉
      </div>
      <div style="font-size:13px;color:rgba(255,255,255,0.65);text-align:center;margin-bottom:24px;">
        رقم الطلب: #BQ-${Date.now().toString().slice(-6)}
      </div>

      <!-- Package summary card -->
      <div style="background:rgba(255,255,255,0.1);border:1.5px solid rgba(255,255,255,0.2);
                  border-radius:18px;padding:18px 20px;width:100%;margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px;">
          <div class="circle circle-md ${pkg.circle_class}" style="font-size:22px;flex-shrink:0;">
            ${pkg.icon}
          </div>
          <div>
            <div style="font-size:16px;font-weight:700;color:white;">${pkg.name}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:2px;">${pkg.car_label}</div>
          </div>
          <div style="margin-right:auto;text-align:left;">
            <div style="font-size:18px;font-weight:700;color:var(--gold);">${total} ر.س</div>
          </div>
        </div>
        <!-- Stats mini row -->
        <div style="display:flex;justify-content:space-around;padding-top:12px;border-top:1px solid rgba(255,255,255,0.12);">
          <div style="text-align:center;">
            <div style="font-size:20px;font-weight:700;color:white;">${pkg.wash_count}</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.55);">غسلات</div>
          </div>
          <div style="width:1px;background:rgba(255,255,255,0.12);"></div>
          <div style="text-align:center;">
            <div style="font-size:20px;font-weight:700;color:white;">${pkg.validity_days}</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.55);">يوم صلاحية</div>
          </div>
          <div style="width:1px;background:rgba(255,255,255,0.12);"></div>
          <div style="text-align:center;">
            <div style="font-size:20px;font-weight:700;color:var(--gold);">${pkg.price_per_wash}</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.55);">ر.س/غسلة</div>
          </div>
        </div>
      </div>

      <!-- Pending washes info -->
      <div style="background:rgba(240,120,0,0.1);border:1.5px solid rgba(240,120,0,0.35);
                  border-radius:14px;padding:12px 16px;width:100%;margin-bottom:24px;
                  display:flex;align-items:center;gap:12px;">
        <div style="font-size:28px;">📅</div>
        <div>
          <div style="font-size:13px;font-weight:600;color:white;">
            لديك ${pkg.wash_count} غسلات بانتظار الجدولة
          </div>
          <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px;">
            حدد مواعيد الخدمة الآن أو لاحقاً من محفظتك
          </div>
        </div>
      </div>

      <!-- CTAs -->
      <button onclick="navigate('scheduler', {packageId: ${pkg.id}, totalWashes: ${pkg.wash_count}})"
        style="width:100%;background:white;color:var(--teal-dark);border:none;border-radius:999px;
               padding:15px;font-size:15px;font-weight:700;cursor:pointer;font-family:var(--font);
               margin-bottom:12px;box-shadow:0 4px 16px rgba(0,0,0,0.15);">
        📅 جدول غسلاتك الآن
      </button>
      <button onclick="navigate('home')"
        style="width:100%;background:rgba(255,255,255,0.12);color:rgba(255,255,255,0.8);
               border:1px solid rgba(255,255,255,0.2);border-radius:999px;
               padding:14px;font-size:14px;font-weight:600;cursor:pointer;font-family:var(--font);">
        لاحقاً ← الرئيسية
      </button>
    </div>
  </div>

  <style>
    @keyframes successPulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.3); }
      50% { box-shadow: 0 0 0 16px rgba(74,222,128,0); }
    }
    @keyframes confetti0 { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-12px) rotate(20deg);} }
    @keyframes confetti1 { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-8px) rotate(-15deg);} }
    @keyframes confetti2 { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-14px) rotate(10deg);} }
    @keyframes confetti3 { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-10px) rotate(-20deg);} }
    @keyframes confetti4 { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-6px) rotate(25deg);} }
  </style>`;
}
