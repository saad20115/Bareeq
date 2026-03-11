// ===========================
// SCREEN: Checkout — Price Difference
// ===========================
function renderCheckoutDiff() {
    const bk = BAREEQ_DATA.mismatchBooking;
    const up = BAREEQ_DATA.userPackage;
    const packagePrice = up.price_per_wash; // 25
    const bookingPrice = BAREEQ_DATA.car_prices[bk.car_type]; // 55
    const diff = bookingPrice - packagePrice; // 30

    return `
  <div class="screen animate-in" style="background:var(--off-white);">
    <div class="screen-header">
      <button class="icon-btn" onclick="navigate('home')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
      <span class="header-title">إتمام الحجز</span>
      <button class="icon-btn invisible"></button>
    </div>

    <!-- Steps -->
    <div style="background:var(--teal-dark);padding:8px 16px 14px;">
      <div class="step-indicator">
        <div class="step-dot"><div class="step-circle done">✓</div><div class="step-label">الخدمة</div></div>
        <div class="step-line done"></div>
        <div class="step-dot"><div class="step-circle done">✓</div><div class="step-label">الموعد</div></div>
        <div class="step-line done"></div>
        <div class="step-dot"><div class="step-circle active">3</div><div class="step-label">الدفع</div></div>
      </div>
    </div>

    <div class="screen-body" style="background:var(--off-white);border-radius:20px 20px 0 0;margin-top:-8px;padding-top:16px;">
      <!-- Order Summary -->
      <div class="card">
        <div style="font-size:13px;font-weight:700;color:var(--dark);margin-bottom:10px;">ملخص الحجز</div>
        <div class="summary-row">
          <span style="font-size:12px;color:var(--gray-600);">🛁 الخدمة</span>
          <span style="font-size:12px;font-weight:600;color:var(--dark);">${bk.service}</span>
        </div>
        <div class="summary-row">
          <span style="font-size:12px;color:var(--gray-600);">📅 الموعد</span>
          <span style="font-size:12px;color:var(--dark);">${bk.date} • ${bk.time}</span>
        </div>
        <div class="summary-row">
          <span style="font-size:12px;color:var(--gray-600);">🚙 السيارة</span>
          <span style="font-size:12px;color:var(--dark);">${bk.car_name}</span>
        </div>
      </div>

      <!-- SMART PRICE DIFF CARD -->
      <div class="price-diff-card">
        <div style="text-align:center;margin-bottom:14px;">
          <span style="background:rgba(255,255,255,0.2);border-radius:999px;padding:4px 14px;font-size:12px;font-weight:700;color:white;">🧮 حساب ذكي لفرق السعر</span>
        </div>

        <div class="price-circles-row">
          <!-- Package covers -->
          <div class="price-circle">
            <div class="price-circle-ring">
              <div class="price-num">${packagePrice}</div>
              <div class="price-unit">ر.س</div>
            </div>
            <div style="font-size:10px;color:rgba(255,255,255,0.7);margin-top:4px;text-align:center;">تغطية الباقة<br>(${up.car_label})</div>
          </div>

          <div class="op-circle">+</div>

          <!-- You pay diff -->
          <div class="price-circle">
            <div class="price-circle-ring result">
              <div class="price-num">${diff}</div>
              <div class="price-unit">ر.س</div>
            </div>
            <div style="font-size:10px;color:rgba(255,255,255,0.7);margin-top:4px;text-align:center;">تدفعه الآن<br>(فرق السعر)</div>
          </div>

          <div class="op-circle">=</div>

          <!-- Total service -->
          <div class="price-circle">
            <div class="price-circle-ring">
              <div class="price-num">${bookingPrice}</div>
              <div class="price-unit">ر.س</div>
            </div>
            <div style="font-size:10px;color:rgba(255,255,255,0.7);margin-top:4px;text-align:center;">سعر غسيل<br>الجيب</div>
          </div>
        </div>

        <div style="background:rgba(0,0,0,0.2);border-radius:12px;padding:12px;margin-top:8px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <span style="font-size:12px;color:rgba(255,255,255,0.8);">✅ تغطية الباقة</span>
            <span style="font-size:13px;font-weight:600;color:white;">${packagePrice} ر.س</span>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="font-size:12px;color:rgba(255,255,255,0.8);">💳 فرق السعر</span>
            <span style="font-size:15px;font-weight:700;color:#f5c518;">${diff} ر.س فقط</span>
          </div>
        </div>
        <div style="font-size:10px;color:rgba(255,255,255,0.5);text-align:center;margin-top:8px;">
          ستُخصم غسلة واحدة من رصيدك (${up.remaining_washes} → ${up.remaining_washes - 1} غسلات) + تدفع فرق السعر
        </div>
      </div>

      <!-- Pay the difference -->
      <div class="section-label" style="color:var(--dark);">ادفع فرق السعر (${diff} ر.س)</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${[['💳', 'مدى البنك الأهلي ****4521', true], ['🍎', 'Apple Pay', false], ['💵', 'دفع عند الوصول', false]].map(([icon, label, sel]) => `
        <div class="payment-option ${sel ? 'selected' : ''}" onclick="selectPayment(this)">
          <div class="radio"></div>
          <div class="circle circle-xs circle-teal-solid" style="font-size:12px;">${icon}</div>
          <div style="flex:1;font-size:12px;font-weight:500;color:var(--dark);">${label}</div>
          <div style="font-size:13px;font-weight:700;color:var(--teal-dark);">${diff} ر.س</div>
        </div>`).join('')}
      </div>

      <div class="info-card notice">
        <span>ℹ️</span>
        <div style="font-size:11px;color:#92400e;">
          رصيد باقتك للسيدان (${up.remaining_washes} غسلات) محفوظ ويستمر بالعمل مع سيارة كامري
        </div>
      </div>
    </div>

    <div class="sticky-bottom" style="background:var(--off-white);">
      <button class="btn btn-teal" onclick="navigate('confirmation')">تأكيد الحجز — ادفع ${diff} ر.س</button>
      <p style="text-align:center;font-size:11px;color:var(--gray-400);margin-top:6px;">🔒 دفع آمن ومشفر</p>
    </div>
  </div>`;
}
