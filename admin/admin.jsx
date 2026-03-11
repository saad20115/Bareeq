const { useState, useEffect, useRef } = React;

// ============================
// DATA
// ============================
const initialPackages = [
    { id: 1, name: 'باقة اللمعان', car_type: 'sedan', car_label: 'سيدان', washes: 4, days: 30, price: 100, original: 140, subscribers: 234, active: true, theme: 'gold', image: 'real_sedan_wash.png', badge: 'الأكثر مبيعاً' },
    { id: 2, name: 'باقة النظافة', car_type: 'suv', car_label: 'SUV / جيب', washes: 6, days: 60, price: 200, original: 280, subscribers: 156, active: true, theme: 'teal', image: 'real_suv_wash.png', badge: '' },
    { id: 3, name: 'الباقة الشاملة', car_type: 'family', car_label: 'عائلية', washes: 8, days: 60, price: 240, original: 360, subscribers: 89, active: true, theme: 'premium', image: 'real_premium_car.png', badge: 'الأوفر' },
    { id: 4, name: 'باقة برونز', car_type: 'sedan', car_label: 'سيدان', washes: 2, days: 15, price: 60, original: 90, subscribers: 41, active: false, theme: 'silver', image: 'real_sedan_wash.png', badge: '' },
];

const CAR_TYPES = [
    { value: 'sedan', label: 'سيدان', icon: '🚗', sub: 'كامري، كورولا، التيما...' },
    { value: 'suv', label: 'SUV / جيب', icon: '🚙', sub: 'لاندكروزر، باترول، مازدا CX...' },
    { value: 'family', label: 'عائلية', icon: '🚐', sub: 'إنوفا، بريفيا، ستاريا...' },
];

const VALIDITY_OPTIONS = [15, 30, 60, 90];

const DAY_NAMES = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

const defaultSchedules = [
    {
        id: 1, name: 'الجدول العادي', active: true, isDefault: true,
        days: [
            { dayName: 'الأحد', enabled: true, shifts: [{ from: '08:00', to: '12:00' }, { from: '16:00', to: '22:00' }] },
            { dayName: 'الاثنين', enabled: true, shifts: [{ from: '08:00', to: '12:00' }, { from: '16:00', to: '22:00' }] },
            { dayName: 'الثلاثاء', enabled: true, shifts: [{ from: '08:00', to: '12:00' }, { from: '16:00', to: '22:00' }] },
            { dayName: 'الأربعاء', enabled: true, shifts: [{ from: '08:00', to: '12:00' }, { from: '16:00', to: '22:00' }] },
            { dayName: 'الخميس', enabled: true, shifts: [{ from: '08:00', to: '14:00' }] },
            { dayName: 'الجمعة', enabled: false, shifts: [] },
            { dayName: 'السبت', enabled: true, shifts: [{ from: '10:00', to: '20:00' }] },
        ]
    },
    {
        id: 2, name: 'جدول رمضان', active: false, isDefault: false,
        days: [
            { dayName: 'الأحد', enabled: true, shifts: [{ from: '10:00', to: '15:00' }, { from: '21:00', to: '01:00' }] },
            { dayName: 'الاثنين', enabled: true, shifts: [{ from: '10:00', to: '15:00' }, { from: '21:00', to: '01:00' }] },
            { dayName: 'الثلاثاء', enabled: true, shifts: [{ from: '10:00', to: '15:00' }, { from: '21:00', to: '01:00' }] },
            { dayName: 'الأربعاء', enabled: true, shifts: [{ from: '10:00', to: '15:00' }, { from: '21:00', to: '01:00' }] },
            { dayName: 'الخميس', enabled: true, shifts: [{ from: '10:00', to: '15:00' }, { from: '21:00', to: '02:00' }] },
            { dayName: 'الجمعة', enabled: true, shifts: [{ from: '21:00', to: '02:00' }] },
            { dayName: 'السبت', enabled: true, shifts: [{ from: '10:00', to: '15:00' }, { from: '21:00', to: '01:00' }] },
        ]
    },
];

const initialDrivers = [
    {
        id: 1, name: 'محمد العتيبي', phone: '0551234567', scheduleId: 1,
        status: 'active', maxDailyWashes: 8,
        restDays: ['الجمعة'],
        vacations: []
    },
    {
        id: 2, name: 'خالد الشهري', phone: '0559876543', scheduleId: 1,
        status: 'active', maxDailyWashes: 10,
        restDays: ['الجمعة', 'السبت'],
        vacations: [{ from: '2026-03-15', to: '2026-03-20', reason: 'إجازة سنوية' }]
    },
    {
        id: 3, name: 'عبدالله القحطاني', phone: '0553456789', scheduleId: 1,
        status: 'on-leave', maxDailyWashes: 8,
        restDays: ['الجمعة'],
        vacations: [{ from: '2026-03-10', to: '2026-03-14', reason: 'إجازة مرضية' }]
    },
    {
        id: 4, name: 'فهد الدوسري', phone: '0557654321', scheduleId: 2,
        status: 'active', maxDailyWashes: 12,
        restDays: ['الجمعة'],
        vacations: []
    },
    {
        id: 5, name: 'سعد المطيري', phone: '0552345678', scheduleId: 1,
        status: 'rest', maxDailyWashes: 8,
        restDays: ['الجمعة', 'السبت'],
        vacations: []
    },
];

const THEME_OPTIONS = [
    { value: 'gold', label: 'ذهبي', gradient: 'linear-gradient(105deg, #7a4f00 0%, #d4a017 25%, #f5c518 45%, #fff0a0 55%, #f5c518 65%, #d4a017 80%, #7a4f00 100%)', preview: 'linear-gradient(135deg, #b8860b, #7a4f00)' },
    { value: 'teal', label: 'تركوازي', gradient: 'linear-gradient(90deg, #0b7070, #0d8080, #0b7070)', preview: 'linear-gradient(135deg, #0d8080, #073838)' },
    { value: 'premium', label: 'بريميوم', gradient: 'linear-gradient(90deg, #d45700, #ff8c00, #ff6a00)', preview: 'linear-gradient(135deg, #d45700, #7a2e00)' },
    { value: 'silver', label: 'فضي', gradient: 'linear-gradient(90deg, #64748b, #94a3b8, #64748b)', preview: 'linear-gradient(135deg, #475569, #1e293b)' },
];

const IMAGE_OPTIONS = [
    { value: 'real_sedan_wash.png', label: 'سيدان', icon: '🚗' },
    { value: 'real_suv_wash.png', label: 'SUV / جيب', icon: '🚙' },
    { value: 'real_premium_car.png', label: 'بريميوم', icon: '✨' },
    { value: 'real_banner_car.png', label: 'بانر', icon: '🏎️' },
    { value: 'real_f1_car.png', label: 'رياضي', icon: '🏁' },
    { value: 'real_alloy_wheel.png', label: 'جنوط', icon: '⭕' },
];

// ============================
// TOAST SYSTEM
// ============================
let toastCounter = 0;
function ToastContainer({ toasts, removeToast }) {
    return (
        <div className="toast-container">
            {toasts.map(t => (
                <div key={t.id} className={`toast ${t.type}`}
                    onAnimationEnd={(e) => { if (e.animationName === 'toastOut') removeToast(t.id); }}>
                    {t.icon} {t.message}
                </div>
            ))}
        </div>
    );
}

// ============================
// KPI CARD
// ============================
function KpiCard({ label, value, unit, change, icon, variant }) {
    return (
        <div className={`kpi-card ${variant}`}>
            <div className={`kpi-icon-wrap`}>{icon}</div>
            <div className="kpi-label">{label}</div>
            <div className="kpi-value">
                {value}
                {unit && <span className="kpi-unit">{unit}</span>}
            </div>
            {change && <div className="kpi-change up">▲ {change}</div>}
        </div>
    );
}

