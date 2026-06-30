import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import SitePopup from '../Components/SitePopup';
import WhatsAppChat from '../Components/WhatsAppChat';
import LeadBotChat from '../Components/LeadBotChat';
import TawkToChat from '../Components/TawkToChat';
import { usePage } from '@inertiajs/react';

export default function AppLayout({ title, children }) {
    const { settings } = usePage().props;
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
            
            {/* backto top start */}
            <div id="backtotop-wrap" style={{ transform: 'scale(1.3)', transformOrigin: 'bottom right' }}>
                <svg className="arrowicon" viewBox="0 0 24 24" width="18" height="18">
                    <path d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 4l7.778 7.778-1.414 1.414L13 7.828z" fill="#000">
                    </path>
                </svg>
                <svg className="scrollprogress" width="40" height="40">
                    <circle className="progress-circle" cx="20" cy="20" r="18" strokeWidth="2" fill="none" stroke="#fff" strokeDasharray="113.1" strokeDashoffset="113.1"></circle>
                </svg>
            </div>
            {/* backto top end */}
        </>
    );
}
