// ===========================
// SCREEN: Store / Cart — with tabs + working filters + custom builder + add-ons
// ===========================

let storeActiveTab = 'packages';
let activeFilter = 'الكل';

// Add-on cart state: { productId: quantity }
const addonCart = {};

function getAddonTotal() {
  return BAREEQ_DATA.optional_products.reduce((sum, p) => {
    return sum + p.price * (addonCart[p.id] || 0);
  }, 0);
}
function getAddonCount() {
  return Object.values(addonCart).reduce((s, q) => s + q, 0);
}

function changeAddon(id, delta) {
  const cur = addonCart[id] || 0;
  const next = Math.max(0, cur + delta);
  if (next === 0) delete addonCart[id];
  else addonCart[id] = next;
  // Re-render only the add-ons section for performance
  const section = document.getElementById('addons-section');
  if (section) section.outerHTML = renderAddonsSection();
  // Update sticky bar
  const bar = document.getElementById('cart-bar');
  if (bar) {
    const total = getAddonTotal();
    const count = getAddonCount();
    bar.style.display = count > 0 ? 'flex' : 'none';
    bar.innerHTML = cartBarHTML(count, total);
  }
}

function cartBarHTML(count, total) {
  return `
    <div style="display:flex;align-items:center;gap:8px;flex:1;">
      <div style="width:28px;height:28px;background:var(--gold);border-radius:50%;display:flex;
                  align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#7a4f00;">
        ${count}
      </div>
      <div style="font-size:13px;font-weight:600;color:white;">إضافات مختارة</div>
    </div>
    <div style="font-size:15px;font-weight:700;color:var(--gold);">${total} ر.س</div>
    <button onclick="navigate('confirmation')"
      style="background:var(--gold);color:#7a4f00;border:none;padding:8px 16px;border-radius:8px;
             font-weight:700;font-size:13px;cursor:pointer;font-family:var(--font);">أضف للطلب</button>`;
}

