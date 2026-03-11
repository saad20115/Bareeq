// ===========================
// SCREEN: Checkout — Package Match — Teal Theme
// ===========================
function renderCheckout() {
  const bk = BAREEQ_DATA.currentBooking;
  const up = BAREEQ_DATA.userPackage;

  return `
  <div class="screen animate-in" style="background:#0d6b6b;min-height:100%;">
    <div class="screen-header" style="background:#0d6b6b;">
      <button class="icon-btn" onclick="navigate('home')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
      <span class="header-title">إتمام الحجز</span>
      <button class="icon-btn invisible"></button>
    </div>

    <!-- Steps -->
    <div style="padding:8px 16px 14px;">
      <div class="step-indicator">
        <div class="step-dot"><div class="step-circle done">✓</div><div class="step-label">الخدمة</div></div>
        <div class="step-line done"></div>
        <div class="step-dot"><div class="step-circle done">✓</div><div class="step-label">الموعد</div></div>
        <div class="step-line done"></div>
        <div class="step-dot"><div class="step-circle active">3</div><div class="step-label">الدفع</div></div>
      </div>
    </div>

    <div class="screen-body" style="background:#0d6b6b;padding-top:4px;">

      <!-- Order Summary -->
      <div style="background:rgba(255,255,255,0.1);border-radius:16px;padding:14px 16px;margin-bottom:10px;">
        <div style="font-size:13px;font-weight:700;color:white;margin-bottom:10px;">ملخص الحجز</div>
        <div class="summary-row">
          <span style="font-size:12px;color:rgba(255,255,255,0.6);">🛁 الخدمة</span>
          <span style="font-size:12px;font-weight:600;color:white;">${bk.service}</span>
        </div>
        <div class="summary-row">
          <span style="font-size:12px;color:rgba(255,255,255,0.6);">📅 الموعد</span>
          <span style="font-size:12px;color:white;">${bk.date} • ${bk.time}</span>
        </div>
        <div class="summary-row">
          <span style="font-size:12px;color:rgba(255,255,255,0.6);">🚗 السيارة</span>
          <span style="font-size:12px;color:white;">${bk.car_name}</span>
        </div>
        <div class="summary-row">
          <span style="font-size:12px;color:rgba(255,255,255,0.6);">📍 الموقع</span>
          <span style="font-size:12px;color:white;">${bk.location}</span>
        </div>
      </div>

      <!-- PAYMENT SUMMARY BLOCK -->
      ${bk.serviceType === 'package-wash' ? `
      <div class="package-highlight-card">
        <div style="position:absolute;top:10px;left:14px;font-size:11px;font-weight:700;color:#f5c518;">✅ باقة فعالة لديك!</div>
        <div style="display:flex;align-items:center;gap:14px;margin-top:20px;">
          <div class="remaining-circle">
            <div class="num">${up.remaining_washes}</div>
            <div class="lbl">غسلات</div>
          </div>
          <div style="flex:1;">
            <div style="font-size:15px;font-weight:700;color:white;">استخدم رصيد الباقة</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.7);margin:3px 0;">${up.package_name} — ${up.car_label} ✓</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.6);">سيُخصم غسلة واحدة من رصيدك</div>
          </div>
          <div class="circle circle-sm circle-white" style="font-size:16px;flex-shrink:0;">✓</div>
        </div>
        <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.2);display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:13px;color:rgba(255,255,255,0.8);">إجمالي الخدمات الإضافية:</span>
          <span style="font-size:22px;font-weight:700;color:#f5c518;">${bk.normal_price} <span style="font-size:12px;">ر.س</span></span>
        </div>
      </div>
      ` : `
      <div class="package-highlight-card" style="background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2);margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:14px;">
          <div class="circle circle-md circle-teal-solid" style="font-size:20px;">💳</div>
          <div style="flex:1;">
            <div style="font-size:15px;font-weight:700;color:white;">دفع لمرة واحدة</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.7);margin:3px 0;">شامل ضريبة القيمة المضافة</div>
          </div>
        </div>
        <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.2);display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:13px;color:rgba(255,255,255,0.8);">المبلغ المطلوب:</span>
          <span style="font-size:22px;font-weight:700;color:white;">${bk.normal_price} <span style="font-size:12px;">ر.س</span></span>
        </div>
      </div>
      `}

      <!-- Other payment methods -->
      <div style="font-size:12px;color:rgba(255,255,255,0.6);font-weight:500;margin-bottom:6px;">اختار طريقة الدفع</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${[['💳', 'مدى البنك الأهلي ****4521', bk.normal_price + 'ر.س'], ['🍎', 'Apple Pay', bk.normal_price + 'ر.س'], ['💵', 'دفع عند الوصول', bk.normal_price + 'ر.س']].map(([icon, label, price]) => `
        <div class="payment-option" onclick="selectPayment(this)"
            style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:10px 14px;">
          <div class="radio"></div>
          <div class="circle circle-xs circle-teal-solid" style="font-size:12px;">${icon}</div>
          <div style="flex:1;font-size:12px;font-weight:500;color:white;">${label}</div>
          <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.6);">${price}</div>
        </div>`).join('')}
      </div>

      ${bk.serviceType === 'package-wash' ? `
      <div style="background:rgba(74,222,128,0.15);border:1px solid rgba(74,222,128,0.3);border-radius:12px;padding:10px 14px;margin-top:8px;display:flex;align-items:center;gap:8px;">
        <span>💡</span>
        <span style="font-size:12px;color:#4ade80;">رصيدك بعد هذا الطلب: <strong>${up.remaining_washes - 1} غسلات</strong></span>
      </div>
      ` : ''}

      <!-- ✨ Quick Add-ons Section -->
      <div style="background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.15);
                  border-radius:16px;padding:14px;margin-top:10px;" id="checkout-addons">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
          <div style="font-size:13px;font-weight:700;color:white;">🛒 إضافات سريعة</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.5);">تُضاف على سعر الطلب</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
          ${BAREEQ_DATA.optional_products.map(p => {
    const qty = addonCart[p.id] || 0;
    return `
            <div style="text-align:center;">
              <div onclick="checkoutAddon('${p.id}',1)" style="width:56px;height:56px;border-radius:50%;margin:0 auto;
                   background:${qty > 0 ? 'rgba(245,197,24,0.15)' : 'rgba(255,255,255,0.05)'};
                   border:2px solid ${qty > 0 ? 'var(--gold)' : 'rgba(255,255,255,0.15)'};
                   display:flex;align-items:center;justify-content:center;font-size:24px;
                   cursor:pointer;position:relative;transition:all 0.2s;">
                ${p.icon}
                ${qty > 0 ? `<div style="position:absolute;top:-4px;right:-4px;width:18px;height:18px;
                    border-radius:50%;background:var(--gold);color:#7a4f00;font-size:10px;font-weight:700;
                    display:flex;align-items:center;justify-content:center;">${qty}</div>` : ''}
              </div>
              <div style="font-size:10px;color:rgba(255,255,255,0.8);margin-top:5px;line-height:1.3;">${p.name}</div>
              <div style="font-size:10px;color:var(--gold);font-weight:600;">${p.price} ر.س</div>
              ${qty > 0 ? `
              <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:4px;">
                <button onclick="checkoutAddon('${p.id}',-1)"
                  style="width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,0.15);
                         border:1px solid rgba(255,255,255,0.3);color:white;font-size:14px;font-weight:700;
                         cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;">−</button>
                <span style="font-size:12px;color:white;font-weight:600;">${qty}</span>
                <button onclick="checkoutAddon('${p.id}',1)"
                  style="width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,0.2);
                         border:1px solid rgba(255,255,255,0.4);color:white;font-size:14px;font-weight:700;
                         cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;">+</button>
              </div>` : ''}
            </div>`;
  }).join('')}
        </div>
        ${Object.keys(addonCart).length > 0 ? `
        <div style="margin-top:12px;padding-top:10px;border-top:1px solid rgba(245,197,24,0.2);
                    display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;color:rgba(255,255,255,0.7);">إجمالي الإضافات</span>
          <span style="font-size:16px;font-weight:700;color:var(--gold);">${getAddonTotal()} ر.س</span>
        </div>` : ''}
      </div>

      <div style="height:70px;"></div>
    </div>

    <div class="sticky-bottom" style="background:#0d6b6b;border-top:1px solid rgba(255,255,255,0.15);">
      <button class="btn" onclick="completePurchase()" style="background:white;color:#0d6b6b;font-weight:700;">
        ${bk.serviceType === 'single-wash' ? 'تأكيد الدفع — تأكيد الحجز' : 'تأكيد الدفع — اشتراك باقة 🎉'}
      </button>
      <p style="text-align:center;font-size:11px;color:rgba(255,255,255,0.4);margin-top:6px;">🔒 دفع آمن ومشفر</p>
    </div>
  </div>`;
}

