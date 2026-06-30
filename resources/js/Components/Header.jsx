import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

const HeaderContent = ({ onMenuClick, menuId = "mobile-menu" }) => {
    const { settings, sharedPrograms } = usePage().props;

    return (
        <>
            <div className="header-left">
                <div className="header-logo">
                    <Link href={route('home')}>
                        <img src={settings?.header_logo || "/assets/images/logo/logo.jpeg"} alt="logo" style={{ maxHeight: '80px', width: 'auto' }} loading="lazy" />
                    </Link>
                </div>
            </div>
            <div className="header-menu">
                <nav id={menuId} className="main-menu d-none d-xl-block">
                    <ul className="multipage-menu">
                        <li>
                            <Link href={route('home')}>Home</Link>
                        </li>
                        <li>
                            <Link href={route('about')}>About Us</Link>
                        </li>
                        {/* Academics dropdown — dynamic from backend */}
                        <li className="menu-item-has-children">
                            <a href="javascript:void(0)">Academics</a>
                            <ul className="submenu">
                                {sharedPrograms && sharedPrograms.length > 0 ? (
                                    sharedPrograms.map((program) => (
                                        <li key={program.id} className={program.courses && program.courses.length > 0 ? 'menu-item-has-children' : ''}>
                                            <Link href={route('program.index')}>{program.name}</Link>
                                            {program.courses && program.courses.length > 0 && (
                                                <ul className="submenu">
                                                    {program.courses.map((course) => (
                                                        <li key={course.id}>
                                                            <Link href={route('program.show', { programSlug: program.slug, courseSlug: course.slug })}>
                                                                {course.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <li><Link href={route('program.index')}>All Programs</Link></li>
                                )}
                            </ul>
                        </li>
                        <li>
                            <Link href={route('admission')}>Admission</Link>
                        </li>
                        <li>
                            <Link href={route('placements')}>Placements</Link>
                        </li>
                        <li>
                            <Link href={route('contact')}>Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="header-right">
                <div className="header-icon-wrapper">
                    {/* search area removed */}
                    {/* hamburger start */}
                    <div className="header-hamburger d-block d-xl-none">
                        <div className="sidebar-toggle">
                            <Link className="header-bar-icon" href="#" onClick={(e) => { e.preventDefault(); onMenuClick(); }}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </Link>
                        </div>
                    </div>
                    {/* hamburger end */}
                </div>
                {/* button start */}
                <div className="header-btn">
                    <Link className="rs-btn has-icon has-theme-yellow hover-white" href={route('apply-now')}>
                        <span className="btn-text-wrap">
                            <span className="text-default">Apply Now</span>
                            <span className="text-hover">Apply Now</span>
                        </span>
                        <span className="icon-box">
                            <svg className="icon-first" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
                                <path
                                    d="M10.2705 0C9.24524 0 8.41799 -1.11759e-08 7.76774 0.08775C7.09274 0.17775 6.52424 0.37275 6.07274 0.8235C5.67974 1.21725 5.48024 1.701 5.37599 2.2695C5.27474 2.82225 5.25524 3.498 5.25074 4.3095C5.24994 4.45868 5.30845 4.60207 5.41337 4.70813C5.5183 4.81418 5.66106 4.8742 5.81024 4.875C5.95942 4.8758 6.10282 4.8173 6.20887 4.71237C6.31492 4.60744 6.37494 4.46468 6.37574 4.3155C6.38024 3.49575 6.40124 2.9145 6.48224 2.47275C6.56099 2.04825 6.68624 1.8015 6.86849 1.61925C7.07624 1.4115 7.36799 1.2765 7.91849 1.20225C8.48474 1.1265 9.23549 1.125 10.3117 1.125H11.0617C12.1387 1.125 12.8895 1.1265 13.4557 1.20225C14.0062 1.2765 14.2972 1.41225 14.5057 1.61925C14.7142 1.82625 14.8477 2.118 14.922 2.66925C14.9985 3.23475 14.9992 3.98625 14.9992 5.0625V11.0625C14.9992 12.1388 14.9985 12.8902 14.922 13.4565C14.8477 14.007 14.7127 14.298 14.505 14.5057C14.2972 14.7135 14.0062 14.8485 13.4557 14.9227C12.8895 14.9985 12.1387 15 11.0617 15H10.3117C9.23549 15 8.48474 14.9985 7.91774 14.9227C7.36799 14.8485 7.07624 14.7127 6.86849 14.5057C6.68624 14.3235 6.56099 14.0767 6.48224 13.6522C6.40124 13.2105 6.38024 12.6293 6.37574 11.8095C6.37535 11.7356 6.36041 11.6626 6.33177 11.5945C6.30314 11.5264 6.26138 11.4646 6.20887 11.4126C6.15636 11.3607 6.09413 11.3196 6.02573 11.2917C5.95733 11.2638 5.88411 11.2496 5.81024 11.25C5.73637 11.2504 5.6633 11.2653 5.59521 11.294C5.52711 11.3226 5.46533 11.3644 5.41337 11.4169C5.36142 11.4694 5.32031 11.5316 5.29241 11.6C5.26451 11.6684 5.25035 11.7416 5.25074 11.8155C5.25524 12.627 5.27474 13.3028 5.37599 13.8555C5.48099 14.424 5.67974 14.9078 6.07349 15.3015C6.52424 15.753 7.09349 15.9465 7.76849 16.038C8.41799 16.125 9.24524 16.125 10.2705 16.125H11.103C12.129 16.125 12.9555 16.125 13.6057 16.0373C14.2807 15.9472 14.8492 15.7523 15.3007 15.3015C15.7522 14.85 15.9457 14.2815 16.0372 13.6065C16.1242 12.9563 16.1242 12.129 16.1242 11.1038V5.02125C16.1242 3.996 16.1242 3.16875 16.0372 2.5185C15.9465 1.8435 15.7522 1.275 15.3007 0.8235C14.8492 0.372 14.2807 0.1785 13.6057 0.08775C12.9555 -1.11759e-08 12.1282 0 11.103 0H10.2705Z">
                                </path>
                                <path
                                    d="M0.5625 7.4993C0.413316 7.4993 0.270242 7.55856 0.164752 7.66405C0.0592632 7.76954 0 7.91261 0 8.0618C0 8.21098 0.0592632 8.35406 0.164752 8.45954C0.270242 8.56503 0.413316 8.6243 0.5625 8.6243H9.54225L8.0715 9.8843C8.01536 9.93236 7.96924 9.99101 7.93576 10.0569C7.90229 10.1228 7.88212 10.1946 7.87641 10.2683C7.86488 10.4171 7.91293 10.5644 8.01 10.6778C8.10707 10.7912 8.2452 10.8614 8.39401 10.8729C8.54282 10.8844 8.69012 10.8364 8.8035 10.7393L11.4285 8.4893C11.4903 8.43649 11.5398 8.37093 11.5738 8.29713C11.6078 8.22334 11.6254 8.14305 11.6254 8.0618C11.6254 7.98055 11.6078 7.90026 11.5738 7.82646C11.5398 7.75266 11.4903 7.6871 11.4285 7.6343L8.8035 5.3843C8.69012 5.28723 8.54282 5.23917 8.39401 5.25071C8.2452 5.26224 8.10707 5.33242 8.01 5.4458C7.91293 5.55918 7.86488 5.70647 7.87641 5.85528C7.88794 6.00409 7.95812 6.14223 8.0715 6.2393L9.5415 7.4993H0.5625Z">
                                </path>
                            </svg>

                            <svg className="icon-second" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
                                <path
                                    d="M10.2705 0C9.24524 0 8.41799 -1.11759e-08 7.76774 0.08775C7.09274 0.17775 6.52424 0.37275 6.07274 0.8235C5.67974 1.21725 5.48024 1.701 5.37599 2.2695C5.27474 2.82225 5.25524 3.498 5.25074 4.3095C5.24994 4.45868 5.30845 4.60207 5.41337 4.70813C5.5183 4.81418 5.66106 4.8742 5.81024 4.875C5.95942 4.8758 6.10282 4.8173 6.20887 4.71237C6.31492 4.60744 6.37494 4.46468 6.37574 4.3155C6.38024 3.49575 6.40124 2.9145 6.48224 2.47275C6.56099 2.04825 6.68624 1.8015 6.86849 1.61925C7.07624 1.4115 7.36799 1.2765 7.91849 1.20225C8.48474 1.1265 9.23549 1.125 10.3117 1.125H11.0617C12.1387 1.125 12.8895 1.1265 13.4557 1.20225C14.0062 1.2765 14.2972 1.41225 14.5057 1.61925C14.7142 1.82625 14.8477 2.118 14.922 2.66925C14.9985 3.23475 14.9992 3.98625 14.9992 5.0625V11.0625C14.9992 12.1388 14.9985 12.8902 14.922 13.4565C14.8477 14.007 14.7127 14.298 14.505 14.5057C14.2972 14.7135 14.0062 14.8485 13.4557 14.9227C12.8895 14.9985 12.1387 15 11.0617 15H10.3117C9.23549 15 8.48474 14.9985 7.91774 14.9227C7.36799 14.8485 7.07624 14.7127 6.86849 14.5057C6.68624 14.3235 6.56099 14.0767 6.48224 13.6522C6.40124 13.2105 6.38024 12.6293 6.37574 11.8095C6.37535 11.7356 6.36041 11.6626 6.33177 11.5945C6.30314 11.5264 6.26138 11.4646 6.20887 11.4126C6.15636 11.3607 6.09413 11.3196 6.02573 11.2917C5.95733 11.2638 5.88411 11.2496 5.81024 11.25C5.73637 11.2504 5.6633 11.2653 5.59521 11.294C5.52711 11.3226 5.46533 11.3644 5.41337 11.4169C5.36142 11.4694 5.32031 11.5316 5.29241 11.6C5.26451 11.6684 5.25035 11.7416 5.25074 11.8155C5.25524 12.627 5.27474 13.3028 5.37599 13.8555C5.48099 14.424 5.67974 14.9078 6.07349 15.3015C6.52424 15.753 7.09349 15.9465 7.76849 16.038C8.41799 16.125 9.24524 16.125 10.2705 16.125H11.103C12.129 16.125 12.9555 16.125 13.6057 16.0373C14.2807 15.9472 14.8492 15.7523 15.3007 15.3015C15.7522 14.85 15.9457 14.2815 16.0372 13.6065C16.1242 12.9563 16.1242 12.129 16.1242 11.1038V5.02125C16.1242 3.996 16.1242 3.16875 16.0372 2.5185C15.9465 1.8435 15.7522 1.275 15.3007 0.8235C14.8492 0.372 14.2807 0.1785 13.6057 0.08775C12.9555 -1.11759e-08 12.1282 0 11.103 0H10.2705Z">
                                </path>
                                <path
                                    d="M0.5625 7.4993C0.413316 7.4993 0.270242 7.55856 0.164752 7.66405C0.0592632 7.76954 0 7.91261 0 8.0618C0 8.21098 0.0592632 8.35406 0.164752 8.45954C0.270242 8.56503 0.413316 8.6243 0.5625 8.6243H9.54225L8.0715 9.8843C8.01536 9.93236 7.96924 9.99101 7.93576 10.0569C7.90229 10.1228 7.88212 10.1946 7.87641 10.2683C7.86488 10.4171 7.91293 10.5644 8.01 10.6778C8.10707 10.7912 8.2452 10.8614 8.39401 10.8729C8.54282 10.8844 8.69012 10.8364 8.8035 10.7393L11.4285 8.4893C11.4903 8.43649 11.5398 8.37093 11.5738 8.29713C11.6078 8.22334 11.6254 8.14305 11.6254 8.0618C11.6254 7.98055 11.6078 7.90026 11.5738 7.82646C11.5398 7.75266 11.4903 7.6871 11.4285 7.6343L8.8035 5.3843C8.69012 5.28723 8.54282 5.23917 8.39401 5.25071C8.2452 5.26224 8.10707 5.33242 8.01 5.4458C7.91293 5.55918 7.86488 5.70647 7.87641 5.85528C7.88794 6.00409 7.95812 6.14223 8.0715 6.2393L9.5415 7.4993H0.5625Z">
                                </path>
                            </svg>
                        </span>
                    </Link>
                </div>
                {/* button end */}
            </div>

        </>
    );
};

export default function Header() {
    const { settings } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            {/* Sticky Header */}
            <header>
                <div className="rs-header-area rs-header-one">
                    <div className="container-fluid g-0">
                        <div id="rs-sticky-header" className={`header-wrapper rs-sticky-header has-bg ${isSticky ? 'active' : ''}`}>
                            <HeaderContent onMenuClick={toggleMenu} menuId="mobile-menu-sticky" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Normal/Static Header */}
            <header>
                <div className="rs-header-area rs-header-one header-transparent has-space-two">
                    <div className="container-fluid g-0">
                        <div className="header-wrapper has-bg">
                            <HeaderContent onMenuClick={toggleMenu} menuId="mobile-menu" />
                        </div>
                    </div>
                </div>
            </header>
            {/* Offcanvas area start */}
            <div className="fix">
                <div className={`offcanvas-area has-theme-yellow ${isMenuOpen ? "info-open" : ""}`} data-lenis-prevent="">
                    <div className="offcanvas-wrapper">
                        <div className="offcanvas-content">
                            <div className="offcanvas-top d-flex justify-content-between align-items-center mb-20">
                                <div className="offcanvas-logo">
                                    <Link className="logo-black" href={route('home')}>
                                        <img src={settings?.header_logo || "/assets/images/logo/logo.jpeg"} alt="logo" loading="lazy" />
                                    </Link>
                                </div>
                                <div className="offcanvas-close">
                                    <button className="offcanvas-close-icon animation--flip" onClick={closeMenu}>
                                        <span className="offcanvas-m-lines">
                                            <span className="offcanvas-m-line line--1"></span><span className="offcanvas-m-line line--2"></span><span className="offcanvas-m-line line--3"></span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="offcanvas-about mb-30 d-none d-xl-block">
                                <p>
                                    Welcome to Univet University. It was founded in 1966, and Univet University has grown into one
                                    of the leading institutions of higher education.
                                </p>
                            </div>
                            <div className="offcanvas-gallery d-none d-xl-block">
                                <div className="offcanvas-gallery-thumb-wrapper">
                                    <div className="offcanvas-popup-thumb">
                                        <Link className="popup-image" href="/assets/images/gallery/gallery-thumb-01.webp">
                                            <img src="assets/images/gallery/gallery-thumb-01.webp" alt="image" loading="lazy" />
                                        </Link>
                                    </div>
                                    <div className="offcanvas-popup-thumb">
                                        <Link className="popup-image" href="/assets/images/gallery/gallery-thumb-02.webp">
                                            <img src="assets/images/gallery/gallery-thumb-02.webp" alt="image" loading="lazy" />
                                        </Link>
                                    </div>
                                    <div className="offcanvas-popup-thumb">
                                        <Link className="popup-image" href="/assets/images/gallery/gallery-thumb-03.webp">
                                            <img src="assets/images/gallery/gallery-thumb-03.webp" alt="image" loading="lazy" />
                                        </Link>
                                    </div>
                                    <div className="offcanvas-popup-thumb">
                                        <Link className="popup-image" href="/assets/images/gallery/gallery-thumb-04.webp">
                                            <img src="assets/images/gallery/gallery-thumb-04.webp" alt="image" loading="lazy" />
                                        </Link>
                                    </div>
                                    <div className="offcanvas-popup-thumb">
                                        <Link className="popup-image" href="/assets/images/gallery/gallery-thumb-05.webp">
                                            <img src="assets/images/gallery/gallery-thumb-05.webp" alt="image" loading="lazy" />
                                        </Link>
                                    </div>
                                    <div className="offcanvas-popup-thumb">
                                        <Link className="popup-image" href="/assets/images/gallery/gallery-thumb-06.webp">
                                            <img src="assets/images/gallery/gallery-thumb-06.webp" alt="image" loading="lazy" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mobile-menu">
                                <div className="rs-offcanvas-menu mb-30">
                                    <nav></nav>
                                </div>
                            </div>
                            <div className="offcanvas-contact mb-30">
                                <h4 className="offcanvas-title-meta">Contact Info</h4>
                                <ul>
                                    <li className="d-flex gap-15">
                                        <div className="offcanvas-contact-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                <path d="M11.8768 9.68475C11.3059 10.835 10.5331 11.9818 9.74128 13.0109C8.95198 14.0368 8.15999 14.9249 7.5643 15.5572C7.48514 15.6412 7.40956 15.7206 7.33802 15.7951C7.26648 15.7206 7.1909 15.6412 7.11174 15.5572C6.51605 14.9249 5.72406 14.0368 4.93476 13.0109C4.14299 11.9818 3.37019 10.835 2.79925 9.68475C2.22242 8.52266 1.89032 7.43373 1.89032 6.5C1.89032 3.50846 4.32934 1.08333 7.33802 1.08333C10.3467 1.08333 12.7857 3.50846 12.7857 6.5C12.7857 7.43373 12.4536 8.52266 11.8768 9.68475ZM7.33802 17.3333C7.33802 17.3333 13.8753 11.1732 13.8753 6.5C13.8753 2.91015 10.9484 0 7.33802 0C3.7276 0 0.800781 2.91015 0.800781 6.5C0.800781 11.1732 7.33802 17.3333 7.33802 17.3333Z" fill="#6D6D6D"></path>
                                                <path d="M7.33802 8.66667C6.13455 8.66667 5.15894 7.69662 5.15894 6.5C5.15894 5.30338 6.13455 4.33333 7.33802 4.33333C8.54149 4.33333 9.5171 5.30338 9.5171 6.5C9.5171 7.69662 8.54149 8.66667 7.33802 8.66667ZM7.33802 9.75C9.14323 9.75 10.6066 8.29492 10.6066 6.5C10.6066 4.70507 9.14323 3.25 7.33802 3.25C5.53281 3.25 4.0694 4.70507 4.0694 6.5C4.0694 8.29492 5.53281 9.75 7.33802 9.75Z" fill="#6D6D6D"></path>
                                            </svg>
                                        </div>
                                        <div className="offcanvas-contact-text">
                                            <Link href="#"> 374 William S Canning Blvd, Fall River MA Road 2721, USA</Link>
                                        </div>
                                    </li>
                                    <li className="d-flex gap-15">
                                        <div className="offcanvas-contact-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M3.65387 1.32849C3.40343 1.00649 2.92745 0.976861 2.639 1.26531L1.60508 2.29923C1.1216 2.78271 0.94387 3.46766 1.1551 4.06847C2.00338 6.48124 3.39215 8.74671 5.32272 10.6773C7.25329 12.6078 9.51876 13.9966 11.9315 14.8449C12.5323 15.0561 13.2173 14.8784 13.7008 14.3949L14.7347 13.361C15.0231 13.0726 14.9935 12.5966 14.6715 12.3461L12.3653 10.5524C12.2008 10.4245 11.9866 10.3793 11.7845 10.4298L9.59541 10.9771C9.00082 11.1257 8.37183 10.9515 7.93845 10.5181L5.48187 8.06155C5.04849 7.62817 4.87427 6.99919 5.02292 6.40459L5.57019 4.21553C5.62073 4.01336 5.57552 3.79918 5.44758 3.63468L3.65387 1.32849ZM1.88477 0.511076C2.62689 -0.231039 3.8515 -0.154797 4.49583 0.673634L6.28954 2.97983C6.6187 3.40304 6.73502 3.95409 6.60498 4.47423L6.05772 6.66329C5.99994 6.8944 6.06766 7.13888 6.2361 7.30732L8.69268 9.7639C8.86113 9.93235 9.1056 10.0001 9.33671 9.94229L11.5258 9.39502C12.0459 9.26499 12.597 9.3813 13.0202 9.71047L15.3264 11.5042C16.1548 12.1485 16.231 13.3731 15.4889 14.1152L14.455 15.1492C13.7153 15.8889 12.6089 16.2137 11.5778 15.8512C9.01754 14.9511 6.61438 13.4774 4.56849 11.4315C2.5226 9.38562 1.04895 6.98246 0.148838 4.42225C-0.213682 3.39112 0.11113 2.28472 0.85085 1.545L1.88477 0.511076Z" fill="#6D6D6D"></path>
                                                <path d="M11 0.5C11 0.223858 11.2239 0 11.5 0H15.5C15.7761 0 16 0.223858 16 0.5V4.5C16 4.77614 15.7761 5 15.5 5C15.2239 5 15 4.77614 15 4.5V1.70711L10.8536 5.85355C10.6583 6.04882 10.3417 6.04882 10.1464 5.85355C9.95118 5.65829 9.95118 5.34171 10.1464 5.14645L14.2929 1H11.5C11.2239 1 11 0.776142 11 0.5Z" fill="#6D6D6D"></path>
                                            </svg>
                                        </div>
                                        <div className="offcanvas-contact-text">
                                            <a href="tel:+12346691234"> +123-4669-1234 </a>
                                        </div>
                                    </li>
                                    <li className="d-flex gap-15">
                                        <div className="offcanvas-contact-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M2 2C0.895431 2 0 2.89543 0 4V12L2.58386e-05 12.0103C0.00555998 13.1101 0.898859 14 2 14H7.5C7.77614 14 8 13.7761 8 13.5C8 13.2239 7.77614 13 7.5 13H2C1.53715 13 1.14774 12.6855 1.03376 12.2586L6.67417 8.7876L8 9.5831L15 5.3831V8.5C15 8.77614 15.2239 9 15.5 9C15.7761 9 16 8.77614 16 8.5V4C16 2.89543 15.1046 2 14 2H2ZM5.70808 8.20794L1 11.1052V5.3831L5.70808 8.20794ZM1 4.2169V4C1 3.44772 1.44772 3 2 3H14C14.5523 3 15 3.44772 15 4V4.2169L8 8.4169L1 4.2169Z" fill="#6D6D6D"></path>
                                                <path d="M14.2467 14.2686C15.2567 14.2686 15.8339 13.4116 15.8339 12.2442V12.0344C15.8339 10.4297 14.6402 9 12.5197 9H12.4847C10.421 9 9 10.3598 9 12.4322V12.6465C9 14.8195 10.4385 16 12.3579 16H12.4016C12.9963 16 13.4204 15.9257 13.639 15.8251V15.0949C13.3941 15.2042 12.9656 15.2742 12.4585 15.2742H12.4147C11.0812 15.2742 9.84385 14.4872 9.84385 12.6202V12.4628C9.84385 10.8057 10.9019 9.73891 12.4847 9.73891H12.524C14.0587 9.73891 15.0075 10.7883 15.0075 12.065V12.183C15.0075 13.158 14.6839 13.5734 14.3691 13.5734C14.1374 13.5734 13.9582 13.4247 13.9582 13.1537V10.9631H13.0531V11.5315H13.0225C12.9394 11.2342 12.6552 10.9019 12.0693 10.9019C11.2911 10.9019 10.8101 11.4572 10.8101 12.3011V12.8301C10.8101 13.722 11.2998 14.2642 12.0693 14.2642C12.5415 14.2642 12.9656 14.0369 13.0837 13.6215H13.1274C13.2455 14.0412 13.7439 14.2686 14.2467 14.2686ZM11.7939 12.6814V12.4541C11.7939 11.9076 12.0212 11.6627 12.3666 11.6627C12.664 11.6627 12.9394 11.8551 12.9394 12.371V12.7383C12.9394 13.3111 12.6858 13.4816 12.3754 13.4816C12.0212 13.4816 11.7939 13.2673 11.7939 12.6814Z" fill="#6D6D6D"></path>
                                            </svg>
                                        </div>
                                        <div className="offcanvas-contact-text">
                                            <a href="mailto:univet@gmail.com">univet@gmail.com</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="offcanvas-social">
                                <h4 className="offcanvas-title-meta">Follow Us</h4>
                                <ul>
                                    <li><Link href="#"><i className="ri-facebook-fill"></i></Link></li>
                                    <li><Link href="#"><i className="ri-twitter-x-fill"></i></Link></li>
                                    <li><Link href="#"><i className="ri-youtube-fill"></i></Link></li>
                                    <li><Link href="#"><i className="ri-linkedin-box-fill"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`offcanvas-overlay ${isMenuOpen ? "overlay-open" : ""}`} onClick={closeMenu}></div>
            <div className="offcanvas-overlay-white"></div>

        </>
    );
}
