import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import '../../css/admin-panel.css';
import '../../css/admin-table.css';

const assets = (path) => `${window.AppAssetUrl || '/'}${path.replace(/^\/+/, '')}`;

export default function AdminLayout({ children, title }) {
    const { post } = useForm();
    const { url, props } = usePage();
    const { settings = {}, flash, auth } = props;

    const userPermissions = auth?.user?.permissions || [];
    const isSuperAdmin = (auth?.user?.roles || []).includes('Super Admin');
    
    const hasPermission = (permission) => {
        if (isSuperAdmin) return true;
        return userPermissions.includes(permission);
    };

    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setToast({ type: 'success', message: flash.success, id: Date.now() });
        } else if (flash?.error) {
            setToast({ type: 'error', message: flash.error, id: Date.now() });
        }
    }, [flash]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const [isSidebarOpen, setIsSidebarOpen]   = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isMobile, setIsMobile]             = useState(false);
    const [theme, setTheme]                   = useState('light');
    const [sidebarColor, setSidebarColor]     = useState('navy');
    const [isProfileOpen, setIsProfileOpen]   = useState(false);
    const profileRef = useRef(null);

    // Detect mobile viewport
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close mobile sidebar on route change
    useEffect(() => {
        setIsMobileSidebarOpen(false);
    }, [url]);

    // Initialize theme / settings
    useEffect(() => {
        const activeTheme          = settings.theme        || localStorage.getItem('corp_theme')   || 'light';
        const activeSidebarColor   = settings.sidebarColor || localStorage.getItem('corp_sidebar') || '#1a365d';
        const activeButtonColor    = settings.buttonColor  || localStorage.getItem('corp_button')  || '#fdc72f';
        const activeFontFamily     = settings.fontFamily   || 'Inter';
        const activeBorderRadius   = settings.borderRadius || 'rounded';

        setTheme(activeTheme);
        setSidebarColor(activeSidebarColor);

        document.documentElement.setAttribute('data-theme',   activeTheme);
        document.documentElement.setAttribute('data-sidebar', activeSidebarColor);

        const fontFamilyVal = activeFontFamily === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${activeFontFamily}", sans-serif`;
        document.documentElement.style.setProperty('--font-family', fontFamilyVal);
        document.documentElement.style.setProperty('--bs-font-sans-serif', fontFamilyVal);
        document.documentElement.style.setProperty('--bs-body-font-family', fontFamilyVal);
        
        if (activeFontFamily !== 'system-ui') {
            let link = document.getElementById('dynamic-font');
            if (!link) {
                link = document.createElement('link');
                link.id = 'dynamic-font';
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }
            link.href = `https://fonts.googleapis.com/css2?family=${activeFontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap`;
        }

        const radii = {
            sharp:   ['0px',  '0px',  '0px'],
            pill:    ['8px',  '16px', '24px'],
            rounded: ['4px',  '8px',  '12px'],
        };
        const [sm, md, lg] = radii[activeBorderRadius] || radii.rounded;
        document.documentElement.style.setProperty('--radius-sm', sm);
        document.documentElement.style.setProperty('--radius-md', md);
        document.documentElement.style.setProperty('--radius-lg', lg);
        
        document.documentElement.style.setProperty('--bs-border-radius', md);
        document.documentElement.style.setProperty('--bs-border-radius-sm', sm);
        document.documentElement.style.setProperty('--bs-border-radius-lg', lg);
        document.documentElement.style.setProperty('--bs-border-radius-xl', lg);
        document.documentElement.style.setProperty('--bs-border-radius-2xl', lg);

        if (activeSidebarColor.startsWith('#')) {
            document.documentElement.style.setProperty('--primary-color', activeSidebarColor);
        }
        if (activeButtonColor.startsWith('#')) {
            document.documentElement.style.setProperty('--accent-yellow', activeButtonColor);
        }

        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        const handleAppearanceChange = (e) => {
            if (!e.detail) return;
            const d = e.detail;
            if (d.theme) {
                setTheme(d.theme);
                document.documentElement.setAttribute('data-theme', d.theme);
                localStorage.setItem('corp_theme', d.theme);
            }
            if (d.sidebarColor) {
                setSidebarColor(d.sidebarColor);
                document.documentElement.setAttribute('data-sidebar', d.sidebarColor);
                localStorage.setItem('corp_sidebar', d.sidebarColor);
                if (d.sidebarColor.startsWith('#')) {
                    document.documentElement.style.setProperty('--primary-color', d.sidebarColor);
                } else {
                    document.documentElement.style.removeProperty('--primary-color');
                }
            }
            if (d.buttonColor) {
                localStorage.setItem('corp_button', d.buttonColor);
                document.documentElement.style.setProperty('--accent-yellow', d.buttonColor);
            }
            if (d.fontFamily) {
                const fontFamilyVal = d.fontFamily === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : `"${d.fontFamily}", sans-serif`;
                document.documentElement.style.setProperty('--font-family', fontFamilyVal);
                document.documentElement.style.setProperty('--bs-font-sans-serif', fontFamilyVal);
                document.documentElement.style.setProperty('--bs-body-font-family', fontFamilyVal);
                
                if (d.fontFamily !== 'system-ui') {
                    let link = document.getElementById('dynamic-font');
                    if (!link) {
                        link = document.createElement('link');
                        link.id = 'dynamic-font';
                        link.rel = 'stylesheet';
                        document.head.appendChild(link);
                    }
                    link.href = `https://fonts.googleapis.com/css2?family=${d.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap`;
                }
            }
            if (d.borderRadius) {
                const [sm, md, lg] = radii[d.borderRadius] || radii.rounded;
                document.documentElement.style.setProperty('--radius-sm', sm);
                document.documentElement.style.setProperty('--radius-md', md);
                document.documentElement.style.setProperty('--radius-lg', lg);
                
                document.documentElement.style.setProperty('--bs-border-radius', md);
                document.documentElement.style.setProperty('--bs-border-radius-sm', sm);
                document.documentElement.style.setProperty('--bs-border-radius-lg', lg);
                document.documentElement.style.setProperty('--bs-border-radius-xl', lg);
                document.documentElement.style.setProperty('--bs-border-radius-2xl', lg);
            }
        };

        window.addEventListener('appearance-changed', handleAppearanceChange);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('appearance-changed', handleAppearanceChange);
        };
    }, [settings]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('corp_theme', newTheme);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        post(assets('admin/logout'));
    };

    const isActive = (path) => url.startsWith(path) ? 'active' : '';

    /* Shared sidebar nav markup so it renders identically in both the
       desktop aside and the mobile drawer */
    const SidebarNav = () => (
        <>
            <Link href={assets('admin/dashboard')} className="sidebar-brand">
                <img
                    src={
                        isSidebarOpen
                            ? (settings.sidebar_logo || assets('assets/images/logo/logo-v.png'))
                            : (settings.sidebar_closed_logo || assets('assets/images/logo/remove-bg.png'))
                    }
                    alt="Versatile Business School Logo"
                    className="brand-image"
                />
            </Link>

            <nav className="sidebar-nav">
                {hasPermission('view dashboard') && (
                    <div className="nav-group">
                        <div className="nav-heading">Main Menu</div>
                        <Link href={assets('admin/dashboard')} className={`nav-item ${url.includes('/admin/dashboard') ? 'active' : ''}`} title="Dashboard">
                            <i className="ri-dashboard-line nav-icon"></i>
                            <span className="nav-label">Dashboard</span>
                        </Link>
                    </div>
                )}

                {(hasPermission('view programs') || hasPermission('view courses') || hasPermission('view banners') || hasPermission('view popups') || hasPermission('view enquiries') || hasPermission('view applications')) && (
                    <div className="nav-group mt-4">
                        <div className="nav-heading">Academics</div>
                        {hasPermission('view programs') && (
                            <Link href={assets('admin/programs')} className={`nav-item ${url.includes('/admin/programs') ? 'active' : ''}`} title="Programs">
                                <i className="ri-book-3-line nav-icon"></i>
                                <span className="nav-label">Programs</span>
                            </Link>
                        )}
                        {hasPermission('view courses') && (
                            <Link href={assets('admin/courses')} className={`nav-item ${url.includes('/admin/courses') ? 'active' : ''}`} title="Courses">
                                <i className="ri-graduation-cap-line nav-icon"></i>
                                <span className="nav-label">Courses</span>
                            </Link>
                        )}
                        {hasPermission('view banners') && (
                            <Link href={assets('admin/banners')} className={`nav-item ${url.includes('/admin/banners') ? 'active' : ''}`} title="Banners">
                                <i className="ri-image-line nav-icon"></i>
                                <span className="nav-label">Banners</span>
                            </Link>
                        )}
                        {hasPermission('view popups') && (
                            <Link href={assets('admin/popups')} className={`nav-item ${url.includes('/admin/popups') ? 'active' : ''}`} title="Popups">
                                <i className="ri-window-line nav-icon"></i>
                                <span className="nav-label">Popups</span>
                            </Link>
                        )}
                        {hasPermission('view enquiries') && (
                            <Link href={assets('admin/enquiries')} className={`nav-item ${url.includes('/admin/enquiries') ? 'active' : ''}`} title="Enquiries">
                                <i className="ri-mail-send-line nav-icon"></i>
                                <span className="nav-label">Enquiries</span>
                            </Link>
                        )}
                        {hasPermission('view applications') && (
                            <Link href={assets('admin/applications')} className={`nav-item ${url.includes('/admin/applications') ? 'active' : ''}`} title="Applications">
                                <i className="ri-file-user-line nav-icon"></i>
                                <span className="nav-label">Applications</span>
                            </Link>
                        )}
                    </div>
                )}

                {(hasPermission('view users') || hasPermission('view roles') || hasPermission('manage notification emails') || hasPermission('manage settings')) && (
                    <div className="nav-group mt-4">
                        <div className="nav-heading">System</div>
                        {hasPermission('view users') && (
                            <Link href={assets('admin/users')} className={`nav-item ${url.includes('/admin/users') ? 'active' : ''}`} title="Users">
                                <i className="ri-user-settings-line nav-icon"></i>
                                <span className="nav-label">Users</span>
                            </Link>
                        )}
                        {hasPermission('view roles') && (
                            <Link href={assets('admin/roles')} className={`nav-item ${url.includes('/admin/roles') ? 'active' : ''}`} title="Roles & Permissions">
                                <i className="ri-shield-keyhole-line nav-icon"></i>
                                <span className="nav-label">Roles & Permissions</span>
                            </Link>
                        )}
                        {hasPermission('manage notification emails') && (
                            <Link href={assets('admin/notification-emails')} className={`nav-item ${url.includes('/admin/notification-emails') ? 'active' : ''}`} title="Notification Emails">
                                <i className="ri-mail-star-line nav-icon"></i>
                                <span className="nav-label">Notification Emails</span>
                            </Link>
                        )}
                        {hasPermission('manage settings') && (
                            <Link href={assets('admin/settings')} className={`nav-item ${url.includes('/admin/settings') ? 'active' : ''}`} title="System Settings">
                                <i className="ri-settings-4-line nav-icon"></i>
                                <span className="nav-label">System Settings</span>
                            </Link>
                        )}
                        {hasPermission('manage settings') && (
                            <Link href={assets('admin/activity-logs')} className={`nav-item ${url.includes('/admin/activity-logs') ? 'active' : ''}`} title="Activity Logs">
                                <i className="ri-history-line nav-icon"></i>
                                <span className="nav-label">Activity Logs</span>
                            </Link>
                        )}
                    </div>
                )}
            </nav>

            <div className="sidebar-footer">
                <div className="user-block">
                    <div className="user-avatar" title={auth?.user?.name || 'Administrator'} style={auth?.user?.profile_photo_url ? {background: 'transparent', padding: 0} : {}}>
                        {auth?.user?.profile_photo_url ? (
                            <img src={auth?.user?.profile_photo_url} alt="Profile" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                        ) : (
                            <span>{(auth?.user?.name || 'A').charAt(0).toUpperCase()}</span>
                        )}
                    </div>
                    <div className="user-details">
                        <div className="user-name">{auth?.user?.name || 'Administrator'}</div>
                        <div className="user-email">{auth?.user?.email || 'admin@versatile.edu'}</div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className={`corp-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Head title={`${title} | Versatile Business School`} />

            {/* ── Mobile overlay backdrop ───────────────────── */}
            {isMobileSidebarOpen && (
                <div
                    className="mobile-sidebar-backdrop"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* ── Mobile slide-in drawer ────────────────────── */}
            <aside className={`mobile-sidebar-drawer ${isMobileSidebarOpen ? 'open' : ''}`}>
                <button
                    className="mobile-sidebar-close"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    aria-label="Close menu"
                >
                    <i className="ri-close-line"></i>
                </button>
                <SidebarNav />
            </aside>

            {/* ── Desktop sidebar ───────────────────────────── */}
            <aside className="corp-sidebar desktop-only">
                <SidebarNav />
            </aside>

            {/* ── Main workspace ────────────────────────────── */}
            <div className="corp-workspace">

                {/* Top header */}
                <header className="corp-header">
                    <div className="header-left">
                        {/* Desktop: toggle collapse / Mobile: open drawer */}
                        <button
                            className="toggle-sidebar-btn"
                            onClick={() => isMobile
                                ? setIsMobileSidebarOpen(true)
                                : setIsSidebarOpen(!isSidebarOpen)
                            }
                            aria-label="Toggle sidebar"
                        >
                            <i className="ri-menu-line"></i>
                        </button>

                        {/* Search — hidden on small mobile */}
                        <div className="header-search hide-on-mobile">
                            <i className="ri-search-line search-icon"></i>
                            <input
                                type="text"
                                placeholder="Search student ID, application..."
                                className="search-input"
                            />
                        </div>
                    </div>

                    <div className="header-right">
                        {/* Mobile search icon */}
                        <button className="mobile-search-btn show-on-mobile" aria-label="Search">
                            <i className="ri-search-line"></i>
                        </button>


                        <div className="header-action border-left">
                            <div className="profile-dropdown-wrapper" ref={profileRef}>
                                <button
                                    className="profile-trigger"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                >
                                    <div className="profile-avatar-small" style={auth?.user?.profile_photo_url ? {background: 'transparent', padding: 0} : {}}>
                                        {auth?.user?.profile_photo_url ? (
                                            <img src={auth?.user?.profile_photo_url} alt="Profile" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                                        ) : (
                                            (auth?.user?.name || 'A').charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    {/* Name hidden on mobile */}
                                    <div className="profile-info hide-on-mobile">
                                        <span className="profile-name">{auth?.user?.name || 'Administrator'}</span>
                                        <span className="profile-role">{auth?.user?.roles?.[0] || 'Admin'}</span>
                                    </div>
                                    <i className="ri-arrow-down-s-line hide-on-mobile"></i>
                                </button>

                                <div className={`profile-dropdown-menu ${isProfileOpen ? 'show' : ''}`}>
                                    <div className="dropdown-header">
                                        <h6>{auth?.user?.name || 'Administrator'}</h6>
                                        <p>{auth?.user?.email || 'admin@versatile.edu'}</p>
                                    </div>
                                    <Link href={assets('admin/profile')} className="dropdown-item">
                                        <i className="ri-user-line"></i> View Profile
                                    </Link>
                                    {auth?.user?.permissions?.includes('manage settings') && (
                                        <Link href={assets('admin/settings')} className="dropdown-item">
                                            <i className="ri-settings-3-line"></i> Account Settings
                                        </Link>
                                    )}
                                    <div className="dropdown-divider"></div>
                                    <button onClick={handleLogout} className="dropdown-item text-danger">
                                        <i className="ri-logout-box-r-line"></i> Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="corp-main">
                    {children}
                </main>
            </div>

            {toast && (
                <div style={{
                    position: 'fixed',
                    top: '24px',
                    right: '24px',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: '#ffffff',
                    color: '#1e293b',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    borderLeft: `4px solid ${toast.type === 'success' ? '#10b981' : '#ef4444'}`,
                    animation: 'slideInToast 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    fontFamily: 'var(--font-family, system-ui, sans-serif)',
                    fontWeight: 500,
                    fontSize: '14px',
                    minWidth: '300px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: toast.type === 'success' ? '#d1fae5' : '#fee2e2',
                        color: toast.type === 'success' ? '#10b981' : '#ef4444',
                        borderRadius: '50%', padding: '6px'
                    }}>
                        {toast.type === 'success' ? <CheckCircle size={20} strokeWidth={2.5} /> : <XCircle size={20} strokeWidth={2.5} />}
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                            {toast.type === 'success' ? 'Success' : 'Error'}
                        </span>
                        <span style={{ fontSize: '15px', color: '#0f172a', fontWeight: 500 }}>{toast.message}</span>
                    </div>
                    <button onClick={() => setToast(null)} style={{
                        background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer',
                        padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '6px', transition: 'background 0.2s', alignSelf: 'flex-start', marginTop: '-4px', marginRight: '-8px'
                    }} onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                        <X size={18} />
                    </button>
                    <style>{`
                        @keyframes slideInToast {
                            0% { transform: translateX(120%); opacity: 0; }
                            100% { transform: translateX(0); opacity: 1; }
                        }
                    `}</style>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '3px',
                        background: toast.type === 'success' ? '#10b981' : '#ef4444',
                        animation: 'toastProgress 2s linear forwards',
                    }} />
                    <style>{`
                        @keyframes toastProgress {
                            0% { width: 100%; }
                            100% { width: 0%; }
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
}
