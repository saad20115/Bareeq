// ===========================
// SCREEN: Single Page Booking (Circular Design + Business Logic)
// ===========================

let bookingState = {
  locationId: null, carId: null, serviceType: null, selectedAddons: [],
  date: null, timeSlot: null,
  showAddCar: false, showAddLocation: false,
};

function startBooking(params) {
  bookingState = {
    locationId: null, carId: null, serviceType: null, selectedAddons: [],
    date: null, timeSlot: null,
    showAddCar: false, showAddLocation: false, ...(params || {}),
  };

  // Default selections
  bookingState.carId = BAREEQ_DATA.savedCars[0]?.id || null;
  bookingState.locationId = BAREEQ_DATA.savedLocations[0]?.id || null;

  const up = BAREEQ_DATA.userPackage;
  if (up && up.remaining_washes > 0) {
    bookingState.serviceType = 'package-wash';
  } else {
    bookingState.serviceType = 'single-wash';
  }

  // Auto-select first date & time to match image state
  const d = new Date();
  bookingState.date = d.toISOString().slice(0, 10);
  bookingState.timeSlot = '12:00 م';

  if (typeof gsap !== 'undefined') {
    gsap.from('.bk-fade-up', {
      y: 20, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', clearProps: 'all'
    });
  }
}

