// ===========================
// SCREEN: Order Confirmation — Teal Theme
// ===========================
function renderConfirmation() {
  return `
  <div class="screen animate-in" style="background:#0d6b6b;min-height:100%;">
    <div class="screen-header" style="background:#0d6b6b;">
      <button class="icon-btn invisible"></button>
      <span class="header-title">تأكيد الطلب</span>
      <button class="icon-btn invisible"></button>
    </div>

    <!-- Step indicator - all done -->
    <div style="padding:8px 16px 14px;">
      <div class="step-indicator">
        <div class="step-dot"><div class="step-circle done">✓</div><div class="step-label">الخدمة</div></div>
        <div class="step-line done"></div>
        <div class="step-dot"><div class="step-circle done">✓</div><div class="step-label">الموعد</div></div>
        <div class="step-line done"></div>
        <div class="step-dot"><div class="step-circle done">✓</div><div class="step-label">التأكيد</div></div>
      </div>
    </div>

    <!-- Confirmation Hero -->
    <div class="confirm-hero">
      <div class="confirm-check-circle">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" width="52" height="52">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div style="font-size:22px;font-weight:700;color:white;text-align:center;">تم تأكيد طلبك! 🎉</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.7);text-align:center;">رقم الطلب: #BQ-20260312-0089</div>
    </div>

    <div class="screen-body" style="background:#0d6b6b;padding-top:8px;">

      <!-- Summary Card -->
      <div style="background:rgba(255,255,255,0.1);border-radius:16px;padding:14px 16px;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;color:white;margin-bottom:10px;">ملخص الطلب</div>
        <div class="summary-row">
          <span style="font-size:12px;color:rgba(255,255,255,0.6);">الخدمة</span>
          <span style="font-size:12px;font-weight:600;color:white;">غسيل خارجي - سيدان</span>
        </div>
        <div class="summary-row">
          <span style="font-size:12px;color:rgba(255,255,255,0.6);">الموعد</span>
          <span style="font-size:12px;color:white;">الأربعاء 12 مارس • 11:00 ص</span>
        </div>
        <div class="summary-row">
          <span style="font-size:12px;color:rgba(255,255,255,0.6);">السيارة</span>
          <span style="font-size:12px;color:white;">كامري XSE 2023</span>
        </div>
        <div style="height:1px;background:rgba(255,255,255,0.15);margin:8px 0;"></div>
        <div class="summary-row">
          <span style="font-size:12px;color:rgba(255,255,255,0.6);">تغطية الباقة</span>
          <span style="font-size:12px;font-weight:600;color:var(--gold);">45 ر.س</span>
        </div>
        <div class="summary-row">
          <span style="font-size:13px;font-weight:700;color:white;">المبلغ المدفوع</span>
          <span style="font-size:16px;font-weight:700;color:#4ade80;">0 ر.س ✓</span>
        </div>
      </div>

      <!-- Points earned -->
      <div style="background:rgba(245,197,24,0.15);border:1px solid rgba(245,197,24,0.3);border-radius:16px;padding:14px 16px;margin-bottom:10px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div class="circle circle-md" style="background:rgba(245,197,24,0.3);border:2px solid var(--gold);font-size:22px;">⭐</div>
          <div>
            <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.9);">نقاطك المكتسبة</div>
            <div style="font-size:20px;font-weight:700;color:var(--gold);">+ 60 نقطة</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.6);">إجمالي نقاطك: 245 ⭐</div>
          </div>
        </div>
      </div>

      <!-- Next steps circles -->
      <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.9);margin:10px 0 8px;">الخطوات التالية</div>
      <div class="circles-row" style="justify-content:center;">
        ${[['📅', 'تتبع الموعد', 'sessions'], ['🏠', 'الرئيسية', 'home'], ['⭐', 'تقييم', 'home']].map(([i, l, s]) => `
        <div class="circle-item" onclick="navigate('${s}')">
          <div class="circle circle-md" style="background:rgba(255,255,255,0.12);border:2px solid rgba(255,255,255,0.35);">
            <span class="circle-icon">${i}</span>
          </div>
          <span style="color:rgba(255,255,255,0.9);">${l}</span>
        </div>`).join('')}
      </div>

      <div style="height:70px;"></div>
    </div>

    <div class="sticky-bottom" style="background:#0d6b6b;border-top:1px solid rgba(255,255,255,0.15);">
      <button class="btn" onclick="navigate('home')"
        style="background:white;color:#0d6b6b;font-weight:700;border:none;">العودة للرئيسية</button>
    </div>
  </div>`;
}
