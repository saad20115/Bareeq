// ===========================
// SCREEN: Custom Package Builder
// ===========================

let customPkg = {
  car_type: null,        // 'sedan' | 'suv' | 'all'
  washes: 4,
  validity: 30,
  services: {
    exterior: true,
    interior: false,
    tires: true,
    polish: false,
    wax: false,
    fragrance: false,
  }
};

const SERVICE_LIST = [
  { key: 'exterior', icon: '🚿', label: 'غسيل خارجي', base: 25, required: true },
  { key: 'interior', icon: '🧹', label: 'تنظيف داخلي', base: 15 },
  { key: 'tires', icon: '⚙️', label: 'تلميع الإطارات', base: 8 },
  { key: 'polish', icon: '✨', label: 'تلميع الجسم', base: 18 },
  { key: 'wax', icon: '🌟', label: 'تشميع', base: 20 },
  { key: 'fragrance', icon: '🌸', label: 'عطرة داخلية', base: 8 },
];

const CAR_TYPES_LIST = [
  { value: 'sedan', icon: '🚗', label: 'سيدان', sub: 'كامري، كورولا، التيما', surcharge: 0 },
  { value: 'suv', icon: '🚙', label: 'جيب / SUV', sub: 'لاندكروزر، باترول، مازدا CX', surcharge: 10 },
  { value: 'all', icon: '✅', label: 'جميع الأنواع', sub: 'سيدان + جيب + كروس أوفر', surcharge: 15 },
];

function calcCustomPrice() {
  const serviceTotal = SERVICE_LIST.filter(s => customPkg.services[s.key]).reduce((sum, s) => sum + s.base, 0);
  const surcharge = CAR_TYPES_LIST.find(c => c.value === customPkg.car_type)?.surcharge || 0;
  const perWash = serviceTotal + surcharge;
  const raw = perWash * customPkg.washes;
  const discount = customPkg.washes >= 8 ? 0.25 : customPkg.washes >= 5 ? 0.15 : customPkg.washes >= 3 ? 0.10 : 0;
  const final = Math.round(raw * (1 - discount));
  return { perWash, raw, final, discount: Math.round(discount * 100) };
}

