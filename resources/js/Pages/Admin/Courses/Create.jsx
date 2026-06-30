import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const ICON_LIST = [
    'ri-home-line','ri-building-line','ri-building-2-line','ri-store-line',
    'ri-briefcase-line','ri-briefcase-4-line','ri-suitcase-line',
    'ri-graduation-cap-line','ri-book-2-line','ri-book-open-line','ri-book-3-line',
    'ri-lightbulb-line','ri-lightbulb-flash-line',
    'ri-award-line','ri-medal-line','ri-trophy-line','ri-vip-crown-line',
    'ri-star-line','ri-star-fill','ri-heart-line','ri-fire-line',
    'ri-user-line','ri-user-star-line','ri-group-line','ri-team-line',
    'ri-money-rupee-circle-line','ri-wallet-3-line','ri-bank-card-line','ri-funds-line',
    'ri-bar-chart-box-line','ri-pie-chart-line','ri-line-chart-line','ri-bubble-chart-line',
    'ri-time-line','ri-calendar-line','ri-calendar-check-line','ri-timer-line',
    'ri-global-line','ri-earth-line','ri-map-pin-line','ri-compass-line',
    'ri-rocket-line','ri-rocket-2-line','ri-speed-line','ri-flashlight-line',
    'ri-shield-check-line','ri-shield-keyhole-line','ri-lock-line','ri-key-line',
    'ri-settings-3-line','ri-tools-line','ri-hammer-line','ri-cpu-line',
    'ri-code-line','ri-terminal-box-line','ri-database-2-line','ri-cloud-line',
    'ri-search-eye-line','ri-search-line','ri-focus-3-line','ri-scan-line',
    'ri-share-line','ri-share-forward-line','ri-links-line','ri-link',
    'ri-chat-1-line','ri-message-2-line','ri-discuss-line','ri-questionnaire-line',
    'ri-mail-line','ri-mail-send-line','ri-inbox-line','ri-send-plane-line',
    'ri-phone-line','ri-smartphone-line','ri-tablet-line','ri-computer-line',
    'ri-video-line','ri-camera-line','ri-image-line','ri-gallery-line',
    'ri-file-text-line','ri-file-pdf-line','ri-file-chart-line','ri-article-line',
    'ri-newspaper-line','ri-draft-line','ri-sticky-note-line','ri-clipboard-line',
    'ri-checkbox-circle-line','ri-check-double-line','ri-check-line','ri-close-circle-line',
    'ri-add-circle-line','ri-subtract-line','ri-arrow-up-line','ri-arrow-right-line',
    'ri-thumb-up-line','ri-emotion-happy-line','ri-flag-line','ri-bookmark-line',
    'ri-price-tag-3-line','ri-coupon-line','ri-shopping-cart-line','ri-gift-line',
    'ri-truck-line','ri-flight-takeoff-line','ri-hospital-line','ri-heart-pulse-line',
    'ri-plant-line','ri-leaf-line','ri-sun-line','ri-moon-line',
    'ri-paint-brush-line','ri-palette-line','ri-magic-line','ri-pen-nib-line',
    'ri-eye-line','ri-fingerprint-line','ri-hand-heart-line','ri-pie-chart-box-line',
    'ri-pulse-line','ri-activity-line','ri-donut-chart-line','ri-box-3-line',
];

