import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

window.assets = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) return path;
    const base = window.AppAssetUrl || '/';
    return `${base}${path.replace(/^\/+/, '')}`;
};

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: false,
});

import { router } from '@inertiajs/react';

router.on('navigate', () => {
    const assetBase = window.AppAssetUrl || '/';
    const scripts = [
        `${assetBase}assets/js/main.js`
    ];
    
    scripts.forEach(src => {
        const oldScript = document.querySelector(`script[src="${src}"]`);
        if (oldScript) {
            oldScript.remove();
        }
        const newScript = document.createElement('script');
        newScript.src = src;
        newScript.defer = true;
        document.body.appendChild(newScript);
    });
});