function buildBookingScreen() {
  const st = bookingState;
  const cars = BAREEQ_DATA.savedCars;
  const locs = BAREEQ_DATA.savedLocations;
  const up = BAREEQ_DATA.userPackage;
  const addonsList = BAREEQ_DATA.optional_products || [];
  const packageList = BAREEQ_DATA.packages || [];

  const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return { key: d.toISOString().slice(0, 10), dayName: dayNames[d.getDay()], day: d.getDate(), month: monthNames[d.getMonth()], isToday: i === 0 };
  });
  const times = ['08:00 ص', '10:00 ص', '12:00 م', '02:00 م', '04:00 م', '06:00 م'];

  const selCar = cars && cars.length > 0 ? (cars.find(c => c.id === st.carId) || cars[0]) : null;
  const carType = selCar ? selCar.type : 'sedan';
  const singleWashPrice = BAREEQ_DATA.car_prices ? (BAREEQ_DATA.car_prices[carType] || 45) : 45;

  const isPackageWash = st.serviceType === 'package-wash';
  const isSingleWash = st.serviceType === 'single-wash';
  const buyPkgId = st.serviceType?.startsWith('buy-') ? parseInt(st.serviceType.split('-')[1]) : null;
  const buyPkg = buyPkgId ? packageList.find(p => p.id === buyPkgId) : null;

  const selAddons = addonsList.filter(a => st.selectedAddons.includes(a.id));
  const addonsPrice = selAddons.reduce((sum, a) => sum + a.price, 0);

  let basePrice = 0;
  if (isPackageWash) basePrice = 0;
  else if (isSingleWash) basePrice = singleWashPrice;
  else if (buyPkg) basePrice = buyPkg.price;

  const totalPrice = basePrice + addonsPrice;

  const canSubmit = st.locationId && st.carId && st.date && st.timeSlot && st.serviceType;

  // Custom UI Helpers
  const sectionTitle = (icon, text) => `
    <div style="padding:0 20px;font-size:14px;font-weight:700;color:white;margin-bottom:12px;display:flex;align-items:center;gap:6px;justify-content:flex-end;">
      ${text} <span style="font-size:16px;">${icon}</span>
    </div>`;

  const circleIcon = (sel, icon, label, sub) => `
    <div style="display:flex;flex-direction:column;align-items:center;min-width:76px;gap:8px;cursor:pointer;">
      <div style="width:72px;height:72px;border-radius:50%;
           background:${sel ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'};
           border:1.5px solid ${sel ? 'white' : 'rgba(255,255,255,0.2)'};
           display:flex;align-items:center;justify-content:center;font-size:28px;
           transition:all 0.2s;box-shadow:${sel ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'};">
        ${icon}
      </div>
      <div style="text-align:center;">
        <div style="font-size:10px;font-weight:${sel ? '700' : '500'};color:white;line-height:1.4;">${label}</div>
        ${sub ? `<div style="font-size:10px;font-weight:700;color:white;margin-top:2px;">${sub}</div>` : ''}
      </div>
    </div>`;

  const circleImage = (sel, imageSrc, label) => `
    <div style="display:flex;flex-direction:column;align-items:center;min-width:76px;gap:8px;cursor:pointer;">
      <div style="width:72px;height:72px;border-radius:50%;overflow:hidden;
           background:rgba(255,255,255,0.1);border:1.5px solid ${sel ? 'white' : 'rgba(255,255,255,0.2)'};
           display:flex;align-items:center;justify-content:center;font-size:32px;">
        ${imageSrc} 
      </div>
      <div style="text-align:center;">
        <div style="font-size:10px;font-weight:${sel ? '700' : '500'};color:white;line-height:1.4;">${label}</div>
      </div>
    </div>`;

  return `
  <div class="screen" style="background:var(--teal-dark);min-height:100%;display:flex;flex-direction:column;font-family:var(--font);">
    
    <!-- HEADER -->
    <div class="screen-header" style="background:var(--teal-dark);position:sticky;top:0;z-index:50;border:none;">
      <button class="icon-btn invisible"></button>
      <span class="header-title" style="font-size:16px;">مواعيدي</span>
      <button class="icon-btn" onclick="navigate('home')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
    </div>

    <div class="screen-body" style="padding:4px 0 140px;overflow-x:hidden;">

      <!-- HERO BANNER -->
      <div class="bk-fade-up" style="padding:0 16px;margin-bottom:24px;">
        <div style="background:rgba(255,255,255,0.1);border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.15);">
          <div style="display:flex;padding:16px;gap:12px;">
            <div style="flex:1;text-align:right;">
              <div style="font-size:18px;font-weight:800;color:white;margin-bottom:4px;">اغسل مرة أخرى!</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.8);line-height:1.5;">عُد لسيارتك وكأنها جديدة<br/>بخيار الغسيل الخارجي<br/>والتلميع.</div>
            </div>
            <div style="width:100px;display:flex;align-items:center;justify-content:center;font-size:60px;opacity:0.9;">
              🧼
            </div>
          </div>
        </div>
      </div>

      <!-- MAIN SERVICE LOGIC -->
      <div class="bk-fade-up" style="padding:0 16px;margin-bottom:24px;">
        <div style="text-align:right;font-size:14px;font-weight:700;color:white;margin-bottom:4px;">نوع الخدمة الأساسية</div>
        ${up && up.remaining_washes > 0 ? `
          <div onclick="bkSet('serviceType','package-wash')" style="background:${st.serviceType === 'package-wash' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'};border-radius:20px;padding:16px 20px;display:flex;align-items:center;border:1.5px solid ${st.serviceType === 'package-wash' ? 'white' : 'rgba(255,255,255,0.12)'};cursor:pointer;margin-bottom:10px;transition:all 0.2s;">
            <div style="flex:1;text-align:right;">
              <div style="font-size:10px;color:var(--gold);font-weight:700;margin-bottom:4px;">خصم من رصيدك الحالي</div>
              <div style="font-size:14px;font-weight:700;color:white;margin-bottom:2px;">الباقه المشتراة (${up.package_name})</div>
              <div style="font-size:14px;font-weight:800;color:white;">${up.remaining_washes} <span style="font-size:10px;font-weight:500;">غسلة متبقية</span></div>
            </div>
            <div style="font-size:48px;line-height:1;margin-right:10px;opacity:0.9;">✨</div>
          </div>
        ` : ''}

        <div style="display:flex;gap:16px;overflow-x:auto;padding-bottom:10px;scrollbar-width:none;flex-direction:row-reverse;">
          <div onclick="bkSet('serviceType','single-wash')">
            ${circleIcon(st.serviceType === 'single-wash', '💧', 'غسيل لمرة واحدة', `${singleWashPrice} ر.س`)}
          </div>
          ${packageList.map(p => `
            <div onclick="bkSet('serviceType','buy-${p.id}')">
              ${circleIcon(st.serviceType === `buy-${p.id}`, p.icon, `باقة ${p.name.split(' ')[0]}`, `${p.price} ر.س`)}
            </div>
          `).join('')}
          <div style="min-width:8px;"></div>
        </div>
      </div>

      <!-- 1. LOCATION -->
      <div class="bk-fade-up" style="margin-bottom:24px;">
        ${sectionTitle('📍', 'اختار الموقع')}
        ${st.showAddLocation ? `<div style="padding:0 20px;margin-bottom:12px;">${bkAddLocForm()}</div>` : `
          <div style="display:flex;gap:16px;overflow-x:auto;padding:0 20px 10px;scrollbar-width:none;flex-direction:row-reverse;">
            <div onclick="bkToggleLoc()" style="display:flex;flex-direction:column;align-items:center;min-width:76px;gap:8px;cursor:pointer;">
              <div style="width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:32px;color:white;">+</div>
            </div>
            ${locs.map(l => `
              <div onclick="bkSet('locationId','${l.id}')">
                ${circleIcon(st.locationId === l.id, l.label.includes('المنزل') ? '🏠' : l.label.includes('العمل') ? '💼' : '📍', l.label, '')}
              </div>
            `).join('')}
            <div onclick="bkSet('locationId','current')" style="display:flex;flex-direction:column;align-items:center;min-width:76px;gap:8px;cursor:pointer;">
              <div style="width:72px;height:72px;border-radius:50%;background:${st.locationId === 'current' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'};border:1.5px solid ${st.locationId === 'current' ? 'white' : 'rgba(255,255,255,0.2)'};display:flex;align-items:center;justify-content:center;font-size:28px;color:white;">📌</div>
              <div style="font-size:10px;color:white;text-align:center;">موقعي الحالي</div>
            </div>
            <div style="min-width:8px;"></div>
          </div>
        `}
      </div>

      <!-- 2. CAR -->
      <div class="bk-fade-up" style="margin-bottom:24px;">
        ${sectionTitle('🚘', 'اختار السياره')}
        ${st.showAddCar ? `<div style="padding:0 20px;margin-bottom:12px;">${bkAddCarForm()}</div>` : `
          <div style="display:flex;gap:16px;overflow-x:auto;padding:0 20px 10px;scrollbar-width:none;flex-direction:row-reverse;">
            <div onclick="bkToggleCar()" style="display:flex;flex-direction:column;align-items:center;min-width:76px;gap:8px;cursor:pointer;">
              <div style="width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:32px;color:white;">+</div>
            </div>
            ${cars.map(c => `
              <div onclick="bkSet('carId','${c.id}')">
                ${circleImage(st.carId === c.id, c.icon, c.name.split(' ')[0])}
              </div>
            `).join('')}
            <div style="min-width:8px;"></div>
          </div>
        `}
      </div>

      <!-- 3. ADD-ON SERVICES -->
      <div class="bk-fade-up" style="margin-bottom:30px;">
        ${sectionTitle('✨', 'خدمات إضافية')}
        <div style="display:flex;gap:16px;overflow-x:auto;padding:0 20px 10px;scrollbar-width:none;flex-direction:row-reverse;">
          ${addonsList.map(a => {
    const isSel = st.selectedAddons.includes(a.id);
    return `
            <div onclick="bkToggleAddon('${a.id}')">
              ${circleIcon(isSel, a.icon, `<div>${a.name}</div>`, `${a.price} ر.س`)}
            </div>
            `;
  }).join('')}
          <div style="min-width:8px;"></div>
        </div>
      </div>

      <!-- 4. DATE -->
      <div class="bk-fade-up" style="margin-bottom:24px;">
        <div style="padding:0 20px;font-size:14px;font-weight:700;color:white;margin-bottom:12px;text-align:right;">تحديد الموعد اليوم</div>
        <div style="display:flex;gap:14px;overflow-x:auto;padding:0 20px 10px;scrollbar-width:none;flex-direction:row-reverse;">
          ${dates.map((d, i) => `
            <div onclick="bkSet('date','${d.key}')" style="display:flex;flex-direction:column;align-items:center;min-width:65px;padding:12px 6px;border-radius:50%;cursor:pointer;aspect-ratio:1;justify-content:center;
                 background:${st.date === d.key ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'};
                 border:1px solid ${st.date === d.key ? 'white' : 'rgba(255,255,255,0.15)'};
                 transition:all 0.2s;">
              <div style="font-size:11px;font-weight:${st.date === d.key ? '700' : '500'};color:white;margin-bottom:4px;">${d.dayName}</div>
              <div style="font-size:15px;font-weight:700;color:white;">${d.day}</div>
            </div>
          `).join('')}
          <div style="min-width:8px;"></div>
        </div>
      </div>

      <!-- 5. TIME -->
      <div class="bk-fade-up" style="margin-bottom:30px;">
        <div style="padding:0 20px;font-size:14px;font-weight:700;color:white;margin-bottom:12px;text-align:right;">الأوقات المتاحة</div>
        <div style="display:flex;gap:12px;overflow-x:auto;padding:0 20px 10px;scrollbar-width:none;flex-direction:row-reverse;">
          ${times.map(t => `
            <div onclick="bkSet('timeSlot','${t}')" style="padding:10px 24px;border-radius:999px;cursor:pointer;white-space:nowrap;
                 background:${st.timeSlot === t ? '#063f44' : 'rgba(255,255,255,0.08)'};
                 border:1px solid ${st.timeSlot === t ? 'white' : 'rgba(255,255,255,0.15)'};
                 color:white;font-size:13px;font-weight:${st.timeSlot === t ? '700' : '500'};transition:all 0.2s;">
              ${t}
            </div>
          `).join('')}
          <div style="min-width:8px;"></div>
        </div>
      </div>

      <!-- SUMMARY FOOTER TEXT -->
      <div class="bk-fade-up" style="padding:0 20px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid rgba(255,255,255,0.15);padding-top:16px;">
        <div style="text-align:left;">
          <div style="font-size:12px;font-weight:700;color:white;margin-bottom:4px;">الاجمالي</div>
          <div style="font-size:16px;font-weight:800;color:white;">📋 ${totalPrice} <span style="font-size:12px;font-weight:600;">ر.س</span></div>
        </div>
        <div style="text-align:right;border-right:2px solid rgba(255,255,255,0.5);padding-right:12px;">
          <div style="font-size:11px;color:rgba(255,255,255,0.8);margin-bottom:4px;">مدة الخدمات التقريبية:</div>
          <div style="font-size:12px;font-weight:700;color:white;">ساعة و 30 دقيقة</div>
        </div>
      </div>

    </div>

    <!-- STICKY FOOTER BUTTON -->
    <div style="position:fixed;bottom:0;left:0;right:0;background:var(--teal-dark);padding:16px 20px 24px;z-index:100;box-shadow:0 -10px 30px rgba(0,0,0,0.3);">
      <button onclick="${canSubmit ? 'bkFinish()' : ''}"
        class="${canSubmit ? 'btn-ripple' : ''}"
        style="width:100%;border:none;border-radius:999px;padding:16px;font-size:16px;font-weight:700;font-family:var(--font);
               background:${canSubmit ? 'white' : 'rgba(255,255,255,0.2)'};
               color:${canSubmit ? 'var(--teal-dark)' : 'rgba(255,255,255,0.5)'};
               transition:all 0.3s;cursor:${canSubmit ? 'pointer' : 'default'};">
        ${!canSubmit ? 'أكمل الاختيارات لتأكيد الحجز' : (totalPrice === 0 ? 'تأكيد الحجز (مجاني من الباقة)' : `تابع للدفع (${totalPrice} ر.س)`)}
      </button>
    </div>

  </div>`;
}

