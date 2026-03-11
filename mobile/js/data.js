// ===========================
// BAREEQ X — App Data Layer
// ===========================

const BAREEQ_DATA = {
    packages: [
        {
            id: 1,
            name: 'لمعان بريق',
            subtitle: 'سيدان فقط 🚗',
            car_type: 'sedan',
            car_label: 'سيدان',
            wash_count: 4,
            validity_days: 30,
            price: 100,
            original_price: 140,
            price_per_wash: 25,
            strip_class: 'package-card-strip-gold',
            circle_class: 'circle-gold',
            badge: 'الأكثر مبيعاً',
            badge_class: 'badge-gold',
            features: ['غسيل خارجي شامل', 'تنظيف الإطارات', 'منظف الزجاج'],
            extra_features: ['تنظيف داخلي', 'تلميع'],
            extra_included: [false, false],
            icon: '<img src="assets/images/real_sedan_wash.png" style="width:100%;height:100%;object-fit:cover;" />'
        },
        {
            id: 2,
            name: 'بريق X',
            subtitle: 'جيب / SUV 🚙',
            car_type: 'suv',
            car_label: 'SUV/جيب',
            wash_count: 6,
            validity_days: 60,
            price: 200,
            original_price: 280,
            price_per_wash: 33,
            strip_class: 'package-card-strip-teal',
            circle_class: 'circle-teal-solid',
            badge: null,
            badge_class: '',
            features: ['غسيل خارجي شامل', 'تنظيف الإطارات', 'تلميع خارجي'],
            extra_features: ['تنظيف داخلي', 'تشميع'],
            extra_included: [false, false],
            icon: '<img src="assets/images/real_suv_wash.png" style="width:100%;height:100%;object-fit:cover;" />'
        },
        {
            id: 3,
            name: 'بريق اكسترا',
            subtitle: 'جميع السيارات ✅',
            car_type: 'all',
            car_label: 'جميع الأنواع',
            wash_count: 8,
            validity_days: 60,
            price: 240,
            original_price: 360,
            price_per_wash: 30,
            strip_class: 'package-card-strip-premium',
            circle_class: 'circle-gold',
            badge: 'الأوفر',
            badge_class: 'badge-gold',
            features: ['غسيل خارجي شامل', 'تنظيف داخلي', 'تلميع الجسم', 'تنظيف الإطارات'],
            extra_features: ['تشميع', 'عطرة داخلية'],
            extra_included: [true, true],
            icon: '<img src="assets/images/real_premium_car.png" style="width:100%;height:100%;object-fit:cover;" />'
        },
        {
            id: 4,
            name: 'بريق VIP',
            subtitle: 'تفصيل كامل 👑',
            car_type: 'all',
            car_label: 'جميع الأنواع',
            wash_count: 10,
            validity_days: 90,
            price: 350,
            original_price: 500,
            price_per_wash: 35,
            strip_class: 'package-card-strip-premium',
            circle_class: 'circle-gold',
            badge: 'VIP',
            badge_class: 'badge-gold',
            features: ['غسيل خارجي شامل', 'تنظيف داخلي عميق', 'تلميع الجسم', 'تنظيف الإطارات', 'طلاء سيراميك'],
            extra_features: ['تشميع', 'عطرة داخلية', 'تنظيف المحرك'],
            extra_included: [true, true, true],
            icon: '<img src="assets/images/real_banner_car.png" style="width:100%;height:100%;object-fit:cover;" />'
        },
        {
            id: 5,
            name: 'بريق فاميلي',
            subtitle: 'سيارتين 👨‍👩‍👧‍👦',
            car_type: 'all',
            car_label: 'سيارتين',
            wash_count: 12,
            validity_days: 60,
            price: 400,
            original_price: 560,
            price_per_wash: 33,
            strip_class: 'package-card-strip-teal',
            circle_class: 'circle-teal-solid',
            badge: 'عائلي',
            badge_class: 'badge-gold',
            features: ['غسيل خارجي شامل', 'تنظيف داخلي', 'تلميع الجسم', 'سيارتين بنفس الباقة'],
            extra_features: ['تشميع', 'عطرة داخلية'],
            extra_included: [true, true],
            icon: '<img src="assets/images/real_f1_car.png" style="width:100%;height:100%;object-fit:cover;" />'
        },
        {
            id: 6,
            name: 'بريق فليت',
            subtitle: 'أعمال / 3 سيارات 🏢',
            car_type: 'all',
            car_label: '3 سيارات',
            wash_count: 18,
            validity_days: 90,
            price: 550,
            original_price: 810,
            price_per_wash: 30,
            strip_class: 'package-card-strip-premium',
            circle_class: 'circle-gold',
            badge: 'أعمال',
            badge_class: 'badge-gold',
            features: ['غسيل خارجي شامل', 'تنظيف داخلي عميق', 'تلميع الجسم', '3 سيارات بنفس الباقة', 'أولوية الحجز'],
            extra_features: ['تشميع', 'عطرة داخلية', 'تنظيف المحرك'],
            extra_included: [true, true, true],
            icon: '<img src="assets/images/real_suv_wash.png" style="width:100%;height:100%;object-fit:cover;" />'
        }
    ],

    // User's active package
    userPackage: {
        id: 1,
        package_id: 1,
        package_name: 'لمعان بريق',
        car_type: 'sedan',
        car_label: 'سيدان',
        total_washes: 4,
        used_washes: 1,
        remaining_washes: 3,
        price_per_wash: 25,
        purchased_at: '2026-03-10',
        expires_at: '2026-04-09',
        days_remaining: 30,
    },

    // Car prices by type
    car_prices: {
        sedan: 45,
        suv: 55,
        truck: 65,
    },

    // Sessions list
    sessions: [
        { id: 1, type: 'غسيل خارجي', service: 'سيدان', date: 'الاثنين 10 مارس', time: '10:30 ص', status: 'completed', points: 60, rating: 5, zero_invoice: true },
        { id: 2, type: 'غسيل خارجي', service: 'سيدان', date: 'لم يُجدَل', status: 'pending' },
        { id: 3, type: 'غسيل خارجي', service: 'سيدان', date: 'لم يُجدَل', status: 'pending' },
        { id: 4, type: 'غسيل خارجي', service: 'سيدان', date: 'لم يُجدَل', status: 'pending' },
    ],

    // Booking being made (current)
    currentBooking: {
        service: 'غسيل خارجي - سيدان',
        date: 'الأربعاء 12 مارس',
        time: '11:00 ص',
        car_name: 'كامري XSE 2023 - أبيض',
        car_type: 'sedan',
        location: 'الفرع الرئيسي، الرياض',
        normal_price: 45
    },

    // Mismatched booking
    mismatchBooking: {
        service: 'غسيل خارجي - جيب',
        date: 'الأحد 16 مارس',
        time: '9:00 ص',
        car_name: 'مازدا CX-5 (جيب) - أحمر',
        car_type: 'suv',
        location: 'الفرع الرئيسي، الرياض',
        normal_price: 55,
    },

    // Optional add-on products
    optional_products: [
        { id: 'p1', icon: '<img src="assets/images/real_air_freshener.png" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />', name: 'معطر داخلي', desc: 'عطر سيارة فاخر', price: 15, unit: 'عبوة' },
        { id: 'p2', icon: '<img src="assets/images/real_wipes.png" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />', name: 'مناديل معطرة', desc: 'مناديل مبللة للتنظيف', price: 10, unit: 'علبة' },
        { id: 'p3', icon: '<img src="assets/images/real_microfiber.png" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />', name: 'فوطة ميكروفايبر', desc: 'فوطة تلميع احترافية', price: 20, unit: 'قطعة' },
        { id: 'p4', icon: '<img src="assets/images/real_tire_shine.png" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />', name: 'ملمع إطارات', desc: 'لمعة أسود للإطارات', price: 18, unit: 'علبة' },
        { id: 'p5', icon: '<img src="assets/images/real_car_shampoo.png" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />', name: 'شامبو سيارة', desc: 'شامبو لامع للجسم', price: 22, unit: 'عبوة' },
        { id: 'p6', icon: '<img src="assets/images/real_tree_freshener.png" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />', name: 'معطر شجري', desc: 'معطر خشبي طبيعي', price: 12, unit: 'قطعة' },
    ],

    // Saved cars
    savedCars: [
        { id: 'c1', name: 'كامري XSE 2023', color: 'أبيض', plate: 'أ ب ج 1234', type: 'sedan', icon: '🚗' },
        { id: 'c2', name: 'مازدا CX-5', color: 'أحمر', plate: 'د ه و 5678', type: 'suv', icon: '🚙' },
    ],

    // Saved locations (mobile wash — service comes to you)
    savedLocations: [
        { id: 'l1', label: 'المنزل 🏠', address: 'حي الياسمين، شارع الورود، الرياض' },
        { id: 'l2', label: 'العمل 🏢', address: 'حي العليا، طريق الملك فهد، الرياض' },
    ],

    // Dynamically populated scheduled sessions
    scheduledSessions: [],

    // Tracks last purchased package (set by completePurchase)
    purchasedPackage: null,
};