function selectPayment(el) {
  document.querySelectorAll('.payment-option').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
}

function completePurchase() {
  const bk = BAREEQ_DATA.currentBooking;

  if (bk && bk.serviceType === 'single-wash') {
    // Single wash payment complete, go to confirmation
    navigate('scheduler-done');
    return;
  }

  // Package purchase logic
  const pkgId = BAREEQ_DATA.pendingCheckoutPackageId || 1;
  const pkg = BAREEQ_DATA.packages.find(p => p.id === pkgId) || BAREEQ_DATA.packages[0];

  // Store as purchased package
  BAREEQ_DATA.purchasedPackage = {
    ...pkg,
    car_label: pkg.car_type === 'suv' ? 'جيب/SUV' : 'سيدان'
  };

  // Update userPackage to reflect new subscription
  BAREEQ_DATA.userPackage = {
    id: Date.now(), package_id: pkg.id, package_name: pkg.name,
    car_type: pkg.car_type, car_label: pkg.car_type === 'suv' ? 'جيب/SUV' : 'سيدان',
    total_washes: pkg.wash_count, used_washes: 0, remaining_washes: pkg.wash_count,
    price_per_wash: pkg.price_per_wash,
    purchased_at: new Date().toISOString().slice(0, 10),
    expires_at: new Date(Date.now() + pkg.validity_days * 864e5).toISOString().slice(0, 10),
    days_remaining: pkg.validity_days,
  };

  // Reset sessions to match new package
  BAREEQ_DATA.sessions = Array.from({ length: pkg.wash_count }, (_, i) => ({
    id: i + 1, type: 'غسيل خارجي', service: pkg.car_type === 'suv' ? 'جيب' : 'سيدان',
    date: 'لم يُجدَل', status: 'pending'
  }));
  BAREEQ_DATA.scheduledSessions = [];

  navigate('purchase-success');
}

function checkoutAddon(id, delta) {
  const cur = addonCart[id] || 0;
  const next = Math.max(0, cur + delta);
  if (next === 0) delete addonCart[id];
  else addonCart[id] = next;
  const section = document.getElementById('checkout-addons');
  if (section) {
    document.getElementById('screen-container').innerHTML = renderCheckout();
  }
}