// Inline forms
function bkAddCarForm() {
  return `<div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:18px;padding:16px;text-align:right;">
    <div style="font-size:13px;font-weight:700;color:white;margin-bottom:12px;">🚗 إضافة سيارة جديدة</div>
    <input id="bkCN" placeholder="النوع والموديل (مثال: كامري 2023)" style="text-align:right;width:100%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:12px;color:white;font-size:13px;font-family:var(--font);margin-bottom:10px;box-sizing:border-box;"/>
    <div style="display:flex;gap:10px;margin-bottom:10px;">
      <input id="bkCP" placeholder="رقم اللوحة (أ ب ج 123)" style="text-align:right;flex:1.5;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:12px;color:white;font-size:13px;font-family:var(--font);"/>
      <input id="bkCC" placeholder="اللون" style="text-align:right;flex:1;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:12px;color:white;font-size:13px;font-family:var(--font);"/>
    </div>
    <div style="display:flex;gap:10px;">
      <button onclick="bkSaveCar()" style="flex:1;background:white;color:var(--teal-dark);border:none;border-radius:999px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:var(--font);">حفظ السيارة</button>
      <button onclick="bkToggleCar()" style="background:rgba(255,255,255,0.15);color:white;border:none;border-radius:999px;padding:12px 20px;cursor:pointer;font-family:var(--font);">إلغاء</button>
    </div>
  </div>`;
}

