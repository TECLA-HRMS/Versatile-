import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import ReCAPTCHA from 'react-google-recaptcha';

const assets = (path) => `${window.AppAssetUrl || '/'}${path.replace(/^\/+/, '')}`;


export default function Index({ courses }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        name2: '',
        email: '',
        phone: '',
        gender: '',
        course_id: '',
        undergrad_degree: '',
        undergrad_university: '',
        undergrad_cgpa: '',
        work_experience: '',
        'file-upload': null,
        'g-recaptcha-response': ''
    });
    
    const { flash, settings } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('application.store'), {
            onSuccess: () => {
                reset();
                document.getElementById('file-upload').value = '';
                // Optional: reset recaptcha widget if we had a ref
            }
        });
    };
    return (
        <AppLayout>
            <main className="bg-primary">


        {/* breadcrumb area start */}
        <section className="rs-breadcrumb-area rs-breadcrumb-one p-relative section-space">
            <div className="rs-breadcrumb-bg-thumb include-bg" style={{backgroundImage: `url(${assets('assets/images/bg/breadcrumb-bg-thumb-01.webp')})`}}>
            </div>
            <div className="container-fluid g-0">
                <div className="row">
                    <div className="col-xl-6 col-lg-10">
                        <div className="rs-breadcrumb-wrapper">
                            <div className="rs-breadcrumb-menu">
                                <nav>
                                    <ul>
                                        <li className="rs-breadcumb-item">
                                            <Link href={assets('')}>
                                                Home
                                            </Link>
                                            <span className="rs-breadcrumb-icon">
                                    <svg className="e-font-icon-svg e-fas-angle-double-right" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z">
                                       </path>
                                    </svg>
                                 </span>
                                        </li>
                                        <li className="rs-breadcumb-item">
                                            How to Apply
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="rs-breadcrumb-title-wrapper">
                                <h1 className="rs-breadcrumb-title">How to Apply</h1>
                                <span className="rs-breadcrumb-line"></span>
                            </div>
                            <p className="rs-breadcrumb-desc">Education goes beyond textbooks and classrooms. We believe in
                                empowering students to explore their passions challenge conventions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* breadcrumb area end */}

        {/* admission area start */}
        <section className="rs-admission-area rs-admission-two section-space-top pb-50">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="rs-admission-wrapper">
                            <div className="rs-admission-content">
                                <h3 className="rs-admission-title">Get Your Admission Process</h3>
                                <p className="rs-admission-desc">
                                    The Get Your Admission Process begins with preparing all necessary application documents,
                                    including academic transcripts, identification, and any required test scores. Once your
                                    materials are ready, complete the university’s online application form with accurate personal
                                    and academic details.
                                </p>
                                <div className="rs-admission-btn">
                                    <Link className="rs-btn has-icon hover-yellow" href={assets('apply-now')}>
                                        <span className="btn-text-wrap">
                                 <span className="text-default">Apply Now</span>
                                        <span className="text-hover">Apply Now</span>
                                        </span>
                                        <span className="icon-box has-rotate">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 15">
                                    <path d="M10.5 7.5C10.5 8.32843 9.82843 9 9 9C8.17157 9 7.5 8.32843 7.5 7.5C7.5 6.67157 8.17157 6 9 6C9.82843 6 10.5 6.67157 10.5 7.5Z">
                                    </path>
                                    <path d="M10.5 13.5C10.5 14.3284 9.82843 15 9 15C8.17157 15 7.5 14.3284 7.5 13.5C7.5 12.6716 8.17157 12 9 12C9.82843 12 10.5 12.6716 10.5 13.5Z">
                                    </path>
                                    <path d="M3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5Z">
                                    </path>
                                    <path d="M18 7.5C18 8.32843 17.3284 9 16.5 9C15.6716 9 15 8.32843 15 7.5C15 6.67157 15.6716 6 16.5 6C17.3284 6 18 6.67157 18 7.5Z">
                                    </path>
                                    <path d="M10.5 1.5C10.5 2.32843 9.82843 3 9 3C8.17157 3 7.5 2.32843 7.5 1.5C7.5 0.671573 8.17157 0 9 0C9.82843 0 10.5 0.671573 10.5 1.5Z">
                                    </path>
                                 </svg>
                              </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="rs-admission-thumb">
                                <img src={assets('assets/images/admission/admssion-thumb-01.webp')} alt="image"  loading="lazy" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* admission area end */}

       {/* process area start */}