function renderAddonsSection() {
  const products = BAREEQ_DATA.optional_products;
  return `
  <div id="addons-section">
    <!-- Section header — matches app style -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
      <div style="font-size:14px;font-weight:700;color:white;">إضافات اختيارية</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.55);">تُضاف على سعر الباقة</div>
    </div>

    <!-- 3-column circular grid — matches "All Services" design -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
      ${products.map(p => {
    const qty = addonCart[p.id] || 0;
    const selected = qty > 0;
    return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;position:relative;">
          <!-- Qty badge -->
          ${selected ? `<div style="position:absolute;top:-4px;left:50%;transform:translateX(10px);
            background:var(--gold);color:#7a4f00;width:20px;height:20px;border-radius:50%;
            font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;
            z-index:1;">${qty}</div>` : ''}

          <!-- Circular icon (matches app circles) -->
          <div onclick="changeAddon('${p.id}',1)"
            style="width:72px;height:72px;border-radius:50%;
                   background:${selected ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.10)'};
                   border:2px solid ${selected ? 'white' : 'rgba(255,255,255,0.3)'};
                   display:flex;align-items:center;justify-content:center;
                   font-size:30px;cursor:pointer;transition:all 0.2s;
                   box-shadow:${selected ? '0 0 0 3px rgba(255,255,255,0.2)' : 'none'};">
            ${p.icon}
          </div>

          <!-- Name -->
          <div style="font-size:11px;font-weight:600;color:white;text-align:center;line-height:1.3;">
            ${p.name}
          </div>

          <!-- Price -->
          <div style="font-size:10px;color:rgba(255,255,255,0.65);text-align:center;">
            ${p.price} ر.س / ${p.unit}
          </div>

          <!-- +/- Controls -->
          <div style="display:flex;align-items:center;gap:8px;">
            <button onclick="changeAddon('${p.id}',-1)" ${!selected ? 'disabled' : ''}
              style="width:24px;height:24px;border-radius:50%;
                     background:${selected ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'};
                     color:${selected ? 'white' : 'rgba(255,255,255,0.25)'};
                     border:1px solid ${selected ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'};
                     font-size:16px;font-weight:700;cursor:${selected ? 'pointer' : 'default'};
                     display:flex;align-items:center;justify-content:center;line-height:1;">−</button>
            <span style="font-size:14px;font-weight:700;color:white;min-width:14px;text-align:center;">${qty}</span>
            <button onclick="changeAddon('${p.id}',1)"
              style="width:24px;height:24px;border-radius:50%;
                     background:rgba(255,255,255,0.2);color:white;
                     border:1px solid rgba(255,255,255,0.5);
                     font-size:16px;font-weight:700;cursor:pointer;
                     display:flex;align-items:center;justify-content:center;line-height:1;">+</button>
          </div>
        </div>`;
  }).join('')}
    </div>
  </div>`;
}
function renderStore() {
  return `
  <div class="screen animate-in">
    <div class="screen-header">
      <button class="icon-btn invisible"></button>
      <span class="header-title">السلة</span>
      <button class="icon-btn invisible"></button>
    </div>

    <!-- TABS -->
    <div style="display:flex;padding:0 12px;background:var(--teal-dark);gap:0;border-bottom:1px solid rgba(255,255,255,0.1);">
      <button id="tab-packages" onclick="switchStoreTab('packages')"
        style="flex:1;padding:10px 0;background:none;border:none;border-bottom:3px solid ${storeActiveTab === 'packages' ? 'white' : 'transparent'};
               font-family:var(--font);font-size:12px;font-weight:600;color:${storeActiveTab === 'packages' ? 'white' : 'rgba(255,255,255,0.5)'};cursor:pointer;
               display:flex;align-items:center;justify-content:center;gap:6px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        المتجر
      </button>
      <button id="tab-wallet" onclick="switchStoreTab('wallet')"
        style="flex:1;padding:10px 0;background:none;border:none;border-bottom:3px solid ${storeActiveTab === 'wallet' ? 'white' : 'transparent'};
               font-family:var(--font);font-size:12px;font-weight:600;color:${storeActiveTab === 'wallet' ? 'white' : 'rgba(255,255,255,0.5)'};cursor:pointer;
               display:flex;align-items:center;justify-content:center;gap:6px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/><path d="M2 10h20"/></svg>
        باقاتي
      </button>
      <button id="tab-tracking" onclick="switchStoreTab('tracking')"
        style="flex:1;padding:10px 0;background:none;border:none;border-bottom:3px solid ${storeActiveTab === 'tracking' ? 'white' : 'transparent'};
               font-family:var(--font);font-size:12px;font-weight:600;color:${storeActiveTab === 'tracking' ? 'white' : 'rgba(255,255,255,0.5)'};cursor:pointer;
               display:flex;align-items:center;justify-content:center;gap:6px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        تتبع الطلبات
      </button>
    </div>

    <div class="screen-body" id="store-body">
      ${storeActiveTab === 'packages' ? renderPackagesTab() : storeActiveTab === 'wallet' ? renderWalletTab() : renderTrackingTab()}
    </div>

    <!-- Sticky Add-on Cart Bar (hidden until items added) -->
    <div id="cart-bar" style="display:none;position:sticky;bottom:0;left:0;right:0;
      background:var(--teal-dark);padding:10px 16px;align-items:center;gap:12px;
      border-top:1px solid rgba(255,255,255,0.2);z-index:20;">
    </div>
  </div>`;
}

function renderPackagesTab() {
  // Filter packages based on activeFilter
  const filterMap = { 'الكل': null, 'سيدان': 'sedan', 'جيب/SUV': 'suv', 'شاملة': 'all' };
  const selectedType = filterMap[activeFilter];
  const pkgs = selectedType
    ? BAREEQ_DATA.packages.filter(p => p.car_type === selectedType)
    : BAREEQ_DATA.packages;

  const packageCards = pkgs.length ? pkgs.map(p => {
    const savings = Math.round((1 - p.price / p.original_price) * 100);
    const washDots = Array.from({ length: p.wash_count }, () =>
      `<div style="width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,0.2);
           border:1.5px solid rgba(255,255,255,0.4);display:flex;align-items:center;
           justify-content:center;font-size:10px;">💧</div>`
    ).join('');

    return `
    <div onclick="navigate('detail', {id: ${p.id}})"
      style="background:rgba(255,255,255,0.09);border:1.5px solid rgba(255,255,255,0.16);
             border-radius:18px;overflow:hidden;cursor:pointer;">

      <!-- Header strip with badge + circle icon -->
      <div class="${p.strip_class}" style="padding:10px 16px;display:flex;align-items:center;justify-content:space-between;">
        ${p.badge
        ? `<span style="font-size:11px;font-weight:700;background:rgba(0,0,0,0.22);color:white;padding:3px 10px;border-radius:999px;">${p.badge}</span>`
        : `<span></span>`}
        <div class="circle circle-md ${p.circle_class}" style="flex-shrink:0;font-size:20px;">${p.icon}</div>
      </div>

      <!-- Card body -->
      <div style="padding:12px 16px;">
        <!-- Name + price -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;">
          <div>
            <div style="font-size:16px;font-weight:700;color:white;">${p.name}</div>
            <div style="margin-top:4px;">
              <span style="font-size:11px;background:rgba(255,255,255,0.12);color:rgba(255,255,255,0.8);
                padding:2px 9px;border-radius:999px;border:1px solid rgba(255,255,255,0.18);">${p.car_label}</span>
            </div>
          </div>
          <div style="text-align:left;">
            <div style="font-size:18px;font-weight:700;color:var(--gold);">${p.price} ر.س</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.3);text-decoration:line-through;">${p.original_price} ر.س</div>
          </div>
        </div>

        <!-- Stats -->
        <div style="display:flex;gap:12px;margin-bottom:10px;flex-wrap:wrap;">
          <span style="font-size:11px;color:rgba(255,255,255,0.6);">📅 ${p.validity_days} يوم</span>
          <span style="font-size:11px;color:rgba(255,255,255,0.6);">💧 ${p.wash_count} غسلات</span>
          <span style="font-size:11px;color:var(--gold);font-weight:600;">${p.price_per_wash} ر.س/غسلة</span>
        </div>

        <!-- Wash dots -->
        <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:12px;">${washDots}</div>

        <!-- Savings + CTA -->
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:12px;color:#4ade80;font-weight:600;">وفّر ${savings}%</span>
          <button style="background:white;color:var(--teal-dark);border:none;border-radius:999px;
                          padding:9px 20px;font-size:12px;font-weight:700;cursor:pointer;font-family:var(--font);"
            onclick="event.stopPropagation();navigate('detail',{id:${p.id}})">اشترك الآن</button>
        </div>
      </div>
    </div>`;
  }).join('') : `
    <div style="text-align:center;padding:30px;color:rgba(255,255,255,0.5);">
      <div style="font-size:40px;margin-bottom:10px;">🔍</div>
      <div style="font-size:14px;">لا توجد باقات لهذا النوع حالياً</div>
    </div>`;

  return `
    <!-- Filter pills -->
    <div class="filter-row">
      ${['الكل', 'سيدان', 'جيب/SUV', 'شاملة'].map(f => `
        <button class="filter-pill ${activeFilter === f ? 'active' : ''}"
          onclick="applyFilter('${f}')">
          ${f}
        </button>`).join('')}
    </div>

    <!-- Package Cards -->
    <div id="packages-list" style="display:flex;flex-direction:column;gap:14px;">
      ${packageCards}
    </div>

    <!-- Custom Package Builder CTA — after packages -->
    <div onclick="navigate('custom-package')"
      style="background:rgba(255,255,255,0.06);
             border:2px solid rgba(245,197,24,0.5);border-radius:18px;padding:18px 16px;
             display:flex;align-items:center;gap:14px;cursor:pointer;margin-top:4px;">
      <div style="width:60px;height:60px;border-radius:50%;flex-shrink:0;
                  background:rgba(255,255,255,0.08);
                  border:2px solid rgba(245,197,24,0.6);
                  display:flex;align-items:center;justify-content:center;overflow:hidden;">
        <img src="assets/images/real_alloy_wheel.png" style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div style="flex:1;">
        <div style="font-size:15px;font-weight:700;color:white;">خصص باقتك</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.65);margin-top:4px;line-height:1.5;">
          اختر الخدمات والغسلات والمدة التي تناسبك
        </div>
        <div style="margin-top:8px;display:flex;gap:6px;">
          <span style="font-size:10px;background:rgba(245,197,24,0.2);color:var(--gold);padding:2px 8px;border-radius:999px;border:1px solid rgba(245,197,24,0.3);">🚗 سيدان</span>
          <span style="font-size:10px;background:rgba(245,197,24,0.2);color:var(--gold);padding:2px 8px;border-radius:999px;border:1px solid rgba(245,197,24,0.3);">🚙 جيب</span>
          <span style="font-size:10px;background:rgba(245,197,24,0.2);color:var(--gold);padding:2px 8px;border-radius:999px;border:1px solid rgba(245,197,24,0.3);">✨ مخصص</span>
        </div>
      </div>
      <div style="width:32px;height:32px;border-radius:50%;background:rgba(245,197,24,0.2);
                  border:1px solid rgba(245,197,24,0.4);display:flex;align-items:center;
                  justify-content:center;flex-shrink:0;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2.5" style="transform:scaleX(-1);">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </div>
    </div>

    <!-- Divider -->
    <div style="height:1px;background:rgba(255,255,255,0.15);margin:4px 0;"></div>

    <!-- Optional Add-ons -->
    ${renderAddonsSection()}

    <!-- Sticky cart bar spacer -->
    <div style="height:60px;"></div>`;
}

function renderWalletTab() {
  const up = BAREEQ_DATA.userPackage;
  const total = up.total_washes, used = up.used_washes, remaining = up.remaining_washes;
  const r = 60, cx = 80, cy = 80, circ = 2 * Math.PI * r;
  const usedDash = (used / total) * circ, remainDash = (remaining / total) * circ;
  const washDots = Array.from({ length: total }, (_, i) =>
    `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
      <div style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;
           justify-content:center;font-size:18px;
           background:${i < used ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.22)'};
           border:2px solid ${i < used ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)'};">
        ${i < used ? '✓' : '💧'}
      </div>
      <span style="font-size:9px;color:rgba(255,255,255,${i < used ? '0.4' : '0.7'});">${i < used ? 'مستخدمة' : 'متاحة'}</span>
    </div>`
  ).join('');

  return `
    <div style="display:flex;flex-direction:column;gap:14px;">

      <!-- Package card with donut -->
      <div class="card-teal" style="padding:20px 16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
          <div style="font-size:15px;font-weight:700;color:white;">${up.package_name}</div>
          <div style="font-size:11px;background:rgba(255,255,255,0.15);color:rgba(255,255,255,0.9);
               padding:3px 10px;border-radius:999px;border:1px solid rgba(255,255,255,0.25);">
            ⏰ ${up.days_remaining} يوم متبق
          </div>
        </div>
        <div style="font-size:11px;color:rgba(255,255,255,0.55);margin-bottom:14px;">تنتهي: ${up.expires_at}</div>
        <div class="donut-wrap">
          <svg viewBox="0 0 160 160">
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="16"/>
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="16"
              stroke-dasharray="${usedDash} ${circ - usedDash}" stroke-linecap="round"/>
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="white" stroke-width="16"
              stroke-dasharray="${remainDash} ${circ - remainDash}" stroke-dashoffset="${-usedDash}" stroke-linecap="round"/>
          </svg>
          <div class="donut-center">
            <div style="font-size:34px;font-weight:700;color:white;line-height:1;">${remaining}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.7);">غسلات متبقية</div>
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:14px;">${washDots}</div>
        
        <!-- Main Booking CTA -->
        <button onclick="navigate('scheduler', { packageId: ${up.package_id}, totalWashes: ${up.remaining_washes} })"
          style="width:100%;margin-top:20px;padding:14px;border-radius:12px;font-size:16px;font-weight:800;
                 background:var(--gold);color:#7a4f00;border:none;display:flex;align-items:center;
                 justify-content:center;gap:10px;box-shadow:0 8px 20px rgba(245,197,24,0.3);cursor:pointer;font-family:var(--font);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="22" height="22">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="12" y1="14" x2="12" y2="18" />
            <line x1="10" y1="16" x2="14" y2="16" />
          </svg>
          احجز موعد
        </button>
      </div>

      <!-- Car type info -->
      <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.18);
                  border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:12px;
                  border-right:4px solid var(--gold);">
        <div class="circle circle-sm circle-teal-solid" style="font-size:18px;">🚗</div>
        <div>
          <div style="font-size:13px;font-weight:600;color:white;">الباقة لـ: ${up.car_label} فقط</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.6);">جيب؟ يُحسب فرق السعر فقط
            <span onclick="navigate('checkout-diff')" style="color:var(--gold);font-weight:600;cursor:pointer;"> جرّبه ←</span>
          </div>
        </div>
      </div>

      <!-- Usage log label -->
      <div style="font-size:14px;font-weight:600;color:white;">سجل الاستخدام</div>

      <!-- Session 1 — completed -->
      <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);
                  border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:12px;">
        <div style="width:44px;height:44px;border-radius:50%;background:rgba(74,222,128,0.2);
             border:2px solid rgba(74,222,128,0.4);display:flex;align-items:center;
             justify-content:center;font-size:18px;flex-shrink:0;color:#4ade80;">✓</div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:600;color:white;">غسيل كامري - الفرع الرئيسي</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.55);">الاثنين 10 مارس</div>
        </div>
        <div style="font-size:12px;color:#4ade80;font-weight:600;">0 ر.س</div>
      </div>

      <!-- Session 2 — type mismatch -->
      <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);
                  border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:12px;">
        <div style="width:44px;height:44px;border-radius:50%;background:rgba(239,68,68,0.2);
             border:2px solid rgba(239,68,68,0.4);display:flex;align-items:center;
             justify-content:center;font-size:18px;flex-shrink:0;color:#ef4444;">✗</div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:600;color:#fca5a5;">مازدا CX-5 (جيب)</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.55);">نوع مختلف — دُفع فرق 30 ر.س</div>
        </div>
        <span style="font-size:11px;font-weight:700;color:#ef4444;background:rgba(239,68,68,0.15);
              padding:3px 10px;border-radius:999px;border:1px solid rgba(239,68,68,0.3);">+30 ر.س</span>
      </div>

      <button class="btn" onclick="navigate('detail',{id:1})"
        style="background:white;color:var(--teal-dark);font-weight:700;">
        تجديد الباقة — ${BAREEQ_DATA.packages[0].price} ر.س
      </button>
    </div>`;
}

// Fixed filter function — re-renders the entire packages tab
function applyFilter(filter) {
  activeFilter = filter;
  document.getElementById('store-body').innerHTML = renderPackagesTab();
}

function switchStoreTab(tab) {
  storeActiveTab = tab;
  document.getElementById('screen-container').innerHTML = renderStore();
}

function renderTrackingTab() {
  var up = BAREEQ_DATA.userPackage;
  var sessions = BAREEQ_DATA.sessions;
  var completed = sessions.filter(function(s) { return s.status === 'completed'; }).length;
  var upcoming = 0;
  var pending = sessions.filter(function(s) { return s.status === 'pending'; }).length;
  var total = sessions.length;
  var r = 55, cx = 70, cy = 70;
  var circ = 2 * Math.PI * r;
  var compDash = (completed / total) * circ;
  var pendDash = (pending / total) * circ;

  var html = '<div style="display:flex;flex-direction:column;gap:14px;">';

  // Package info strip
  html += '<div class="card-teal" style="padding:14px 16px;">';
  html += '<div style="display:flex;align-items:center;gap:12px;">';
  html += '<div class="circle circle-md circle-gold" style="font-size:20px;">✨</div>';
  html += '<div style="flex:1;">';
  html += '<div style="font-size:14px;font-weight:700;color:white;">' + up.package_name + '</div>';
  html += '<div style="font-size:11px;color:rgba(255,255,255,0.7);">' + up.car_label + ' • تنتهي ' + up.expires_at + '</div>';
  html += '</div>';
  html += '<div class="expires-badge">' + up.days_remaining + ' يوم متبق</div>';
  html += '</div></div>';

  // Donut + Legend
  html += '<div class="card-teal" style="padding:16px;">';
  html += '<div style="display:flex;align-items:center;gap:16px;">';
  html += '<div class="donut-wrap" style="width:140px;height:140px;">';
  html += '<svg viewBox="0 0 140 140">';
  html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="14"/>';
  html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#22c55e" stroke-width="14" stroke-dasharray="' + compDash + ' ' + (circ - compDash) + '" stroke-linecap="round"/>';
  html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="14" stroke-dasharray="' + pendDash + ' ' + (circ - pendDash) + '" stroke-dashoffset="' + (-compDash) + '" stroke-linecap="round"/>';
  html += '</svg>';
  html += '<div class="donut-center">';
  html += '<div style="font-size:24px;font-weight:700;color:white;">' + completed + '/' + total + '</div>';
  html += '<div style="font-size:9px;color:rgba(255,255,255,0.7);">جلسات</div>';
  html += '</div></div>';
  html += '<div style="flex:1;display:flex;flex-direction:column;gap:10px;">';
  html += '<div style="display:flex;align-items:center;gap:8px;"><div style="width:10px;height:10px;border-radius:50%;background:#22c55e;"></div><span style="font-size:12px;color:white;">مكتملة: ' + completed + '</span></div>';
  html += '<div style="display:flex;align-items:center;gap:8px;"><div style="width:10px;height:10px;border-radius:50%;background:#3b82f6;"></div><span style="font-size:12px;color:white;">قادمة: ' + upcoming + '</span></div>';
  html += '<div style="display:flex;align-items:center;gap:8px;"><div style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.3);"></div><span style="font-size:12px;color:white;">غير محددة: ' + pending + '</span></div>';
  html += '</div></div></div>';

  // Sessions List
  html += '<div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.9);margin:6px 0 4px;">الجلسات التفصيلية</div>';
  html += '<div style="display:flex;flex-direction:column;gap:8px;">';
  sessions.forEach(function(s, i) {
    if (s.status === 'completed') {
      html += '<div style="background:rgba(74,222,128,0.12);border:1px solid rgba(74,222,128,0.3);border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:12px;">';
      html += '<div style="width:48px;height:48px;border-radius:50%;background:rgba(74,222,128,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;color:#4ade80;">✓</div>';
      html += '<div style="flex:1;">';
      html += '<div style="font-size:13px;font-weight:600;color:white;">جلسة ' + (i+1) + ' — ' + s.type + '</div>';
      html += '<div style="font-size:11px;color:rgba(255,255,255,0.6);">' + s.date + ' • ' + s.time + '</div>';
      html += '<div class="stars">★★★★' + (s.rating >= 5 ? '★' : '☆') + '</div>';
      html += '</div>';
      html += '<div style="text-align:left;"><div style="font-size:11px;color:#4ade80;font-weight:600;">+' + s.points + ' ⭐</div><div style="font-size:10px;color:rgba(255,255,255,0.4);">0 ر.س</div></div>';
      html += '</div>';
    } else {
      html += '<div style="background:rgba(255,255,255,0.08);border:1px dashed rgba(255,255,255,0.2);border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:12px;">';
      html += '<div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.1);border:2px dashed rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:18px;color:rgba(255,255,255,0.4);">○</div>';
      html += '<div style="flex:1;">';
      html += '<div style="font-size:13px;font-weight:700;color:white;">جلسة ' + (i+1) + ' — ' + s.type + '</div>';
      html += '<div style="font-size:11px;color:rgba(255,255,255,0.5);">لم يُجدوَل بعد</div>';
      html += '</div>';
      html += '<button onclick="navigate(\'scheduler\', { packageId: ' + up.package_id + ', totalWashes: ' + up.remaining_washes + ' })" style="background:transparent;border:1.5px solid rgba(255,255,255,0.4);border-radius:999px;padding:6px 14px;color:white;font-size:12px;font-weight:600;font-family:var(--font);">جدول ←</button>';
      html += '</div>';
    }
  });
  html += '</div>';

  // Points total
  html += '<div style="background:rgba(245,197,24,0.15);border:1px solid rgba(245,197,24,0.3);border-radius:12px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;margin-top:4px;">';
  html += '<span style="font-size:13px;color:rgba(255,255,255,0.9);font-weight:600;">إجمالي النقاط المكتسبة</span>';
  html += '<span style="font-size:18px;font-weight:700;color:var(--gold);">60 ⭐ <span style="font-size:12px;color:rgba(255,255,255,0.6);">من 240</span></span>';
  html += '</div>';

  html += '<div style="height:60px;"></div></div>';
  return html;
}
