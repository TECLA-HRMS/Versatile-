import React, { useRef, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Profile() {
    const { auth } = usePage().props;
    const fileInputRef = useRef(null);
    const [photoPreview, setPhotoPreview] = useState(auth?.user?.profile_photo_url || null);

    // Form for updating Profile Information
    const { data: profileData, setData: setProfileData, post: postProfile, processing: profileProcessing, errors: profileErrors } = useForm({
        name: auth?.user?.name || '',
        email: auth?.user?.email || '',
        photo: null,
    });

    // Form for updating Password
    const { data: passwordData, setData: setPasswordData, put: putPassword, processing: passwordProcessing, errors: passwordErrors, reset: resetPassword } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitProfile = (e) => {
        e.preventDefault();
        postProfile(route('admin.profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your profile has been updated.',
                    icon: 'success',
                    confirmButtonColor: '#fdc72f',
                });
            },
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        putPassword(route('admin.profile.password'), {
            preserveScroll: true,
            onSuccess: () => {
                resetPassword();
                Swal.fire({
                    title: 'Success!',
                    text: 'Your password has been updated.',
                    icon: 'success',
                    confirmButtonColor: '#fdc72f',
                });
            },
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData('photo', file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <AdminLayout title="My Profile">
            <div className="page-title-box mb-4">
                <div className="title-left">
                    <h1 className="page-title">My Profile</h1>
                    <ol className="breadcrumb">
                        <li>Administration</li>
                        <li className="active">Profile</li>
                    </ol>
                </div>
            </div>

            <div className="row g-4">
                {/* Profile Card & Info Update */}
                <div className="col-md-5 col-xl-4">
                    <div className="card shadow-sm border-0 rounded-4 mb-4">
                        <div className="card-body text-center p-5">
                            <div className="mb-4 d-flex justify-content-center">
                                <div 
                                    style={{
                                        width: '120px', height: '120px', borderRadius: '50%',
                                        background: photoPreview ? 'transparent' : 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                                        color: 'white', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontSize: '42px', fontWeight: 'bold',
                                        position: 'relative', cursor: 'pointer', overflow: 'hidden',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                    onClick={triggerFileInput}
                                    title="Click to change photo"
                                >
                                    {photoPreview ? (
                                        <img src={window.assets(photoPreview)} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        (auth?.user?.name || 'A').charAt(0).toUpperCase()
                                    )}
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        background: 'rgba(0,0,0,0.5)', padding: '5px 0',
                                        fontSize: '12px', color: 'white'
                                    }}>
                                        <i className="ri-camera-fill"></i>
                                    </div>
                                </div>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    style={{ display: 'none' }} 
                                    onChange={handlePhotoChange}
                                    accept="image/jpeg,image/png,image/jpg"
                                />
                            </div>
                            <h4 className="fw-bold mb-1">{auth?.user?.name}</h4>
                            <p className="text-muted mb-3">{auth?.user?.email}</p>
                            
                            <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                                {auth?.user?.roles?.map((role, idx) => (
                                    <span key={idx} className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                                        {role}
                                    </span>
                                ))}
                            </div>
                            
                            {profileErrors.photo && <div className="text-danger small mb-3">{profileErrors.photo}</div>}
                        </div>
                    </div>
                </div>

                {/* Forms Section */}
                <div className="col-md-7 col-xl-8">
                    {/* Profile Information Form */}
                    <div className="card shadow-sm border-0 rounded-4 mb-4">
                        <div className="card-header bg-white border-bottom pt-4 pb-3 px-4">
                            <h5 className="mb-0 fw-bold">Profile Information</h5>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={submitProfile}>
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-medium text-dark">Full Name</label>
                                        <input 
                                            type="text" 
                                            className={`form-control form-control-lg ${profileErrors.name ? 'is-invalid' : ''}`}
                                            value={profileData.name}
                                            onChange={e => setProfileData('name', e.target.value)}
                                            placeholder="Enter your name"
                                        />
                                        {profileErrors.name && <div className="invalid-feedback">{profileErrors.name}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-medium text-dark">Email Address</label>
                                        <input 
                                            type="email" 
                                            className={`form-control form-control-lg ${profileErrors.email ? 'is-invalid' : ''}`}
                                            value={profileData.email}
                                            onChange={e => setProfileData('email', e.target.value)}
                                            placeholder="Enter email address"
                                        />
                                        {profileErrors.email && <div className="invalid-feedback">{profileErrors.email}</div>}
                                    </div>
                                </div>

                                <div className="pt-3 border-top d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary px-4 py-2" disabled={profileProcessing}>
                                        {profileProcessing ? 'Saving...' : 'Save Profile'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Change Password Form */}
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-header bg-white border-bottom pt-4 pb-3 px-4">
                            <h5 className="mb-0 fw-bold">Change Password</h5>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={submitPassword}>
                                <div className="mb-4">
                                    <label className="form-label fw-medium text-dark">Current Password</label>
                                    <input 
                                        type="password" 
                                        className={`form-control form-control-lg ${passwordErrors.current_password ? 'is-invalid' : ''}`}
                                        value={passwordData.current_password}
                                        onChange={e => setPasswordData('current_password', e.target.value)}
                                        placeholder="Enter current password"
                                    />
                                    {passwordErrors.current_password && <div className="invalid-feedback">{passwordErrors.current_password}</div>}
                                </div>

                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-medium text-dark">New Password</label>
                                        <input 
                                            type="password" 
                                            className={`form-control form-control-lg ${passwordErrors.password ? 'is-invalid' : ''}`}
                                            value={passwordData.password}
                                            onChange={e => setPasswordData('password', e.target.value)}
                                            placeholder="Enter new password"
                                        />
                                        {passwordErrors.password && <div className="invalid-feedback">{passwordErrors.password}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-medium text-dark">Confirm Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control form-control-lg"
                                            value={passwordData.password_confirmation}
                                            onChange={e => setPasswordData('password_confirmation', e.target.value)}
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>

                                <div className="pt-3 border-top d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary px-4 py-2" disabled={passwordProcessing}>
                                        {passwordProcessing ? 'Saving...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