function renderCustomPackage() {
  const price = calcCustomPrice();
  const carSelected = customPkg.car_type;

  return `
  <div class="screen animate-in" style="background:#0d6b6b;min-height:100%;">
    <div class="screen-header" style="background:#0d6b6b;">
      <button class="icon-btn" onclick="navigate('store')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <span class="header-title">خصص باقتك</span>
      <button class="icon-btn invisible"></button>
    </div>

    <!-- HERO -->
    <div style="background:linear-gradient(135deg,var(--teal-mid),var(--teal-dark));padding:16px;text-align:center;">
      <div style="font-size:13px;color:rgba(255,255,255,0.7);">اختر ما يناسبك</div>
      <div style="font-size:28px;font-weight:700;color:white;">${carSelected ? price.final : '—'} ر.س</div>
      ${price.discount > 0 && carSelected ? `<div style="font-size:11px;background:rgba(245,197,24,0.25);color:var(--gold);border-radius:999px;display:inline-block;padding:2px 12px;margin-top:4px;">خصم ${price.discount}% للكميات 🎉</div>` : ''}
    </div>

    <div class="screen-body" style="background:#0d6b6b;padding-top:16px;">

      <!-- STEP 1: Car Type -->
      <div style="background:rgba(255,255,255,0.1);border-radius:16px;padding:14px 16px;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;color:white;margin-bottom:12px;">1️⃣ نوع سيارتك</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
          ${CAR_TYPES_LIST.map(ct => `
          <div onclick="selectCarType('${ct.value}')"
            style="border:2px solid ${customPkg.car_type === ct.value ? 'white' : 'rgba(255,255,255,0.25)'};
                   background:${customPkg.car_type === ct.value ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'};
                   border-radius:14px;padding:12px 8px;text-align:center;cursor:pointer;transition:all 0.2s;">
            <div style="font-size:28px;margin-bottom:4px;">${ct.icon}</div>
            <div style="font-size:12px;font-weight:700;color:white;">${ct.label}</div>
            <div style="font-size:9px;color:rgba(255,255,255,0.55);margin-top:2px;">${ct.sub}</div>
            ${ct.surcharge > 0 ? `<div style="font-size:9px;color:var(--gold);font-weight:600;margin-top:3px;">+${ct.surcharge} ر.س/غسلة</div>` : '<div style="font-size:9px;color:#4ade80;font-weight:600;margin-top:3px;">الأساس</div>'}
          </div>`).join('')}
        </div>
      </div>

      <!-- STEP 2: Number of washes -->
      <div style="background:rgba(255,255,255,0.1);border-radius:16px;padding:14px 16px;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;color:white;margin-bottom:12px;">2️⃣ عدد الغسلات</div>
        <div style="display:flex;align-items:center;justify-content:center;gap:20px;margin-bottom:10px;">
          <button onclick="changeWashes(-1)"
            style="width:42px;height:42px;border-radius:50%;background:var(--teal-dark);color:white;border:none;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;">−</button>
          <div style="font-size:36px;font-weight:700;color:white;min-width:50px;text-align:center;">${customPkg.washes}</div>
          <button onclick="changeWashes(1)"
            style="width:42px;height:42px;border-radius:50%;background:var(--teal-dark);color:white;border:none;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;">+</button>
        </div>
        <!-- Visual wash dots -->
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:10px;">
          ${Array.from({ length: customPkg.washes }, (_, i) =>
    `<div style="width:28px;height:28px;border-radius:50%;background:var(--teal-dark);display:flex;align-items:center;justify-content:center;font-size:13px;color:white;font-weight:700;">${i + 1}</div>`
  ).join('')}
        </div>
        ${customPkg.washes >= 3 ? `<div style="text-align:center;font-size:11px;color:var(--green);font-weight:600;">
          ${customPkg.washes >= 8 ? '🏆 خصم 25% للكميات الكبيرة' : customPkg.washes >= 5 ? '🎉 خصم 15% لـ 5+ غسلات' : '👍 خصم 10% لـ 3+ غسلات'}
        </div>` : ''}
      </div>

      <!-- STEP 3: Validity -->
      <div style="background:rgba(255,255,255,0.1);border-radius:16px;padding:14px 16px;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;color:white;margin-bottom:12px;">3️⃣ مدة الصلاحية</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${[15, 30, 60, 90].map(d => `
          <button onclick="selectValidity(${d})"
            style="flex:1;min-width:60px;padding:10px 4px;border-radius:999px;
                   border:1.5px solid ${customPkg.validity === d ? 'white' : 'rgba(255,255,255,0.3)'};
                   background:${customPkg.validity === d ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'};
                   color:white;
                   font-size:12px;font-weight:600;cursor:pointer;font-family:var(--font);">${d} يوم</button>
          `).join('')}
        </div>
      </div>

      <!-- STEP 4: Services -->
      <div style="background:rgba(255,255,255,0.1);border-radius:16px;padding:14px 16px;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;color:white;margin-bottom:12px;">4️⃣ الخدمات المطلوبة</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          ${SERVICE_LIST.map(s => {
    const checked = customPkg.services[s.key];
    const required = s.required;
    return `
            <div onclick="${required ? '' : `toggleService('${s.key}')`}"
              style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;
                     border:1.5px solid ${checked ? 'white' : 'rgba(255,255,255,0.2)'};
                     background:${checked ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)'};
                     cursor:${required ? 'default' : 'pointer'};transition:all 0.2s;">
              <div style="width:36px;height:36px;border-radius:50%;background:${checked ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'};
                          display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">${s.icon}</div>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:600;color:white;">${s.label}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.55);">+${s.base} ر.س/غسلة</div>
              </div>
              ${required
        ? `<span style="font-size:9px;background:var(--gray-100);color:var(--gray-600);padding:1px 6px;border-radius:999px;">أساسي</span>`
        : `<div style="width:20px;height:20px;border-radius:50%;background:${checked ? 'rgba(255,255,255,0.3)' : 'transparent'};
                              border:2px solid ${checked ? 'white' : 'rgba(255,255,255,0.3)'};
                              display:flex;align-items:center;justify-content:center;font-size:12px;color:white;">${checked ? '✓' : ''}</div>`
      }
            </div>`;
  }).join('')}
        </div>
      </div>

      <!-- PRICE SUMMARY -->
      ${carSelected ? `
      <div style="background:rgba(255,255,255,0.12);border:2px solid rgba(255,255,255,0.4);border-radius:16px;padding:14px 16px;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;color:white;margin-bottom:10px;">ملخص الباقة المخصصة</div>
        <div class="summary-row">
          <span style="font-size:12px;color:rgba(255,255,255,0.6);">سعر الغسلة الواحدة</span>
          <span style="font-size:13px;font-weight:600;color:white;">${price.perWash} ر.س</span>
        </div>
        <div class="summary-row">
          <span style="font-size:12px;color:rgba(255,255,255,0.6);">${customPkg.washes} غسلات × ${price.perWash} ر.س</span>
          <span style="font-size:12px;color:rgba(255,255,255,0.35);text-decoration:${price.discount ? 'line-through' : 'none'}">${price.raw} ر.س</span>
        </div>
        ${price.discount ? `
        <div class="summary-row">
          <span style="font-size:12px;color:#4ade80;">خصم الكميات (${price.discount}%)</span>
          <span style="font-size:12px;color:#4ade80;font-weight:600;">− ${price.raw - price.final} ر.س</span>
        </div>` : ''}
        <div style="height:1px;background:rgba(255,255,255,0.2);margin:8px 0;"></div>
        <div class="summary-row">
          <span style="font-size:14px;font-weight:700;color:white;">الإجمالي</span>
          <span style="font-size:20px;font-weight:700;color:var(--gold);">${price.final} ر.س</span>
        </div>
        <div style="font-size:10px;color:rgba(255,255,255,0.5);text-align:center;margin-top:4px;">${customPkg.validity} يوم صلاحية</div>
      </div>` : `
      <div class="info-card notice">
        <span>👆</span>
        <span style="font-size:13px;color:#92400e;">اختر نوع سيارتك لرؤية السعر</span>
      </div>`}

      <div style="height:70px;"></div>
    </div>

    <div class="sticky-bottom" style="background:#0d6b6b;border-top:1px solid rgba(255,255,255,0.15);">
      <button class="btn btn-teal" ${!carSelected ? 'disabled style="opacity:0.5;"' : ''}
        onclick="${carSelected ? 'navigate(\'confirmation\')' : ""}">
        ${carSelected ? `اشترك الآن — ${price.final} ر.س` : 'اختر نوع سيارتك أولاً'}
      </button>
    </div>
  </div>`;
}

// Interaction handlers
function selectCarType(type) {
  customPkg.car_type = type;
  document.getElementById('screen-container').innerHTML = renderCustomPackage();
}

function changeWashes(delta) {
  customPkg.washes = Math.max(1, Math.min(12, customPkg.washes + delta));
  document.getElementById('screen-container').innerHTML = renderCustomPackage();
}

function selectValidity(days) {
  customPkg.validity = days;
  document.getElementById('screen-container').innerHTML = renderCustomPackage();
}

function toggleService(key) {
  customPkg.services[key] = !customPkg.services[key];
  document.getElementById('screen-container').innerHTML = renderCustomPackage();
}
