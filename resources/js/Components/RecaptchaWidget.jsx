import React, { useEffect, useRef } from 'react';

/**
 * RecaptchaWidget
 *
 * Props:
 *  - siteKey (string)   : Google reCAPTCHA v2 site key
 *  - onVerify (function): called with token string when user passes the challenge
 *  - onExpire (function): called when the token expires
 *  - error (string)     : validation error message to display below widget
 */
export default function RecaptchaWidget({ siteKey, onVerify, onExpire, error }) {
    const containerRef = useRef(null);
    const widgetIdRef  = useRef(null);

    useEffect(() => {
        if (!siteKey) return;

        const SCRIPT_ID = 'google-recaptcha-script';

        const renderWidget = () => {
            if (!containerRef.current) return;
            // Avoid double-rendering
            if (widgetIdRef.current !== null) return;

            widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
                sitekey:           siteKey,
                callback:          onVerify  || (() => {}),
                'expired-callback': onExpire || (() => {}),
            });
        };

        if (window.grecaptcha && window.grecaptcha.render) {
            renderWidget();
        } else if (!document.getElementById(SCRIPT_ID)) {
            // Load the script once, then render on ready
            window.__recaptchaOnLoad = renderWidget;
            const script       = document.createElement('script');
            script.id          = SCRIPT_ID;
            script.src         = `https://www.google.com/recaptcha/api.js?onload=__recaptchaOnLoad&render=explicit`;
            script.async       = true;
            script.defer       = true;
            document.head.appendChild(script);
        } else {
            // Script tag exists but grecaptcha not ready yet — wait
            const interval = setInterval(() => {
                if (window.grecaptcha && window.grecaptcha.render) {
                    clearInterval(interval);
                    renderWidget();
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [siteKey]);

    if (!siteKey) return null;

    return (
        <div style={{ margin: '16px 0' }}>
            <div ref={containerRef} />
            {error && (
                <div style={{
                    display:      'flex',
                    alignItems:   'center',
                    gap:          '6px',
                    marginTop:    '8px',
                    padding:      '8px 12px',
                    background:   '#fef2f2',
                    border:       '1px solid #fecaca',
                    borderRadius: '6px',
                    color:        '#dc2626',
                    fontSize:     '13px',
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    {error}
                </div>
            )}
        </div>
    );
}
