// ===========================
// SCREEN: Home — Exact Figma Match
// ===========================
function renderHome() {
  const up = BAREEQ_DATA.userPackage;

  return `
  <div class="screen animate-in" style="background:#0d6b6b;min-height:100%;">

    <!-- TOP BAR -->
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 18px 6px;">
      <button style="background:none;border:none;cursor:pointer;padding:4px;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
        </svg>
      </button>
      <div style="font-size:22px;font-weight:700;color:white;">مرحباً بك</div>
      <div style="width:38px;height:38px;border-radius:50%;overflow:hidden;border:2px solid rgba(255,255,255,0.4);">
        <div style="width:100%;height:100%;background:linear-gradient(135deg,#c77d2a,#e8a842);display:flex;align-items:center;justify-content:center;">
          <img src="assets/images/real_avatar.png" style="width:100%;height:100%;object-fit:cover;object-position:top;" />
        </div>
      </div>
    </div>

    <!-- SUBSCRIBE BANNER -->
    <div style="margin:10px 16px 0;background:rgba(255,255,255,0.12);border-radius:18px;padding:18px 16px 14px;position:relative;overflow:hidden;min-height:110px;">
      <div style="position:absolute;top:-10px;right:-10px;width:130px;height:130px;opacity:0.15;">
        <svg viewBox="0 0 100 100" fill="white">
          ${Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30) * Math.PI / 180;
    const x1 = 50 + 15 * Math.cos(angle), y1 = 50 + 15 * Math.sin(angle);
    const x2 = 50 + 45 * Math.cos(angle), y2 = 50 + 45 * Math.sin(angle);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="3"/>`;
  }).join('')}
          <circle cx="50" cy="50" r="12" fill="white"/>
        </svg>
      </div>
      <div style="position:absolute;left:16px;top:50%;transform:translateY(-50%);width:100px;">
        <div style="font-size:8px;color:rgba(255,255,255,0.8);background:rgba(255,255,255,0.15);border-radius:4px;padding:1px 6px;display:inline-block;margin-bottom:4px;">🚗🚗</div>
      </div>
      <!-- Car image placeholder with orange gradient -->
      <div style="position:absolute;left:20px;top:50%;transform:translateY(-50%);">
        <div style="width:90px;height:60px;border-radius:8px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.3);overflow:hidden;border:1.5px solid rgba(255,255,255,0.2);">
          <img src="assets/images/real_banner_car.png" style="width:100%;height:100%;object-fit:cover;" />
        </div>
      </div>
      <div style="margin-right:116px;">
        <div style="font-size:19px;font-weight:700;color:white;line-height:1.2;">اشتراك بريميوم</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.75);margin:3px 0 10px;">واحصل على خصم<br>يصل لـ 30%</div>
        <button onclick="navigate('store')" style="background:transparent;border:1.5px solid white;color:white;padding:7px 16px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;font-family:var(--font);">اشترك الآن</button>
      </div>
    </div>

    <!-- PAGINATION DOTS -->
    <div style="display:flex;justify-content:center;gap:6px;margin:10px 0 8px;">
      <div style="width:20px;height:5px;border-radius:3px;background:white;"></div>
      <div style="width:8px;height:5px;border-radius:3px;background:rgba(255,255,255,0.3);"></div>
      <div style="width:8px;height:5px;border-radius:3px;background:rgba(255,255,255,0.3);"></div>
    </div>

    <!-- SERVICE AND POINTS SUMMARY -->
    <div style="margin:12px 16px;display:flex;flex-direction:column;gap:14px;">
      
      <!-- Current Service Row -->
      <div style="background:rgba(255,255,255,0.08);border-radius:18px;padding:16px 18px;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:space-between;box-shadow:0 6px 16px rgba(0,0,0,0.15);">
        <div style="display:flex;align-items:center;gap:14px;">
          <!-- Icon Box -->
          <div style="width:52px;height:52px;border-radius:14px;background:rgba(74,222,128,0.15);display:flex;align-items:center;justify-content:center;border:1px solid rgba(74,222,128,0.3);position:relative;flex-shrink:0;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.2" style="stroke-linecap:round;stroke-linejoin:round;">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <!-- Pulsing Dot -->
            <div style="position:absolute;top:-3px;right:-3px;width:14px;height:14px;background:#4ade80;border-radius:50%;border:3px solid #063f44;box-shadow:0 0 8px rgba(74,222,128,0.6);"></div>
          </div>
          <!-- Texts -->
          <div style="display:flex;flex-direction:column;gap:6px;">
            <div style="font-size:15px;font-weight:700;color:white;line-height:1;">جاري الغسيل الآن..</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.65);line-height:1;">سنشعرك فور الانتهاء تماماً</div>
          </div>
        </div>
        <!-- Progress Info -->
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex-shrink:0;">
          <div style="font-size:16px;direction:ltr;font-weight:700;color:#4ade80;font-family:monospace;line-height:1;letter-spacing:0.5px;">00:30:25</div>
          <div style="width:70px;height:6px;background:rgba(255,255,255,0.15);border-radius:4px;overflow:hidden;position:relative;">
            <div style="position:absolute;top:0;right:0;height:100%;width:65%;background:#4ade80;border-radius:4px;box-shadow:0 0 8px rgba(74,222,128,0.8);"></div>
          </div>
        </div>
      </div>

      <!-- Visits & Points Row -->
      <div style="background:rgba(255,255,255,0.08);border-radius:18px;padding:16px 18px;border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:space-between;box-shadow:0 6px 16px rgba(0,0,0,0.15);">
        <div style="display:flex;align-items:center;gap:14px;">
          <!-- F1 Image Box -->
          <div style="width:70px;height:52px;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.25);flex-shrink:0;box-shadow:0 4px 10px rgba(0,0,0,0.3);">
            <img src="assets/images/real_f1_car.png" style="width:100%;height:100%;object-fit:cover;" />
          </div>
          <!-- Texts -->
          <div style="display:flex;flex-direction:column;gap:6px;">
            <div style="font-size:15px;font-weight:700;color:white;line-height:1;">الرصيد المتاح</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.65);line-height:1;">استمتع بمزايا باقتك</div>
          </div>
        </div>
        <!-- Stats -->
        <div style="display:flex;gap:18px;align-items:center;flex-shrink:0;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:5px;">
            <div style="font-size:18px;font-weight:700;color:white;line-height:1;">${up.remaining_washes * 4}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.6);line-height:1;">غسلة</div>
          </div>
          <div style="width:1px;height:24px;background:rgba(255,255,255,0.2);"></div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:5px;">
            <div style="font-size:18px;font-weight:700;color:var(--gold);line-height:1;">1000</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.6);line-height:1;">نقطة</div>
          </div>
        </div>
      </div>

    </div>

    <!-- AUTO-SCROLL PACKAGES SECTION -->
    <div style="margin:8px 16px 4px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <div style="font-size:13px;font-weight:600;color:white;">🎯 باقات الاشتراك</div>
        <div onclick="navigate('store')" style="font-size:11px;color:rgba(255,255,255,0.65);cursor:pointer;">عرض الكل ←</div>
      </div>
      <!-- Auto-scroll track -->
      <div id="pkgScrollTrack" style="overflow-x:auto;padding-bottom:6px;scrollbar-width:none;-webkit-overflow-scrolling:touch;
                  scroll-snap-type:x mandatory;">
        <div id="pkgScrollInner" style="display:flex;gap:14px;width:max-content;padding:4px 2px;">
          ${BAREEQ_DATA.packages.map(p => `
            <div class="circle-item" onclick="navigate('store')" style="flex-shrink:0;scroll-snap-align:start;min-width:76px;">
              <div class="circle circle-lg ${p.circle_class}" style="width:70px;height:70px;font-size:28px;
                          border:2px solid rgba(255,255,255,0.35);
                          box-shadow:0 2px 10px rgba(0,0,0,0.2);transition:transform 0.2s;">
                ${p.icon}
              </div>
              <span style="font-size:10px;color:rgba(255,255,255,0.9);font-weight:600;text-align:center;
                          max-width:72px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.name}</span>
              <span style="font-size:10px;color:rgba(255,255,255,0.6);">${p.price} ر.س</span>
            </div>
          `).join('')}
          <!-- Custom builder shortcut -->
          <div class="circle-item" onclick="navigate('custom-package')" style="flex-shrink:0;scroll-snap-align:start;min-width:76px;">
            <div class="circle circle-lg" style="width:70px;height:70px;background:rgba(255,255,255,0.08);
                        border:2px dashed rgba(255,255,255,0.4);overflow:hidden;">
              <img src="assets/images/real_alloy_wheel.png" style="width:100%;height:100%;object-fit:cover;" />
            </div>
            <span style="font-size:10px;color:rgba(255,255,255,0.9);font-weight:600;text-align:center;max-width:72px;">شكّل باقتك</span>
            <span style="font-size:10px;color:rgba(255,255,255,0.6);">مخصص</span>
          </div>
        </div>
      </div>
    </div>

    <!-- QUICK ACTIONS (4 items row) -->
    <div style="display:flex;justify-content:space-between;padding:16px 20px 24px;">

      <!-- المتجر -->
      <div onclick="switchStoreTab('packages');navigate('store');" style="display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;">
        <div style="width:62px;height:62px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.2s;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
        <div style="font-size:11px;font-weight:600;color:white;">المتجر</div>
      </div>

      <!-- باقاتي -->
      <div onclick="switchStoreTab('wallet');navigate('store');" style="display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;">
        <div style="width:62px;height:62px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.2s;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
            <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/><path d="M2 10h20"/>
          </svg>
        </div>
        <div style="font-size:11px;font-weight:600;color:white;">باقاتي</div>
      </div>

      <!-- تتبع الطلب -->
      <div onclick="switchStoreTab('tracking');navigate('store');" style="display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;">
        <div style="width:62px;height:62px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.2s;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <div style="font-size:11px;font-weight:600;color:white;">تتبع الطلب</div>
      </div>

      <!-- الفروع -->
      <div onclick="navigate('home')" style="display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;">
        <div style="width:62px;height:62px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;transition:all 0.2s;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
        <div style="font-size:11px;font-weight:600;color:white;">الفروع</div>
      </div>

    </div>

  </div>`;
}

// Auto-scroll for packages section on home screen
let _pkgScrollInterval = null;
function initPkgAutoScroll() {
  // Clear any previous interval
  if (_pkgScrollInterval) clearInterval(_pkgScrollInterval);
  
  const track = document.getElementById('pkgScrollTrack');
  if (!track) return;
  const ITEM_WIDTH = 84; // 70px card + 14px gap
  let paused = false;
  let resumeTimer = null;

  // Pause on user touch/scroll
  track.addEventListener('pointerdown', () => { paused = true; clearTimeout(resumeTimer); });
  track.addEventListener('pointerup', () => { resumeTimer = setTimeout(() => { paused = false; }, 3000); });
  track.addEventListener('touchstart', () => { paused = true; clearTimeout(resumeTimer); }, {passive:true});
  track.addEventListener('touchend', () => { resumeTimer = setTimeout(() => { paused = false; }, 3000); });

  _pkgScrollInterval = setInterval(() => {
    if (paused || !document.getElementById('pkgScrollTrack')) { 
      if (!document.getElementById('pkgScrollTrack')) clearInterval(_pkgScrollInterval);
      return; 
    }
    // RTL: scrollLeft is 0 at right edge, negative when scrolled left
    const maxScroll = track.scrollWidth - track.clientWidth;
    const currentScroll = Math.abs(track.scrollLeft);
    
    if (currentScroll >= maxScroll - 10) {
      // Reached the end, reset to start
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Scroll one item to the left (negative in RTL)
      track.scrollBy({ left: -ITEM_WIDTH, behavior: 'smooth' });
    }
  }, 2000);
}