const IconPicker = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const filtered = ICON_LIST.filter(i => i.includes(search.toLowerCase()));

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <div className="icon-picker-trigger" onClick={() => setOpen(!open)}>
                <div className={`icon-preview ${value ? '' : 'empty'}`}>
                    <i className={value || 'ri-add-line'}></i>
                </div>
                <span className={`icon-label ${value ? '' : 'placeholder'}`}>
                    {value || 'Choose an icon'}
                </span>
                <i className={`ri-arrow-${open ? 'up' : 'down'}-s-line`} style={{ color: 'var(--text-muted)', fontSize: 16 }}></i>
            </div>
            {open && (
                <div className="icon-picker-dropdown">
                    <div className="icon-picker-search">
                        <input type="text" placeholder="Search icons..." value={search} onChange={e => setSearch(e.target.value)} autoFocus />
                    </div>
                    <div className="icon-picker-grid">
                        {filtered.length > 0 ? filtered.map(icon => (
                            <button type="button" key={icon} title={icon}
                                className={`icon-picker-item ${value === icon ? 'active' : ''}`}
                                onClick={() => { onChange(icon); setOpen(false); setSearch(''); }}>
                                <i className={icon}></i>
                            </button>
                        )) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 24, color: 'var(--text-muted)', fontSize: 13 }}>No icons match</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const SectionCard = ({ icon, title, desc, children, noPad }) => (
    <div className="create-section-card">
        <div className="card-header" style={{ padding: '18px 24px' }}>
            <div className="d-flex align-items-center gap-3">
                <div className="section-icon-badge">
                    <i className={icon}></i>
                </div>
                <div>
                    <h4 className="card-title" style={{ fontSize: 15, margin: 0 }}>{title}</h4>
                    {desc && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{desc}</span>}
                </div>
            </div>
        </div>
        <div className="card-body" style={noPad ? { padding: 0 } : { padding: 24 }}>{children}</div>
    </div>
);

const Field = ({ icon, label, required, hint, children }) => (
    <div style={{ marginBottom: 22 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 7 }}>
            {icon && <i className={icon} style={{ fontSize: 15, color: 'var(--text-muted)' }}></i>}
            {label}{required && <span style={{ color: 'var(--danger)', marginLeft: 2 }}>*</span>}
        </label>
        {children}
        {hint && <span style={{ display: 'block', marginTop: 4, fontSize: 11, color: 'var(--text-muted)' }}>{hint}</span>}
    </div>
);

const ListEditor = ({ title, icon, items, onChange, placeholder, emptyIcon, emptyText }) => (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-app)', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 7 }}>
                <i className={icon} style={{ color: 'var(--text-muted)' }}></i>{title}
            </span>
            <button type="button" onClick={() => onChange([...(items || []), ''])}
                style={{ background: 'var(--accent-yellow, #fdc72f)', color: 'var(--primary-color)', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                <i className="ri-add-line"></i>Add
            </button>
        </div>
        <div style={{ padding: 14 }}>
            {items && items.length > 0 ? items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: i < items.length - 1 ? 8 : 0 }}>
                    <span style={{ width: 24, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>{i + 1}</span>
                    <input type="text" className="form-control" value={item} placeholder={placeholder}
                        onChange={(e) => { const n = [...items]; n[i] = e.target.value; onChange(n); }} />
                    <button type="button" onClick={() => { const n = [...items]; n.splice(i, 1); onChange(n); }}
                        className="apt-btn apt-btn-delete" style={{ flexShrink: 0 }}><i className="ri-close-line"></i></button>
                </div>
            )) : (
                <div style={{ textAlign: 'center', padding: '24px 12px', color: 'var(--text-muted)' }}>
                    <i className={emptyIcon || 'ri-inbox-line'} style={{ fontSize: 28, display: 'block', marginBottom: 6, opacity: 0.5 }}></i>
                    <span style={{ fontSize: 12 }}>{emptyText || 'No items yet'}</span>
                </div>
            )}
        </div>
    </div>
);

