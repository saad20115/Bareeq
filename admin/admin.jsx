const { useState } = React;

// ============================
// DATA
// ============================
const initialPackages = [
    { id: 1, name: 'باقة اللمعان', car_type: 'sedan', car_label: 'سيدان', washes: 4, days: 30, price: 100, original: 140, subscribers: 234, active: true },
    { id: 2, name: 'باقة النظافة', car_type: 'suv', car_label: 'SUV / جيب', washes: 6, days: 60, price: 200, original: 280, subscribers: 156, active: true },
    { id: 3, name: 'الباقة الشاملة', car_type: 'all', car_label: 'جميع الأنواع', washes: 8, days: 60, price: 240, original: 360, subscribers: 89, active: true },
    { id: 4, name: 'باقة برونز', car_type: 'sedan', car_label: 'سيدان', washes: 2, days: 15, price: 60, original: 90, subscribers: 41, active: false },
];

const CAR_TYPES = [
    { value: 'sedan', label: 'سيدان / هاتشباك', icon: '🚗', sub: 'كامري، كورولا، التيما...' },
    { value: 'suv', label: 'SUV / جيب', icon: '🚙', sub: 'لاندكروزر، باترول، مازدا CX...' },
    { value: 'all', label: 'جميع الأنواع', icon: '✅', sub: 'شامل لكل المركبات' },
];

const VALIDITY_OPTIONS = [15, 30, 60, 90];

// ============================
// KPI CARD
// ============================
function KpiCard({ label, value, change, icon, variant }) {
    return (
        <div className={`kpi-card ${variant}`}>
            <div className="kpi-label">{label}</div>
            <div className="kpi-value">{icon} {value}</div>
            {change && <div className="kpi-change up">▲ {change}</div>}
        </div>
    );
}

