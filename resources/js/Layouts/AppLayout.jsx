import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import SitePopup from '../Components/SitePopup';
import WhatsAppChat from '../Components/WhatsAppChat';
import LeadBotChat from '../Components/LeadBotChat';
import TawkToChat from '../Components/TawkToChat';

export default function AppLayout({ title, children }) {
    const { settings } = usePage().props;
    
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(307.919);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            
            setShowTopBtn(scrollTop > 150);
            
            if (docHeight > winHeight) {
                const scrollPercent = scrollTop / (docHeight - winHeight);
                const offset = 307.919 - (307.919 * scrollPercent);
                setScrollProgress(offset);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Head title={title} />
            <Header />
            <main>
                {children}
            </main>
            <Footer />
            <SitePopup />
            {settings?.chat_type === 'tawkto' && (
                <TawkToChat propertyId={settings?.tawkto_property_id} widgetId={settings?.tawkto_widget_id || 'default'} />
            )}
            {settings?.chat_type === 'bot' && <LeadBotChat />}
            {(!settings?.chat_type || settings?.chat_type === 'whatsapp') && <WhatsAppChat />}
            
            {/* Scroll To Top Button (Native React) */}
            <div 
                id="react-backtotop-wrap" 
                onClick={scrollToTop}
                style={{ 
                    width: '46px', 
                    height: '46px',
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 999,
                    cursor: 'pointer',
                    background: 'var(--rs-theme-blue)',
                    borderRadius: '50%',
                    boxShadow: '0px 8px 16px rgba(3, 4, 28, 0.3)',
                    opacity: showTopBtn ? 1 : 0,
                    visibility: showTopBtn ? 'visible' : 'hidden',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{ position: 'absolute', inset: 0, padding: '2px' }}>
                    <svg width="100%" height="100%" viewBox="-1 -1 102 102" stroke="#ffffff" strokeWidth="4" fill="none">
                        <path 
                            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" 
                            style={{ 
                                fill: 'none',
                                strokeDasharray: '307.919, 307.919', 
                                strokeDashoffset: scrollProgress,
                                transition: 'stroke-dashoffset 0.1s ease-out'
                            }}
                        ></path>
                    </svg>
                </div>
                <i className="ri-arrow-up-s-line" style={{ fontSize: '24px', color: '#ffffff', zIndex: 2 }}></i>
            </div>
        </>
    );
}
