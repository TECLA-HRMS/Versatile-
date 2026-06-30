import React from 'react';
import { usePage } from '@inertiajs/react';

export default function WhatsAppChat() {
    const { settings } = usePage().props;
    
    // Default to a fallback number if not set in admin panel
    const rawPhone = settings?.whatsapp_number || settings?.phone || '+91 9876543210';
    const whatsappNumber = rawPhone.replace(/\D/g, '');

    const handleClick = () => {
        window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    };

    return (
        <div className="whatsapp-chat-widget">
            <style>{`
                .whatsapp-chat-widget {
                    position: fixed;
                    bottom: 90px;
                    right: 20px;
                    z-index: 9999;
                    font-family: 'Inter', sans-serif;
                }
                .wa-button {
                    width: 50px;
                    height: 50px;
                    background-color: #25d366;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                    outline: none;
                }
                .wa-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
                }
            `}</style>
            
            <button className="wa-button" onClick={handleClick} aria-label="Chat with us on WhatsApp">
                <i className="ri-whatsapp-line"></i>
            </button>
        </div>
    );
}