function bkAddLocForm() {
  return `<div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:18px;padding:16px;text-align:right;">
    <div style="font-size:13px;font-weight:700;color:white;margin-bottom:12px;">📍 إضافة موقع جديد</div>
    <input id="bkLL" placeholder="اسم الموقع (المنزل، العمل...)" style="text-align:right;width:100%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:12px;color:white;font-size:13px;font-family:var(--font);margin-bottom:10px;box-sizing:border-box;"/>
    <textarea id="bkLA" placeholder="العنوان التفصيلي (الحي، الشارع، الدبوس)" rows="3" style="text-align:right;width:100%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:12px;color:white;font-size:13px;font-family:var(--font);resize:none;margin-bottom:14px;box-sizing:border-box;"></textarea>
    <div style="display:flex;gap:10px;">
      <button onclick="bkSaveLoc()" style="flex:1;background:white;color:var(--teal-dark);border:none;border-radius:999px;padding:12px;font-size:13px;font-weight:700;cursor:pointer;font-family:var(--font);">حفظ الموقع</button>
      <button onclick="bkToggleLoc()" style="background:rgba(255,255,255,0.15);color:white;border:none;border-radius:999px;padding:12px 20px;cursor:pointer;font-family:var(--font);">إلغاء</button>
    </div>
  </div>`;
}

