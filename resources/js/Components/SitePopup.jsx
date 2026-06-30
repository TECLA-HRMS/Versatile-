import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { X } from 'lucide-react';

export default function SitePopup() {
    const { sitePopup } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // If there is an active popup from backend
        if (sitePopup) {
            // Check if user has already seen this specific popup in the current session
            const hasSeenPopup = sessionStorage.getItem(`seen_popup_${sitePopup.id}`);
            
            if (!hasSeenPopup) {
                // Add a small delay for better UX
                const timer = setTimeout(() => {
                    setIsOpen(true);
                }, 1000);
                
                return () => clearTimeout(timer);
            }
        }
    }, [sitePopup]);

    const handleClose = () => {
        setIsOpen(false);
        if (sitePopup) {
            // Mark this specific popup as seen for this session
            sessionStorage.setItem(`seen_popup_${sitePopup.id}`, 'true');
        }
    };

    if (!isOpen || !sitePopup) return null;

    // Content of the popup
    const PopupContent = () => (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {sitePopup.image && (
                <img 
                    src={window.assets(sitePopup.image)} 
                    alt={sitePopup.title || 'Announcement'} 
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }}
                />
            )}
            
            {(sitePopup.title || sitePopup.content) && (
                <div style={{ padding: sitePopup.image ? '24px' : '32px' }}>
                    {sitePopup.title && (
                        <h3 style={{ 
                            fontSize: '24px', 
                            fontWeight: '700', 
                            color: '#0f2744', 
                            marginBottom: sitePopup.content ? '12px' : '0'
                        }}>
                            {sitePopup.title}
                        </h3>
                    )}
                    {sitePopup.content && (
                        <p style={{ 
                            fontSize: '16px', 
                            color: '#475569', 
                            lineHeight: '1.6', 
                            margin: 0,
                            whiteSpace: 'pre-wrap'
                        }}>
                            {sitePopup.content}
                        </p>
                    )}
                    {sitePopup.link && !sitePopup.image && (
                        <div style={{ marginTop: '24px', textAlign: 'center' }}>
                            <Link 
                                href={sitePopup.link} 
                                className="rs-btn has-theme-yellow"
                                onClick={handleClose}
                                style={{ display: 'inline-block', padding: '12px 30px' }}
                            >
                                Learn More
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <>
            <div 
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(15, 39, 68, 0.7)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 999998,
                    animation: 'fadeIn 0.3s ease-out forwards'
                }}
                onClick={handleClose}
            />
            <div 
                style={{
                    position: 'fixed',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 999999,
                    width: '90%',
                    maxWidth: sitePopup.image && !sitePopup.content && !sitePopup.title ? 'max-content' : '500px',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    animation: 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    overflow: 'hidden'
                }}
            >
                <button 
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '12px', right: '12px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px', height: '32px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        color: '#0f2744',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                >
                    <X size={20} strokeWidth={2.5} />
                </button>
                
                {sitePopup.link && sitePopup.image ? (
                    <Link href={sitePopup.link} onClick={handleClose} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                        <PopupContent />
                    </Link>
                ) : (
                    <PopupContent />
                )}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: translate(-50%, -45%) scale(0.95); }
                    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
            `}</style>
        </>
    );
}