const CardItemEditor = ({ title, icon, items, onChange, hasIcon }) => {
    const add = () => onChange([...(items || []), { title: '', desc: '', icon: '', number: '', label: '' }]);
    const update = (i, f, v) => { const n = [...items]; n[i] = { ...n[i], [f]: v }; onChange(n); };
    const remove = (i) => { const n = [...items]; n.splice(i, 1); onChange(n); };

    return (
        <div className="highlight-editor">
            <div className="highlight-editor-header">
                <span className="editor-title">
                    <i className={icon}></i>{title}
                    {items && items.length > 0 && <span className="editor-count">{items.length}</span>}
                </span>
                <button type="button" onClick={add} className="editor-add-btn">
                    <i className="ri-add-line"></i>Add
                </button>
            </div>
            <div className="highlight-editor-body">
                {items && items.length > 0 ? items.map((item, i) => (
                    <div key={i} className="highlight-item">
                        <div className="highlight-item-header">
                            <span className="highlight-item-number">{title === 'Statistics' ? `Stat ${i + 1}` : `Item ${i + 1}`}</span>
                            <button type="button" onClick={() => remove(i)} className="highlight-item-remove">
                                <i className="ri-delete-bin-line"></i>
                            </button>
                        </div>
                        <div className={`highlight-item-fields ${title === 'Statistics' ? 'stats-grid' : 'feature-grid'}`}>
                            {title === 'Statistics' ? (
                                <>
                                    <input type="text" className="form-control" value={item.number || ''} placeholder="Value (e.g. 2 Yrs)"
                                        onChange={(e) => update(i, 'number', e.target.value)} />
                                    <input type="text" className="form-control" value={item.label || ''} placeholder="Label (e.g. Duration)"
                                        onChange={(e) => update(i, 'label', e.target.value)} />
                                </>
                            ) : (
                                <>
                                    <input type="text" className="form-control" value={item.title || ''} placeholder="Title"
                                        onChange={(e) => update(i, 'title', e.target.value)} />
                                    <input type="text" className="form-control" value={item.desc || ''} placeholder="Description"
                                        onChange={(e) => update(i, 'desc', e.target.value)} style={{ marginTop: 8 }} />
                                </>
                            )}
                        </div>
                        {hasIcon && (
                            <div style={{ marginTop: 10 }}>
                                <IconPicker value={item.icon || ''} onChange={(v) => update(i, 'icon', v)} />
                            </div>
                        )}
                    </div>
                )) : (
                    <div className="highlight-editor-empty">
                        <i className={icon}></i>
                        <span>Click "Add" to create your first item</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function Create({ programs }) {
    const { data, setData, post, processing, errors } = useForm({
        program_id: '', name: '', slug: '', short_desc: '', description: '',
        thumbnail: '', banner_image: '', stats: [], competencies: [], advantages: [],
        eligibility: [], entrance_test: [], placements: [], brochure_file: '',
        university_name: '', university_logo: '', duration: '', sort_order: 0, is_active: true,
    });

    const handleSubmit = (e) => { e.preventDefault(); post(`${window.AppAssetUrl || '/'}admin/courses`); };

    return (
        <AdminLayout title="Create Course">
            <Head title="Create Course" />

            <div className="apt-header">
                <div className="apt-header-info">
                    <h2>Create Course</h2>
                    <p>Add a new specialized course to a program.</p>
                </div>
                <Link href={route("admin.courses.index")} className="btn-secondary">
                    <i className="ri-arrow-left-line"></i> Back
                </Link>
            </div>

            <form onSubmit={handleSubmit}>

                {/* Basic Info */}
                <SectionCard icon="ri-information-line" title="Basic Information" desc="Course identity and description">
                    <div className="row">
                        <div className="col-md-6">
                            <Field icon="ri-folder-3-line" label="Parent Program" required>
                                <select className={`form-select ${errors.program_id ? 'is-invalid' : ''}`}
                                    value={data.program_id} onChange={e => setData('program_id', e.target.value)} required>
                                    <option value="">Select a Program</option>
                                    {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                                {errors.program_id && <div className="invalid-feedback">{errors.program_id}</div>}
                            </Field>
                        </div>
                        <div className="col-md-6">
                            <Field icon="ri-book-2-line" label="Course Name" required>
                                <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    value={data.name} onChange={e => setData('name', e.target.value)} placeholder="e.g. MBA in Digital Marketing" required />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </Field>
                        </div>
                        <div className="col-md-6">
                            <Field icon="ri-link" label="URL Slug" hint="Leave empty to auto-generate from name">
                                <input type="text" className="form-control" value={data.slug}
                                    onChange={e => setData('slug', e.target.value)} placeholder="e.g. mba-digital-marketing" />
                            </Field>
                        </div>
                        <div className="col-md-6">
                            <Field icon="ri-timer-line" label="Duration">
                                <input type="text" className="form-control" value={data.duration}
                                    onChange={e => setData('duration', e.target.value)} placeholder="e.g. 2 Years" />
                            </Field>
                        </div>
                        <div className="col-md-12">
                            <Field icon="ri-file-text-line" label="Short Description" hint="Shown in course cards and previews">
                                <textarea className="form-control" rows="2" value={data.short_desc}
                                    onChange={e => setData('short_desc', e.target.value)} placeholder="A brief 1-2 line summary..."></textarea>
                            </Field>
                        </div>
                        <div className="col-md-12">
                            <Field icon="ri-article-line" label="Full Description">
                                <textarea className="form-control" rows="5" value={data.description}
                                    onChange={e => setData('description', e.target.value)} placeholder="Detailed course description with program highlights..."></textarea>
                            </Field>
                        </div>
                    </div>
                </SectionCard>

                {/* Highlights */}
                <SectionCard icon="ri-star-line" title="Course Highlights" desc="Key stats, competencies, and advantages displayed on the course page">
                    <div style={{ marginBottom: 20 }}>
                        <CardItemEditor title="Statistics" icon="ri-bar-chart-box-line" hasIcon
                            items={data.stats} onChange={(val) => setData('stats', val)} />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <CardItemEditor title="Core Competencies" icon="ri-lightbulb-line" hasIcon
                            items={data.competencies} onChange={(val) => setData('competencies', val)} />
                    </div>
                    <div>
                        <CardItemEditor title="Advantages" icon="ri-award-line" hasIcon
                            items={data.advantages} onChange={(val) => setData('advantages', val)} />
                    </div>
                </SectionCard>

                {/* Admissions */}
                <SectionCard icon="ri-graduation-cap-line" title="Admissions & Placements" desc="Eligibility criteria, entrance tests, and placement information">
                    <div className="row">
                        <div className="col-md-6" style={{ marginBottom: 20 }}>
                            <ListEditor title="Eligibility" icon="ri-checkbox-circle-line"
                                items={data.eligibility} onChange={(val) => setData('eligibility', val)}
                                placeholder="e.g. Any UG degree with 50% marks"
                                emptyIcon="ri-shield-check-line" emptyText="Add eligibility criteria" />
                        </div>
                        <div className="col-md-6" style={{ marginBottom: 20 }}>
                            <ListEditor title="Entrance Test" icon="ri-edit-2-line"
                                items={data.entrance_test} onChange={(val) => setData('entrance_test', val)}
                                placeholder="e.g. General English (25 marks)"
                                emptyIcon="ri-file-list-line" emptyText="Add test details" />
                        </div>
                        <div className="col-md-6">
                            <ListEditor title="Placements" icon="ri-briefcase-line"
                                items={data.placements} onChange={(val) => setData('placements', val)}
                                placeholder="e.g. 100% placement assistance"
                                emptyIcon="ri-briefcase-4-line" emptyText="Add placement info" />
                        </div>
                    </div>
                </SectionCard>

                {/* University & Media */}
                <SectionCard icon="ri-building-2-line" title="University & Media" desc="Affiliation and file uploads">
                    <div className="row">
                        <div className="col-md-6">
                            <Field icon="ri-building-line" label="University Name">
                                <input type="text" className="form-control" value={data.university_name}
                                    onChange={e => setData('university_name', e.target.value)} placeholder="e.g. Alagappa University" />
                            </Field>
                        </div>
                        <div className="col-md-6">
                            <Field icon="ri-image-2-line" label="University Logo">
                                <input type="file" className="form-control" accept="image/*"
                                    onChange={e => setData('university_logo', e.target.files[0])} />
                            </Field>
                        </div>
                        <div className="col-md-6">
                            <Field icon="ri-camera-line" label="Course Thumbnail" hint="Recommended: 800×450px">
                                <input type="file" className="form-control" accept="image/*"
                                    onChange={e => setData('thumbnail', e.target.files[0])} />
                            </Field>
                        </div>
                        <div className="col-md-6">
                            <Field icon="ri-image-line" label="Banner Background" hint="Recommended: 1920×600px">
                                <input type="file" className="form-control" accept="image/*"
                                    onChange={e => setData('banner_image', e.target.files[0])} />
                            </Field>
                        </div>
                        <div className="col-md-6">
                            <Field icon="ri-file-pdf-2-line" label="Brochure PDF">
                                <input type="file" className="form-control" accept=".pdf,.doc,.docx"
                                    onChange={e => setData('brochure_file', e.target.files[0])} />
                            </Field>
                        </div>
                    </div>
                </SectionCard>

                {/* Settings */}
                <SectionCard icon="ri-settings-4-line" title="Publishing" desc="Control visibility and display order">
                    <div className="row">
                        <div className="col-md-6">
                            <Field icon="ri-sort-asc" label="Sort Order" hint="Lower numbers appear first">
                                <input type="number" className="form-control" value={data.sort_order}
                                    onChange={e => setData('sort_order', e.target.value)} />
                            </Field>
                        </div>
                        <div className="col-md-6">
                            <Field icon="ri-eye-line" label="Visibility">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
                                    <label className="form-check form-switch" style={{ marginBottom: 0 }}>
                                        <input className="form-check-input" type="checkbox" checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)} />
                                        <span className="form-check-label">{data.is_active ? 'Published' : 'Draft'}</span>
                                    </label>
                                    <span className={`badge ${data.is_active ? 'bg-success' : 'bg-warning'}`}>
                                        {data.is_active ? 'Live' : 'Hidden'}
                                    </span>
                                </div>
                            </Field>
                        </div>
                    </div>
                </SectionCard>

                {/* Submit */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0 40px', borderTop: '1px solid var(--border-color)', marginTop: 8 }}>
                    <Link href={route("admin.courses.index")} className="btn-light">
                        <i className="ri-close-line"></i> Discard
                    </Link>
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn-secondary" disabled={processing} onClick={() => setData('is_active', false)}>
                            <i className="ri-draft-line"></i> Save as Draft
                        </button>
                        <button type="submit" className="btn-primary" disabled={processing}>
                            <i className="ri-check-line"></i> {processing ? 'Publishing...' : 'Publish Course'}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