// ── State helpers ──────────────────────────────────────────────
function bkSet(k, v) { bookingState[k] = v; document.getElementById('screen-container').innerHTML = buildBookingScreen(); }
function bkToggleCar() { bookingState.showAddCar = !bookingState.showAddCar; document.getElementById('screen-container').innerHTML = buildBookingScreen(); }
function bkToggleLoc() { bookingState.showAddLocation = !bookingState.showAddLocation; document.getElementById('screen-container').innerHTML = buildBookingScreen(); }
function bkToggleAddon(id) {
  const arr = bookingState.selectedAddons;
  if (arr.includes(id)) {
    bookingState.selectedAddons = arr.filter(x => x !== id);
  } else {
    arr.push(id);
  }
  document.getElementById('screen-container').innerHTML = buildBookingScreen();
}

function bkSaveCar() {
  const n = document.getElementById('bkCN')?.value?.trim();
  const c = document.getElementById('bkCC')?.value?.trim();
  const p = document.getElementById('bkCP')?.value?.trim();
  if (!n || !p) return;
  const car = { id: 'c' + Date.now(), name: n, color: c || '', plate: p, type: 'sedan', icon: '🚙' };
  BAREEQ_DATA.savedCars.unshift(car);
  bookingState.carId = car.id; bookingState.showAddCar = false;
  document.getElementById('screen-container').innerHTML = buildBookingScreen();
}
function bkSaveLoc() {
  const l = document.getElementById('bkLL')?.value?.trim();
  const a = document.getElementById('bkLA')?.value?.trim();
  if (!l || !a) return;
  const loc = { id: 'l' + Date.now(), label: l, address: a };
  BAREEQ_DATA.savedLocations.unshift(loc);
  bookingState.locationId = loc.id; bookingState.showAddLocation = false;
  document.getElementById('screen-container').innerHTML = buildBookingScreen();
}

