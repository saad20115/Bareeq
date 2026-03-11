// ===========================
// SCREEN: Package Detail — Teal Theme
// ===========================
function renderDetail(params = {}) {
  const id = params.id || 1;
  const p = BAREEQ_DATA.packages.find(x => x.id === id) || BAREEQ_DATA.packages[0];
  const savings = Math.round((1 - p.price / p.original_price) * 100);
  const allFeatures = [...p.features.map(f => [f, true]), ...p.extra_features.map((f, i) => [f, p.extra_included[i]])];

  return `
  <div class="screen animate-in" style="background:#0d6b6b;min-height:100%;">
    <div class="screen-header" style="background:#0d6b6b;">
      <button class="icon-btn" onclick="navigate('store')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <span class="header-title">تفاصيل الباقة</span>
      <button class="icon-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
      </button>
    </div>

    <!-- Hero -->
    <div class="details-hero">
      <div class="circle circle-lg ${p.circle_class}" style="width:90px;height:90px;font-size:38px;">${p.icon}</div>
      <div style="text-align:center;">
        <div style="font-size:22px;font-weight:700;color:white;">${p.name}</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.7);margin:3px 0 8px;">${p.subtitle}</div>
        <div style="display:inline-flex;background:rgba(255,255,255,0.15);border-radius:999px;padding:5px 16px;font-size:14px;font-weight:700;color:white;">${p.price} ر.س <span style="font-size:11px;opacity:0.7;margin-right:4px;align-self:flex-end;">/ باقة</span></div>
      </div>
      <div class="stat-badges">
        ${[[p.wash_count, 'غسلة'], [p.validity_days, 'يوم'], [savings + '%', 'توفير'], [p.price_per_wash, 'ر.س/غسلة']].map(([v, l]) =>
    `<div class="stat-badge"><div style="font-size:16px;font-weight:700;color:white;">${v}</div><div style="font-size:10px;color:rgba(255,255,255,0.6);">${l}</div></div>`
  ).join('')}
      </div>
    </div>

    <div class="screen-body" style="background:#0d6b6b;padding-top:8px;">

      <!-- Features -->
      <div style="background:rgba(255,255,255,0.1);border-radius:16px;padding:14px 16px;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;color:white;margin-bottom:10px;">الخدمات المشمولة</div>
        ${allFeatures.map(([f, inc]) => `
          <div class="feature-row" style="border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:6px;padding-bottom:6px;">
            <div class="feature-check ${inc ? 'yes' : 'no'}" style="background:${inc ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.08)'};color:${inc ? '#4ade80' : 'rgba(255,255,255,0.3)'};">${inc ? '✓' : '✗'}</div>
            <span style="font-size:13px;color:${inc ? 'white' : 'rgba(255,255,255,0.4)'};">${f}</span>
          </div>
        `).join('')}
      </div>

      <!-- Car type restriction -->
      <div style="background:rgba(255,255,255,0.1);border-radius:16px;padding:14px 16px;margin-bottom:10px;
                  border:2px solid ${p.car_type === 'all' ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.2)'};">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.12);
                      display:flex;align-items:center;justify-content:center;font-size:22px;">
            ${p.car_type === 'all' ? '✅' : p.car_type === 'sedan' ? '🚗' : '🚙'}
          </div>
          <div>
            <div style="font-size:13px;font-weight:600;color:white;">
              ${p.car_type === 'all' ? 'مناسبة لجميع السيارات' : p.car_type === 'sedan' ? 'سيدان / هاتشباك فقط' : 'SUV / جيب / كروس أوفر'}
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.6);">
              ${p.car_type === 'sedan' ? 'كامري، كورولا، التيما، سونتا...' : p.car_type === 'suv' ? 'لاندكروزر، باترول، مازدا CX...' : 'جميع المركبات مشمولة'}
            </div>
          </div>
        </div>
      </div>

      <!-- ✨ Quick Add-ons Section -->
      <div style="background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.15);
                  border-radius:16px;padding:14px;margin-bottom:14px;" id="detail-addons">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
          <div style="font-size:13px;font-weight:700;color:white;">🛒 إضافات سريعة للباقة</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.5);">تُضاف على سعر الباقة</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
          ${BAREEQ_DATA.optional_products.map(opt => {
    const qty = addonCart[opt.id] || 0;
    return `
            <div style="text-align:center;">
              <div onclick="detailAddon('${opt.id}',1, ${p.id})" style="width:56px;height:56px;border-radius:50%;margin:0 auto;
                   background:${qty > 0 ? 'rgba(245,197,24,0.15)' : 'rgba(255,255,255,0.05)'};
                   border:2px solid ${qty > 0 ? 'var(--gold)' : 'rgba(255,255,255,0.15)'};
                   display:flex;align-items:center;justify-content:center;font-size:24px;
                   cursor:pointer;position:relative;transition:all 0.2s;">
                ${opt.icon}
                ${qty > 0 ? `<div style="position:absolute;top:-4px;right:-4px;width:18px;height:18px;
                    border-radius:50%;background:var(--gold);color:#7a4f00;font-size:10px;font-weight:700;
                    display:flex;align-items:center;justify-content:center;">${qty}</div>` : ''}
              </div>
              <div style="font-size:10px;color:rgba(255,255,255,0.8);margin-top:5px;line-height:1.3;">${opt.name}</div>
              <div style="font-size:10px;color:var(--gold);font-weight:600;">${opt.price} ر.س</div>
              ${qty > 0 ? `
              <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:4px;">
                <button onclick="detailAddon('${opt.id}',-1, ${p.id})"
                  style="width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,0.15);
                         border:1px solid rgba(255,255,255,0.3);color:white;font-size:14px;font-weight:700;
                         cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;">−</button>
                <span style="font-size:12px;color:white;font-weight:600;">${qty}</span>
                <button onclick="detailAddon('${opt.id}',1, ${p.id})"
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

      <!-- Pricing detail -->
      <div style="background:rgba(255,255,255,0.1);border-radius:16px;padding:14px 16px;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;color:white;margin-bottom:10px;">تفاصيل الأسعار</div>
        <div class="summary-row">
          <span style="font-size:13px;color:rgba(255,255,255,0.6);">السعر العادي</span>
          <span style="font-size:13px;color:rgba(255,255,255,0.4);text-decoration:line-through;">${p.original_price} ر.س</span>
        </div>
        <div class="summary-row">
          <span style="font-size:13px;color:rgba(255,255,255,0.6);">سعر الباقة</span>
          <span style="font-size:14px;font-weight:700;color:var(--gold);">${p.price} ر.س</span>
        </div>
        <div class="summary-row">
          <span style="font-size:13px;color:rgba(255,255,255,0.6);">سعر الغسلة الواحدة</span>
          <span style="font-size:13px;font-weight:600;color:#4ade80;">${p.price_per_wash} ر.س فقط</span>
        </div>
        <div class="summary-row">
          <span style="font-size:13px;color:rgba(255,255,255,0.6);">مدة الصلاحية</span>
          <span style="font-size:13px;color:white;">${p.validity_days} يوم</span>
        </div>
      </div>

      <div style="height:70px;"></div>
    </div>

    <div class="sticky-bottom" style="background:#0d6b6b;border-top:1px solid rgba(255,255,255,0.15);">
      <button class="btn" onclick="goToCheckoutWithAddons(${p.id}, ${p.price}, '${p.name}')" style="background:white;color:#0d6b6b;font-weight:700;">اشترك الآن — ${p.price + getAddonTotal()} ر.س</button>
    </div>
  </div>`;
}

function goToCheckoutWithAddons(pkgId, pkgPrice, pkgName) {
  // Store the package ID for the success screen
  BAREEQ_DATA.pendingCheckoutPackageId = pkgId;

  // Create a realistic booking payload for checkout to read
  BAREEQ_DATA.currentBooking = {
    serviceType: 'new-package',
    service: 'شراء باقة جديدة',
    car_name: 'حددناه لاحقا',
    location: 'سيتم تحديده',
    date: '—',
    time: '—',
    normal_price: pkgPrice + getAddonTotal()
  };

  navigate('checkout', { id: pkgId });
}

function detailAddon(id, delta, pkgId) {
  const cur = addonCart[id] || 0;
  const next = Math.max(0, cur + delta);
  if (next === 0) delete addonCart[id];
  else addonCart[id] = next;

  // Need to pass the current package ID to renderDetail to maintain screen state
  document.getElementById('screen-container').innerHTML = renderDetail({ id: pkgId });
}
