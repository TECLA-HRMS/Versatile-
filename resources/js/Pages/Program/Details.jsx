import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Link, Head, useForm, usePage } from '@inertiajs/react';
import ReCAPTCHA from 'react-google-recaptcha';

const assets = (path) => `${window.AppAssetUrl || '/'}${path.replace(/^\/+/, '')}`;

export default function Details({ program, course }) {
    const { settings } = usePage().props;

    const stats = course.stats || [];
    const competencies = course.competencies || [];
    const advantages = course.advantages || [];
    const eligibility = course.eligibility || [];
    const entranceTest = course.entrance_test || [];
    const placements = course.placements || [];

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        course_id: course.id,
        'g-recaptcha-response': ''
    });

    const submitBrochure = (e) => {
        e.preventDefault();
        post(route('enquiry.brochure'), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    return (
        <AppLayout title={course.name}>
            <Head title={course.name} />
            <style>{`
                .dt-hero {
                    position: relative;
                    background: linear-gradient(160deg, #0a1628 0%, #132039 40%, #1a365d 100%);
                    padding: 100px 0 120px;
                    overflow: hidden;
                }
                .dt-hero::before {
                    content: '';
                    position: absolute;
                    top: -30%; right: -10%;
                    width: 600px; height: 600px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(253,199,47,0.06) 0%, transparent 60%);
                }
                .dt-hero::after {
                    content: '';
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    height: 80px;
                    background: linear-gradient(to top, #f8fafc, transparent);
                }
                .dt-breadcrumb a {
                    color: rgba(255,255,255,0.6);
                    text-decoration: none;
                    font-size: 14px;
                    transition: color 0.2s;
                }
                .dt-breadcrumb a:hover { color: #fdc72f; }
                .dt-breadcrumb span { color: rgba(255,255,255,0.35); margin: 0 10px; }

                .dt-content-area { background: #f8fafc; padding: 80px 0 100px; }

                .dt-card {
                    background: #fff;
                    border: 2px solid #e8edf3;
                    border-radius: 16px;
                    padding: 32px;
                    transition: all 0.3s ease;
                }
                .dt-card:hover {
                    border-color: #fdc72f;
                    box-shadow: 0 12px 36px rgba(26,54,93,0.06);
                    transform: translateY(-3px);
                }
                .dt-card-icon {
                    width: 52px; height: 52px;
                    border-radius: 12px;
                    background: rgba(253,199,47,0.1);
                    display: flex; align-items: center; justify-content: center;
                    color: #1a365d; font-size: 22px;
                    margin-bottom: 18px;
                    transition: all 0.3s;
                }
                .dt-card:hover .dt-card-icon {
                    background: #fdc72f;
                    color: #0a1628;
                }

                .dt-section-label {
                    font-size: 12px;
                    font-weight: 700;
                    color: #fdc72f;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 10px;
                    display: block;
                }
                .dt-section-title {
                    font-size: 28px;
                    font-weight: 800;
                    color: #0a1628;
                    margin-bottom: 12px;
                    letter-spacing: -0.5px;
                }
                .dt-section-desc {
                    font-size: 15px;
                    color: #64748b;
                    margin-bottom: 32px;
                    line-height: 1.6;
                }

                .dt-info-card {
                    background: #fff;
                    border: 2px solid #e8edf3;
                    border-radius: 16px;
                    padding: 28px;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }
                .dt-info-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #1a365d, #fdc72f);
                }

                .dt-sidebar-card {
                    background: #fff;
                    border: 2px solid #e8edf3;
                    border-radius: 20px;
                    padding: 36px 28px;
                    margin-bottom: 24px;
                }
                .dt-sidebar-card.dark {
                    background: #0a1628;
                    border-color: #0a1628;
                }

                .dt-input {
                    width: 100%;
                    padding: 14px 18px;
                    border: 2px solid #e8edf3;
                    border-radius: 10px;
                    font-size: 15px;
                    background: #f8fafc;
                    transition: all 0.2s;
                    outline: none;
                }
                .dt-input:focus {
                    border-color: #1a365d;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(26,54,93,0.06);
                }

                .dt-btn-primary {
                    display: block;
                    width: 100%;
                    padding: 16px;
                    background: #1a365d;
                    color: #fff;
                    border: none;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 15px;
                    cursor: pointer;
                    transition: all 0.3s;
                    text-align: center;
                }
                .dt-btn-primary:hover {
                    background: #0f2744;
                    box-shadow: 0 8px 20px rgba(26,54,93,0.2);
                    transform: translateY(-1px);
                }
                .dt-btn-gold {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    width: 100%;
                    padding: 18px;
                    background: #fdc72f;
                    color: #0a1628;
                    border: none;
                    border-radius: 14px;
                    font-weight: 800;
                    font-size: 16px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.3s;
                    box-shadow: 0 6px 20px rgba(253,199,47,0.25);
                }
                .dt-btn-gold:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 28px rgba(253,199,47,0.35);
                    color: #0a1628;
                }

                .dt-university {
                    background: #fff;
                    border: 2px solid #e8edf3;
                    border-radius: 16px;
                    padding: 36px;
                    position: relative;
                    overflow: hidden;
                }
                .dt-university::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; bottom: 0;
                    width: 5px;
                    background: linear-gradient(180deg, #1a365d, #fdc72f);
                }

                .dt-stat-bar {
                    display: flex;
                    gap: 0;
                    border: 2px solid #e8edf3;
                    border-radius: 14px;
                    overflow: hidden;
                    background: #fff;
                    margin-bottom: 40px;
                }
                .dt-stat-item {
                    flex: 1;
                    text-align: center;
                    padding: 24px 16px;
                    border-right: 1px solid #e8edf3;
                    transition: background 0.3s;
                }
                .dt-stat-item:last-child { border-right: none; }
                .dt-stat-item:hover { background: rgba(253,199,47,0.04); }
                .dt-stat-value {
                    font-size: 28px;
                    font-weight: 900;
                    color: #1a365d;
                    letter-spacing: -0.5px;
                    line-height: 1;
                    margin-bottom: 4px;
                }
                .dt-stat-value span { color: #fdc72f; }
                .dt-stat-label {
                    font-size: 12px;
                    color: #64748b;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .dt-placement-card {
                    background: #fff;
                    border: 2px solid #e8edf3;
                    border-radius: 16px;
                    padding: 32px;
                }
                .dt-placement-card li {
                    padding: 10px 0;
                    border-bottom: 1px solid #f1f5f9;
                    color: #475569;
                    font-size: 15px;
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                }
                .dt-placement-card li:last-child { border-bottom: none; }
                .dt-placement-card li::before {
                    content: '';
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    background: #fdc72f;
                    flex-shrink: 0;
                    margin-top: 7px;
                }

                @media (max-width: 767px) {
                    .dt-stat-bar { flex-wrap: wrap; }
                    .dt-stat-item { flex: 1 1 50%; border-bottom: 1px solid #e8edf3; }
                }
            `}</style>

            {/* Breadcrumb Area (Matches the theme's hero) */}
            <section className="rs-breadcrumb-area rs-breadcrumb-one p-relative section-space">
                <div className="rs-breadcrumb-bg-thumb include-bg" style={{backgroundImage: `url(${assets(course.banner_image || 'assets/images/bg/breadcrumb-bg-thumb-01.webp')})`}}>
                </div>
                <div className="container-fluid g-0">
                    <div className="row">
                        <div className="col-xl-6 col-lg-10">
                            <div className="rs-breadcrumb-wrapper">
                                <div className="rs-breadcrumb-menu">
                                    <nav>
                                        <ul>
                                            <li className="rs-breadcumb-item">
                                                <Link href={assets('')}>Home</Link>
                                                <span className="rs-breadcrumb-icon">
                                                    <svg className="e-font-icon-svg e-fas-angle-double-right" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path>
                                                    </svg>
                                                </span>
                                            </li>
                                            <li className="rs-breadcumb-item">
                                                <Link href={assets('program')}>Programs</Link>
                                                <span className="rs-breadcrumb-icon">
                                                    <svg className="e-font-icon-svg e-fas-angle-double-right" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path>
                                                    </svg>
                                                </span>
                                            </li>
                                            <li className="rs-breadcumb-item">{course.name}</li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="rs-breadcrumb-title-wrapper">
                                    <h1 className="rs-breadcrumb-title">{course.name}</h1>
                                    <span className="rs-breadcrumb-line"></span>
                                </div>
                                <p className="rs-breadcrumb-desc">{course.short_desc}</p>
                                <div className="mt-4">
                                    <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold fs-6">
                                        {course.duration || program.duration} {program.format}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== MAIN CONTENT ===== */}
            <section className="dt-content-area">
                <div className="container">
                    <div className="row g-5">

                        {/* Left Column */}
                        <div className="col-xl-8 col-lg-8">

                            {/* Stats Bar */}
                            {stats.length > 0 && (
                                <div className="dt-stat-bar">
                                    {stats.map((stat, i) => (
                                        <div className="dt-stat-item" key={i}>
                                            <div className="dt-stat-value">
                                                {stat.number}
                                            </div>
                                            <div className="dt-stat-label">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Description */}
                            <span className="dt-section-label">About the Program</span>
                            <h2 className="dt-section-title">Program Overview</h2>
                            <p style={{ fontSize: '16px', lineHeight: '1.9', color: '#475569', marginBottom: '48px', whiteSpace: 'pre-wrap' }}>
                                {course.description}
                            </p>

                            {/* Thumbnail */}
                            {course.thumbnail && (
                                <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '48px', border: '2px solid #e8edf3' }}>
                                    <img src={window.assets(course.thumbnail)} alt={course.name} style={{ width: '100%', display: 'block', height: '300px', objectFit: 'cover' }} />
                                </div>
                            )}

                            {/* University */}
                            {course.university_name && (
                                <>
                                    <span className="dt-section-label">Affiliation</span>
                                    <h2 className="dt-section-title">University Recognition</h2>
                                    <div className="dt-university mb-5">
                                        <div className="d-flex align-items-center gap-4 flex-wrap" style={{ paddingLeft: '16px' }}>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#0a1628', marginBottom: '12px' }}>
                                                    {course.university_name}
                                                </h4>
                                                <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                                                    This program is officially recognized and awarded by <strong>{course.university_name}</strong>, ensuring rigorous academic standards and global credibility.
                                                </p>
                                            </div>
                                            {course.university_logo && (
                                                <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '2px solid #e8edf3' }}>
                                                    <img src={window.assets(course.university_logo)} alt={course.university_name} style={{ maxWidth: '120px', height: 'auto' }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Competencies */}
                            {competencies.length > 0 && (
                                <>
                                    <span className="dt-section-label">What You'll Learn</span>
                                    <h2 className="dt-section-title">Core Competencies</h2>
                                    <p className="dt-section-desc">Skills and knowledge you will master in this program.</p>
                                    <div className="row g-4 mb-5">
                                        {competencies.map((item, i) => (
                                            <div className="col-md-6" key={i}>
                                                <div className="dt-card" style={{ height: '100%' }}>
                                                    <div className="dt-card-icon">
                                                        <i className={item.icon || 'ri-star-s-fill'}></i>
                                                    </div>
                                                    <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0a1628', marginBottom: '8px' }}>{item.title}</h5>
                                                    <p style={{ color: '#64748b', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Advantages */}
                            {advantages.length > 0 && (
                                <>
                                    <span className="dt-section-label">Why Choose Us</span>
                                    <h2 className="dt-section-title">Key Advantages</h2>
                                    <p className="dt-section-desc">What makes this program unique and valuable.</p>
                                    <div className="row g-4 mb-5">
                                        {advantages.map((item, i) => (
                                            <div className="col-md-6" key={i}>
                                                <div className="dt-card" style={{ height: '100%' }}>
                                                    <div className="dt-card-icon">
                                                        <i className={item.icon || 'ri-check-double-line'}></i>
                                                    </div>
                                                    <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0a1628', marginBottom: '8px' }}>{item.title}</h5>
                                                    <p style={{ color: '#64748b', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Eligibility & Entrance */}
                            {(eligibility.length > 0 || entranceTest.length > 0) && (
                                <>
                                    <span className="dt-section-label">Admissions</span>
                                    <h2 className="dt-section-title">Eligibility & Entrance</h2>
                                    <p className="dt-section-desc">Everything you need to know to apply.</p>
                                    <div className="row g-4 mb-5">
                                        {eligibility.length > 0 && (
                                            <div className="col-md-6">
                                                <div className="dt-info-card">
                                                    <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0a1628', marginBottom: '16px', paddingTop: '8px' }}>
                                                        <i className="ri-user-star-fill" style={{ color: '#fdc72f', marginRight: '8px' }}></i>
                                                        Eligibility Criteria
                                                    </h5>
                                                    <ul style={{ paddingLeft: '18px', margin: 0, color: '#475569', fontSize: '14px', lineHeight: '2.2' }}>
                                                        {eligibility.map((item, i) => <li key={i}>{item}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                        {entranceTest.length > 0 && (
                                            <div className="col-md-6">
                                                <div className="dt-info-card">
                                                    <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0a1628', marginBottom: '16px', paddingTop: '8px' }}>
                                                        <i className="ri-file-list-3-fill" style={{ color: '#fdc72f', marginRight: '8px' }}></i>
                                                        Entrance Test
                                                    </h5>
                                                    <ul style={{ paddingLeft: '18px', margin: 0, color: '#475569', fontSize: '14px', lineHeight: '2.2' }}>
                                                        {entranceTest.map((item, i) => <li key={i}>{item}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Placements */}
                            {placements.length > 0 && (
                                <>
                                    <span className="dt-section-label">Career</span>
                                    <h2 className="dt-section-title">Placements & Training</h2>
                                    <div className="dt-placement-card mb-5">
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {placements.map((item, i) => <li key={i}>{item}</li>)}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-xl-4 col-lg-4">
                            <div className="rs-sidebar-sticky">

                                {/* Brochure Form */}
                                <div className="dt-sidebar-card" id="brochure">
                                    <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#0a1628', marginBottom: '6px' }}>Download Brochure</h4>
                                    <div style={{ width: '40px', height: '3px', background: '#fdc72f', borderRadius: '2px', marginBottom: '16px' }}></div>
                                    <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                                        Get complete details about the curriculum, fees, and admission process.
                                    </p>

                                    {wasSuccessful ? (
                                        <div style={{ background: '#ecfdf5', border: '2px solid #10b981', color: '#047857', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '600' }}>
                                            <i className="ri-checkbox-circle-fill" style={{ fontSize: '24px', display: 'block', marginBottom: '6px' }}></i>
                                            Brochure sent to your email!
                                        </div>
                                    ) : (
                                        <form onSubmit={submitBrochure}>
                                            <div style={{ marginBottom: '14px' }}>
                                                <input type="text" className="dt-input" placeholder="Full Name *" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                                {errors.name && <small style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.name}</small>}
                                            </div>
                                            <div style={{ marginBottom: '14px' }}>
                                                <input type="email" className="dt-input" placeholder="Email Address *" value={data.email} onChange={e => setData('email', e.target.value)} required />
                                                {errors.email && <small style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email}</small>}
                                            </div>
                                            <div style={{ marginBottom: '20px' }}>
                                                <input type="tel" className="dt-input" placeholder="Phone Number *" value={data.phone} onChange={e => setData('phone', e.target.value)} required />
                                                {errors.phone && <small style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.phone}</small>}
                                            </div>
                                            {settings?.recaptcha_enabled === '1' && settings?.recaptcha_site_key && (
                                                <div style={{ marginBottom: '20px' }}>
                                                    <ReCAPTCHA
                                                        sitekey={settings.recaptcha_site_key}
                                                        onChange={(token) => setData('g-recaptcha-response', token)}
                                                    />
                                                    {errors['g-recaptcha-response'] && <small style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors['g-recaptcha-response']}</small>}
                                                </div>
                                            )}
                                            <button type="submit" className="dt-btn-primary" disabled={processing}>
                                                {processing ? 'Sending...' : 'Download Now'}
                                            </button>
                                        </form>
                                    )}
                                </div>

                                {/* Apply CTA */}
                                <Link href={route("apply-now")} className="dt-btn-gold" style={{ marginBottom: '24px' }}>
                                    Apply For Admission <i className="ri-arrow-right-line"></i>
                                </Link>

                                {/* Help Card */}
                                <div className="dt-sidebar-card dark">
                                    <h5 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>Need Help?</h5>
                                    <div style={{ width: '30px', height: '3px', background: '#fdc72f', borderRadius: '2px', marginBottom: '24px' }}></div>

                                    <a href="tel:+12018953801" style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px', borderRadius: '12px', textDecoration: 'none', marginBottom: '12px', transition: 'all 0.3s' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(253,199,47,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <i className="ri-phone-fill" style={{ color: '#fdc72f', fontSize: '18px' }}></i>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Call Us</div>
                                            <div style={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}>+1 (201) 895-3801</div>
                                        </div>
                                    </a>

                                    <a href="mailto:info@versatile.edu" style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px', borderRadius: '12px', textDecoration: 'none', transition: 'all 0.3s' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(253,199,47,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <i className="ri-mail-fill" style={{ color: '#fdc72f', fontSize: '18px' }}></i>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Us</div>
                                            <div style={{ color: '#fff', fontWeight: '700', fontSize: '15px' }}>info@versatile.edu</div>
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
