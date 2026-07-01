import React, { useState } from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Link } from '@inertiajs/react';

const assets = (path) => `${window.AppAssetUrl || '/'}${path.replace(/^\/+/, '')}`;

export default function Index({ programs }) {
    // State for filtering
    const [selectedLevel, setSelectedLevel] = useState([]);
    const [selectedFormat, setSelectedFormat] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState([]);
    const [openPrograms, setOpenPrograms] = useState(programs.length > 0 ? [programs[0].id] : []);
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    const toggleProgram = (programId) => {
        if (openPrograms.includes(programId)) {
            setOpenPrograms(openPrograms.filter(id => id !== programId));
        } else {
            setOpenPrograms([...openPrograms, programId]);
        }
    };

    const toggleFilter = (setter, value, currentList) => {
        if (currentList.includes(value)) {
            setter(currentList.filter(item => item !== value));
        } else {
            setter([...currentList, value]);
        }
    };

    // Filter programs instead of flattened courses
    const filteredPrograms = programs.filter(program => {
        let matchLevel = true;
        let matchFormat = true;
        let matchProgram = true;

        if (selectedLevel.length > 0) {
            matchLevel = selectedLevel.includes(program.level);
        }
        if (selectedFormat.length > 0) {
            matchFormat = selectedFormat.includes(program.format);
        }
        if (selectedProgram.length > 0) {
            matchProgram = selectedProgram.includes(program.id);
        }

        return matchLevel && matchFormat && matchProgram;
    });

    return (
        <AppLayout title="Programs Offered">
            <main className="bg-primary">

                {/*  breadcrumb area start  */}
                <section className="rs-breadcrumb-area rs-breadcrumb-one p-relative section-space">
                    <div className="rs-breadcrumb-bg-thumb include-bg" data-background={assets('assets/images/bg/breadcrumb-bg-thumb-01.webp')} style={{ backgroundImage: `url(${assets('assets/images/bg/breadcrumb-bg-thumb-01.webp')})` }}>
                    </div>
                    <div className="container-fluid g-0">
                        <div className="row">
                            <div className="col-xl-5 col-lg-10">
                                <div className="rs-breadcrumb-wrapper">
                                    <div className="rs-breadcrumb-menu">
                                        <nav>
                                            <ul>
                                                <li className="rs-breadcumb-item">
                                                    <Link href={assets('')}>Home</Link>
                                                    <span className="rs-breadcrumb-icon">
                                                        <svg className="e-font-icon-svg e-fas-angle-double-right" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path>
                                                        </svg>
                                                    </span>
                                                </li>
                                                <li className="rs-breadcumb-item">Program</li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="rs-breadcrumb-title-wrapper">
                                        <h1 className="rs-breadcrumb-title">Courses Offered</h1>
                                        <span className="rs-breadcrumb-line"></span>
                                    </div>
                                    <p className="rs-breadcrumb-desc">Education goes beyond textbooks and classrooms. We believe in empowering students to explore their passions challenge conventions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*  breadcrumb area end  */}

                {/*  program area start  */}
                <section className="rs-program-area section-space rs-program-five">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-xl-3 col-lg-4">
                                <style>{`
                                    @media (min-width: 992px) {
                                        .mobile-filter-btn { display: none !important; }
                                    }
                                `}</style>
                                
                                {/* Mobile Filter Toggle Button */}
                                <button 
                                    className="btn btn-warning w-100 mb-4 d-flex align-items-center justify-content-center fw-bold shadow-sm mobile-filter-btn" 
                                    onClick={() => setShowMobileFilter(true)}
                                    style={{ borderRadius: '8px', padding: '12px', background: '#fdc72f', border: 'none', color: '#1a365d' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-funnel me-2" viewBox="0 0 16 16">
                                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                                    </svg>
                                    Filters
                                </button>

                                <div 
                                    className={`filter-sidebar rs-filter-two rs-sidebar-sticky ${showMobileFilter ? 'd-block' : 'd-none d-lg-block'}`}
                                    style={showMobileFilter ? {
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: '#fff',
                                        zIndex: 1050,
                                        padding: '20px',
                                        overflowY: 'auto'
                                    } : {}}
                                >
                                    {showMobileFilter && (
                                        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom d-lg-none">
                                            <h3 className="mb-0 fw-bold" style={{ color: '#1a365d' }}>Filters</h3>
                                            <button 
                                                className="btn rounded-circle shadow-sm" 
                                                onClick={() => setShowMobileFilter(false)}
                                                style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', color: '#dc3545', border: '1px solid #dee2e6' }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )}

                                    <h2 className="filter-main-title d-none d-lg-block">Filter By</h2>

                                    <div className="filter-item">
                                        <h6 className="filter-title">Program</h6>
                                        {programs.map(program => (
                                            <div className="filter-option" key={`prog-${program.id}`}>
                                                <input
                                                    type="checkbox"
                                                    id={`prog-${program.id}`}
                                                    value={program.id}
                                                    checked={selectedProgram.includes(program.id)}
                                                    onChange={(e) => toggleFilter(setSelectedProgram, program.id, selectedProgram)}
                                                />
                                                <label htmlFor={`prog-${program.id}`}>{program.short_desc || program.name}</label>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="filter-item">
                                        <h6 className="filter-title">Program Level</h6>
                                        <div className="filter-option">
                                            <input type="checkbox" id="level-ug" value="Undergraduate" checked={selectedLevel.includes("Undergraduate")} onChange={(e) => toggleFilter(setSelectedLevel, e.target.value, selectedLevel)} />
                                            <label htmlFor="level-ug">Undergraduate</label>
                                        </div>
                                        <div className="filter-option">
                                            <input type="checkbox" id="level-pg" value="Postgraduate" checked={selectedLevel.includes("Postgraduate")} onChange={(e) => toggleFilter(setSelectedLevel, e.target.value, selectedLevel)} />
                                            <label htmlFor="level-pg">Postgraduate</label>
                                        </div>
                                        <div className="filter-option">
                                            <input type="checkbox" id="level-exec" value="Executive" checked={selectedLevel.includes("Executive")} onChange={(e) => toggleFilter(setSelectedLevel, e.target.value, selectedLevel)} />
                                            <label htmlFor="level-exec">Executive</label>
                                        </div>
                                    </div>

                                    <div className="filter-item">
                                        <h6 className="filter-title">Program Format</h6>
                                        <div className="filter-option">
                                            <input type="checkbox" id="format-fulltime" value="Full-Time" checked={selectedFormat.includes("Full-Time")} onChange={(e) => toggleFilter(setSelectedFormat, e.target.value, selectedFormat)} />
                                            <label htmlFor="format-fulltime">Full-Time</label>
                                        </div>
                                        <div className="filter-option">
                                            <input type="checkbox" id="format-parttime" value="Part-Time" checked={selectedFormat.includes("Part-Time")} onChange={(e) => toggleFilter(setSelectedFormat, e.target.value, selectedFormat)} />
                                            <label htmlFor="format-parttime">Part-Time</label>
                                        </div>
                                        <div className="filter-option">
                                            <input type="checkbox" id="format-online" value="Online / Hybrid" checked={selectedFormat.includes("Online / Hybrid")} onChange={(e) => toggleFilter(setSelectedFormat, e.target.value, selectedFormat)} />
                                            <label htmlFor="format-online">Online / Hybrid</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-8">
                                <div className="rs-program margin-10">
                                    <div className="rs-filter-wrapper rs-filter-three">
                                        <span className="rs-filter-result">
                                            Showing Programs and Courses
                                        </span>
                                    </div>

                                    <div className="rs-program-item-wrapper">
                                        {filteredPrograms.length > 0 ? (
                                            filteredPrograms.map(program => (
                                                <div key={program.id} className="mb-5">
                                                    <div
                                                        className="program-overview mb-4 p-4 rounded bg-white shadow-sm border"
                                                        style={{ cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative' }}
                                                        onClick={() => toggleProgram(program.id)}
                                                    >
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h3 className="mb-2" style={{ color: '#1a365d', transition: 'color 0.2s' }}>{program.name}</h3>
                                                                {program.level && <span className="badge bg-warning text-dark mb-3 me-2">{program.level}</span>}
                                                                {program.format && <span className="badge bg-light text-dark border mb-3">{program.format}</span>}
                                                            </div>
                                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: openPrograms.includes(program.id) ? '#f1f5f9' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                                                                <i className={`ri-arrow-${openPrograms.includes(program.id) ? 'up' : 'down'}-s-line`} style={{ fontSize: '28px', color: '#1a365d' }}></i>
                                                            </div>
                                                        </div>
                                                        <p className="text-muted mb-0" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                                                            {program.description || program.short_desc}
                                                        </p>
                                                    </div>

                                                    {openPrograms.includes(program.id) && (
                                                        <div className="row g-4" style={{ paddingLeft: '20px', borderLeft: '3px solid #fdc72f', marginLeft: '10px', animation: 'fadeIn 0.3s ease' }}>
                                                            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                                                            {program.courses && program.courses.map(course => (
                                                                <div className="col-12" key={course.id}>
                                                                    <div className="rs-program-item shadow-sm">
                                                                        <div className="rs-program-content">
                                                                            <h5 className="rs-program-title">
                                                                                <Link href={assets(`program/${program.slug}/${course.slug}`)}>
                                                                                    {course.name}
                                                                                </Link>
                                                                            </h5>
                                                                            <div className="rs-program-tag-wrapper">
                                                                                <span className="rs-program-tag">{program.short_desc || program.name}</span>
                                                                            </div>
                                                                            <p className="rs-program-desc" style={{ whiteSpace: 'pre-wrap', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                                                {course.description || course.short_desc}
                                                                            </p>
                                                                            <div className="rs-program-btn mt-3">
                                                                                <Link className="rs-btn has-icon has-text is-text-blue" href={assets(`program/${program.slug}/${course.slug}`)}>
                                                                                    <span className="btn-text-wrap">
                                                                                        <span className="text-default">Read More</span>
                                                                                        <span className="text-hover">Read More</span>
                                                                                    </span>
                                                                                    <span className="icon-box has-rotate">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 15">
                                                                                            <path d="M10.5 7.5C10.5 8.32843 9.82843 9 9 9C8.17157 9 7.5 8.32843 7.5 7.5C7.5 6.67157 8.17157 6 9 6C9.82843 6 10.5 6.67157 10.5 7.5Z"></path>
                                                                                            <path d="M10.5 13.5C10.5 14.3284 9.82843 15 9 15C8.17157 15 7.5 14.3284 7.5 13.5C7.5 12.6716 8.17157 12 9 12C9.82843 12 10.5 12.6716 10.5 13.5Z"></path>
                                                                                            <path d="M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5Z"></path>
                                                                                            <path d="M18 7.5C18 8.32843 17.3284 9 16.5 9C15.6716 9 15 8.32843 15 7.5C15 6.67157 15.6716 6 16.5 6C17.3284 6 18 6.67157 18 7.5Z"></path>
                                                                                            <path d="M10.5 1.5C10.5 2.32843 9.82843 3 9 3C8.17157 3 7.5 2.32843 7.5 1.5C7.5 0.671573 8.17157 0 9 0C9.82843 0 10.5 0.671573 10.5 1.5Z"></path>
                                                                                        </svg>
                                                                                    </span>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                        <div className="rs-program-thumb">
                                                                            <Link href={`/program/${program.slug}/${course.slug}`}>
                                                                                <img src={course.thumbnail ? assets(course.thumbnail) : assets('assets/images/program/program-thumb-05.webp')} alt="image" loading="lazy" />
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-5">
                                                <h5 className="text-muted">No programs found matching your criteria.</h5>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*  program area end  */}
            </main>
        </AppLayout>
    );
}
