import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ roles }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password_type: 'auto',
        password: '',
        password_confirmation: '',
        send_email: true,
        roles: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`${window.AppAssetUrl || '/'}admin/users`);
    };

    const handleRoleChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setData('roles', [...data.roles, value]);
        } else {
            setData('roles', data.roles.filter((r) => r !== value));
        }
    };

    return (
        <AdminLayout>
            <Head title="Create User" />
            <div className="admin-page-header d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="admin-page-title h4 mb-0">Create User</h2>
                    <p className="text-muted mb-0">Add a new user and assign roles</p>
                </div>
                <Link href={`${window.AppAssetUrl || '/'}admin/users`} className="btn btn-light d-flex align-items-center gap-2">
                    <i className="ri-arrow-left-line"></i> Back to Users
                </Link>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label fw-medium">Full Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="John Doe"
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-medium">Email Address</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="col-12 mt-2">
                                <label className="form-label fw-bold text-dark d-block mb-3 fs-6">Authentication Settings</label>
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className={`w-100 p-3 border rounded-3 d-flex align-items-center gap-3 transition-all ${data.password_type === 'auto' ? 'border-primary bg-primary bg-opacity-10' : 'bg-light border-light'}`} style={{ cursor: 'pointer', transition: 'all 0.2s ease-in-out' }}>
                                            <input type="radio" name="password_type" value="auto" className="form-check-input mt-0" checked={data.password_type === 'auto'} onChange={e => setData('password_type', e.target.value)} style={{ transform: 'scale(1.2)' }} />
                                            <div>
                                                <div className="fw-semibold text-dark" style={{ fontSize: '15px' }}>Auto-generate Password</div>
                                                <div className="text-muted" style={{ fontSize: '13px' }}>System creates a secure 10-character password</div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className={`w-100 p-3 border rounded-3 d-flex align-items-center gap-3 transition-all ${data.password_type === 'manual' ? 'border-primary bg-primary bg-opacity-10' : 'bg-light border-light'}`} style={{ cursor: 'pointer', transition: 'all 0.2s ease-in-out' }}>
                                            <input type="radio" name="password_type" value="manual" className="form-check-input mt-0" checked={data.password_type === 'manual'} onChange={e => setData('password_type', e.target.value)} style={{ transform: 'scale(1.2)' }} />
                                            <div>
                                                <div className="fw-semibold text-dark" style={{ fontSize: '15px' }}>Manual Entry</div>
                                                <div className="text-muted" style={{ fontSize: '13px' }}>Set a specific password for this user manually</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {data.password_type === 'manual' && (
                                <>
                                    <div className="col-md-6">
                                        <label className="form-label fw-medium">Password</label>
                                        <input
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-medium">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={data.password_confirmation}
                                            onChange={e => setData('password_confirmation', e.target.value)}
                                        />
                                    </div>
                                </>
                            )}
                            
                            <div className="col-12 mt-2">
                                <div className="p-3 border rounded-3 d-flex align-items-center justify-content-between flex-wrap gap-3" style={{ background: '#f8f9fa' }}>
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary" style={{ width: '40px', height: '40px' }}>
                                            <i className="ri-mail-send-line fs-5"></i>
                                        </div>
                                        <div>
                                            <div className="fw-semibold text-dark mb-1" style={{ fontSize: '15px' }}>Send Welcome Email</div>
                                            <div className="text-muted" style={{ fontSize: '13px' }}>Automatically email the user their login credentials and a link to sign in.</div>
                                        </div>
                                    </div>
                                    <div className="form-check form-switch m-0" style={{ transform: 'scale(1.3)', transformOrigin: 'right center' }}>
                                        <input
                                            className="form-check-input m-0"
                                            type="checkbox"
                                            id="send_email"
                                            checked={data.send_email}
                                            onChange={e => setData('send_email', e.target.checked)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-4">
                                <label className="form-label fw-medium d-block">Assign Role</label>
                                <p className="text-muted small mb-2">Assigning a role grants the user Admin access.</p>
                                {roles.length > 0 ? (
                                    <select 
                                        className={`form-select ${errors.roles ? 'is-invalid' : ''}`}
                                        value={data.roles.length > 0 ? data.roles[0] : ''}
                                        onChange={e => setData('roles', e.target.value ? [e.target.value] : [])}
                                    >
                                        <option value="">-- Select a Role --</option>
                                        {roles.map(role => (
                                            <option key={role.id} value={role.name}>{role.name}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="text-muted border rounded p-3 bg-light">No roles available in the system yet. Please create roles first.</div>
                                )}
                                {errors.roles && <div className="invalid-feedback d-block mt-2">{errors.roles}</div>}
                            </div>
                        </div>

                        <hr className="my-4" />
                        <div className="d-flex justify-content-end gap-2">
                            <Link href={`${window.AppAssetUrl || '/'}admin/users`} className="btn btn-light">Cancel</Link>
                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                {processing ? 'Creating...' : 'Create User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