// ============================
// CREATE PACKAGE MODAL
// ============================
function CreateModal({ onClose, onSave }) {
    const [form, setForm] = useState({
        name: '', car_type: 'sedan', washes: 4, days: 30,
        price: '', original: '', active: true
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const ppu = form.price && form.washes ? Math.round(form.price / form.washes) : '—';
    const savings = form.price && form.original ? Math.round((1 - form.price / form.original) * 100) : 0;

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal">
                {/* Header */}
                <div className="modal-header">
                    <span className="modal-title">إنشاء باقة جديدة</span>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                {/* Steps */}
                <div className="modal-steps">
                    <div className="mstep active">
                        <div className="mstep-num">1</div>
                        <span>المعلومات الأساسية</span>
                    </div>
                    <div className="mstep-line" />
                    <div className="mstep pending">
                        <div className="mstep-num">2</div>
                        <span>التسعير</span>
                    </div>
                    <div className="mstep-line" />
                    <div className="mstep pending">
                        <div className="mstep-num">3</div>
                        <span>المراجعة</span>
                    </div>
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
                                <div style={{ fontSize: '12px', color: 'var(--teal)', fontWeight: 600 }}>
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
                            <span className="form-hint" style={{ color: 'var(--green)', fontWeight: 600 }}>
                                وفر {savings}%
                            </span>
                        )}
                    </div>

                    {/* Status */}
                    <div className="form-group">
                        <label className="form-label">حالة الباقة</label>
                        <div className="toggle-wrap">
                            <div className="toggle" onClick={() => set('active', !form.active)}
                                style={{ background: form.active ? 'var(--green)' : 'var(--gray-light)' }}>
                                <div style={{ position: 'absolute', top: '2px', right: form.active ? '2px' : '22px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: 'right .2s' }}></div>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: form.active ? 'var(--green)' : 'var(--gray)' }}>
                                {form.active ? '🟢 فعالة' : '🔴 موقوفة'}
                            </span>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="form-group form-full">
                        <label className="form-label">معاينة كما ستظهر في التطبيق</label>
                        <div className="preview-card">
                            {savings > 0 && <div className="preview-badge">وفر {savings}%</div>}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                                    {form.car_type === 'sedan' ? '🚗' : form.car_type === 'suv' ? '🚙' : '✅'}
                                </div>
                                <div>
                                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>{form.name || 'اسم الباقة'}</div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', margin: '2px 0' }}>
                                        {CAR_TYPES.find(c => c.value === form.car_type)?.label} • {form.washes} غسلات • {form.days} يوم
                                    </div>
                                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>{form.price || '—'} ر.س</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                                {Array.from({ length: form.washes }, (_, i) =>
                                    <div key={i} style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="form-footer">
                    <button className="btn-cancel" onClick={onClose}>إلغاء</button>
                    <button className="btn-primary" onClick={() => { onSave(form); onClose(); }}>
                        💾 حفظ الباقة
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============================
// PACKAGES PAGE
// ============================
function PackagesPage() {
    const [packages, setPackages] = useState(initialPackages);
    const [showModal, setShowModal] = useState(false);

    const carBadge = (type) => {
        if (type === 'sedan') return <span className="badge badge-teal">🚗 سيدان</span>;
        if (type === 'suv') return <span className="badge badge-purple">🚙 SUV / جيب</span>;
        return <span className="badge badge-green-soft">✅ جميع الأنواع</span>;
    };

    const savePackage = (form) => {
        const newPkg = {
            id: packages.length + 1,
            name: form.name || 'باقة جديدة',
            car_type: form.car_type,
            car_label: CAR_TYPES.find(c => c.value === form.car_type)?.label,
            washes: form.washes,
            days: form.days,
            price: Number(form.price) || 0,
            original: Number(form.original) || 0,
            subscribers: 0,
            active: form.active,
        };
        setPackages(prev => [...prev, newPkg]);
    };

    const toggleActive = (id) => {
        setPackages(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
    };

    const deletePackage = (id) => {
        if (window.confirm('هل تريد حذف هذه الباقة؟')) {
            setPackages(prev => prev.filter(p => p.id !== id));
        }
    };

    const activeCount = packages.filter(p => p.active).length;
    const totalSubs = packages.reduce((s, p) => s + p.subscribers, 0);
    const revenue = packages.reduce((s, p) => s + p.price * p.subscribers, 0);

    return (
        <div>
            <div className="kpi-row">
                <KpiCard variant="teal" icon="📦" label="الباقات النشطة" value={activeCount} change="+2 هذا الشهر" />
                <KpiCard variant="gold" icon="👥" label="إجمالي المشتركين" value={totalSubs.toLocaleString()} change="+24 هذا الشهر" />
                <KpiCard variant="green" icon="💰" label="إيراد الباقات" value={revenue.toLocaleString() + ' ر.س'} change="+12%" />
                <KpiCard variant="blue" icon="🔄" label="معدل التجديد" value="73%" />
            </div>

            <div className="table-card">
                <div className="table-header">
                    <span className="table-title">جميع الباقات ({packages.length})</span>
                    <button className="btn-primary" onClick={() => setShowModal(true)}>
                        + إنشاء باقة جديدة
                    </button>
                </div>
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
                        {packages.map(p => (
                            <tr key={p.id}>
                                <td style={{ fontWeight: 600 }}>{p.name}</td>
                                <td>{carBadge(p.car_type)}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                                        {Array.from({ length: p.washes }, (_, i) =>
                                            <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--teal)', opacity: .7 }} />
                                        )}
                                        <span style={{ fontSize: '12px', color: 'var(--gray)', marginRight: '4px' }}>{p.washes}</span>
                                    </div>
                                </td>
                                <td>{p.days} يوم</td>
                                <td>
                                    <div>
                                        <div style={{ fontWeight: 700, color: 'var(--teal)' }}>{p.price} ر.س</div>
                                        {p.original > 0 && <div style={{ fontSize: '11px', color: 'var(--gray)', textDecoration: 'line-through' }}>{p.original} ر.س</div>}
                                    </div>
                                </td>
                                <td style={{ color: 'var(--gray)', fontSize: '12px' }}>{Math.round(p.price / p.washes)} ر.س</td>
                                <td style={{ fontWeight: 600 }}>{p.subscribers} <span style={{ fontSize: '11px', color: 'var(--gray)' }}>عميل</span></td>
                                <td>
                                    <span className={`badge ${p.active ? 'badge-active' : 'badge-inactive'}`}
                                        onClick={() => toggleActive(p.id)} style={{ cursor: 'pointer' }}>
                                        <span className={`status-dot ${p.active ? 'dot-green' : 'dot-red'}`} />
                                        {p.active ? 'فعالة' : 'موقوفة'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-btns">
                                        <button className="action-btn btn-edit">تعديل</button>
                                        <button className="action-btn btn-del" onClick={() => deletePackage(p.id)}>حذف</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && <CreateModal onClose={() => setShowModal(false)} onSave={savePackage} />}
        </div>
    );
}

// ============================
// SIDEBAR
// ============================
function Sidebar({ active, onNav }) {
    const items = [
        { id: 'dashboard', icon: '🏠', label: 'الرئيسية' },
        { id: 'packages', icon: '📦', label: 'الباقات' },
        { id: 'customers', icon: '👥', label: 'العملاء' },
        { id: 'bookings', icon: '📅', label: 'الحجوزات' },
        { id: 'payments', icon: '💰', label: 'المدفوعات' },
        { id: 'reports', icon: '📊', label: 'التقارير' },
        { id: 'settings', icon: '⚙️', label: 'الإعدادات' },
    ];
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-text">🚗 بريق X</div>
                <div className="logo-sub">لوحة التحكم</div>
            </div>
            <nav className="sidebar-nav">
                {items.map(item => (
                    <button key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`}
                        onClick={() => onNav(item.id)}>
                        <span className="nav-icon">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>
            <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>عبدالرحمن نوح</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>مدير النظام</div>
            </div>
        </div>
    );
}

// ============================
// PLACEHOLDER PAGES
// ============================
function PlaceholderPage({ title, icon }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '16px' }}>
            <div style={{ fontSize: '60px' }}>{icon}</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--dark)' }}>{title}</div>
            <div style={{ fontSize: '14px', color: 'var(--gray)' }}>هذه الصفحة تحت التطوير</div>
        </div>
    );
}

// ============================
// APP ROOT
// ============================
function App() {
    const [page, setPage] = useState('packages');

    const pageMap = {
        packages: { title: 'إدارة الباقات', component: <PackagesPage /> },
        dashboard: { title: 'الرئيسية', component: <PlaceholderPage title="لوحة الإحصائيات" icon="📊" /> },
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
                        <span style={{ fontSize: '13px', color: 'var(--gray)' }}>🕐 {new Date().toLocaleDateString('ar-SA')}</span>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700 }}>ع</div>
                    </div>
                </div>
                <div className="content">
                    {current.component}
                </div>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