<section className="rs-process-area rs-process-one pb-70">
    <div className="container">
        <div className="row">
            <div className="col-xl-12">
                <div className="rs-progress-wrapper">
                    <div className="rs-process-thumb">
                        <img src={assets('assets/images/process/process-thumb-01.webp')} alt="image"  loading="lazy" />
                        <div className="rs-process-badge">
                            <img src={assets('assets/images/logo/remove-bg.png')} alt="image"  loading="lazy" />
                        </div>
                    </div>
                    <div className="rs-process-content-wrapper gsap-fixed-yes" data-stop-under="mobile">
                        <div className="pin-spacer pin-spacer--trigger-0" >
                            <div className="rs-process-item">
                                <h6 className="rs-process-title">01. Application Submission</h6>
                                <div className="rs-process-content">
                                    <div className="rs-process-inner">
                                        <p className="rs-process-desc">
                                            Interested candidates must complete the online application form and submit required documents including academic transcripts, identification papers, and test scores (if needed).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pin-spacer pin-spacer--trigger-1" >
                            <div className="rs-process-item">
                                <h6 className="rs-process-title">02. Eligibility Verification</h6>
                                <div className="rs-process-content">
                                    <div className="rs-process-inner">
                                        <p className="rs-process-desc">
                                            Applications are reviewed to ensure eligibility requirements are met. All submitted materials are verified for accuracy and completeness.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pin-spacer pin-spacer--trigger-2" >
                            <div className="rs-process-item">
                                <h6 className="rs-process-title">03. Personal Interview</h6>
                                <div className="rs-process-content">
                                    <div className="rs-process-inner">
                                        <p className="rs-process-desc">
                                            Shortlisted candidates may be invited for an interview to discuss their academic goals, interests, and suitability for the program.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pin-spacer pin-spacer--trigger-3" >
                            <div className="rs-process-item">
                                <h6 className="rs-process-title">04. Admission Confirmation</h6>
                                <div className="rs-process-content">
                                    <div className="rs-process-inner">
                                        <p className="rs-process-desc">
                                            Selected candidates receive admission offers via email or portal. Conditional admission or additional steps may be communicated if needed.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pin-spacer pin-spacer--trigger-4" >
                            <div className="rs-process-item">
                                <h6 className="rs-process-title">05. Fee Payment and Enrollment</h6>
                                <div className="rs-process-content">
                                    <div className="rs-process-inner">
                                        <p className="rs-process-desc">
                                            Students complete enrollment by paying the prescribed fees and submitting any final documentation required for registration.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
{/* process area end */}

  <section className="rs-scholarships-area bg-primary section-space-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="rs-sec-wrapper mb-40">
                            <h3 className="section-title mb-20 has-theme-blue">Apply Now</h3>
                            <p className="section-desc">Our program costs are designed to remain transparent competitive and
                                accessible for students from diverse backgrounds. Each academic program includes tuition fees,
                                registration charges and essential learning resources ensuring students receive high-quality
                                education and comprehensive academic support Costs may vary based on program type, course load,
                                and mode of study (on-campus, hybrid, or online) We aim to provide exceptional value through
                                modern facilities, expert faculty, and industry aligned curriculum making your investment in
                                education both meaningful and future-focused.</p>
                        </div>
                    </div>
                </div>
                <div className="row g-5">
                            <div className="col-xl-8 col-lg-8">
                                <div className="rs-contact-three">
                                    <div className="rs-contact-form-wrapper">
                                        <h5 className="form-title rs-split-text-enable split-in-left mb-20">Personal Information</h5>
                                        {flash?.success && (
        <div className="alert alert-success mb-4" style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '15px', borderRadius: '4px', border: '1px solid #10b981' }}>
            {flash.success}
        </div>
    )}
    <form id="contact-form" onSubmit={handleSubmit} encType="multipart/form-data">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input-title">
                                                            <label htmlFor="name">Full Name<span>*</span></label>
                                                        </div>
                                                        <div className="rs-contact-input">
                                                            <input id="name" name="name" type="text" placeholder="First Name" value={data['name']} onChange={e => setData('name', e.target.value)} />{errors['name'] && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors['name']}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input-title">
                                                            <label htmlFor="name2">Last Name<span>*</span></label>
                                                        </div>
                                                        <div className="rs-contact-input">
                                                            <input id="name2" name="name2" type="text" placeholder="Last Name" value={data['name2']} onChange={e => setData('name2', e.target.value)} />{errors['name2'] && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors['name2']}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input-title">
                                                            <label htmlFor="email">Your Email<span>*</span></label>
                                                        </div>
                                                        <div className="rs-contact-input">
                                                            <input id="email" name="email" type="email" placeholder="Email Address" value={data['email']} onChange={e => setData('email', e.target.value)} />{errors['email'] && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors['email']}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input-title">
                                                            <label htmlFor="phone">Your Phone Number<span>*</span></label>
                                                        </div>
                                                        <div className="rs-contact-input">
                                                            <input id="phone" name="phone" type="text" placeholder="Phone Number" value={data['phone']} onChange={e => setData('phone', e.target.value)} />{errors['phone'] && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors['phone']}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input-title">
                                                            <label htmlFor="gender_select">Gender<span>*</span></label>
                                                        </div>
                                                        <div className="rs-contact-input">
                                                            <select id="gender_select" name="gender" className="form-select w-100 p-3" style={{ border: '1px solid #E5E5E5', borderRadius: '4px', appearance: 'auto', background: '#F9F9F9' }} value={data.gender} onChange={e => setData('gender', e.target.value)}>
                                                                <option>Select Gender</option>
                                                                <option value="one">Male</option>
                                                                <option value="two">Female</option>
                                                                <option value="three">Other</option>
                                                            </select>{errors.gender && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors.gender}</div>}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            
                                            <h5 className="form-title rs-split-text-enable split-in-left mb-20 mt-4">Program Details</h5>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input-title">
                                                            <label htmlFor="course_id">Select Program/Course<span>*</span></label>
                                                        </div>
                                                        <div className="rs-contact-input">
                                                            <select id="course_id" name="course_id" className="form-select w-100 p-3" style={{ border: '1px solid #E5E5E5', borderRadius: '4px', appearance: 'auto', background: '#F9F9F9' }} value={data.course_id} onChange={e => setData('course_id', e.target.value)}>
                                                                <option value="">Select a Course</option>
                                                                {courses && courses.map((course) => (
                                                                    <option key={course.id} value={course.id}>{course.name}</option>
                                                                ))}
                                                            </select>{errors.course_id && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors.course_id}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <h5 className="form-title rs-split-text-enable split-in-left mb-20 mt-4">Academic Information</h5>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input-title">
                                                            <label htmlFor="undergrad_degree">Bachelor's Degree<span>*</span></label>
                                                        </div>
                                                        <div className="rs-contact-input">
                                                            <input id="undergrad_degree" name="undergrad_degree" type="text" placeholder="e.g. BBA, B.Tech, B.Com" value={data['undergrad_degree']} onChange={e => setData('undergrad_degree', e.target.value)} />{errors['undergrad_degree'] && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors['undergrad_degree']}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input-title">
                                                            <label htmlFor="undergrad_university">University/College Name<span>*</span></label>
                                                        </div>
                                                        <div className="rs-contact-input">
                                                            <input id="undergrad_university" name="undergrad_university" type="text" placeholder="Enter your university name" value={data['undergrad_university']} onChange={e => setData('undergrad_university', e.target.value)} />{errors['undergrad_university'] && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors['undergrad_university']}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input-title">
                                                            <label htmlFor="undergrad_cgpa">Undergraduate CGPA/Percentage<span>*</span></label>
                                                        </div>
                                                        <div className="rs-contact-input">
                                                            <input id="undergrad_cgpa" name="undergrad_cgpa" type="text" placeholder="e.g. 8.5 CGPA or 85%" value={data['undergrad_cgpa']} onChange={e => setData('undergrad_cgpa', e.target.value)} />{errors['undergrad_cgpa'] && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors['undergrad_cgpa']}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input-title">
                                                            <label htmlFor="work_experience">Work Experience (Years)</label>
                                                        </div>
                                                        <div className="rs-contact-input">
                                                            <input id="work_experience" name="work_experience" type="number" placeholder="Enter years of experience (if any)" min="0" step="0.5" value={data['work_experience']} onChange={e => setData('work_experience', e.target.value)} />{errors['work_experience'] && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors['work_experience']}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <h5 className="form-title rs-split-text-enable split-in-left mt-5 mb-20">Additional and Submission</h5>
                                            <div className="form-group mb-4">
                                                <label htmlFor="file-upload">Upload File<span>*</span></label>
                                                <input type="file" id="file-upload" name="file-upload" className="file-input" onChange={e => setData('file-upload', e.target.files[0])} />{errors['file-upload'] && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors['file-upload']}</div>}
                                            </div>
                                            
                                            {settings?.recaptcha_enabled === '1' && settings?.recaptcha_site_key && (
                                                <div className="form-group mb-4">
                                                    <ReCAPTCHA
                                                        sitekey={settings.recaptcha_site_key}
                                                        onChange={(token) => setData('g-recaptcha-response', token)}
                                                    />
                                                    {errors['g-recaptcha-response'] && <div style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{errors['g-recaptcha-response']}</div>}
                                                </div>
                                            )}

                                            <div className="rs-contact-btn mt-30">
                                                <button type="submit" className="rs-btn hover-yellow radius-6 w-100" disabled={processing}>
        {processing ? 'Submitting...' : 'Apply Now'}
                                                    </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                <div className="rs-sidebar-sticky">
                                    <div className="rs-cta-two">
                                        <div className="rs-cta-bg-thumb include-bg" style={{ backgroundImage: `url(${assets('assets/images/bg/contact-bg-thumb-01.webp')})` }}>
                                        </div>
                                        <div className="rs-cta-content">
                                            <div className="rs-cta-icon" style={{ backgroundColor: 'white', display: 'inline-flex', padding: '15px', borderRadius: '50%' }}>
                                                <img src={assets('assets/images/logo/remove-bg.png')} alt="logo" style={{ maxHeight: '80px' }} />
                                            </div>
                                            <h6 className="rs-cta-title">Do Your Need Help?</h6>
                                            <div className="rs-cta-contact">
                                                <a href={`tel:${settings?.contactNumber || '+12018953801'}`} className="contact-phone">
                                                    {settings?.contactNumber || '+1 (201) 895-3801'}
                                                </a>

                                                <a href={`mailto:${settings?.supportEmail || 'info@univet.edu'}`} className="contact-email">
                                                    {settings?.supportEmail || 'info@univet.edu'}
                                                </a>
                                            </div>
                                            <div className="rs-cta-btn">
                                                <Link className="rs-btn has-icon has-bg-white hover-yellow" href={route("contact")}>
                                                    <span className="btn-text-wrap">
                                                        <span className="text-default">Contact Now</span>
                                                        <span className="text-hover">Contact Now</span>
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
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </section>

    </main>
        </AppLayout>
    );
}
