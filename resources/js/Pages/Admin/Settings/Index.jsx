import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Settings() {
    const { props } = usePage();
    const settings = props.settings || {};
    const [activeTab, setActiveTab] = useState('appearance');
    const [showSecretKey, setShowSecretKey] = useState(false);
    
    const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenance_mode === '1');
    const [maintenanceProcessing, setMaintenanceProcessing] = useState(false);

    const toggleMaintenanceMode = () => {
        setMaintenanceProcessing(true);
        const newValue = maintenanceMode ? '0' : '1';
        router.post(route('admin.settings.maintenance'), { maintenance_mode: newValue }, {
            preserveScroll: true,
            onSuccess: () => {
                setMaintenanceMode(newValue === '1');
                Swal.fire({
                    title: 'Success!',
                    text: 'Maintenance mode updated!',
                    icon: 'success',
                    confirmButtonColor: '#fdc72f',
                });
            },
            onFinish: () => setMaintenanceProcessing(false)
        });
    };
    
    const { data: generalData, setData: setGeneralData, post: postGeneral, processing: processingGeneral } = useForm({
        institutionName: settings.institutionName || 'Versatile Business School',
        supportEmail: settings.supportEmail || 'admin@versatile.edu',
        defaultTimezone: settings.defaultTimezone || 'UTC',
        academicYear: settings.academicYear || '2026-2027',
        contactNumber: settings.contactNumber || '',
        address: settings.address || '',
        mapEmbedCode: settings.mapEmbedCode || '',
        facebookLink: settings.facebookLink || '',
        twitterLink: settings.twitterLink || '',
        instagramLink: settings.instagramLink || '',
        linkedinLink: settings.linkedinLink || '',
    });

    const { data, setData, post, processing, progress, errors } = useForm({
        theme: settings.theme || 'light',
        sidebarColor: settings.sidebarColor || '#1a365d',
        buttonColor: settings.buttonColor || '#fdc72f',
        fontFamily: settings.fontFamily || 'Inter',
        borderRadius: settings.borderRadius || 'rounded',
        header_logo: null,
        sidebar_logo: null,
        sidebar_closed_logo: null,
        footer_logo: null,
        favicon: null,
    });

    const { data: seoData, setData: setSeoData, post: postSeo, processing: processingSeo } = useForm({
        seo_meta_title: settings.seo_meta_title || '',
        seo_meta_description: settings.seo_meta_description || '',
        seo_meta_keywords: settings.seo_meta_keywords || '',
        seo_meta_author: settings.seo_meta_author || '',
    });

    const { data: recaptchaData, setData: setRecaptchaData, post: postRecaptcha, processing: processingRecaptcha } = useForm({
        recaptcha_enabled: settings.recaptcha_enabled === '1' ? '1' : '0',
        recaptcha_site_key: settings.recaptcha_site_key || '',
        recaptcha_secret_key: '', // always blank on load for security
    });

    const { data: chatData, setData: setChatData, post: postChat, processing: processingChat } = useForm({
        chat_type: settings.chat_type || 'whatsapp', // 'whatsapp', 'bot', 'tawkto'
        whatsapp_number: settings.whatsapp_number || settings.phone || '',
        tawkto_property_id: settings.tawkto_property_id || '',
        tawkto_widget_id: settings.tawkto_widget_id || '',
    });

    const env_mail = props.env_mail || {};

    const { data: emailData, setData: setEmailData, post: postEmail, processing: processingEmail } = useForm({
        mail_mailer: settings.mail_mailer || env_mail.mail_mailer || 'smtp',
        mail_host: settings.mail_host || env_mail.mail_host || '',
        mail_port: settings.mail_port || env_mail.mail_port || '',
        mail_username: settings.mail_username || env_mail.mail_username || '',
        mail_password: settings.mail_password || env_mail.mail_password || '',
        mail_encryption: settings.mail_encryption || env_mail.mail_encryption || 'tls',
    });

    const submitEmail = (e) => {
        e.preventDefault();
        postEmail(route('admin.settings.email'), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire('Success', 'Email settings saved successfully!', 'success');
            }
        });
    };

    const testEmailConnection = () => {
        if (!emailData.mail_host || !emailData.mail_username || !emailData.mail_password) {
            Swal.fire('Error', 'Please fill in host, username, and password before testing.', 'error');
            return;
        }
        Swal.fire({
            title: 'Testing Connection...',
            text: 'Please wait while we attempt to send a test email to your admin address.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
        router.post(route('admin.settings.email.test'), emailData, {
            preserveScroll: true,
            onSuccess: (page) => {
                Swal.fire('Success', 'Test email sent successfully! Check your inbox.', 'success');
            },
            onError: (errors) => {
                Swal.fire('Connection Failed', errors.error || 'Failed to connect to the mail server. Please check your credentials.', 'error');
            }
        });
    };



    const handleAppearanceChange = (key, value) => {
        setData(key, value);
        
        // Dispatch event so AdminLayout updates instantly
        window.dispatchEvent(new CustomEvent('appearance-changed', {
            detail: { [key]: value }
        }));
    };

    const submitAppearance = (e) => {
        e.preventDefault();
        post(route('admin.settings.appearance'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Appearance settings saved successfully!',
                    icon: 'success',
                    confirmButtonColor: '#fdc72f',
                });
            }
        });
    };

    const submitGeneral = (e) => {
        e.preventDefault();
        postGeneral(route('admin.settings.general'), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'General settings saved successfully!',
                    icon: 'success',
                    confirmButtonColor: '#fdc72f',
                });
            }
        });
    };

    const submitSeo = (e) => {
        e.preventDefault();
        postSeo(route('admin.settings.seo'), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Saved!',
                    text: 'SEO settings saved successfully!',
                    icon: 'success',
                    confirmButtonColor: '#fdc72f',
                });
            }
        });
    };

    const submitRecaptcha = (e) => {
        e.preventDefault();
        postRecaptcha(route('admin.settings.recaptcha'), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Saved!',
                    text: 'reCAPTCHA settings saved successfully!',
                    icon: 'success',
                    confirmButtonColor: '#fdc72f',
                });
                // Clear the secret key field after save
                setRecaptchaData('recaptcha_secret_key', '');
            }
        });
    };

    const submitChat = (e) => {
        e.preventDefault();
        postChat(route('admin.settings.chat'), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Saved!',
                    text: 'Chat settings saved successfully!',
                    icon: 'success',
                    confirmButtonColor: '#fdc72f',
                });
            }
        });
    };



    return (
        <AdminLayout title="System Settings">
            <div className="page-title-box">
                <div className="title-left">
                    <h1 className="page-title">System Settings</h1>
                    <ol className="breadcrumb">
                        <li>Versatile Business School</li>
                        <li>Administration</li>
                        <li className="active">Settings</li>
                    </ol>
                </div>
            </div>

            <div className="settings-container">
                {/* Settings Navigation */}
                <div className="settings-sidebar">
                    <div className="settings-nav-card card">
                        <div className="settings-nav-group">
                            <h5 className="settings-nav-title">Configuration</h5>
                            <button
                                className={`settings-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                                onClick={() => setActiveTab('general')}
                            >
                                <i className="ri-settings-3-line"></i>
                                General Settings
                            </button>
                            <button
                                className={`settings-tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
                                onClick={() => setActiveTab('appearance')}
                            >
                                <i className="ri-layout-masonry-line"></i>
                                Appearance
                            </button>
                            <button
                                className={`settings-tab-btn ${activeTab === 'advanced' ? 'active' : ''}`}
                                onClick={() => setActiveTab('advanced')}
                            >
                                <i className="ri-tools-line"></i>
                                Advanced Options
                            </button>
                            <button
                                className={`settings-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                                onClick={() => setActiveTab('security')}
                            >
                                <i className="ri-shield-keyhole-line"></i>
                                Security & Roles
                            </button>
                                                        <button
                                className={`settings-tab-btn ${activeTab === 'seo' ? 'active' : ''}`}
                                onClick={() => setActiveTab('seo')}
                            >
                                <i className="ri-search-eye-line"></i>
                                SEO Settings
                            </button>
                            <button
                                className={`settings-tab-btn ${activeTab === 'email' ? 'active' : ''}`}
                                onClick={() => setActiveTab('email')}
                            >
                                <i className="ri-mail-settings-line"></i>
                                Email Configuration
                            </button>
                            <button
                                className={`settings-tab-btn ${activeTab === 'recaptcha' ? 'active' : ''}`}
                                onClick={() => setActiveTab('recaptcha')}
                            >
                                <i className="ri-shield-check-line"></i>
                                Google reCAPTCHA
                            </button>
                            <button
                                className={`settings-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
                                onClick={() => setActiveTab('chat')}
                            >
                                <i className="ri-chat-3-line"></i>
                                Live Chat Integration
                            </button>
                        </div>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="settings-content">
                    {/* General Settings Tab */}
                    {activeTab === 'general' && (
                        <div className="card full-width">
                            <div className="card-header">
                                <h4 className="card-title">General Settings</h4>
                            </div>
                            <div className="card-body">
                                <form className="settings-form" onSubmit={submitGeneral}>
                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="form-label">Institution Name</label>
                                            <span className="form-help">The primary name used across the portal.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={generalData.institutionName} 
                                                onChange={e => setGeneralData('institutionName', e.target.value)} 
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="form-label">Support Email Address</label>
                                            <span className="form-help">Where system notifications and enquiries will be sent.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                value={generalData.supportEmail} 
                                                onChange={e => setGeneralData('supportEmail', e.target.value)} 
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="form-label">Default Timezone</label>
                                            <span className="form-help">Timezone for all application dates.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <select 
                                                className="form-control"
                                                value={generalData.defaultTimezone} 
                                                onChange={e => setGeneralData('defaultTimezone', e.target.value)}
                                            >
                                                <option value="UTC">UTC (Universal Time Coordinated)</option>
                                                <option value="EST">Eastern Standard Time</option>
                                                <option value="IST">India Standard Time</option>
                                                <option value="GMT">Greenwich Mean Time</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="form-label">Academic Year</label>
                                            <span className="form-help">Current active admissions year.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <select 
                                                className="form-control"
                                                value={generalData.academicYear} 
                                                onChange={e => setGeneralData('academicYear', e.target.value)}
                                            >
                                                <option value="2026-2027">2026 - 2027</option>
                                                <option value="2027-2028">2027 - 2028</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-5 mb-4 border-top pt-4">
                                        <h5 className="form-label">Contact & Social Links</h5>
                                        <p className="form-help mb-3">Update your contact number and social media profiles.</p>



                                        <div className="form-group row">
                                            <div className="col-md-4">
                                                <label className="form-label">Contact Number</label>
                                            </div>
                                            <div className="col-md-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="e.g. +1 123 456 7890"
                                                    value={generalData.contactNumber} 
                                                    onChange={e => setGeneralData('contactNumber', e.target.value)} 
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-md-4">
                                                <label className="form-label">Physical Address</label>
                                            </div>
                                            <div className="col-md-8">
                                                <textarea 
                                                    className="form-control" 
                                                    rows="3"
                                                    placeholder="e.g. 123 University Ave, City, Country"
                                                    value={generalData.address} 
                                                    onChange={e => setGeneralData('address', e.target.value)} 
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-md-4">
                                                <label className="form-label">Map Embed Code</label>
                                                <span className="form-help">Google Maps iframe code for Contact page.</span>
                                            </div>
                                            <div className="col-md-8">
                                                <textarea 
                                                    className="form-control" 
                                                    rows="4"
                                                    placeholder="<iframe src='...' ...></iframe>"
                                                    value={generalData.mapEmbedCode} 
                                                    onChange={e => setGeneralData('mapEmbedCode', e.target.value)} 
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-md-4">
                                                <label className="form-label">Facebook Link</label>
                                            </div>
                                            <div className="col-md-8">
                                                <input 
                                                    type="url" 
                                                    className="form-control" 
                                                    value={generalData.facebookLink} 
                                                    onChange={e => setGeneralData('facebookLink', e.target.value)} 
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-md-4">
                                                <label className="form-label">Twitter/X Link</label>
                                            </div>
                                            <div className="col-md-8">
                                                <input 
                                                    type="url" 
                                                    className="form-control" 
                                                    value={generalData.twitterLink} 
                                                    onChange={e => setGeneralData('twitterLink', e.target.value)} 
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-md-4">
                                                <label className="form-label">Instagram Link</label>
                                            </div>
                                            <div className="col-md-8">
                                                <input 
                                                    type="url" 
                                                    className="form-control" 
                                                    value={generalData.instagramLink} 
                                                    onChange={e => setGeneralData('instagramLink', e.target.value)} 
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <div className="col-md-4">
                                                <label className="form-label">LinkedIn Link</label>
                                            </div>
                                            <div className="col-md-8">
                                                <input 
                                                    type="url" 
                                                    className="form-control" 
                                                    value={generalData.linkedinLink} 
                                                    onChange={e => setGeneralData('linkedinLink', e.target.value)} 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-actions text-right mt-4 pt-3 border-top">
                                        <button type="button" className="btn-secondary mr-2" onClick={() => setActiveTab('general')}>Cancel</button>
                                        <button type="submit" className="btn-primary" disabled={processingGeneral}>Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Appearance Tab */}
                    {activeTab === 'appearance' && (
                        <div className="card full-width">
                            <div className="card-header">
                                <h4 className="card-title">Appearance Settings</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitAppearance}>
                                <div className="mt-5 border-top pt-4">
                                    <h5 className="form-label">Sidebar Aesthetic</h5>
                                        <p className="form-help mb-3">Choose the base color theme for the navigation sidebar.</p>
                                        
                                        <div className="d-flex align-items-center gap-2 mt-3">
                                            <input 
                                                type="color" 
                                                value={data.sidebarColor.startsWith('#') ? data.sidebarColor : '#1a365d'} 
                                                onChange={(e) => handleAppearanceChange('sidebarColor', e.target.value)} 
                                                style={{width: '44px', height: '44px', border: 'none', cursor: 'pointer', padding: 0}}
                                            />
                                            <span className="text-muted" style={{fontSize: '13px'}}>Custom Sidebar Color</span>
                                        </div>
                                    </div>

                                    <div className="mt-5 mb-4 border-top pt-4">
                                        <h5 className="form-label">Button & Accent Color</h5>
                                        <p className="form-help mb-3">Choose the primary color for buttons and accents.</p>
                                        
                                        <div className="d-flex align-items-center gap-2">
                                            <input 
                                                type="color" 
                                                value={data.buttonColor} 
                                                onChange={(e) => handleAppearanceChange('buttonColor', e.target.value)} 
                                                style={{width: '44px', height: '44px', border: 'none', cursor: 'pointer', padding: 0}}
                                            />
                                            <span className="text-muted" style={{fontSize: '13px'}}>Custom Button Color</span>
                                        </div>
                                    </div>

                                <div className="mt-5 mb-4 border-top pt-4">
                                    <h5 className="form-label">Advanced Layout Styles</h5>
                                    <p className="form-help mb-3">Customize the typography and shape aesthetics of the interface.</p>
                                    
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Font Family</label>
                                            <select 
                                                className="form-control"
                                                value={data.fontFamily}
                                                onChange={(e) => handleAppearanceChange('fontFamily', e.target.value)}
                                            >
                                                <option value="Inter">Inter (Modern & Clean)</option>
                                                <option value="Roboto">Roboto (Professional)</option>
                                                <option value="Poppins">Poppins (Friendly & Round)</option>
                                                <option value="system-ui">System Default</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Corner Style (Border Radius)</label>
                                            <select 
                                                className="form-control"
                                                value={data.borderRadius}
                                                onChange={(e) => handleAppearanceChange('borderRadius', e.target.value)}
                                            >
                                                <option value="sharp">Sharp (0px)</option>
                                                <option value="rounded">Rounded (Standard)</option>
                                                <option value="pill">Soft & Pill-like (Large)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 border-top pt-4">
                                        <h5 className="form-label">Brand Logos & Favicon</h5>
                                        <p className="form-help mb-3">Upload logos and the browser tab icon (favicon).</p>
                                        
                                        <div className="row">
                                            {/* Preview helper function */}
                                            {(() => {
                                                const renderPreview = (fileData, existingUrl) => {
                                                    if (fileData) return <img src={URL.createObjectURL(fileData)} alt="Preview" style={{maxHeight: '60px', marginBottom: '10px'}} />;
                                                    if (existingUrl) return <img src={window.assets(existingUrl)} alt="Current" style={{maxHeight: '60px', marginBottom: '10px'}} />;
                                                    return <i className="ri-image-add-line image-upload-icon"></i>;
                                                };
                                                return (
                                                    <>
                                                        <div className="col-md-4 mb-3">
                                                            <label className="image-upload-zone" style={{display: 'block', cursor: 'pointer', textAlign: 'center'}}>
                                                                {renderPreview(data.header_logo, settings.header_logo)}
                                                                <div className="fw-medium text-dark">Header Logo</div>
                                                                <div className="form-help">{data.header_logo ? data.header_logo.name : 'Click to browse (PNG, SVG)'}</div>
                                                                <input type="file" style={{display: 'none'}} onChange={(e) => setData('header_logo', e.target.files[0])} />
                                                            </label>
                                                            {errors.header_logo && <div className="text-danger mt-1" style={{fontSize: '0.85rem'}}>{errors.header_logo}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label className="image-upload-zone" style={{backgroundColor: 'var(--primary-color)', display: 'block', cursor: 'pointer', textAlign: 'center'}}>
                                                                {(() => {
                                                                    if (data.sidebar_logo) return <img src={URL.createObjectURL(data.sidebar_logo)} alt="Preview" style={{maxHeight: '60px', marginBottom: '10px'}} />;
                                                                    if (settings.sidebar_logo) return <img src={window.assets(settings.sidebar_logo)} alt="Current" style={{maxHeight: '60px', marginBottom: '10px'}} />;
                                                                    return <i className="ri-image-add-line image-upload-icon" style={{color: 'rgba(255,255,255,0.5)'}}></i>;
                                                                })()}
                                                                <div className="fw-medium" style={{color: 'white'}}>Sidebar Logo</div>
                                                                <div className="form-help" style={{color: 'rgba(255,255,255,0.7)'}}>{data.sidebar_logo ? data.sidebar_logo.name : 'Click to browse (PNG, SVG)'}</div>
                                                                <input type="file" style={{display: 'none'}} onChange={(e) => setData('sidebar_logo', e.target.files[0])} />
                                                            </label>
                                                            {errors.sidebar_logo && <div className="text-danger mt-1" style={{fontSize: '0.85rem'}}>{errors.sidebar_logo}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label className="image-upload-zone" style={{backgroundColor: 'var(--primary-color)', display: 'block', cursor: 'pointer', textAlign: 'center'}}>
                                                                {(() => {
                                                                    if (data.sidebar_closed_logo) return <img src={URL.createObjectURL(data.sidebar_closed_logo)} alt="Preview" style={{maxHeight: '60px', marginBottom: '10px'}} />;
                                                                    if (settings.sidebar_closed_logo) return <img src={window.assets(settings.sidebar_closed_logo)} alt="Current" style={{maxHeight: '60px', marginBottom: '10px'}} />;
                                                                    return <i className="ri-image-add-line image-upload-icon" style={{color: 'rgba(255,255,255,0.5)'}}></i>;
                                                                })()}
                                                                <div className="fw-medium" style={{color: 'white'}}>Sidebar Closed Logo (Icon)</div>
                                                                <div className="form-help" style={{color: 'rgba(255,255,255,0.7)'}}>{data.sidebar_closed_logo ? data.sidebar_closed_logo.name : 'Click to browse (PNG, SVG)'}</div>
                                                                <input type="file" style={{display: 'none'}} onChange={(e) => setData('sidebar_closed_logo', e.target.files[0])} />
                                                            </label>
                                                            {errors.sidebar_closed_logo && <div className="text-danger mt-1" style={{fontSize: '0.85rem'}}>{errors.sidebar_closed_logo}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label className="image-upload-zone" style={{display: 'block', cursor: 'pointer', textAlign: 'center'}}>
                                                                {renderPreview(data.footer_logo, settings.footer_logo)}
                                                                <div className="fw-medium text-dark">Footer Logo</div>
                                                                <div className="form-help">{data.footer_logo ? data.footer_logo.name : 'Click to browse (PNG, SVG)'}</div>
                                                                <input type="file" style={{display: 'none'}} onChange={(e) => setData('footer_logo', e.target.files[0])} />
                                                            </label>
                                                            {errors.footer_logo && <div className="text-danger mt-1" style={{fontSize: '0.85rem'}}>{errors.footer_logo}</div>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label className="image-upload-zone" style={{display: 'block', cursor: 'pointer', textAlign: 'center'}}>
                                                                {renderPreview(data.favicon, settings.favicon)}
                                                                <div className="fw-medium text-dark">Browser Favicon</div>
                                                                <div className="form-help">{data.favicon ? data.favicon.name : 'Click to browse (.ico, .png)'}</div>
                                                                <input type="file" style={{display: 'none'}} onChange={(e) => setData('favicon', e.target.files[0])} />
                                                            </label>
                                                            {errors.favicon && <div className="text-danger mt-1" style={{fontSize: '0.85rem'}}>{errors.favicon}</div>}
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                    


                                    <div className="form-actions text-right mt-4 pt-3 border-top">
                                        <button type="submit" className="btn-primary" disabled={processing}>Save Appearance Settings</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Advanced Options Tab */}
                    {activeTab === 'advanced' && (
                        <div className="card full-width border-danger-top">
                            <div className="card-header">
                                <h4 className="card-title text-danger">Advanced Options</h4>
                                <span className="badge bg-danger">Admin Only</span>
                            </div>
                            <div className="card-body">
                                <div className="advanced-option-item">
                                    <div className="option-info">
                                        <h5 className="option-title">Maintenance Mode</h5>
                                        <p className="option-desc">Disable public access to the application portal. Only administrators will be able to log in.</p>
                                    </div>
                                    <div className="option-action">
                                        <label className="switch">
                                            <input 
                                                type="checkbox" 
                                                checked={maintenanceMode}
                                                onChange={toggleMaintenanceMode}
                                                disabled={maintenanceProcessing}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="advanced-option-item border-bottom-0 pb-0">
                                    <div className="option-info">
                                        <h5 className="option-title">Clear System Cache</h5>
                                        <p className="option-desc">Force flush the application cache, config cache, and view cache. This may temporarily slow down the site.</p>
                                    </div>
                                    <div className="option-action">
                                        <button className="btn-secondary btn-sm text-warning border-warning">
                                            <i className="ri-refresh-line"></i> Clear Cache
                                        </button>
                                    </div>
                                </div>


                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="card full-width">
                            <div className="card-header">
                                <h4 className="card-title">Security & Roles</h4>
                            </div>
                            <div className="card-body">
                                <form className="settings-form">
                                    <div className="advanced-option-item">
                                        <div className="option-info">
                                            <h5 className="option-title">Two-Factor Authentication (2FA)</h5>
                                            <p className="option-desc">Require all administrative users to use a 2FA app (e.g., Google Authenticator) when logging in.</p>
                                        </div>
                                        <div className="option-action">
                                            <label className="switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group row mt-4">
                                        <div className="col-md-4">
                                            <label className="form-label">Password Policy</label>
                                            <span className="form-help">Minimum requirements for new passwords.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <select className="form-control mb-2">
                                                <option value="high">Strict (12+ chars, special chars, numbers, caps)</option>
                                                <option value="medium">Medium (8+ chars, numbers)</option>
                                                <option value="low">Basic (8+ chars)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="form-label">Session Timeout</label>
                                            <span className="form-help">Auto-logout idle users after this duration.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <select className="form-control">
                                                <option value="15">15 Minutes</option>
                                                <option value="30">30 Minutes</option>
                                                <option value="60">1 Hour</option>
                                                <option value="120">2 Hours</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-actions text-right mt-4 pt-3 border-top">
                                        <button type="button" className="btn-primary">Update Security Settings</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Email Tab */}
                    {activeTab === 'email' && (
                        <div className="card full-width">
                            <div className="card-header">
                                <h4 className="card-title">Email Configuration</h4>
                            </div>
                            <div className="card-body">
                                <form className="settings-form" onSubmit={submitEmail}>
                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="form-label">Mail Mailer</label>
                                            <span className="form-help">The driver used to send emails.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <select className="form-control" value={emailData.mail_mailer} onChange={e => setEmailData('mail_mailer', e.target.value)}>
                                                <option value="smtp">SMTP</option>
                                                <option value="mailgun">Mailgun</option>
                                                <option value="ses">Amazon SES</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="form-label">SMTP Host</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" value={emailData.mail_host} onChange={e => setEmailData('mail_host', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="form-label">SMTP Port</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" value={emailData.mail_port} onChange={e => setEmailData('mail_port', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="form-label">SMTP Username</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" value={emailData.mail_username} onChange={e => setEmailData('mail_username', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="form-label">SMTP Password</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="password" className="form-control" value={emailData.mail_password} onChange={e => setEmailData('mail_password', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="advanced-option-item mt-4 pb-0 border-bottom-0">
                                        <div className="option-info">
                                            <h5 className="option-title">Use TLS Encryption</h5>
                                            <p className="option-desc">Secure the connection with the mail server.</p>
                                        </div>
                                        <div className="option-action">
                                            <label className="switch">
                                                <input type="checkbox" checked={emailData.mail_encryption === 'tls'} onChange={e => setEmailData('mail_encryption', e.target.checked ? 'tls' : 'none')} />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-actions text-right mt-4 pt-3 border-top">
                                        <button type="button" className="btn-secondary mr-2" onClick={testEmailConnection}>Test Connection</button>
                                        <button type="submit" className="btn-primary" disabled={processingEmail}>Save Mail Configuration</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* reCAPTCHA Tab */}
                    {activeTab === 'recaptcha' && (
                        <div className="card full-width">
                            <div className="card-header">
                                <h4 className="card-title">Google reCAPTCHA Settings</h4>
                                <span className={`badge ${recaptchaData.recaptcha_enabled === '1' ? 'bg-success' : 'bg-secondary'}`}>
                                    {recaptchaData.recaptcha_enabled === '1' ? 'Enabled' : 'Disabled'}
                                </span>
                            </div>
                            <div className="card-body">

                                {/* Info box */}
                                <div style={{ background: '#f0f7ff', border: '1px solid #b3d4ff', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    <i className="ri-information-line" style={{ fontSize: '20px', color: '#2563eb', flexShrink: 0, marginTop: '2px' }}></i>
                                    <div>
                                        <p style={{ margin: 0, fontSize: '14px', color: '#1e40af', fontWeight: 600 }}>How to get your reCAPTCHA keys</p>
                                        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#374151' }}>
                                            Visit <a href="https://www.google.com/recaptcha/admin" target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>Google reCAPTCHA Admin Console</a> → Register a new site → Select <strong>v2 "I'm not a robot" Checkbox</strong> → Add your domain → Copy the <strong>Site Key</strong> and <strong>Secret Key</strong> below.
                                        </p>
                                        <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#6b7280' }}>
                                            🔑 Test keys: Site Key <code>6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI</code> — Secret <code>6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe</code>
                                        </p>
                                    </div>
                                </div>

                                <form className="settings-form" onSubmit={submitRecaptcha}>

                                    {/* Enable Toggle */}
                                    <div className="advanced-option-item">
                                        <div className="option-info">
                                            <h5 className="option-title">Enable Google reCAPTCHA</h5>
                                            <p className="option-desc">When enabled, a reCAPTCHA checkbox will appear on the Contact Us form. Forms will be rejected if the challenge is not completed.</p>
                                        </div>
                                        <div className="option-action">
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    checked={recaptchaData.recaptcha_enabled === '1'}
                                                    onChange={e => setRecaptchaData('recaptcha_enabled', e.target.checked ? '1' : '0')}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Site Key */}
                                    <div className="form-group row mt-4">
                                        <div className="col-md-4">
                                            <label className="form-label">Site Key (Public)</label>
                                            <span className="form-help">Used in the frontend widget. Safe to expose publicly.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="6LeIxAcTAAAAA..."
                                                value={recaptchaData.recaptcha_site_key}
                                                onChange={e => setRecaptchaData('recaptcha_site_key', e.target.value)}
                                            />
                                            {settings.recaptcha_site_key && (
                                                <small style={{ color: '#16a34a', marginTop: '4px', display: 'block' }}>✓ Site key is saved</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* Secret Key */}
                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="form-label">Secret Key (Private)</label>
                                            <span className="form-help">Never exposed to users. Used for server-side verification only.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <div style={{ position: 'relative' }}>
                                                <input
                                                    type={showSecretKey ? 'text' : 'password'}
                                                    className="form-control"
                                                    placeholder={settings.recaptcha_secret_key ? '••••••••••••••••••• (saved — enter new to change)' : '6LeIxAcTAAAAA...'}
                                                    value={recaptchaData.recaptcha_secret_key}
                                                    onChange={e => setRecaptchaData('recaptcha_secret_key', e.target.value)}
                                                    style={{ paddingRight: '44px' }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowSecretKey(v => !v)}
                                                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '18px' }}
                                                >
                                                    <i className={showSecretKey ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                                                </button>
                                            </div>
                                            {settings.recaptcha_secret_key && (
                                                <small style={{ color: '#16a34a', marginTop: '4px', display: 'block' }}>✓ Secret key is saved — leave blank to keep existing</small>
                                            )}
                                        </div>
                                    </div>

                                    {/* Status summary */}
                                    <div style={{ background: recaptchaData.recaptcha_enabled === '1' ? '#f0fdf4' : '#fafafa', border: `1px solid ${recaptchaData.recaptcha_enabled === '1' ? '#86efac' : '#e5e7eb'}`, borderRadius: '8px', padding: '12px 16px', marginTop: '8px', marginBottom: '8px' }}>
                                        <p style={{ margin: 0, fontSize: '13px', color: recaptchaData.recaptcha_enabled === '1' ? '#15803d' : '#6b7280' }}>
                                            {recaptchaData.recaptcha_enabled === '1'
                                                ? '✅ reCAPTCHA is ENABLED — Contact form will require challenge completion before submission.'
                                                : '⭕ reCAPTCHA is DISABLED — No reCAPTCHA widget will appear on any frontend form.'}
                                        </p>
                                    </div>

                                    <div className="form-actions text-right mt-4 pt-3 border-top">
                                        <button type="submit" className="btn-primary" disabled={processingRecaptcha}>
                                            <i className="ri-save-line mr-1"></i>
                                            {processingRecaptcha ? 'Saving...' : 'Save reCAPTCHA Settings'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Live Chat Integration Tab */}
                    {activeTab === 'chat' && (
                        <div className="card full-width">
                            <div className="card-header">
                                <h4 className="card-title">Live Chat Integration</h4>
                                <span className={`badge ${chatData.chat_type === 'tawkto' ? 'bg-success' : (chatData.chat_type === 'bot' ? 'bg-info' : 'bg-primary')}`}>
                                    {chatData.chat_type === 'tawkto' ? 'Tawk.to' : (chatData.chat_type === 'bot' ? 'Virtual Assistant' : 'WhatsApp')}
                                </span>
                            </div>
                            <div className="card-body">
                                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
                                    <h5 style={{ margin: '0 0 8px', fontSize: '15px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="ri-information-fill" style={{ color: '#3b82f6', fontSize: '18px' }}></i>
                                        Chat Widget Configuration
                                    </h5>
                                    <p style={{ margin: '0', fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                                        By default, a <strong>Custom WhatsApp Widget</strong> is displayed on your website using your configured Support Contact Number. If you prefer to use <strong>Tawk.to</strong> for live customer support, enable it below and enter your Tawk.to Property ID. When enabled, Tawk.to will override the WhatsApp widget.
                                    </p>
                                </div>

                                <form className="settings-form" onSubmit={submitChat}>
                                    {/* Chat Type Selection */}
                                    <div className="form-group mb-4">
                                        <label className="form-label" style={{ fontWeight: '600' }}>Select Chat Experience</label>
                                        <select 
                                            className="form-control"
                                            value={chatData.chat_type}
                                            onChange={e => setChatData('chat_type', e.target.value)}
                                        >
                                            <option value="whatsapp">Simple WhatsApp Button (Redirects immediately)</option>
                                            <option value="bot">Virtual Assistant Bot (Captures Phone Number)</option>
                                            <option value="tawkto">Tawk.to Live Chat (Third-party integration)</option>
                                        </select>
                                    </div>

                                    {/* WhatsApp Number (For Simple Button & Bot) */}
                                    <div className="form-group mb-4" style={{ display: ['whatsapp', 'bot'].includes(chatData.chat_type) ? 'block' : 'none' }}>
                                        <label className="form-label" style={{ fontWeight: '600' }}>WhatsApp Support Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g., +919876543210"
                                            value={chatData.whatsapp_number}
                                            onChange={e => setChatData('whatsapp_number', e.target.value)}
                                        />
                                        <small className="form-text text-muted mt-2">
                                            The WhatsApp number that students will be redirected to when using the chat button or bot. Include country code (e.g., +91).
                                        </small>
                                    </div>

                                    {/* Tawk.to Keys */}
                                    <div className="form-group mb-4" style={{ display: chatData.chat_type === 'tawkto' ? 'block' : 'none' }}>
                                        <label className="form-label" style={{ fontWeight: '600' }}>Tawk.to Property ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g., 62a1b2c3d4e5f60001a2b3c4"
                                            value={chatData.tawkto_property_id}
                                            onChange={e => setChatData('tawkto_property_id', e.target.value)}
                                        />
                                        <small className="form-text text-muted mt-2">
                                            You can find this in your Tawk.to Dashboard &gt; Administration &gt; Chat Widget &gt; Direct Chat Link (it's the first long string of characters).
                                        </small>
                                    </div>

                                    <div className="form-group mb-4" style={{ display: chatData.chat_type === 'tawkto' ? 'block' : 'none' }}>
                                        <label className="form-label" style={{ fontWeight: '600' }}>Tawk.to Widget ID (Optional)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="default"
                                            value={chatData.tawkto_widget_id}
                                            onChange={e => setChatData('tawkto_widget_id', e.target.value)}
                                        />
                                        <small className="form-text text-muted mt-2">
                                            Usually "default". You can find this in your Tawk.to Dashboard &gt; Administration &gt; Chat Widget &gt; Widget ID.
                                        </small>
                                    </div>

                                    <div className="form-actions text-right mt-4 pt-3 border-top">
                                        <button type="submit" className="btn-primary" disabled={processingChat}>
                                            <i className="ri-save-line mr-1"></i>
                                            {processingChat ? 'Saving...' : 'Save Chat Settings'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* SEO Settings Tab */}
                    {activeTab === 'seo' && (
                        <div className="card full-width">
                            <div className="card-header">
                                <h4 className="card-title">Global SEO Settings</h4>
                            </div>
                            <div className="card-body">
                                <form className="settings-form" onSubmit={submitSeo}>
                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="form-label">Meta Title</label>
                                            <span className="form-help">Global title tag for the website.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={seoData.seo_meta_title} 
                                                onChange={e => setSeoData('seo_meta_title', e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-4">
                                        <div className="col-md-4">
                                            <label className="form-label">Meta Description</label>
                                            <span className="form-help">Short description of your website for search engines.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <textarea 
                                                className="form-control" 
                                                rows="3"
                                                value={seoData.seo_meta_description} 
                                                onChange={e => setSeoData('seo_meta_description', e.target.value)} 
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row mt-4">
                                        <div className="col-md-4">
                                            <label className="form-label">Meta Keywords</label>
                                            <span className="form-help">Comma-separated list of keywords.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={seoData.seo_meta_keywords} 
                                                onChange={e => setSeoData('seo_meta_keywords', e.target.value)} 
                                                placeholder="university, education, college"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-4">
                                        <div className="col-md-4">
                                            <label className="form-label">Meta Author</label>
                                            <span className="form-help">Name of the organization or author.</span>
                                        </div>
                                        <div className="col-md-8">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={seoData.seo_meta_author} 
                                                onChange={e => setSeoData('seo_meta_author', e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-actions text-right mt-4 pt-3 border-top">
                                        <button type="submit" className="btn-primary" disabled={processingSeo}>
                                            <i className="ri-save-line mr-1"></i>
                                            {processingSeo ? 'Saving...' : 'Save SEO Settings'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AdminLayout>
    );
}
