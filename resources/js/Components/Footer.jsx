import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { settings, sharedPrograms } = usePage().props;
    const currentYear = new Date().getFullYear();
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <>
            <footer className="footer-enhanced">
                <style>
                    {`
                    .footer-enhanced {
                        background: linear-gradient(135deg, #0b1120 0%, #1e293b 100%);
                        color: #94a3b8;
                        font-family: 'Inter', sans-serif;
                        position: relative;
                        overflow: hidden;
                    }
                    .footer-enhanced::before {
                        content: '';
                        position: absolute;
                        top: 0; left: 0; right: 0;
                        height: 4px;
                        background: linear-gradient(90deg, #fdc72f 0%, #f59e0b 50%, #d97706 100%);
                    }
                    @keyframes slowPulse {
                        0% { transform: scale(1) translate(0, 0); opacity: 0.5; }
                        50% { transform: scale(1.1) translate(2%, 2%); opacity: 0.8; }
                        100% { transform: scale(1) translate(0, 0); opacity: 0.5; }
                    }
                    .footer-top-bg {
                        position: absolute;
                        top: -20%; left: -10%;
                        width: 600px; height: 600px;
                        background: radial-gradient(circle, rgba(253,199,47,0.04) 0%, rgba(0,0,0,0) 70%);
                        border-radius: 50%;
                        pointer-events: none;
                        animation: slowPulse 8s infinite alternate ease-in-out;
                    }
                    .footer-top-bg-2 {
                        position: absolute;
                        bottom: -20%; right: -10%;
                        width: 500px; height: 500px;
                        background: radial-gradient(circle, rgba(14,165,233,0.04) 0%, rgba(0,0,0,0) 70%);
                        border-radius: 50%;
                        pointer-events: none;
                        animation: slowPulse 10s infinite alternate-reverse ease-in-out;
                    }
                    .footer-container {
                        max-width: 1260px;
                        margin: 0 auto;
                        padding: 80px 24px 60px;
                        display: grid;
                        grid-template-columns: 1.8fr 1fr 1fr 1.4fr;
                        gap: 50px;
                        position: relative;
                        z-index: 1;
                    }
                    @media (max-width: 1024px) {
                        .footer-container {
                            grid-template-columns: 1fr 1fr;
                            gap: 40px;
                        }
                    }
                    @media (max-width: 768px) {
                        .footer-container {
                            grid-template-columns: 1fr;
                            gap: 30px;
                            padding: 40px 20px 20px;
                            text-align: left;
                        }
                        .footer-logo {
                            margin: 0 0 20px 0 !important;
                        }
                        .footer-tagline {
                            margin: 0 0 25px 0 !important;
                        }
                        .footer-social-row {
                            justify-content: flex-start;
                        }
                        .footer-col-title {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 0 !important;
                            padding-bottom: 10px !important;
                            cursor: pointer;
                        }
                        .footer-col-title::after {
                            left: 0 !important;
                            transform: none;
                        }
                        .footer-col-title i {
                            transition: transform 0.3s ease;
                            font-size: 20px;
                        }
                        .footer-col-title.active i {
                            transform: rotate(180deg);
                        }
                        
                        /* Accordion logic for mobile */
                        .mobile-accordion-content {
                            max-height: 0;
                            overflow: hidden;
                            transition: max-height 0.4s ease, margin-top 0.4s ease;
                            margin-top: 0;
                        }
                        .mobile-accordion-content.active {
                            max-height: 600px;
                            margin-top: 20px;
                        }

                        .footer-link-item {
                            justify-content: flex-start;
                        }
                        .footer-contact-item {
                            flex-direction: row;
                            align-items: flex-start !important;
                            text-align: left;
                            gap: 16px !important;
                            background: transparent !important;
                            padding: 0 !important;
                        }
                        .footer-contact-icon {
                            margin-bottom: 5px;
                        }
                        .footer-bottom-container {
                            flex-direction: column;
                            justify-content: center !important;
                            text-align: center;
                            gap: 15px !important;
                        }
                        .footer-bottom-links {
                            justify-content: center;
                            flex-wrap: wrap;
                            gap: 15px !important;
                        }
                    }

                    @media (min-width: 769px) {
                        .mobile-accordion-content {
                            max-height: none !important;
                            overflow: visible !important;
                            margin-top: 0 !important;
                        }
                        .footer-col-title i {
                            display: none;
                        }
                        .footer-col-title {
                            pointer-events: none;
                        }
                    }
                    .footer-logo {
                        max-height: 80px;
                        margin-bottom: 24px;
                        display: block;
                        filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
                    }
                    .footer-tagline {
                        font-size: 15px;
                        line-height: 1.8;
                        color: #cbd5e1;
                        margin-bottom: 30px;
                        max-width: 300px;
                    }
                    .footer-social-row {
                        display: flex;
                        gap: 12px;
                    }
                    .footer-social-icon {
                        width: 42px; height: 42px;
                        border-radius: 50%;
                        background: rgba(255,255,255,0.03);
                        backdrop-filter: blur(5px);
                        border: 1px solid rgba(255,255,255,0.08);
                        display: flex; align-items: center; justify-content: center;
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        text-decoration: none;
                    }
                    .footer-social-icon svg path {
                        transition: all 0.3s ease;
                        fill: #cbd5e1;
                    }
                    .footer-social-icon:hover {
                        background: #fdc72f;
                        transform: translateY(-5px) scale(1.1);
                        border-color: transparent;
                        box-shadow: 0 10px 20px rgba(253,199,47,0.3), 0 0 15px rgba(253,199,47,0.2) inset;
                    }
                    .footer-social-icon:hover svg path {
                        fill: #0f172a;
                    }
                    .footer-col-title {
                        font-size: 18px;
                        font-weight: 700;
                        color: #ffffff;
                        margin-bottom: 30px;
                        position: relative;
                        padding-bottom: 15px;
                        letter-spacing: 0.5px;
                    }
                    .footer-col-title::after {
                        content: '';
                        position: absolute;
                        bottom: 0; left: 0;
                        width: 40px; height: 3px;
                        background: #fdc72f;
                        border-radius: 2px;
                        transition: width 0.3s ease;
                    }
                    .footer-col:hover .footer-col-title::after {
                        width: 60px;
                    }
                    .footer-link-list {
                        list-style: none;
                        padding: 0; margin: 0;
                        display: flex; flex-direction: column;
                        gap: 16px;
                    }
                    .footer-link-item {
                        font-size: 15px;
                        color: #94a3b8;
                        text-decoration: none;
                        display: inline-flex;
                        align-items: center;
                        transition: all 0.3s ease;
                        position: relative;
                    }
                    .footer-link-item::before {
                        content: '›';
                        color: #fdc72f;
                        font-size: 18px;
                        position: absolute;
                        left: -15px;
                        opacity: 0;
                        transition: all 0.3s ease;
                    }
                    .footer-link-item:hover {
                        color: #ffffff;
                        transform: translateX(12px);
                    }
                    .footer-link-item:hover::before {
                        opacity: 1;
                    }
                    .footer-contact-item {
                        display: flex;
                        gap: 16px;
                        margin-bottom: 24px;
                        align-items: flex-start;
                        transition: transform 0.3s ease;
                    }
                    .footer-contact-item:hover {
                        transform: translateX(5px);
                    }
                    .footer-contact-icon {
                        width: 38px; height: 38px;
                        background: rgba(253,199,47,0.1);
                        border: 1px solid rgba(253,199,47,0.2);
                        border-radius: 10px;
                        display: flex; align-items: center; justify-content: center;
                        color: #fdc72f;
                        flex-shrink: 0;
                        font-size: 16px;
                        transition: all 0.3s ease;
                    }
                    .footer-contact-item:hover .footer-contact-icon {
                        background: #fdc72f;
                        color: #0f172a;
                        transform: scale(1.1) rotate(5deg);
                    }
                    .footer-contact-text {
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                    }
                    .footer-contact-label {
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        color: #64748b;
                        font-weight: 600;
                    }
                    .footer-contact-value {
                        font-size: 15px;
                        color: #cbd5e1;
                        text-decoration: none;
                        line-height: 1.5;
                        transition: color 0.3s ease;
                    }
                    .footer-contact-value:hover {
                        color: #ffffff;
                    }
                    .footer-apply-btn {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        padding: 14px 28px;
                        background: #fdc72f;
                        color: #0f172a;
                        font-weight: 700;
                        font-size: 15px;
                        border-radius: 8px;
                        text-decoration: none;
                        transition: all 0.3s ease;
                        margin-top: 10px;
                        width: 100%;
                        position: relative;
                        overflow: hidden;
                        z-index: 1;
                    }
                    .footer-apply-btn::before {
                        content: '';
                        position: absolute;
                        top: 0; left: -100%;
                        width: 100%; height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                        transition: left 0.5s ease;
                        z-index: -1;
                    }
                    .footer-apply-btn:hover::before {
                        left: 100%;
                    }
                    .footer-apply-btn:hover {
                        background: #fde047;
                        transform: translateY(-3px);
                        box-shadow: 0 10px 20px rgba(253,199,47,0.25);
                    }
                    .footer-bottom {
                        border-top: 1px solid rgba(255,255,255,0.06);
                        padding: 24px 0;
                        position: relative;
                        z-index: 1;
                    }
                    .footer-bottom-container {
                        max-width: 1260px;
                        margin: 0 auto;
                        padding: 0 24px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 16px;
                    }
                    .footer-copyright {
                        font-size: 14px;
                        color: #64748b;
                        margin: 0;
                    }
                    .footer-bottom-links {
                        display: flex;
                        gap: 30px;
                    }
                    .footer-bottom-link {
                        font-size: 14px;
                        color: #64748b;
                        text-decoration: none;
                        transition: color 0.3s ease;
                    }
                    .footer-bottom-link:hover {
                        color: #fdc72f;
                    }
                    `}
                </style>
                
                <div className="footer-top-bg"></div>
                <div className="footer-top-bg-2"></div>

                <div className="footer-container">
                    {/* Col 1 — Brand */}
                    <div className="footer-col">
                        <Link href={route('home')}>
                            <img
                                src={settings?.header_logo || '/assets/images/logo/logo.jpeg'}
                                alt="logo"
                                className="footer-logo"
                                loading="lazy"
                            />
                        </Link>
                        <p className="footer-tagline">
                            {settings?.institutionName || 'Versatile Business School'} — shaping future business leaders with world-class education and research excellence.
                        </p>
                        <div className="footer-social-row">
                            {[
                                { href: settings?.facebookLink || '#', icon: <svg width="14" height="14" viewBox="0 0 14 22" fill="none"><path d="M11.624 11.954L12.193 8.541H8.636V6.327C8.636 5.393 9.133 4.483 10.726 4.483H12.343V1.577S10.876 1.347 9.472 1.347C6.543 1.347 4.628 2.981 4.628 5.94V8.541H1.372V11.954H4.628V20.204H8.636V11.954H11.624Z" fill="white"/></svg> },
                                { href: settings?.instagramLink || '#', icon: <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M9 0C6.612 0 6.333 0.01 5.353 0.055C4.375 0.1 3.7 0.252 3.105 0.473C2.488 0.703 1.962 1.013 1.438 1.538C0.913 2.062 0.602 2.588 0.373 3.205C0.152 3.8 0 4.475 0 5.453C0 6.433 0 6.713 0 9C0 11.287 0.01 11.567 0.055 12.547C0.1 13.525 0.252 14.2 0.473 14.795C0.703 15.412 1.013 15.938 1.538 16.462C2.062 16.987 2.588 17.298 3.205 17.527C3.8 17.748 4.475 17.9 5.453 17.945C6.433 17.99 6.713 18 9 18C11.287 18 11.567 17.99 12.547 17.945C13.525 17.9 14.2 17.748 14.795 17.527C15.412 17.298 15.938 16.987 16.462 16.462C16.987 15.938 17.298 15.412 17.527 14.795C17.748 14.2 17.9 13.525 17.945 12.547C17.99 11.567 18 11.287 18 9C18 6.713 17.99 6.433 17.945 5.453C17.9 4.475 17.748 3.8 17.527 3.205C17.298 2.588 16.987 2.062 16.462 1.538C15.938 1.013 15.412 0.703 14.795 0.473C14.2 0.252 13.525 0.1 12.547 0.055C11.567 0.01 11.287 0 9 0ZM9 1.622C11.244 1.622 11.504 1.631 12.473 1.676C13.37 1.717 13.858 1.864 14.185 1.988C14.617 2.151 14.924 2.346 15.246 2.668C15.568 2.99 15.763 3.297 15.926 3.729C16.05 4.056 16.197 4.544 16.238 5.441C16.283 6.41 16.292 6.67 16.292 8.914C16.292 11.158 16.283 11.418 16.238 12.387C16.197 13.284 16.05 13.772 15.926 14.099C15.763 14.531 15.568 14.838 15.246 15.16C14.924 15.482 14.617 15.677 14.185 15.84C13.858 15.964 13.37 16.111 12.473 16.152C11.504 16.197 11.245 16.206 9 16.206C6.755 16.206 6.496 16.197 5.527 16.152C4.63 16.111 4.142 15.964 3.815 15.84C3.383 15.677 3.076 15.482 2.754 15.16C2.432 14.838 2.237 14.531 2.074 14.099C1.95 13.772 1.803 13.284 1.762 12.387C1.717 11.418 1.708 11.158 1.708 8.914C1.708 6.67 1.717 6.41 1.762 5.441C1.803 4.544 1.95 4.056 2.074 3.729C2.237 3.297 2.432 2.99 2.754 2.668C3.076 2.346 3.383 2.151 3.815 1.988C4.142 1.864 4.63 1.717 5.527 1.676C6.496 1.631 6.756 1.622 9 1.622ZM9 4.378C6.597 4.378 4.649 6.326 4.649 8.729C4.649 11.132 6.597 13.08 9 13.08C11.403 13.08 13.351 11.132 13.351 8.729C13.351 6.326 11.403 4.378 9 4.378ZM9 11.459C7.491 11.459 6.27 10.238 6.27 8.729C6.27 7.22 7.491 6 9 6C10.509 6 11.73 7.22 11.73 8.729C11.73 10.238 10.509 11.459 9 11.459ZM14.878 4.194C14.878 4.789 14.396 5.271 13.801 5.271C13.206 5.271 12.724 4.789 12.724 4.194C12.724 3.599 13.206 3.117 13.801 3.117C14.396 3.117 14.878 3.599 14.878 4.194Z" fill="white"/></svg> },
                                { href: settings?.linkedinLink || '#', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20.447 20.452H16.89V14.883C16.89 13.555 16.866 11.846 15.041 11.846C13.188 11.846 12.905 13.291 12.905 14.785V20.452H9.348V9H12.765V10.561H12.811C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166L20.447 20.452ZM5.337 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.337 3.305C6.477 3.305 7.401 4.23 7.401 5.368C7.401 6.507 6.476 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0H22.225Z" fill="white"/></svg> },
                                { href: settings?.twitterLink || '#', icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M9.353 6.887L14.647 0.734H13.393L8.796 6.077L5.125 0.734H0.89L6.442 8.813L0.89 15.267H2.145L6.999 9.624L10.876 15.267H15.111L9.353 6.887ZM7.635 8.885L7.073 8.08L2.597 1.678H4.524L8.136 6.845L8.698 7.649L13.393 14.365H11.466L7.635 8.885Z" fill="white"/></svg> },
                            ].map((s, i) => (
                                <a key={i} href={s.href} className="footer-social-icon" target="_blank" rel="noopener noreferrer">
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 2 — Our Campus */}
                    <div className="footer-col">
                        <div 
                            className={`footer-col-title ${openSection === 'campus' ? 'active' : ''}`}
                            onClick={() => toggleSection('campus')}
                        >
                            Our Campus
                            <i className="ri-arrow-down-s-line"></i>
                        </div>
                        <div className={`mobile-accordion-content ${openSection === 'campus' ? 'active' : ''}`}>
                            <ul className="footer-link-list">
                                {[
                                    { label: 'About Us', href: route('about') },
                                    { label: 'Alumni Network', href: '#' },
                                    { label: 'Campus Life', href: '#' },
                                    { label: 'Placements', href: route('placements') },
                                    { label: 'How to Apply', href: route('admission') },
                                ].map((item, i) => (
                                    <li key={i}>
                                        <Link href={item.href} className="footer-link-item">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Col 3 — Programs (dynamic) */}
                    <div className="footer-col">
                        <div 
                            className={`footer-col-title ${openSection === 'programs' ? 'active' : ''}`}
                            onClick={() => toggleSection('programs')}
                        >
                            Programs
                            <i className="ri-arrow-down-s-line"></i>
                        </div>
                        <div className={`mobile-accordion-content ${openSection === 'programs' ? 'active' : ''}`}>
                            <ul className="footer-link-list">
                                {sharedPrograms && sharedPrograms.length > 0
                                    ? sharedPrograms.map((p) => (
                                        <li key={p.id}>
                                            <Link href={route('program.index')} className="footer-link-item">
                                                {p.name}
                                            </Link>
                                        </li>
                                    ))
                                    : [
                                        { label: 'MBA Program', href: route('program.index') },
                                        { label: 'Graduate Programs', href: route('program.index') },
                                        { label: 'Faculty Areas', href: '#' },
                                        { label: 'Campus Events', href: '#' },
                                    ].map((item, i) => (
                                        <li key={i}>
                                            <Link href={item.href} className="footer-link-item">
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>

                    {/* Col 4 — Contact */}
                    <div className="footer-col">
                        <div className="footer-col-title">Contact Us</div>
                        <div>
                            {settings?.address && (
                                <div className="footer-contact-item">
                                    <div className="footer-contact-icon">
                                        <i className="ri-map-pin-2-fill"></i>
                                    </div>
                                    <div className="footer-contact-text">
                                        <span className="footer-contact-label">Address</span>
                                        <span className="footer-contact-value">{settings.address}</span>
                                    </div>
                                </div>
                            )}
                            <div className="footer-contact-item">
                                <div className="footer-contact-icon">
                                    <i className="ri-mail-send-fill"></i>
                                </div>
                                <div className="footer-contact-text">
                                    <span className="footer-contact-label">Email</span>
                                    <a href={`mailto:${settings?.supportEmail || 'info@school.edu'}`} className="footer-contact-value">
                                        {settings?.supportEmail || 'info@school.edu'}
                                    </a>
                                </div>
                            </div>
                            <div className="footer-contact-item">
                                <div className="footer-contact-icon">
                                    <i className="ri-phone-fill"></i>
                                </div>
                                <div className="footer-contact-text">
                                    <span className="footer-contact-label">Phone</span>
                                    <a href={`tel:${settings?.contactNumber || '+990123456789'}`} className="footer-contact-value">
                                        {settings?.contactNumber || '+990 123 456 789'}
                                    </a>
                                </div>
                            </div>
                            
                            <Link href={route('apply-now')} className="footer-apply-btn">
                                Apply Now <i className="ri-arrow-right-line"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── Bottom copyright bar ── */}
                <div className="footer-bottom">
                    <div className="footer-bottom-container">
                        <p className="footer-copyright">
                            © {currentYear} {settings?.institutionName || 'Versatile Business School'}. All rights reserved.
                        </p>
                        <div className="footer-bottom-links">
                            <Link href={route('terms')} className="footer-bottom-link">
                                Terms & Conditions
                            </Link>
                            <Link href={route('privacy')} className="footer-bottom-link">
                                Privacy Policy
                            </Link>
                            <Link href={route('contact')} className="footer-bottom-link">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
