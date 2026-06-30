import React, { useEffect, useState } from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import {
    BrainCircuit, MessageSquare, Users, UserCheck, FileText, Briefcase,
    Building2, Monitor, Lightbulb, ShoppingBag, Factory, HeartPulse,
    Store, Globe, TrendingUp, CheckCircle2, Award, ArrowRight, GraduationCap,
    Target, Zap, BookOpen
} from 'lucide-react';

const assets = (path) => `${window.AppAssetUrl || '/'}${path.replace(/^\/+/, '')}`;

export default function Index() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const preparationModules = [
        { title: "Aptitude Development", desc: "Rigorous logical, quantitative, and verbal reasoning training.", icon: BrainCircuit },
        { title: "Communication Skills", desc: "Enhancing business English, articulation, and corporate vocabulary.", icon: MessageSquare },
        { title: "Group Discussions", desc: "Mock GDs to build confidence, leadership, and team dynamics.", icon: Users },
        { title: "Interview Preparation", desc: "Intensive 1-on-1 mock interviews with industry experts.", icon: UserCheck },
        { title: "Resume Building", desc: "Crafting ATS-friendly, impactful CVs highlighting core competencies.", icon: FileText },
        { title: "Corporate Etiquette", desc: "Professional grooming, dining etiquette, and workplace behavior.", icon: Briefcase }
    ];

    const stats = [
        { label: "Placement Rate", value: "98", suffix: "%", icon: TrendingUp },
        { label: "Highest Package", value: "24", suffix: " LPA", icon: Award },
        { label: "Average Package", value: "10.5", suffix: " LPA", icon: CheckCircle2 },
        { label: "Recruiting Partners", value: "150", suffix: "+", icon: Building2 }
    ];

    const recruiterSectors = [
        { name: "Banking & Finance", icon: Building2 },
        { name: "Information Technology", icon: Monitor },
        { name: "Consulting", icon: Lightbulb },
        { name: "FMCG", icon: ShoppingBag },
        { name: "Manufacturing", icon: Factory },
        { name: "Healthcare", icon: HeartPulse },
        { name: "Retail", icon: Store },
        { name: "E-Commerce", icon: Globe }
    ];

    const processSteps = [
        { title: "Skill Mapping", desc: "Identifying student strengths & career aspirations through detailed psychometric analysis.", icon: Target },
        { title: "Intensive Training", desc: "300+ hours of aptitude, soft skills, and technical development modules.", icon: Zap },
        { title: "Corporate Connect", desc: "Guest lectures, live projects, and direct industry interactions.", icon: Building2 },
        { title: "Mock Interviews", desc: "Rigorous practice sessions with alumni and senior HR professionals.", icon: Users },
        { title: "Placement Drives", desc: "On-campus and virtual recruitment drives with top companies.", icon: Briefcase }
    ];

    return (
        <AppLayout title="Placements & Careers">
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideRight {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(253,199,47,0.4); }
                    50% { box-shadow: 0 0 0 12px rgba(253,199,47,0); }
                }
                @keyframes scroll-x {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .anim-fade { animation: fadeIn 0.8s ease forwards; opacity: 0; }
                .anim-slide { animation: slideRight 0.8s ease forwards; opacity: 0; }

                /* ===== HERO ===== */
                .plc-hero {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    background: #fafbfc;
                    position: relative;
                    overflow: hidden;
                    padding-top: 120px;
                    padding-bottom: 80px;
                }
                @media (max-width: 991px) {
                    .plc-hero {
                        min-height: auto;
                        padding-top: 160px;
                        padding-bottom: 60px;
                    }
                }
                .plc-hero-mesh {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(ellipse at 0% 0%, rgba(26,54,93,0.04) 0%, transparent 50%),
                        radial-gradient(ellipse at 100% 100%, rgba(253,199,47,0.06) 0%, transparent 50%);
                    pointer-events: none;
                }
                .plc-hero-shape {
                    position: absolute;
                    width: 500px; height: 500px;
                    border-radius: 50%;
                    border: 1px solid rgba(26,54,93,0.04);
                    top: -200px; right: -100px;
                }
                .plc-hero-shape-2 {
                    position: absolute;
                    width: 300px; height: 300px;
                    border-radius: 50%;
                    border: 1px solid rgba(253,199,47,0.08);
                    bottom: -100px; left: -50px;
                }

                /* ===== STATS STRIP ===== */
                .plc-stats-strip {
                    background: #1a365d;
                    padding: 60px 0;
                    position: relative;
                    overflow: hidden;
                }
                .plc-stats-strip::before {
                    content: '';
                    position: absolute;
                    top: -50%; right: -10%;
                    width: 500px; height: 500px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(253,199,47,0.06) 0%, transparent 60%);
                }
                .plc-stat-card {
                    padding: 18px 24px;
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 14px;
                    background: rgba(255,255,255,0.04);
                    backdrop-filter: blur(4px);
                    transition: all 0.3s ease;
                    min-width: 180px;
                }
                .plc-stat-card:hover {
                    border-color: #fdc72f;
                    background: rgba(253,199,47,0.06);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                }

                /* ===== BENTO GRID ===== */
                .plc-bento {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: auto auto;
                    gap: 20px;
                }
                @media (max-width: 991px) {
                    .plc-bento { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 575px) {
                    .plc-bento { grid-template-columns: 1fr; }
                }
                .plc-bento-card {
                    background: #1a365d;
                    border-radius: 20px;
                    padding: 36px 28px;
                    border: 2px solid #0f2744;
                    transition: all 0.4s ease;
                    position: relative;
                    overflow: hidden;
                }
                .plc-bento-card:hover {
                    border-color: #fdc72f;
                    box-shadow: 0 20px 50px rgba(26,54,93,0.08);
                    transform: translateY(-4px);
                }
                .plc-bento-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background: linear-gradient(135deg, rgba(253,199,47,0.03) 0%, transparent 60%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                .plc-bento-card:hover::before { opacity: 1; }

                /* ===== PROCESS ACCORDION ===== */
                .plc-process-item {
                    background: #fff;
                    border: 2px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 24px 28px;
                    margin-bottom: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .plc-process-item:hover,
                .plc-process-item.active {
                    border-color: #1a365d;
                    box-shadow: 0 8px 24px rgba(26,54,93,0.06);
                }
                .plc-process-item.active {
                    background: linear-gradient(135deg, #1a365d, #2d4a7a);
                    color: #fff;
                }
                .plc-process-item.active h4 { color: #fff; }
                .plc-process-item.active p { color: rgba(255,255,255,0.8); }
                .plc-process-item.active .plc-step-num {
                    background: #fdc72f;
                    color: #1a365d;
                }

                /* ===== SECTORS ===== */
                .plc-sectors-scroll {
                    overflow: hidden;
                    position: relative;
                    padding: 20px 0;
                }
                .plc-sectors-scroll::before,
                .plc-sectors-scroll::after {
                    content: ''; position: absolute; top: 0;
                    width: 100px; height: 100%; z-index: 2;
                }
                .plc-sectors-scroll::before { left: 0; background: linear-gradient(to right, #fff, transparent); }
                .plc-sectors-scroll::after { right: 0; background: linear-gradient(to left, #fff, transparent); }
                .plc-sectors-track {
                    display: inline-flex;
                    animation: scroll-x 40s linear infinite;
                }
                .plc-sector-pill {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 12px 24px; margin: 0 10px;
                    background: #f8fafc; border: 1px solid #e2e8f0;
                    border-radius: 40px; font-weight: 600; font-size: 14px;
                    color: #1a365d; white-space: nowrap;
                    transition: all 0.3s ease;
                }
                .plc-sector-pill:hover {
                    background: #1a365d; color: #fdc72f;
                    border-color: #1a365d;
                }

                /* ===== CTA ===== */
                .plc-cta-section {
                    background: linear-gradient(160deg, #0f2744, #1a365d);
                    border-radius: 32px;
                    padding: 80px 60px;
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                }
                .plc-cta-section::before {
                    content: '';
                    position: absolute;
                    top: -100px; right: -100px;
                    width: 400px; height: 400px;
                    border-radius: 50%;
                    background: rgba(253,199,47,0.08);
                }
                .plc-cta-section::after {
                    content: '';
                    position: absolute;
                    bottom: -80px; left: -80px;
                    width: 300px; height: 300px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.02);
                }
                
                @media (min-width: 992px) {
                    .plc-sticky-col {
                        position: sticky;
                        top: 100px;
                    }
                }
            `}</style>

            {/* ===== HERO ===== */}
            <section className="plc-hero">
                <div className="plc-hero-mesh"></div>
                <div className="plc-hero-shape"></div>
                <div className="plc-hero-shape-2"></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className={isVisible ? 'anim-slide' : ''} style={{ animationDelay: '0.1s' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1a365d', color: '#fdc72f', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', marginBottom: '32px', letterSpacing: '0.5px' }}>
                                    <Award size={15} />
                                    PLACEMENTS & CAREERS
                                </div>
                                <h1 style={{ fontSize: '56px', fontWeight: '900', color: '#0f2744', lineHeight: '1.05', marginBottom: '28px', letterSpacing: '-1.5px' }}>
                                    Your Future<br />
                                    Starts <span style={{ color: '#1a365d', position: 'relative', display: 'inline-block' }}>
                                        Here
                                        <svg style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%' }} viewBox="0 0 100 12" preserveAspectRatio="none">
                                            <path d="M0 8 Q50 0 100 8" stroke="#fdc72f" strokeWidth="4" fill="none" strokeLinecap="round"/>
                                        </svg>
                                    </span>
                                </h1>
                                <p style={{ fontSize: '18px', color: '#64748b', lineHeight: '1.8', marginBottom: '40px', maxWidth: '440px' }}>
                                    From classroom to corporate — we prepare, connect, and place you in roles that match your ambition.
                                </p>
                                <div className="d-flex gap-3 flex-wrap align-items-center">
                                    <Link href={assets('apply-now')} style={{ background: '#1a365d', color: '#fff', padding: '16px 32px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(26,54,93,0.2)', transition: 'all 0.3s' }}>
                                        Get Started <ArrowRight size={18} />
                                    </Link>
                                    <Link href={assets('contact')} style={{ color: '#1a365d', textDecoration: 'none', fontWeight: '600', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                        Learn more <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={isVisible ? 'anim-fade' : ''} style={{ animationDelay: '0.3s', position: 'relative' }}>
                                <div style={{ background: '#1a365d', borderRadius: '28px', padding: '20px', position: 'relative' }}>
                                    <img src={assets('assets/images/contact/placement.webp')} alt="Placements"
                                        style={{ borderRadius: '18px', width: '100%', display: 'block' }} />
                                    {/* Overlay card */}
                                    <div style={{
                                        position: 'absolute', bottom: '40px', left: '-20px',
                                        background: '#fff', padding: '20px 28px', borderRadius: '16px',
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                                        display: 'flex', alignItems: 'center', gap: '14px'
                                    }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fdc72f', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse-glow 2s infinite' }}>
                                            <TrendingUp size={22} color="#1a365d" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#0f2744', lineHeight: 1 }}>98%</div>
                                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginTop: '2px' }}>Placement Rate</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== STATS STRIP ===== */}
            <section className="plc-stats-strip">
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-4">
                        <div>
                            <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>Our Placement Track Record</h3>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Numbers that speak for themselves</p>
                        </div>
                        <div className="d-flex gap-3 flex-wrap">
                            {stats.map((stat, idx) => (
                                <div className="plc-stat-card" key={idx}>
                                    <div className="d-flex align-items-center gap-3">
                                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(253,199,47,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <stat.icon size={20} color="#fdc72f" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '26px', fontWeight: '900', color: '#fff', letterSpacing: '-0.5px', lineHeight: 1 }}>
                                                {stat.value}<span style={{ color: '#fdc72f' }}>{stat.suffix}</span>
                                            </div>
                                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '2px' }}>
                                                {stat.label}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PREPARATION BENTO ===== */}
            <section style={{ padding: '100px 0', background: '#f1f5f9' }}>
                <div className="container">
                    <div className="row align-items-end mb-5">
                        <div className="col-lg-6">
                            <span style={{ fontSize: '13px', fontWeight: '700', color: '#fdc72f', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', display: 'block' }}>Training Program</span>
                            <h2 style={{ fontSize: '38px', fontWeight: '800', color: '#0f2744', lineHeight: '1.15', letterSpacing: '-0.5px', margin: 0 }}>
                                Holistic Career<br />Preparation
                            </h2>
                        </div>
                        <div className="col-lg-5 offset-lg-1 mt-3 mt-lg-0">
                            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.7', margin: 0 }}>
                                Our comprehensive training curriculum ensures you are corporate-ready and confident for any selection process.
                            </p>
                        </div>
                    </div>

                    <div className="plc-bento">
                        {preparationModules.map((module, idx) => (
                            <div className="plc-bento-card" key={idx}>
                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(253,199,47,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fdc72f', marginBottom: '20px' }}>
                                        <module.icon size={24} strokeWidth={2} />
                                    </div>
                                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
                                        {module.title}
                                    </h3>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                                        {module.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROCESS ACCORDION ===== */}
            <section style={{ padding: '100px 0', background: '#fff' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 mb-5 mb-lg-0">
                            <div className="plc-sticky-col">
                                <span style={{ fontSize: '13px', fontWeight: '700', color: '#fdc72f', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', display: 'block' }}>5-Step Framework</span>
                                <h2 style={{ fontSize: '38px', fontWeight: '800', color: '#0f2744', marginBottom: '20px', lineHeight: '1.15', letterSpacing: '-0.5px' }}>
                                    Our Proven<br />Placement Process
                                </h2>
                                <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.7', marginBottom: '32px' }}>
                                    Every step is designed to maximize your employability and connect you with the right opportunities.
                                </p>
                            <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '28px', border: '1px solid #eef1f6' }}>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <BookOpen size={20} color="#1a365d" />
                                    <span style={{ fontWeight: '700', color: '#0f2744', fontSize: '15px' }}>Program Highlights</span>
                                </div>
                                <ul style={{ margin: 0, paddingLeft: '20px', color: '#64748b', fontSize: '14px', lineHeight: '2.2' }}>
                                    <li>300+ hours of training</li>
                                    <li>1-on-1 mentorship</li>
                                    <li>Live industry projects</li>
                                    <li>On-campus drives</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            {processSteps.map((step, idx) => (
                                <div
                                    className={`plc-process-item ${activeStep === idx ? 'active' : ''}`}
                                    key={idx}
                                    onClick={() => setActiveStep(idx)}
                                >
                                    <div className="d-flex align-items-start gap-3">
                                        <div className="plc-step-num" style={{
                                            width: '36px', height: '36px', borderRadius: '10px',
                                            background: activeStep === idx ? '#fdc72f' : '#f1f5f9',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontWeight: '800', fontSize: '14px',
                                            color: activeStep === idx ? '#1a365d' : '#64748b',
                                            flexShrink: 0, transition: 'all 0.3s'
                                        }}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '17px', fontWeight: '700', color: activeStep === idx ? '#fff' : '#0f2744', marginBottom: '6px', transition: 'color 0.3s' }}>
                                                {step.title}
                                            </h4>
                                            <p style={{ fontSize: '14px', color: activeStep === idx ? 'rgba(255,255,255,0.8)' : '#64748b', margin: 0, lineHeight: '1.6', transition: 'color 0.3s' }}>
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== RECRUITING SECTORS ===== */}
            <section style={{ padding: '80px 0', background: '#fff' }}>
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#0f2744', letterSpacing: '-0.5px' }}>
                            Top Recruiting Sectors
                        </h2>
                    </div>
                </div>
                <div className="plc-sectors-scroll">
                    <div className="plc-sectors-track">
                        {[...recruiterSectors, ...recruiterSectors].map((sector, idx) => (
                            <div className="plc-sector-pill" key={idx}>
                                <sector.icon size={16} color="#94a3b8" />
                                <span>{sector.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section style={{ padding: '0 0 100px', background: '#fff' }}>
                <div className="container">
                    <div className="plc-cta-section">
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(253,199,47,0.15)', color: '#fdc72f', padding: '8px 18px', borderRadius: '30px', fontSize: '13px', fontWeight: '600', marginBottom: '24px' }}>
                                <GraduationCap size={16} />
                                Start Your Journey
                            </div>
                            <h2 style={{ fontSize: '40px', fontWeight: '900', color: '#fff', marginBottom: '18px', letterSpacing: '-1px' }}>
                                Ready to Build Your Career?
                            </h2>
                            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.65)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: '1.7' }}>
                                Join 1000+ successful alumni who launched their careers through our placement program.
                            </p>
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <Link href={assets('apply-now')} style={{ background: '#fdc72f', color: '#1a365d', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(253,199,47,0.3)' }}>
                                    Apply Now <ArrowRight size={18} />
                                </Link>
                                <Link href={assets('contact')} style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontWeight: '600', fontSize: '15px', border: '1px solid rgba(255,255,255,0.15)' }}>
                                    Talk to Admissions
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </AppLayout>
    );
}
