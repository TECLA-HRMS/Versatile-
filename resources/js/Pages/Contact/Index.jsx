import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import RecaptchaWidget from '../../Components/RecaptchaWidget';

const assets = (path) => `${window.AppAssetUrl || '/'}${path.replace(/^\/+/, '')}`;

const MemoizedMap = React.memo(({ embedCode }) => (
    <div className="rs-map-one">
        <div className="rs-google-map">
            <style>
                {`
                .rs-google-map iframe {
                    width: 100% !important;
                    min-height: 750px !important;
                }
                `}
            </style>
            {embedCode ? (
                <div dangerouslySetInnerHTML={{ __html: embedCode }} />
            ) : (
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d34214.60083365065!2d-74.01068688015093!3d40.714229226069826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1713786758295!5m2!1sen!2sbd"
                    width="100%"
                    height="500"
                    style={{ border: 0, minHeight: '500px', display: 'block' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="University Location Map"
                />
            )}
        </div>
    </div>
));

export default function Index() {
    const { settings = {}, courses = [], flash = {} } = usePage().props;
    const recaptchaEnabled = settings.recaptcha_enabled === '1';
    const recaptchaSiteKey = settings.recaptcha_site_key || '';

    const { data, setData, processing, errors, reset, setError, clearErrors } = useForm({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        course_id: '',
        message: '',
        agree: false,
    });
    const [submitting, setSubmitting] = React.useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();

        const actualCourseId = document.getElementById('contact-course').value;

        if (!actualCourseId) {
            alert('Please select a course before submitting.');
            return;
        }
        if (!data.agree) {
            alert('Please check the box to agree to the terms and conditions before submitting.');
            return;
        }

        // Collect reCAPTCHA token if enabled
        const recaptchaToken = (recaptchaEnabled && window.grecaptcha)
            ? window.grecaptcha.getResponse()
            : '';

        // Build final payload — avoids transform() which breaks Inertia's CSRF flow
        const payload = {
            name:                   data.name,
            lastName:               data.lastName,
            email:                  data.email,
            phone:                  data.phone,
            course_id:              actualCourseId,
            message:                data.message,
            'g-recaptcha-response': recaptchaToken,
        };

        setSubmitting(true);
        router.post(route('contact.store'), payload, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSubmitting(false);
                if (recaptchaEnabled && window.grecaptcha) {
                    window.grecaptcha.reset();
                }
            },
            onError: (errs) => {
                setSubmitting(false);
                // Map server errors back into the form error state
                Object.entries(errs).forEach(([key, msg]) => setError(key, msg));
                if (recaptchaEnabled && window.grecaptcha) {
                    window.grecaptcha.reset(); // reset widget so user can retry
                }
            },
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <AppLayout>
            <main className="bg-primary">

                {/* breadcrumb area start */}
                <section className="rs-breadcrumb-area rs-breadcrumb-one p-relative section-space">
                    <div
                        className="rs-breadcrumb-bg-thumb include-bg"
                        style={{ backgroundImage: `url(${assets('assets/images/bg/breadcrumb-bg-thumb-01.webp')})` }}
                    />
                    <div className="container-fluid g-0">
                        <div className="row">
                            <div className="col-xl-6 col-lg-10">
                                <div className="rs-breadcrumb-wrapper">
                                    <div className="rs-breadcrumb-menu">
                                        <nav>
                                            <ul>
                                                <li className="rs-breadcumb-item">
                                                    <Link href={assets('')}>Home</Link>
                                                    <span className="rs-breadcrumb-icon">
                                                        <svg className="e-font-icon-svg e-fas-angle-double-right" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
                                                        </svg>
                                                    </span>
                                                </li>
                                                <li className="rs-breadcumb-item">Contact</li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="rs-breadcrumb-title-wrapper">
                                        <h1 className="rs-breadcrumb-title">Contact</h1>
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

                {/* contact info cards area start */}
                <div className="rs-contact-area rs-contact-five section-space-top pb-30">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="rs-contact-wrapper">

                                    {/* Support Email */}
                                    <div className="rs-contact-item">
                                        <div className="rs-contact-shape">
                                            <img src={assets('assets/images/shape/three-line-shape.webp')} alt="image"  loading="lazy" />
                                        </div>
                                        <div className="rs-contact-icon">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="29" viewBox="0 0 40 29">
                                                    <path d="M33.3359 0C29.6563 0 26.6719 2.98438 26.6719 6.66406C26.6719 10.3438 29.6563 13.3281 33.3359 13.3281C37.0156 13.3281 40 10.3438 40 6.66406C40 2.98438 37.0156 0 33.3359 0ZM37.1484 3.97656L34.6875 11.0078C34.3906 11.8516 33.1719 11.7812 32.9844 10.9062L32.2812 7.72656L29.1016 7.02344C28.2266 6.82812 28.1562 5.60938 29 5.32031L36.0234 2.85156C36.7188 2.60156 37.3984 3.27344 37.1484 3.97656ZM25 16.1016L36.1641 27.2656C35.4375 27.9922 34.4375 28.4375 33.3359 28.4375H4C2.89844 28.4375 1.89844 27.9922 1.17188 27.2656L12.3359 16.1016L15.2891 19.0547C16.1953 19.9609 17.3906 20.4531 18.6719 20.4531C19.9531 20.4531 21.1484 19.9531 22.0547 19.0547L25 16.1016ZM37.3359 12.9453V24.4453C37.3359 25.2656 37.0859 26.0312 36.6641 26.6641L25.5469 15.5547L28.6484 12.4531C29.9297 13.4922 31.5547 14.1094 33.3281 14.1094C34.8047 14.1094 36.1797 13.6797 37.3359 12.9453ZM11.7891 15.5547L0.671875 26.6641C0.25 26.0312 0 25.2656 0 24.4375V6.66406C0 5.84375 0.25 5.07812 0.671875 4.44531L11.7891 15.5547ZM28.0703 11.9297L21.5 18.5C19.9375 20.0625 17.4062 20.0625 15.8438 18.5L1.17188 3.83594C1.89844 3.10937 2.89844 2.66406 4 2.66406H27.0547C26.3125 3.82031 25.8828 5.19531 25.8828 6.66406C25.8828 8.71875 26.7188 10.5781 28.0703 11.9297Z" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div className="rs-contact-content">
                                            <h5 className="rs-contact-title">Support Email</h5>
                                            <div className="rs-contact-links">
                                                <a href={`mailto:${settings.supportEmail || 'infoexmple@Univet.edu'}`}>{settings.supportEmail || 'infoexmple@Univet.edu'}</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="rs-contact-item">
                                        <div className="rs-contact-shape">
                                            <img src={assets('assets/images/shape/three-line-shape.webp')} alt="image"  loading="lazy" />
                                        </div>
                                        <div className="rs-contact-icon">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="34" viewBox="0 0 35 34">
                                                    <path d="M1.87389 11.9812C2.39774 12.3353 2.99607 12.564 3.62253 12.6496C4.24898 12.7353 4.88674 12.6755 5.48639 12.475L7.74264 11.7313C8.17107 11.5646 8.55284 11.2969 8.85538 10.9508C9.15793 10.6047 9.37228 10.1906 9.48014 9.74375C10.1051 7.78125 14.8864 6.31875 16.9489 6.19375H18.1301C20.1551 6.33125 24.8801 7.76875 25.5051 9.7C25.6117 10.153 25.8266 10.5734 26.1314 10.925C26.4362 11.2766 26.8218 11.549 27.2551 11.7188L29.4864 12.4563C30.0933 12.6591 30.7388 12.7196 31.3729 12.6329C32.0069 12.5462 32.6125 12.3146 33.1426 11.9562C33.9793 11.407 34.5759 10.5602 34.8114 9.5875C35.0275 8.55649 34.9891 7.48834 34.6994 6.47553C34.4097 5.46273 33.8775 4.5358 33.1489 3.775C30.9676 1.59375 21.0426 0 17.4989 0C13.9551 0 4.03014 1.59375 1.83639 3.7875C1.11058 4.54508 0.579531 5.46753 0.288862 6.47562C-0.00180662 7.48371 -0.0434054 8.54729 0.167639 9.575C0.407307 10.566 1.01802 11.4272 1.87389 11.9812Z" />
                                                    <path d="M4.7125 33.7501H30.2875C31.5373 33.7501 32.736 33.2536 33.6197 32.3698C34.5035 31.4861 35 30.2874 35 29.0376V28.6064C35.0027 25.4512 33.9806 22.3805 32.0875 19.8564L28.525 15.1064C28.2051 14.6835 27.7913 14.3408 27.3162 14.1054C26.8411 13.8701 26.3177 13.7484 25.7875 13.7501H25.75C25.3657 13.7507 24.9938 13.6146 24.7006 13.3662C24.4075 13.1177 24.2123 12.773 24.15 12.3939L24.05 11.7689C23.9852 11.3269 23.7812 10.9171 23.4677 10.599C23.1541 10.281 22.7472 10.0712 22.3063 10.0001C22.0174 9.96062 21.7234 9.98378 21.4443 10.068C21.1651 10.1523 20.9074 10.2956 20.6886 10.4883C20.4698 10.681 20.2951 10.9186 20.1762 11.1848C20.0574 11.4511 19.9973 11.7398 20 12.0314V12.1314C20 12.3439 19.9581 12.5544 19.8768 12.7508C19.7954 12.9472 19.6762 13.1257 19.5259 13.276C19.3756 13.4263 19.1971 13.5455 19.0007 13.6269C18.8043 13.7082 18.5938 13.7501 18.3813 13.7501H16.6188C16.1894 13.7501 15.7777 13.5796 15.4741 13.276C15.1705 12.9724 15 12.5607 15 12.1314C15.0146 11.6247 14.8455 11.1299 14.5238 10.7382C14.2022 10.3465 13.7498 10.0844 13.25 10.0001C12.7266 9.92774 12.1956 10.0622 11.7697 10.3749C11.3437 10.6876 11.0564 11.154 10.9688 11.6751L10.85 12.3751C10.7917 12.7577 10.5983 13.1068 10.3048 13.359C10.0112 13.6113 9.63703 13.75 9.25 13.7501H9.20625C8.67498 13.7499 8.15096 13.8734 7.67578 14.111C7.20059 14.3486 6.78732 14.6937 6.46875 15.1189L2.90625 19.8689C1.01795 22.3903 -0.00180095 25.4562 2.38766e-06 28.6064V29.0376C2.38766e-06 30.2874 0.496497 31.4861 1.38026 32.3698C2.26403 33.2536 3.46267 33.7501 4.7125 33.7501Z" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div className="rs-contact-content">
                                            <h5 className="rs-contact-title">Phone Number</h5>
                                            <div className="rs-contact-links">
                                                <a href={`tel:${settings.contactNumber || '+12705550117'}`}>{settings.contactNumber || '(+1) 270-555-0117'}</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="rs-contact-item">
                                        <div className="rs-contact-shape">
                                            <img src={assets('assets/images/shape/three-line-shape.webp')} alt="image"  loading="lazy" />
                                        </div>
                                        <div className="rs-contact-icon">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="36" viewBox="0 0 32 36">
                                                    <path d="M15.8203 0C9.49465 0 4.21875 5.09555 4.21875 11.6016C4.21875 14.0767 4.96252 16.2838 6.38993 18.352L14.9325 31.6818C15.3469 32.3298 16.2946 32.3286 16.7081 31.6818L25.2878 18.3066C26.6844 16.3322 27.4219 14.0138 27.4219 11.6016C27.4219 5.20446 22.2174 0 15.8203 0ZM15.8203 16.875C12.9127 16.875 10.5469 14.5092 10.5469 11.6016C10.5469 8.69393 12.9127 6.32812 15.8203 6.32812C18.7279 6.32812 21.0938 8.69393 21.0938 11.6016C21.0938 14.5092 18.7279 16.875 15.8203 16.875Z" />
                                                    <path d="M24.0654 24.2363L18.7547 32.5393C17.38 34.6826 14.253 34.6756 12.8849 32.5414L7.56549 24.2385C2.8852 25.3206 0 27.3029 0 29.6718C0 33.7824 8.15119 36 15.8203 36C23.4894 36 31.6406 33.7824 31.6406 29.6718C31.6406 27.3012 28.7514 25.3179 24.0654 24.2363Z" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div className="rs-contact-content">
                                            <h5 className="rs-contact-title">Address</h5>
                                            <div className="rs-contact-links">
                                                <p>{settings.address || '4517 Huston Ave. Kuchu, Kentucky 39495'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Admission */}
                                    <div className="rs-contact-item">
                                        <div className="rs-contact-shape">
                                            <img src={assets('assets/images/shape/three-line-shape.webp')} alt="image"  loading="lazy" />
                                        </div>
                                        <div className="rs-contact-icon">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="38" viewBox="0 0 34 38">
                                                    <path d="M17.5 20C18.0178 20 18.4375 19.5803 18.4375 19.0625C18.4375 18.5447 18.0178 18.125 17.5 18.125C16.9822 18.125 16.5625 18.5447 16.5625 19.0625C16.5625 19.5803 16.9822 20 17.5 20Z" />
                                                    <path d="M17.5 28.125C18.0178 28.125 18.4375 27.7053 18.4375 27.1875C18.4375 26.6697 18.0178 26.25 17.5 26.25C16.9822 26.25 16.5625 26.6697 16.5625 27.1875C16.5625 27.7053 16.9822 28.125 17.5 28.125Z" />
                                                    <path d="M17.5 24.375C18.1904 24.375 18.75 23.8154 18.75 23.125C18.75 22.4346 18.1904 21.875 17.5 21.875C16.8096 21.875 16.25 22.4346 16.25 23.125C16.25 23.8154 16.8096 24.375 17.5 24.375Z" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div className="rs-contact-content">
                                            <h5 className="rs-contact-title">Admission</h5>
                                            <div className="rs-contact-links">
                                                <a href={`tel:${settings.contactNumber || '+990123456789'}`}>{settings.contactNumber || '+990 123 456 789'}</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* contact info cards area end */}

                {/* contact form & map area start */}
                <section className="rs-contact-area rs-contact-four section-space-bottom">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-xl-12">
                                <div className="rs-contact-wrapper">

                                    {/* Contact Form */}
                                    <div className="rs-contact-form">
                                        <div className="section-title-wrapper mb-30">
                                            <h3 className="rs-contact-form-title mb-10">Get in Touch</h3>
                                        </div>

                                        {flash.success && (
                                            <div className="alert alert-success mb-20" style={{ padding: '12px 20px', background: '#d4edda', borderRadius: '6px', color: '#155724', marginBottom: '20px' }}>
                                                ✅ {flash.success}
                                            </div>
                                        )}

                                        <form id="contact-form" onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input">
                                                            <input
                                                                id="contact-name"
                                                                name="name"
                                                                type="text"
                                                                placeholder="First name*"
                                                                value={data.name}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {errors.name && <div className="text-danger mt-1" style={{ fontSize: '13px' }}>{errors.name}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input">
                                                            <input
                                                                id="contact-last-name"
                                                                name="lastName"
                                                                type="text"
                                                                placeholder="Last name"
                                                                value={data.lastName}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input">
                                                            <input
                                                                id="contact-email"
                                                                name="email"
                                                                type="email"
                                                                placeholder="Email Address*"
                                                                value={data.email}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {errors.email && <div className="text-danger mt-1" style={{ fontSize: '13px' }}>{errors.email}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input">
                                                            <input
                                                                id="contact-phone"
                                                                name="phone"
                                                                type="text"
                                                                placeholder="Phone Number*"
                                                                value={data.phone}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {errors.phone && <div className="text-danger mt-1" style={{ fontSize: '13px' }}>{errors.phone}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input">
                                                            <select
                                                                id="contact-course"
                                                                name="course_id"
                                                                className="wide"
                                                                defaultValue={data.course_id}
                                                                onChange={handleChange}
                                                                required
                                                            >
                                                                <option value="" disabled>Select a Course*</option>
                                                                {courses.map(course => (
                                                                    <option key={course.id} value={course.id}>{course.name}</option>
                                                                ))}
                                                            </select>
                                                            {errors.course_id && <div className="text-danger mt-1" style={{ fontSize: '13px' }}>{errors.course_id}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="rs-contact-input-box">
                                                        <div className="rs-contact-input">
                                                            <textarea
                                                                id="contact-message"
                                                                name="message"
                                                                placeholder="Message*"
                                                                value={data.message}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {errors.message && <div className="text-danger mt-1" style={{ fontSize: '13px' }}>{errors.message}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="rs-form-check">
                                                        <input
                                                            id="contact-agree"
                                                            name="agree"
                                                            type="checkbox"
                                                            checked={data.agree}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="contact-agree">
                                                            I have read and agree to the terms &amp; conditions
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* reCAPTCHA widget — shown only when enabled in Admin Settings */}
                                                {recaptchaEnabled && recaptchaSiteKey && (
                                                    <div className="col-md-12">
                                                        <RecaptchaWidget
                                                            siteKey={recaptchaSiteKey}
                                                            error={errors.recaptcha}
                                                        />
                                                    </div>
                                                )}
                                                <div className="col-md-12">
                                                    <div className="rs-contact-btn">
                                                        <button
                                                            type="submit"
                                                            disabled={submitting}
                                                            id="contact-submit-btn"
                                                            className="rs-btn has-theme-yellow hover-white w-100"
                                                        >
                                                            {submitting ? 'Sending...' : 'Send Message'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div id="form-messages"></div>
                                    </div>

                                    {/* Google Map */}
                                    <MemoizedMap embedCode={settings.mapEmbedCode} />

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* contact form & map area end */}

            </main>
        </AppLayout>
    );
}