function bkFinish() {
  const st = bookingState;
  const up = BAREEQ_DATA.userPackage;
  const addonsList = BAREEQ_DATA.optional_products || [];
  const packageList = BAREEQ_DATA.packages || [];

  const cars = BAREEQ_DATA.savedCars;
  const selCar = cars && cars.length > 0 ? (cars.find(c => c.id === st.carId) || cars[0]) : null;
  const carType = selCar ? selCar.type : 'sedan';
  const singleWashPrice = BAREEQ_DATA.car_prices ? (BAREEQ_DATA.car_prices[carType] || 45) : 45;

  const isPackageWash = st.serviceType === 'package-wash';
  const isSingleWash = st.serviceType === 'single-wash';
  const buyPkgId = st.serviceType?.startsWith('buy-') ? parseInt(st.serviceType.split('-')[1]) : null;
  const buyPkg = buyPkgId ? packageList.find(p => p.id === buyPkgId) : null;

  const selAddons = addonsList.filter(a => st.selectedAddons.includes(a.id));
  const addonsPrice = selAddons.reduce((sum, a) => sum + a.price, 0);

  let basePrice = 0;
  if (isPackageWash) basePrice = 0;
  else if (isSingleWash) basePrice = singleWashPrice;
  else if (buyPkg) basePrice = buyPkg.price;

  const totalPrice = basePrice + addonsPrice;

  // Map location and car IDs to readable labels for checkout
  const locObj = BAREEQ_DATA.savedLocations.find(l => l.id === st.locationId);
  const carObj = BAREEQ_DATA.savedCars.find(c => c.id === st.carId);

  // Create the actual booking payload
  BAREEQ_DATA.currentBooking = {
    serviceType: st.serviceType,
    service: isPackageWash ? 'غسيل من الباقة' : (isSingleWash ? 'غسيل لمرة واحدة' : `شراء باقة ${buyPkg?.name}`),
    date: st.date,
    time: st.timeSlot,
    car_name: carObj ? carObj.name : '',
    car_type: carType,
    location: locObj ? locObj.label : '',
    normal_price: totalPrice,
    addons: selAddons,
    packageId: buyPkgId
  };

  // If no cost -> Direct confirmation
  if (totalPrice === 0 && isPackageWash) {
    if (up) {
      up.used_washes = (up.used_washes || 0) + 1;
      up.remaining_washes = Math.max(0, up.remaining_washes - 1);
    }
    navigate('scheduler-done');
    return;
  }

  // Navigate to checkout for payment
  navigate('checkout');
}

// ── Confirmation screen after booking ─────
function renderSchedulerDone() {
  const st = bookingState;
  const loc = BAREEQ_DATA.savedLocations.find(l => l.id === st.locationId);
  const orderNum = '#BQ-' + Date.now().toString().slice(-6);

  return `
  <div class="screen animate-in" style="background:var(--teal-dark);min-height:100%;">
    <div class="screen-header" style="background:var(--teal-dark);border:none;">
      <button class="icon-btn invisible"></button>
      <span class="header-title">تأكيد الحجز</span>
      <button class="icon-btn" onclick="navigate('home')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="screen-body" style="align-items:center;padding-top:40px;text-align:center;">

      <div class="check-bounce" style="width:110px;height:110px;border-radius:50%;
           background:rgba(255,255,255,0.1);border:3px solid rgba(255,255,255,0.3);
           display:flex;align-items:center;justify-content:center;margin:0 auto 24px;">
        <div style="width:80px;height:80px;border-radius:50%;background:white;
             display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal-dark)" stroke-width="3.5" width="40" height="40" style="stroke-linecap:round;stroke-linejoin:round;">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      </div>

      <div style="font-size:24px;font-weight:800;color:white;margin-bottom:8px;">تم تأكيد الحجز بنجاح! 🎉</div>
      <div style="font-size:14px;color:rgba(255,255,255,0.8);margin-bottom:30px;">رقم الطلب: <span style="font-weight:700;">${orderNum}</span></div>

      <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);
                  border-radius:24px;padding:24px;width:100%;margin-bottom:20px;text-align:right;">
        <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:4px;">موعدك القادم في:</div>
        <div style="font-size:20px;font-weight:800;color:white;">${st.date}</div>
        <div style="font-size:16px;font-weight:600;color:rgba(255,255,255,0.8);margin-bottom:12px;">${st.timeSlot}</div>
        
        <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:4px;">الموقع:</div>
        <div style="font-size:14px;font-weight:600;color:white;">${loc ? loc.label : ''}</div>
      </div>

      <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:30px;line-height:1.6;">
        سيصلك تأكيد على الواتساب قريباً بصيغة الطلب وموقع الغسيل المختص بك.
      </div>

      <button onclick="navigate('sessions')" class="btn-ripple" style="width:100%;background:white;color:var(--teal-dark);border:none;border-radius:999px;padding:16px;font-size:15px;font-weight:700;font-family:var(--font);margin-bottom:12px;box-shadow:0 6px 20px rgba(0,0,0,0.15);">
        تتبع حالة الطلب
      </button>
      <button onclick="navigate('home')" style="width:100%;background:transparent;color:white;border:1.5px solid rgba(255,255,255,0.3);border-radius:999px;padding:15px;font-size:14px;font-weight:700;font-family:var(--font);">
        العودة للرئيسية
      </button>
    </div>
  </div>`;
}
