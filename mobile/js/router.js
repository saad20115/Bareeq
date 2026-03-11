// ===========================
// BAREEQ X — Router
// ===========================

const ROUTES = {
    home: renderHome,
    store: renderStore,
    detail: renderDetail,
    wallet: renderWallet,
    checkout: renderCheckout,
    'checkout-diff': renderCheckoutDiff,
    confirmation: renderConfirmation,
    sessions: renderSessions,
    'custom-package': renderCustomPackage,
    'purchase-success': renderPurchaseSuccess,
    'scheduler': (p) => { startBooking(p || {}); return buildBookingScreen(); },
    'scheduler-done': renderSchedulerDone,
};

let currentScreen = 'home';
let screenParams = {};

function navigate(screen, params = {}) {
    if (!ROUTES[screen]) return;
    currentScreen = screen;
    screenParams = params;

    const container = document.getElementById('screen-container');
    container.innerHTML = ROUTES[screen](params);

    // Post-render: initialize auto-scroll on home screen
    if (screen === 'home') {
        initPkgAutoScroll();
    }

    // Update nav active state
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const navMap = { home: 'home', store: 'store', detail: 'store', wallet: 'wallet', sessions: 'wallet', checkout: 'store', 'checkout-diff': 'store', confirmation: 'store', 'purchase-success': 'store', scheduler: 'store', 'scheduler-done': 'store' };
    const activeNav = navMap[screen] || screen;
    const activeBtn = document.querySelector(`.nav-btn[data-screen="${activeNav}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Scroll to top
    container.scrollTop = 0;

    // Hide bottom navigation on full-screen flows
    const navBar = document.getElementById('bottom-nav');
    if (navBar) {
        const noNavScreens = ['scheduler', 'scheduler-done', 'checkout', 'checkout-diff', 'confirmation', 'purchase-success', 'custom-package', 'detail'];
        if (noNavScreens.includes(screen)) {
            navBar.style.display = 'none';
        } else {
            navBar.style.display = 'flex';
        }
    }
}