// ============================
// PACKAGE FORM MODAL (Create / Edit)
// ============================
function PackageModal({ onClose, onSave, editData }) {
    const isEdit = !!editData;
    const [form, setForm] = useState(editData || {
        name: '', car_type: 'sedan', washes: 4, days: 30,
        price: '', original: '', active: true,
        theme: 'gold', image: 'real_sedan_wash.png', badge: ''
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const ppu = form.price && form.washes ? Math.round(form.price / form.washes) : '—';
    const savings = form.price && form.original ? Math.round((1 - form.price / form.original) * 100) : 0;

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                {/* Header */}
                <div className="modal-header">
                    <span className="modal-title">
                        {isEdit ? '✏️ تعديل الباقة' : '📦 إنشاء باقة جديدة'}
                    </span>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>


                {/* Form */}
                <div className="form-body">
                    {/* Package Name */}
                    <div className="form-group form-full">
                        <label className="form-label">اسم الباقة *</label>
                        <input className="form-input" placeholder="مثال: باقة اللمعان - 4 غسلات"
                            value={form.name} onChange={e => set('name', e.target.value)} />
                        <span className="form-hint">سيظهر هذا الاسم للعملاء في التطبيق</span>
                    </div>

                    {/* Car Type */}
                    <div className="form-group form-full">
                        <label className="form-label">🎯 نوع السيارة المسموح * <span style={{ color: '#ef4444', fontSize: '11px' }}>(مهم — يمنع التلاعب)</span></label>
                        <div className="car-type-cards">
                            {CAR_TYPES.map(ct => (
                                <div key={ct.value} className={`car-type-card ${form.car_type === ct.value ? 'selected' : ''}`}
                                    onClick={() => set('car_type', ct.value)}>
                                    <div className="icon">{ct.icon}</div>
                                    <div className="label">{ct.label}</div>
                                    <div className="sublabel">{ct.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Wash Count */}
                    <div className="form-group">
                        <label className="form-label">عدد الغسلات (الرصيد) *</label>
                        <div className="stepper">
                            <button className="stepper-btn" onClick={() => set('washes', Math.max(1, form.washes - 1))}>−</button>
                            <span className="stepper-val">{form.washes}</span>
                            <button className="stepper-btn" onClick={() => set('washes', Math.min(24, form.washes + 1))}>+</button>
                        </div>
                        <div className="stepper-dots">
                            {Array.from({ length: form.washes }, (_, i) => <div key={i} className="stepper-dot" />)}
                        </div>
                        <span className="form-hint">سيحصل العميل على {form.washes} غسلات</span>
                    </div>

                    {/* Validity */}
                    <div className="form-group">
                        <label className="form-label">مدة الصلاحية *</label>
                        <div className="validity-pills">
                            {VALIDITY_OPTIONS.map(d => (
                                <button key={d} className={`validity-pill ${form.days === d ? 'active' : ''}`}
                                    onClick={() => set('days', d)}>{d} يوم</button>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="form-group">
                        <label className="form-label">سعر الباقة (ر.س) *</label>
                        <input className="form-input" type="number" placeholder="مثال: 100"
                            value={form.price} onChange={e => set('price', e.target.value)} />
                        {form.price > 0 && (
                            <div className="savings-calc">
                                <div style={{ fontSize: '12px', color: 'var(--teal-600)', fontWeight: 600 }}>
                                    سعر الغسلة الواحدة: <strong>{ppu} ر.س</strong>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Original Price */}
                    <div className="form-group">
                        <label className="form-label">السعر قبل الخصم (ر.س)</label>
                        <input className="form-input" type="number" placeholder="مثال: 140"
                            value={form.original} onChange={e => set('original', e.target.value)} />
                        {savings > 0 && (
                            <span className="form-hint" style={{ color: 'var(--green-500)', fontWeight: 600 }}>
                                وفر {savings}%
                            </span>
                        )}
                    </div>

                    {/* Theme Color */}
                    <div className="form-group form-full">
                        <label className="form-label">🎨 لون / ثيم البطاقة *</label>
                        <div className="theme-cards">
                            {THEME_OPTIONS.map(t => (
                                <div key={t.value}
                                    className={`theme-card ${form.theme === t.value ? 'selected' : ''}`}
                                    onClick={() => set('theme', t.value)}>
                                    <div className="theme-swatch" style={{ background: t.gradient }} />
                                    <div className="theme-label">{t.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Package Image */}
                    <div className="form-group form-full">
                        <label className="form-label">🖼️ صورة الباقة</label>
                        <div className="image-cards">
                            {IMAGE_OPTIONS.map(img => (
                                <div key={img.value}
                                    className={`image-card ${form.image === img.value ? 'selected' : ''}`}
                                    onClick={() => set('image', img.value)}>
                                    <img src={`/mobile/assets/images/${img.value}`} alt={img.label}
                                        style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                                    <div className="image-label">{img.icon} {img.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Badge */}
                    <div className="form-group">
                        <label className="form-label">🏷️ شارة / وسم (اختياري)</label>
                        <input className="form-input" placeholder="مثال: الأكثر مبيعاً، VIP، عرض..."
                            value={form.badge || ''} onChange={e => set('badge', e.target.value)} />
                        <span className="form-hint">ستظهر كشارة ذهبية أعلى البطاقة</span>
                    </div>

                    {/* Status */}
                    <div className="form-group">
                        <label className="form-label">حالة الباقة</label>
                        <div className="toggle-wrap">
                            <div className="toggle" onClick={() => set('active', !form.active)}
                                style={{ background: form.active ? 'var(--green-500)' : 'var(--slate-300)' }}>
                                <div style={{ position: 'absolute', top: '3px', right: form.active ? '3px' : '23px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: 'right .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }}></div>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: form.active ? 'var(--green-600)' : 'var(--slate-400)' }}>
                                {form.active ? '🟢 فعالة — ظاهرة للعملاء' : '🔴 موقوفة — مخفية'}
                            </span>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="form-group form-full">
                        <label className="form-label">📱 معاينة كما ستظهر في التطبيق</label>
                        <div style={{ background: 'rgba(15,23,42,0.9)', borderRadius: '20px', padding: '16px', maxWidth: '380px' }}>
                            {/* Card mimics mobile rendering */}
                            <div style={{ background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(255,255,255,0.16)', borderRadius: '18px', overflow: 'hidden' }}>
                                {/* Strip header with theme gradient */}
                                <div style={{ background: THEME_OPTIONS.find(t => t.value === form.theme)?.gradient || THEME_OPTIONS[0].gradient, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {form.badge ? <span style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(0,0,0,0.22)', color: 'white', padding: '3px 10px', borderRadius: '999px' }}>{form.badge}</span> : <span />}
                                    <div style={{ width: '54px', height: '54px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(255,255,255,0.3)' }}>
                                        <img src={`/mobile/assets/images/${form.image || 'real_sedan_wash.png'}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                </div>
                                {/* Card body */}
                                <div style={{ padding: '12px 16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <div>
                                            <div style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>{form.name || 'اسم الباقة'}</div>
                                            <div style={{ marginTop: '4px' }}>
                                                <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', padding: '2px 9px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.18)' }}>
                                                    {CAR_TYPES.find(c => c.value === form.car_type)?.label}
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontSize: '18px', fontWeight: 700, color: '#fbbf24' }}>{form.price || '—'} ر.س</div>
                                            {form.original > 0 && <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>{form.original} ر.س</div>}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>📅 {form.days} يوم</span>
                                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>💧 {form.washes} غسلات</span>
                                        <span style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 600 }}>{ppu} ر.س/غسلة</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '12px' }}>
                                        {Array.from({ length: form.washes }, (_, i) =>
                                            <div key={i} style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>💧</div>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        {savings > 0 && <span style={{ fontSize: '12px', color: '#4ade80', fontWeight: 600 }}>وفّر {savings}%</span>}
                                        <button style={{ background: 'white', color: '#073838', border: 'none', borderRadius: '999px', padding: '9px 20px', fontSize: '12px', fontWeight: 700, cursor: 'default', fontFamily: 'var(--font)' }}>اشترك الآن</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="form-footer">
                    <button className="btn-cancel" onClick={onClose}>إلغاء</button>
                    <button className="btn-primary" onClick={() => { onSave(form); onClose(); }}>
                        {isEdit ? '✏️ حفظ التعديلات' : '💾 حفظ الباقة'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============================
// DASHBOARD PAGE
// ============================
function DashboardPage({ packages }) {
    const activeCount = packages.filter(p => p.active).length;
    const totalSubs = packages.reduce((s, p) => s + p.subscribers, 0);
    const revenue = packages.reduce((s, p) => s + p.price * p.subscribers, 0);

    const barData = [
        { label: 'يناير', value: 65 },
        { label: 'فبراير', value: 45 },
        { label: 'مارس', value: 80 },
        { label: 'أبريل', value: 55 },
        { label: 'مايو', value: 72 },
        { label: 'يونيو', value: 90 },
    ];
    const maxVal = Math.max(...barData.map(d => d.value));

    const activities = [
        { color: 'var(--green-500)', text: 'أحمد محمد اشترك في باقة اللمعان', time: 'منذ 5 دقائق' },
        { color: 'var(--blue-500)', text: 'تم تجديد باقة النظافة لـ سارة العلي', time: 'منذ 20 دقيقة' },
        { color: 'var(--gold-500)', text: 'تم إنشاء باقة جديدة "باقة بلاتينيوم"', time: 'منذ ساعة' },
        { color: 'var(--red-500)', text: 'انتهت صلاحية باقة لـ خالد العتيبي', time: 'منذ 3 ساعات' },
        { color: 'var(--teal-500)', text: 'تم تفعيل باقة برونز مرة أخرى', time: 'منذ 5 ساعات' },
    ];

    const topPackages = [...packages].sort((a, b) => b.subscribers - a.subscribers).slice(0, 3);

    return (
        <div>
            <div className="kpi-row">
                <KpiCard variant="teal" icon="📦" label="الباقات النشطة" value={activeCount} change="+2 هذا الشهر" />
                <KpiCard variant="gold" icon="👥" label="إجمالي المشتركين" value={totalSubs.toLocaleString()} change="+24 هذا الشهر" />
                <KpiCard variant="green" icon="💰" label="إيراد الباقات" value={revenue.toLocaleString()} unit="ر.س" change="+12%" />
                <KpiCard variant="blue" icon="🔄" label="معدل التجديد" value="73%" />
            </div>

            <div className="dash-grid">
                {/* Revenue Chart */}
                <div className="dash-card">
                    <div className="dash-card-title">📊 الاشتراكات الشهرية</div>
                    <div className="mini-bar">
                        {barData.map((d, i) => (
                            <div key={i} className="mini-bar-col"
                                style={{ height: `${(d.value / maxVal) * 100}%` }}
                                title={`${d.label}: ${d.value}`} />
                        ))}
                    </div>
                    <div className="mini-bar-label">
                        {barData.map((d, i) => <span key={i}>{d.label}</span>)}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="dash-card">
                    <div className="dash-card-title">🕐 آخر النشاطات</div>
                    <div className="activity-list">
                        {activities.map((a, i) => (
                            <div key={i} className="activity-item">
                                <div className="activity-dot" style={{ background: a.color }} />
                                <span className="activity-text">{a.text}</span>
                                <span className="activity-time">{a.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Packages */}
                <div className="dash-card dash-card-full">
                    <div className="dash-card-title">🏆 أكثر الباقات اشتراكاً</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        {topPackages.map((p, i) => {
                            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';
                            return (
                                <div key={p.id} style={{
                                    background: 'var(--slate-50)',
                                    borderRadius: 'var(--radius)',
                                    padding: '18px',
                                    border: '1px solid var(--slate-100)',
                                    textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>{medal}</div>
                                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '4px' }}>{p.name}</div>
                                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--teal-600)' }}>{p.subscribers}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--slate-400)' }}>مشترك</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================
// PACKAGES PAGE
// ============================
function PackagesPage({ packages, setPackages, addToast }) {
    const [showModal, setShowModal] = useState(false);
    const [editPkg, setEditPkg] = useState(null);
    const [search, setSearch] = useState('');

    const carBadge = (type) => {
        if (type === 'sedan') return <span className="badge badge-teal">🚗 سيدان</span>;
        if (type === 'suv') return <span className="badge badge-purple">🚙 SUV / جيب</span>;
        return <span className="badge badge-green-soft">✅ جميع الأنواع</span>;
    };

    const savePackage = (form) => {
        if (editPkg) {
            // Edit existing
            setPackages(prev => prev.map(p => p.id === editPkg.id ? {
                ...p,
                name: form.name || p.name,
                car_type: form.car_type,
                car_label: CAR_TYPES.find(c => c.value === form.car_type)?.label,
                washes: form.washes,
                days: form.days,
                price: Number(form.price) || p.price,
                original: Number(form.original) || p.original,
                active: form.active,
                theme: form.theme || 'gold',
                image: form.image || 'real_sedan_wash.png',
                badge: form.badge || '',
            } : p));
            addToast('success', '✅', `تم تعديل "${form.name}" بنجاح`);
        } else {
            // Create new
            const newPkg = {
                id: Date.now(),
                name: form.name || 'باقة جديدة',
                car_type: form.car_type,
                car_label: CAR_TYPES.find(c => c.value === form.car_type)?.label,
                washes: form.washes,
                days: form.days,
                price: Number(form.price) || 0,
                original: Number(form.original) || 0,
                subscribers: 0,
                active: form.active,
                theme: form.theme || 'gold',
                image: form.image || 'real_sedan_wash.png',
                badge: form.badge || '',
            };
            setPackages(prev => [...prev, newPkg]);
            addToast('success', '✅', `تم إنشاء "${form.name}" بنجاح`);
        }
        setEditPkg(null);
    };

    const toggleActive = (id) => {
        setPackages(prev => prev.map(p => {
            if (p.id === id) {
                const next = !p.active;
                addToast(next ? 'success' : 'info', next ? '🟢' : '🔴', `${p.name}: ${next ? 'تم التفعيل' : 'تم الإيقاف'}`);
                return { ...p, active: next };
            }
            return p;
        }));
    };

    const deletePackage = (id) => {
        const pkg = packages.find(p => p.id === id);
        if (window.confirm(`هل تريد حذف "${pkg?.name}"؟`)) {
            setPackages(prev => prev.filter(p => p.id !== id));
            addToast('error', '🗑️', `تم حذف "${pkg?.name}"`);
        }
    };

    const openEdit = (pkg) => {
        setEditPkg(pkg);
        setShowModal(true);
    };

    const filtered = packages.filter(p =>
        !search || p.name.includes(search) || p.car_label.includes(search)
    );

    const activeCount = packages.filter(p => p.active).length;
    const totalSubs = packages.reduce((s, p) => s + p.subscribers, 0);
    const revenue = packages.reduce((s, p) => s + p.price * p.subscribers, 0);

    return (
        <div>
            <div className="kpi-row">
                <KpiCard variant="teal" icon="📦" label="الباقات النشطة" value={activeCount} change="+2 هذا الشهر" />
                <KpiCard variant="gold" icon="👥" label="إجمالي المشتركين" value={totalSubs.toLocaleString()} change="+24 هذا الشهر" />
                <KpiCard variant="green" icon="💰" label="إيراد الباقات" value={revenue.toLocaleString()} unit="ر.س" change="+12%" />
                <KpiCard variant="blue" icon="🔄" label="معدل التجديد" value="73%" />
            </div>

            <div className="table-card">
                <div className="table-header">
                    <div className="table-title">
                        جميع الباقات <span className="count-badge">{filtered.length}</span>
                    </div>
                    <div className="table-search">
                        <div className="search-wrap">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                            </svg>
                            <input className="search-input" placeholder="ابحث عن باقة..."
                                value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <button className="btn-primary" onClick={() => { setEditPkg(null); setShowModal(true); }}>
                        + إنشاء باقة جديدة
                    </button>
                </div>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>اسم الباقة</th>
                                <th>نوع السيارة</th>
                                <th>الغسلات</th>
                                <th>المدة</th>
                                <th>السعر</th>
                                <th>سعر/غسلة</th>
                                <th>المشتركون</th>
                                <th>الحالة</th>
                                <th>إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p.id}>
                                    <td style={{ fontWeight: 700, color: 'var(--slate-800)' }}>{p.name}</td>
                                    <td>{carBadge(p.car_type)}</td>
                                    <td>
                                        <div className="wash-dots">
                                            {Array.from({ length: Math.min(p.washes, 8) }, (_, i) =>
                                                <div key={i} className="wash-dot-sm" />
                                            )}
                                            <span className="wash-count">{p.washes}</span>
                                        </div>
                                    </td>
                                    <td>{p.days} يوم</td>
                                    <td>
                                        <div>
                                            <div className="price-main">{p.price} ر.س</div>
                                            {p.original > 0 && <div className="price-original">{p.original} ر.س</div>}
                                        </div>
                                    </td>
                                    <td className="price-per-wash">{Math.round(p.price / p.washes)} ر.س</td>
                                    <td>
                                        <span style={{ fontWeight: 700, color: 'var(--slate-800)' }}>{p.subscribers}</span>
                                        <span style={{ fontSize: '11px', color: 'var(--slate-400)', marginRight: '4px' }}>عميل</span>
                                    </td>
                                    <td>
                                        <span className={`badge ${p.active ? 'badge-active' : 'badge-inactive'}`}
                                            onClick={() => toggleActive(p.id)} style={{ cursor: 'pointer' }}>
                                            <span className={`status-dot ${p.active ? 'dot-green' : 'dot-red'}`} />
                                            {p.active ? 'فعالة' : 'موقوفة'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="action-btn btn-edit" onClick={() => openEdit(p)}>✏️ تعديل</button>
                                            <button className="action-btn btn-del" onClick={() => deletePackage(p.id)}>🗑️ حذف</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--slate-400)' }}>
                        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
                        <div style={{ fontSize: '14px' }}>لا توجد نتائج مطابقة</div>
                    </div>
                )}
            </div>

            {showModal && (
                <PackageModal
                    onClose={() => { setShowModal(false); setEditPkg(null); }}
                    onSave={savePackage}
                    editData={editPkg ? {
                        name: editPkg.name,
                        car_type: editPkg.car_type,
                        washes: editPkg.washes,
                        days: editPkg.days,
                        price: editPkg.price,
                        original: editPkg.original,
                        active: editPkg.active,
                        theme: editPkg.theme || 'gold',
                        image: editPkg.image || 'real_sedan_wash.png',
                        badge: editPkg.badge || '',
                    } : null}
                />
            )}
        </div>
    );
}

// ============================
// CAR TYPES MANAGEMENT PAGE
// ============================
const defaultCarTypes = [
    { id: 1, value: 'sedan', label: 'سيدان', icon: '🚗', desc: 'كامري، كورولا، إلنترا، التيما...', price: 45, active: true },
    { id: 2, value: 'suv', label: 'SUV / جيب', icon: '🚙', desc: 'لاندكروزر، باترول، مازدا CX...', price: 55, active: true },
    { id: 3, value: 'family', label: 'عائلية', icon: '🚐', desc: 'إنوفا، بريفيا، ستاريا، كرنفال...', price: 50, active: true },
    { id: 4, value: 'van', label: 'فان', icon: '🚌', desc: 'هايس، إيسوزو ميكروباص...', price: 65, active: false },
    { id: 5, value: 'truck', label: 'شاحنة', icon: '🛻', desc: 'هايلوكس، تاكوما، رانجر...', price: 70, active: false },
    { id: 6, value: 'luxury', label: 'فاخرة', icon: '🏎️', desc: 'مرسيدس S، BMW 7، لكزس LS...', price: 85, active: false },
];

function CarTypesPage({ addToast }) {
    const [types, setTypes] = useState(defaultCarTypes);
    const [showModal, setShowModal] = useState(false);
    const [editType, setEditType] = useState(null);
    const [form, setForm] = useState({ label: '', icon: '', desc: '', price: '', active: true });

    const openAdd = () => { setEditType(null); setForm({ label: '', icon: '🚗', desc: '', price: '', active: true }); setShowModal(true); };
    const openEdit = (ct) => { setEditType(ct); setForm({ ...ct }); setShowModal(true); };

    const save = () => {
        if (!form.label || !form.price) return;
        if (editType) {
            setTypes(prev => prev.map(t => t.id === editType.id ? { ...t, ...form } : t));
            addToast('success', '✅', `تم تحديث "${form.label}"`);
        } else {
            const newId = Math.max(...types.map(t => t.id), 0) + 1;
            setTypes(prev => [...prev, { ...form, id: newId, value: form.label.toLowerCase().replace(/\s/g, '_') }]);
            addToast('success', '✅', `تم إضافة "${form.label}"`);
        }
        setShowModal(false);
    };

    const deleteType = (id) => {
        const ct = types.find(t => t.id === id);
        setTypes(prev => prev.filter(t => t.id !== id));
        addToast('error', '🗑️', `تم حذف "${ct?.label}"`);
    };

    const toggleType = (id) => {
        setTypes(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));
        const ct = types.find(t => t.id === id);
        addToast('info', 'ℹ️', `${ct?.label}: ${ct?.active ? 'تم الإيقاف' : 'تم التفعيل'}`);
    };

    const activeCount = types.filter(t => t.active).length;

    return (
        <div>
            <div className="section-header">
                <div>
                    <div className="table-count">🚗 أنواع السيارات <span className="table-count-num">{types.length}</span></div>
                    <div style={{ fontSize: '13px', color: 'var(--slate-400)', marginTop: '4px' }}>{activeCount} نوع مفعّل من أصل {types.length}</div>
                </div>
            </div>

            <div className="car-type-grid">
                {types.map(ct => (
                    <div key={ct.id} className="car-type-manage-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="icon-circle" style={{ background: ct.active ? 'var(--teal-50)' : 'var(--slate-50)' }}>{ct.icon}</div>
                            <div>
                                <div className="ct-name">{ct.label}</div>
                                <span className={`badge ${ct.active ? 'badge-active' : 'badge-inactive'}`} style={{ fontSize: '10px' }}>
                                    <span className={`status-dot ${ct.active ? 'dot-green' : 'dot-red'}`} />
                                    {ct.active ? 'مفعّل' : 'معطّل'}
                                </span>
                            </div>
                        </div>
                        <div className="ct-desc">{ct.desc}</div>
                        <div className="ct-price">💰 {ct.price} ر.س / غسلة</div>
                        <div className="ct-actions">
                            <button className="action-btn btn-edit" onClick={() => openEdit(ct)}>✏️ تعديل</button>
                            <button className="action-btn btn-del" onClick={() => toggleType(ct.id)}>
                                {ct.active ? '⏸️ إيقاف' : '▶️ تفعيل'}
                            </button>
                            <button className="action-btn btn-del" onClick={() => deleteType(ct.id)}>🗑️</button>
                        </div>
                    </div>
                ))}
                <div className="add-car-type-card" onClick={openAdd}>
                    <div className="plus-icon">+</div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>إضافة نوع جديد</div>
                    <div style={{ fontSize: '11px' }}>فان، شاحنة، فاخرة...</div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
                    <div className="mini-modal">
                        <div className="modal-header">
                            <span className="modal-title">{editType ? '✏️ تعديل نوع السيارة' : '🚗 إضافة نوع جديد'}</span>
                            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <div className="form-body">
                            <div className="form-group">
                                <label className="form-label">اسم النوع *</label>
                                <input className="form-input" placeholder="مثال: فان" value={form.label}
                                    onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">أيقونة (إيموجي)</label>
                                <input className="form-input" placeholder="🚗" value={form.icon} style={{ fontSize: '24px', textAlign: 'center' }}
                                    onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">وصف مختصر</label>
                                <input className="form-input" placeholder="أمثلة: هايس، إيسوزو..."
                                    value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">سعر الغسلة (ر.س) *</label>
                                <input className="form-input" type="number" placeholder="مثال: 55"
                                    value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} />
                            </div>
                        </div>
                        <div className="form-footer">
                            <button className="btn-cancel" onClick={() => setShowModal(false)}>إلغاء</button>
                            <button className="btn-primary" onClick={save}>{editType ? '✏️ حفظ التعديلات' : '💾 حفظ'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================
// WORKING HOURS SCHEDULE MODAL
// ============================
function ScheduleModal({ onClose, onSave, editData }) {
    const isEdit = !!editData;
    const makeDays = () => DAY_NAMES.map(d => ({ dayName: d, enabled: true, shifts: [{ from: '08:00', to: '17:00' }] }));
    const [form, setForm] = useState(editData || { name: '', active: true, isDefault: false, days: makeDays() });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const toggleDay = (idx) => {
        setForm(f => {
            const days = [...f.days];
            days[idx] = { ...days[idx], enabled: !days[idx].enabled };
            return { ...f, days };
        });
    };

    const updateShift = (dayIdx, shiftIdx, field, value) => {
        setForm(f => {
            const days = [...f.days];
            const shifts = [...days[dayIdx].shifts];
            shifts[shiftIdx] = { ...shifts[shiftIdx], [field]: value };
            days[dayIdx] = { ...days[dayIdx], shifts };
            return { ...f, days };
        });
    };

    const addShift = (dayIdx) => {
        setForm(f => {
            const days = [...f.days];
            const shifts = [...days[dayIdx].shifts, { from: '12:00', to: '18:00' }];
            days[dayIdx] = { ...days[dayIdx], shifts };
            return { ...f, days };
        });
    };

    const removeShift = (dayIdx, shiftIdx) => {
        setForm(f => {
            const days = [...f.days];
            const shifts = days[dayIdx].shifts.filter((_, i) => i !== shiftIdx);
            days[dayIdx] = { ...days[dayIdx], shifts };
            return { ...f, days };
        });
    };

    const copyToAll = (dayIdx) => {
        setForm(f => {
            const source = f.days[dayIdx];
            const days = f.days.map((d, i) => i === dayIdx ? d : { ...d, enabled: source.enabled, shifts: source.shifts.map(s => ({ ...s })) });
            return { ...f, days };
        });
    };

    const fmtTime = (t) => {
        if (!t) return '';
        const [h, m] = t.split(':').map(Number);
        const p = h >= 12 ? 'م' : 'ص';
        const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
        return `${h12}:${String(m).padStart(2, '0')} ${p}`;
    };

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal" style={{ maxWidth: '840px' }}>
                <div className="modal-header">
                    <span className="modal-title">
                        {isEdit ? '✏️ تعديل الجدول' : '🕐 إنشاء جدول عمل جديد'}
                    </span>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="form-body" style={{ gridTemplateColumns: '1fr' }}>
                    {/* Schedule Name */}
                    <div className="form-group">
                        <label className="form-label">اسم الجدول *</label>
                        <input className="form-input" placeholder="مثال: الجدول العادي، جدول رمضان..."
                            value={form.name} onChange={e => set('name', e.target.value)} />
                    </div>

                    {/* Status & Default */}
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div className="toggle-wrap">
                            <div className="toggle" onClick={() => set('active', !form.active)}
                                style={{ background: form.active ? 'var(--green-500)' : 'var(--slate-300)' }}>
                                <div style={{ position: 'absolute', top: '3px', right: form.active ? '3px' : '23px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: 'right .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }}></div>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: form.active ? 'var(--green-600)' : 'var(--slate-400)' }}>
                                {form.active ? '🟢 الجدول فعال' : '🔴 الجدول موقوف'}
                            </span>
                        </div>
                    </div>

                    {/* Days Grid */}
                    <div className="form-group">
                        <label className="form-label">🗓️ أيام وفترات العمل</label>
                        <div className="wh-days-grid">
                            {form.days.map((day, di) => (
                                <div key={di} className={`wh-day-row ${day.enabled ? '' : 'wh-day-disabled'}`}>
                                    <div className="wh-day-header">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div className="wh-day-toggle" onClick={() => toggleDay(di)}
                                                style={{ background: day.enabled ? 'var(--green-500)' : 'var(--slate-300)' }}>
                                                <div style={{ position: 'absolute', top: '2px', right: day.enabled ? '2px' : '16px', width: '14px', height: '14px', background: 'white', borderRadius: '50%', transition: 'right .2s' }}></div>
                                            </div>
                                            <span className="wh-day-name">{day.dayName}</span>
                                            {!day.enabled && <span className="wh-closed-label">مغلق</span>}
                                        </div>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            {day.enabled && (
                                                <React.Fragment>
                                                    <button className="wh-action-btn wh-copy-btn" onClick={() => copyToAll(di)} title="نسخ لكل الأيام">📋 نسخ للكل</button>
                                                    <button className="wh-action-btn wh-add-shift-btn" onClick={() => addShift(di)}>+ فترة</button>
                                                </React.Fragment>
                                            )}
                                        </div>
                                    </div>
                                    {day.enabled && (
                                        <div className="wh-shifts-list">
                                            {day.shifts.map((shift, si) => (
                                                <div key={si} className="wh-shift-row">
                                                    <div className="wh-shift-badge">
                                                        {si === 0 ? '☀️' : si === 1 ? '🌙' : '⏰'}
                                                        <span>فترة {si + 1}</span>
                                                    </div>
                                                    <div className="wh-shift-times">
                                                        <div className="wh-time-field">
                                                            <label>من</label>
                                                            <input type="time" value={shift.from}
                                                                onChange={e => updateShift(di, si, 'from', e.target.value)} />
                                                            <span className="wh-time-preview">{fmtTime(shift.from)}</span>
                                                        </div>
                                                        <span className="wh-time-arrow">←</span>
                                                        <div className="wh-time-field">
                                                            <label>إلى</label>
                                                            <input type="time" value={shift.to}
                                                                onChange={e => updateShift(di, si, 'to', e.target.value)} />
                                                            <span className="wh-time-preview">{fmtTime(shift.to)}</span>
                                                        </div>
                                                    </div>
                                                    {day.shifts.length > 1 && (
                                                        <button className="wh-remove-shift" onClick={() => removeShift(di, si)} title="حذف الفترة">✕</button>
                                                    )}
                                                </div>
                                            ))}
                                            {day.shifts.length === 0 && (
                                                <div style={{ textAlign: 'center', padding: '12px', color: 'var(--slate-400)', fontSize: '13px' }}>
                                                    لا توجد فترات — اضغط "+ فترة" لإضافة وقت عمل
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="form-footer">
                    <button className="btn-cancel" onClick={onClose}>إلغاء</button>
                    <button className="btn-primary" onClick={() => { onSave(form); onClose(); }}>
                        {isEdit ? '✏️ حفظ التعديلات' : '💾 حفظ الجدول'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============================
// DRIVER MODAL
// ============================
function DriverModal({ onClose, onSave, editData, schedules }) {
    const isEdit = !!editData;
    const [form, setForm] = useState(editData || {
        name: '', phone: '', scheduleId: schedules[0]?.id || 1,
        status: 'active', maxDailyWashes: 8,
        restDays: ['الجمعة'],
        vacations: []
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const toggleRestDay = (day) => {
        setForm(f => {
            const rd = f.restDays.includes(day) ? f.restDays.filter(d => d !== day) : [...f.restDays, day];
            return { ...f, restDays: rd };
        });
    };

    const addVacation = () => {
        setForm(f => ({ ...f, vacations: [...f.vacations, { from: '', to: '', reason: '' }] }));
    };

    const updateVacation = (idx, field, value) => {
        setForm(f => {
            const vacs = [...f.vacations];
            vacs[idx] = { ...vacs[idx], [field]: value };
            return { ...f, vacations: vacs };
        });
    };

    const removeVacation = (idx) => {
        setForm(f => ({ ...f, vacations: f.vacations.filter((_, i) => i !== idx) }));
    };

    const STATUS_OPTIONS = [
        { value: 'active', label: '🟢 نشط', color: 'var(--green-500)' },
        { value: 'on-leave', label: '🟡 إجازة', color: 'var(--gold-500)' },
        { value: 'rest', label: '🔵 راحة', color: 'var(--blue-500)' },
    ];

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal" style={{ maxWidth: '720px' }}>
                <div className="modal-header">
                    <span className="modal-title">
                        {isEdit ? '✏️ تعديل مندوب' : '👤 إضافة مندوب جديد'}
                    </span>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="form-body">
                    {/* Name */}
                    <div className="form-group">
                        <label className="form-label">اسم المندوب *</label>
                        <input className="form-input" placeholder="مثال: محمد العتيبي"
                            value={form.name} onChange={e => set('name', e.target.value)} />
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <label className="form-label">رقم الجوال</label>
                        <input className="form-input" placeholder="05xxxxxxxx" dir="ltr"
                            value={form.phone} onChange={e => set('phone', e.target.value)} />
                    </div>

                    {/* Schedule */}
                    <div className="form-group">
                        <label className="form-label">جدول العمل المرتبط *</label>
                        <select className="form-input" value={form.scheduleId}
                            onChange={e => set('scheduleId', Number(e.target.value))}>
                            {schedules.map(s => (
                                <option key={s.id} value={s.id}>{s.name} {s.isDefault ? '(افتراضي)' : ''}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div className="form-group">
                        <label className="form-label">الحالة</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {STATUS_OPTIONS.map(opt => (
                                <button key={opt.value}
                                    className={`drv-status-pill ${form.status === opt.value ? 'drv-status-active' : ''}`}
                                    style={form.status === opt.value ? { borderColor: opt.color, background: opt.color + '15' } : {}}
                                    onClick={() => set('status', opt.value)}>
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Max Daily Washes */}
                    <div className="form-group">
                        <label className="form-label">السعة اليومية القصوى (غسلات)</label>
                        <div className="stepper">
                            <button className="stepper-btn" onClick={() => set('maxDailyWashes', Math.max(1, form.maxDailyWashes - 1))}>−</button>
                            <span className="stepper-val">{form.maxDailyWashes}</span>
                            <button className="stepper-btn" onClick={() => set('maxDailyWashes', Math.min(30, form.maxDailyWashes + 1))}>+</button>
                        </div>
                        <span className="form-hint">الحد الأقصى لعدد الغسلات التي يمكن للمندوب تنفيذها يومياً</span>
                    </div>

                    {/* Rest Days */}
                    <div className="form-group form-full">
                        <label className="form-label">🛌 أيام الراحة الأسبوعية</label>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {DAY_NAMES.map(day => (
                                <button key={day}
                                    className={`drv-day-chip ${form.restDays.includes(day) ? 'drv-day-rest' : ''}`}
                                    onClick={() => toggleRestDay(day)}>
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Vacations */}
                    <div className="form-group form-full">
                        <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>🏖️ الإجازات</span>
                            <button className="wh-action-btn wh-add-shift-btn" onClick={addVacation}>+ إجازة</button>
                        </label>
                        {form.vacations.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '16px', color: 'var(--slate-400)', fontSize: '13px', background: 'var(--slate-50)', borderRadius: '10px' }}>
                                لا توجد إجازات مسجلة
                            </div>
                        )}
                        {form.vacations.map((vac, vi) => (
                            <div key={vi} className="drv-vacation-row">
                                <div className="drv-vacation-dates">
                                    <div className="wh-time-field">
                                        <label>من</label>
                                        <input type="date" value={vac.from}
                                            onChange={e => updateVacation(vi, 'from', e.target.value)} />
                                    </div>
                                    <div className="wh-time-field">
                                        <label>إلى</label>
                                        <input type="date" value={vac.to}
                                            onChange={e => updateVacation(vi, 'to', e.target.value)} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <input className="form-input" placeholder="السبب (اختياري)" style={{ flex: 1, padding: '8px 12px', fontSize: '12px' }}
                                        value={vac.reason} onChange={e => updateVacation(vi, 'reason', e.target.value)} />
                                    <button className="wh-remove-shift" onClick={() => removeVacation(vi)}>✕</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-footer">
                    <button className="btn-cancel" onClick={onClose}>إلغاء</button>
                    <button className="btn-primary" onClick={() => { onSave(form); onClose(); }}>
                        {isEdit ? '✏️ حفظ التعديلات' : '💾 حفظ المندوب'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============================
// WORKING HOURS PAGE (Schedules Only)
// ============================
function WorkingHoursPage({ schedules, setSchedules, addToast }) {
    const [showModal, setShowModal] = useState(false);
    const [editSch, setEditSch] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    const fmtTime = (t) => {
        if (!t) return '';
        const [h, m] = t.split(':').map(Number);
        const p = h >= 12 ? 'م' : 'ص';
        const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
        return `${h12}:${String(m).padStart(2, '0')} ${p}`;
    };

    // ── Schedule helpers ──
    const saveSchedule = (form) => {
        if (editSch) {
            setSchedules(prev => prev.map(s => s.id === editSch.id ? { ...s, ...form } : s));
            addToast('success', '✅', `تم تعديل "${form.name}" بنجاح`);
        } else {
            setSchedules(prev => [...prev, { ...form, id: Date.now() }]);
            addToast('success', '✅', `تم إنشاء جدول "${form.name}" بنجاح`);
        }
        setEditSch(null);
    };

    const deleteSchedule = (id) => {
        const sch = schedules.find(s => s.id === id);
        if (sch?.isDefault) { addToast('error', '⚠️', 'لا يمكن حذف الجدول الافتراضي'); return; }
        if (window.confirm(`هل تريد حذف جدول "${sch?.name}"؟`)) {
            setSchedules(prev => prev.filter(s => s.id !== id));
            addToast('error', '🗑️', `تم حذف "${sch?.name}"`);
        }
    };

    const toggleSchActive = (id) => {
        setSchedules(prev => prev.map(s => {
            if (s.id === id) { const n = !s.active; addToast(n ? 'success' : 'info', n ? '🟢' : '🔴', `${s.name}: ${n ? 'تم التفعيل' : 'تم الإيقاف'}`); return { ...s, active: n }; }
            return s;
        }));
    };

    const setDefault = (id) => {
        setSchedules(prev => prev.map(s => ({ ...s, isDefault: s.id === id, active: s.id === id ? true : s.active })));
        addToast('success', '⭐', `"${schedules.find(s => s.id === id)?.name}" هو الجدول الافتراضي الآن`);
    };

    const duplicateSchedule = (sch) => {
        setSchedules(prev => [...prev, { ...sch, id: Date.now(), name: sch.name + ' (نسخة)', isDefault: false, days: sch.days.map(d => ({ ...d, shifts: d.shifts.map(s => ({ ...s })) })) }]);
        addToast('success', '📋', `تم نسخ "${sch.name}"`);
    };

    // ── Stats ──
    const activeSchCount = schedules.filter(s => s.active).length;
    const defaultSch = schedules.find(s => s.isDefault);
    const totalShifts = schedules.reduce((sum, s) => sum + s.days.reduce((ds, d) => ds + (d.enabled ? d.shifts.length : 0), 0), 0);
    const workingDays = defaultSch ? defaultSch.days.filter(d => d.enabled).length : 0;

    return (
        <div>
                    <div className="kpi-row">
                        <KpiCard variant="teal" icon="📅" label="جداول العمل" value={schedules.length} />
                        <KpiCard variant="gold" icon="✅" label="جداول نشطة" value={activeSchCount} />
                        <KpiCard variant="green" icon="🗓️" label="أيام العمل (الافتراضي)" value={`${workingDays}/7`} />
                        <KpiCard variant="blue" icon="⏰" label="إجمالي الفترات" value={totalShifts} />
                    </div>

                    <div className="wh-schedules-header">
                        <div className="table-title">جداول العمل <span className="count-badge">{schedules.length}</span></div>
                        <button className="btn-primary" onClick={() => { setEditSch(null); setShowModal(true); }}>+ إنشاء جدول جديد</button>
                    </div>

                    <div className="wh-schedules-grid">
                        {schedules.map(sch => (
                            <div key={sch.id} className={`wh-schedule-card ${sch.isDefault ? 'wh-default' : ''} ${!sch.active ? 'wh-inactive' : ''}`}>
                                <div className="wh-card-header">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                        <div className="wh-card-icon">{sch.isDefault ? '⭐' : '🕐'}</div>
                                        <div>
                                            <div className="wh-card-name">{sch.name}</div>
                                            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                                                {sch.isDefault && <span className="badge badge-green-soft" style={{ fontSize: '10px', padding: '2px 8px' }}>الافتراضي</span>}
                                                <span className={`badge ${sch.active ? 'badge-active' : 'badge-inactive'}`}
                                                    onClick={() => toggleSchActive(sch.id)} style={{ cursor: 'pointer', fontSize: '10px', padding: '2px 8px' }}>
                                                    <span className={`status-dot ${sch.active ? 'dot-green' : 'dot-red'}`} />
                                                    {sch.active ? 'فعال' : 'موقوف'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wh-card-actions">
                                        {!sch.isDefault && <button className="action-btn btn-edit" onClick={() => setDefault(sch.id)} title="تعيين كافتراضي">⭐</button>}
                                        <button className="action-btn btn-edit" onClick={() => duplicateSchedule(sch)} title="نسخ">📋</button>
                                        <button className="action-btn btn-edit" onClick={() => { setEditSch(sch); setShowModal(true); }}>✏️</button>
                                        <button className="action-btn btn-del" onClick={() => deleteSchedule(sch.id)}>🗑️</button>
                                    </div>
                                </div>
                                <div className="wh-mini-week">
                                    {sch.days.map((day, di) => (
                                        <div key={di} className={`wh-mini-day ${day.enabled ? 'wh-mini-open' : 'wh-mini-closed'}`}
                                            title={day.enabled ? `${day.dayName}: ${day.shifts.map(s => `${fmtTime(s.from)} - ${fmtTime(s.to)}`).join(' | ')}` : `${day.dayName}: مغلق`}>
                                            <div className="wh-mini-day-name">{day.dayName.slice(0, 3)}</div>
                                            {day.enabled ? (
                                                <div className="wh-mini-day-shifts">{day.shifts.map((s, si) => <div key={si} className="wh-mini-shift-bar" />)}</div>
                                            ) : <div className="wh-mini-closed-x">✕</div>}
                                        </div>
                                    ))}
                                </div>
                                <button className="wh-expand-btn" onClick={() => setExpandedId(expandedId === sch.id ? null : sch.id)}>
                                    {expandedId === sch.id ? '▲ إخفاء التفاصيل' : '▼ عرض التفاصيل'}
                                </button>
                                {expandedId === sch.id && (
                                    <div className="wh-detail-grid">
                                        {sch.days.map((day, di) => (
                                            <div key={di} className={`wh-detail-day ${day.enabled ? '' : 'wh-detail-closed'}`}>
                                                <div className="wh-detail-day-name"><span>{day.enabled ? '🟢' : '🔴'}</span><span>{day.dayName}</span></div>
                                                {day.enabled ? (
                                                    <div className="wh-detail-shifts">
                                                        {day.shifts.map((s, si) => (
                                                            <div key={si} className="wh-detail-shift">
                                                                <span className="wh-detail-shift-icon">{si === 0 ? '☀️' : '🌙'}</span>
                                                                <span>{fmtTime(s.from)}</span><span className="wh-detail-arrow">←</span><span>{fmtTime(s.to)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : <span className="wh-detail-closed-text">مغلق</span>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {showModal && (
                        <ScheduleModal
                            onClose={() => { setShowModal(false); setEditSch(null); }}
                            onSave={saveSchedule}
                            editData={editSch ? { name: editSch.name, active: editSch.active, isDefault: editSch.isDefault, days: editSch.days.map(d => ({ ...d, shifts: d.shifts.map(s => ({ ...s })) })) } : null}
                        />
                    )}

        </div>
    );
}

// ============================
// DRIVERS PAGE (Standalone)
// ============================
function DriversPage({ drivers, setDrivers, schedules, addToast }) {
    const [showDriverModal, setShowDriverModal] = useState(false);
    const [editDriver, setEditDriver] = useState(null);
    const DRIVERS_PER_CAR = 2;

    const saveDriver = (form) => {
        if (editDriver) { setDrivers(prev => prev.map(d => d.id === editDriver.id ? { ...d, ...form } : d)); addToast('success', '✅', `تم تعديل بيانات "${form.name}"`); }
        else { setDrivers(prev => [...prev, { ...form, id: Date.now() }]); addToast('success', '✅', `تم إضافة المندوب "${form.name}"`); }
        setEditDriver(null);
    };
    const deleteDriver = (id) => { const drv = drivers.find(d => d.id === id); if (window.confirm(`هل تريد حذف المندوب "${drv?.name}"؟`)) { setDrivers(prev => prev.filter(d => d.id !== id)); addToast('error', '🗑️', `تم حذف "${drv?.name}"`); } };
    const toggleDriverStatus = (id) => { setDrivers(prev => prev.map(d => { if (d.id === id) { const next = d.status === 'active' ? 'rest' : 'active'; addToast('info', next === 'active' ? '🟢' : '🔵', `${d.name}: ${next === 'active' ? 'نشط' : 'راحة'}`); return { ...d, status: next }; } return d; })); };

    const today = new Date();
    const todayAr = DAY_NAMES[today.getDay()];
    const isOnVacation = (drv) => { const now = today.toISOString().slice(0, 10); return drv.vacations.some(v => v.from <= now && v.to >= now); };
    const isRestDay = (drv) => drv.restDays.includes(todayAr);
    const getDriverStatus = (drv) => { if (isOnVacation(drv)) return 'on-leave'; if (isRestDay(drv)) return 'rest'; return drv.status; };

    const availableDrivers = drivers.filter(d => getDriverStatus(d) === 'active');
    const onLeaveDrivers = drivers.filter(d => getDriverStatus(d) === 'on-leave');
    const onRestDrivers = drivers.filter(d => getDriverStatus(d) === 'rest');
    const totalWashCapacity = availableDrivers.reduce((s, d) => s + d.maxDailyWashes, 0);
    const availableCars = Math.floor(availableDrivers.length / DRIVERS_PER_CAR);
    const maxCapacity = drivers.reduce((s, d) => s + d.maxDailyWashes, 0);
    const capacityPct = maxCapacity > 0 ? Math.round((totalWashCapacity / maxCapacity) * 100) : 0;
    const capacityColor = capacityPct >= 70 ? 'var(--green-500)' : capacityPct >= 40 ? 'var(--gold-500)' : 'var(--red-500)';
    const statusBadge = (status) => { if (status === 'active') return <span className="badge badge-active"><span className="status-dot dot-green" /> نشط</span>; if (status === 'on-leave') return <span className="badge" style={{ background: '#fefce8', color: '#b45309', border: '1px solid #fde68a' }}>🟡 إجازة</span>; return <span className="badge badge-teal">🔵 راحة</span>; };
    const getScheduleName = (id) => schedules.find(s => s.id === id)?.name || '—';

    return (
        <div>
            <div className="kpi-row">
                <KpiCard variant="green" icon="✅" label="مناديب متاحين" value={availableDrivers.length} />
                <KpiCard variant="gold" icon="🏖️" label="في إجازة" value={onLeaveDrivers.length} />
                <KpiCard variant="blue" icon="🛌" label="يوم راحة" value={onRestDrivers.length} />
                <KpiCard variant="teal" icon="🚗" label="سيارات متاحة" value={availableCars} />
            </div>
            <div className="drv-capacity-card">
                <div className="drv-capacity-header">
                    <div>
                        <div className="drv-cap-title">⚡ السعة التشغيلية — {todayAr}</div>
                        <div className="drv-cap-subtitle">{availableDrivers.length} مندوب متاح = {availableCars} سيارة (كل سيارة {DRIVERS_PER_CAR} مناديب) | {totalWashCapacity} غسلة ممكنة</div>
                    </div>
                    <div className="drv-cap-pct" style={{ color: capacityColor }}>{capacityPct}%</div>
                </div>
                <div className="drv-capacity-bar"><div className="drv-capacity-fill" style={{ width: `${capacityPct}%`, background: capacityColor }} /></div>
                <div className="drv-capacity-legend">
                    <span>🟢 متاح: {availableDrivers.length}</span><span>🟡 إجازة: {onLeaveDrivers.length}</span>
                    <span>🔵 راحة: {onRestDrivers.length}</span><span>🚗 سيارات: {availableCars}</span>
                </div>
            </div>
            <div className="table-card">
                <div className="table-header">
                    <div className="table-title">المناديب <span className="count-badge">{drivers.length}</span></div>
                    <button className="btn-primary" onClick={() => { setEditDriver(null); setShowDriverModal(true); }}>+ إضافة مندوب</button>
                </div>
                <div className="table-wrap">
                    <table>
                        <thead><tr><th>المندوب</th><th>الجوال</th><th>جدول العمل</th><th>أيام الراحة</th><th>السعة اليومية</th><th>الحالة اليوم</th><th>إجازات قادمة</th><th>إجراءات</th></tr></thead>
                        <tbody>
                            {drivers.map(drv => {
                                const realStatus = getDriverStatus(drv);
                                const nextVac = drv.vacations.find(v => v.to >= today.toISOString().slice(0, 10));
                                return (
                                    <tr key={drv.id}>
                                        <td style={{ fontWeight: 700, color: 'var(--slate-800)' }}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="drv-avatar">{drv.name.charAt(0)}</div>{drv.name}</div></td>
                                        <td style={{ direction: 'ltr', textAlign: 'right' }}>{drv.phone}</td>
                                        <td><span className="badge badge-teal">{getScheduleName(drv.scheduleId)}</span></td>
                                        <td><div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>{drv.restDays.map(d => <span key={d} className="drv-rest-chip">{d.slice(0, 3)}</span>)}</div></td>
                                        <td><span style={{ fontWeight: 700 }}>{drv.maxDailyWashes}</span> <span style={{ fontSize: '11px', color: 'var(--slate-400)' }}>غسلة</span></td>
                                        <td>{statusBadge(realStatus)}</td>
                                        <td>{nextVac ? (<div style={{ fontSize: '11px' }}><div style={{ color: 'var(--slate-700)', fontWeight: 600 }}>{nextVac.reason || 'إجازة'}</div><div style={{ color: 'var(--slate-400)' }}>{nextVac.from} → {nextVac.to}</div></div>) : <span style={{ color: 'var(--slate-300)', fontSize: '12px' }}>—</span>}</td>
                                        <td><div className="action-btns"><button className="action-btn btn-edit" onClick={() => { setEditDriver(drv); setShowDriverModal(true); }}>✏️</button><button className="action-btn btn-edit" onClick={() => toggleDriverStatus(drv.id)} title="تبديل الحالة">{realStatus === 'active' ? '🛌' : '🟢'}</button><button className="action-btn btn-del" onClick={() => deleteDriver(drv.id)}>🗑️</button></div></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {showDriverModal && (
                <DriverModal onClose={() => { setShowDriverModal(false); setEditDriver(null); }} onSave={saveDriver} schedules={schedules}
                    editData={editDriver ? { ...editDriver, vacations: editDriver.vacations.map(v => ({ ...v })), restDays: [...editDriver.restDays] } : null} />
            )}
        </div>
    );
}

// ============================
// SIDEBAR
// ============================
function Sidebar({ active, onNav }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const items = [
        { id: 'dashboard', icon: '🏠', label: 'الرئيسية' },
        { id: 'packages', icon: '📦', label: 'الباقات' },
        { id: 'working-hours', icon: '🕐', label: 'مواعيد العمل' },
        { id: 'drivers', icon: '🚗', label: 'المناديب' },
        { id: 'carTypes', icon: '🚙', label: 'أنواع السيارات' },
        { id: 'customers', icon: '👥', label: 'العملاء' },
        { id: 'bookings', icon: '📅', label: 'الحجوزات' },
        { id: 'payments', icon: '💰', label: 'المدفوعات' },
        { id: 'reports', icon: '📊', label: 'التقارير' },
        { id: 'settings', icon: '⚙️', label: 'الإعدادات' },
    ];

    const handleNav = (id) => {
        onNav(id);
        setMobileOpen(false);
    };

    return (
        <React.Fragment>
            {/* Hamburger Toggle */}
            <button className="sidebar-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? '✕' : '☰'}
            </button>

            {/* Overlay */}
            {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

            <div className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-logo">
                    <div className="logo-text">بريق X</div>
                    <div className="logo-sub">لوحة التحكم</div>
                </div>
                <nav className="sidebar-nav">
                    {items.map(item => (
                        <button key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`}
                            onClick={() => handleNav(item.id)}>
                            <span className="nav-icon">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <div className="sidebar-footer-name">عبدالرحمن نوح</div>
                    <div className="sidebar-footer-role">مدير النظام</div>
                </div>
            </div>
        </React.Fragment>
    );
}

// ============================
// PLACEHOLDER PAGES
// ============================
function PlaceholderPage({ title, icon }) {
    return (
        <div className="placeholder-page">
            <div className="placeholder-icon">{icon}</div>
            <div className="placeholder-title">{title}</div>
            <div className="placeholder-sub">هذه الصفحة تحت التطوير</div>
        </div>
    );
}

// ============================
// APP ROOT
// ============================
function App() {
    const [page, setPage] = useState('packages');
    const [packages, setPackages] = useState(initialPackages);
    const [schedules, setSchedules] = useState(defaultSchedules);
    const [drivers, setDrivers] = useState(initialDrivers);
    const [toasts, setToasts] = useState([]);

    const addToast = (type, icon, message) => {
        const id = ++toastCounter;
        setToasts(prev => [...prev, { id, type, icon, message }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2600);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const pageMap = {
        dashboard: { title: 'الرئيسية', component: <DashboardPage packages={packages} /> },
        packages: { title: 'إدارة الباقات', component: <PackagesPage packages={packages} setPackages={setPackages} addToast={addToast} /> },
        'working-hours': { title: 'مواعيد العمل', component: <WorkingHoursPage schedules={schedules} setSchedules={setSchedules} addToast={addToast} /> },
        drivers: { title: 'إدارة المناديب', component: <DriversPage drivers={drivers} setDrivers={setDrivers} schedules={schedules} addToast={addToast} /> },
        carTypes: { title: 'أنواع السيارات', component: <CarTypesPage addToast={addToast} /> },
        customers: { title: 'العملاء', component: <PlaceholderPage title="إدارة العملاء" icon="👥" /> },
        bookings: { title: 'الحجوزات', component: <PlaceholderPage title="الحجوزات" icon="📅" /> },
        payments: { title: 'المدفوعات', component: <PlaceholderPage title="المدفوعات" icon="💰" /> },
        reports: { title: 'التقارير', component: <PlaceholderPage title="التقارير" icon="📈" /> },
        settings: { title: 'الإعدادات', component: <PlaceholderPage title="الإعدادات" icon="⚙️" /> },
    };

    const current = pageMap[page] || pageMap.packages;

    return (
        <div className="layout">
            <Sidebar active={page} onNav={setPage} />
            <div className="main">
                <div className="topbar">
                    <div className="topbar-title">{current.title}</div>
                    <div className="topbar-actions">
                        <span className="topbar-date">🕐 {new Date().toLocaleDateString('ar-SA')}</span>
                        <div className="topbar-avatar">ع</div>
                    </div>
                </div>
                <div className="content">
                    {current.component}
                </div>
            </div>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
