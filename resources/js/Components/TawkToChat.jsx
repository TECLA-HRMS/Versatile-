import { useEffect } from 'react';

export default function TawkToChat({ propertyId, widgetId = 'default' }) {
    useEffect(() => {
        if (!propertyId) return;

        // If the script is already fully loaded, just show the widget
        if (window.Tawk_API && window.Tawk_API.showWidget && document.querySelector(`script[src*="tawk.to"]`)) {
            try {
                window.Tawk_API.showWidget();
            } catch (e) {}
            return; // Don't inject again
        }

        // Cleanup any partial/existing Tawk.to scripts to ensure fresh start
        const existingScripts = document.querySelectorAll(`script[src*="tawk.to"]`);
        existingScripts.forEach(script => script.remove());

        // Standard Tawk.to Snippet - MUST BE GLOBAL
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();
        
        // Custom styling to fix overlap with scroll-to-top button
        window.Tawk_API.customStyle = {
            visibility: {
                desktop: {
                    position: 'br',
                    xOffset: 20,
                    yOffset: 90
                },
                mobile: {
                    position: 'br',
                    xOffset: 20,
                    yOffset: 90
                }
            }
        };
        
        var s1 = document.createElement("script");
        var s0 = document.getElementsByTagName("script")[0];
        
        s1.async = true;
        s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        
        if (s0 && s0.parentNode) {
            s0.parentNode.insertBefore(s1, s0);
        } else {
            document.head.appendChild(s1);
        }

        return () => {
            // When component unmounts, we should hide the widget if it exists
            if (window.Tawk_API && window.Tawk_API.hideWidget) {
                try {
                    window.Tawk_API.hideWidget();
                } catch (e) {
                    // Ignore errors
                }
            }
        };
    }, [propertyId, widgetId]);

    return null;
}
