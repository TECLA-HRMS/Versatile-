import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ permissions }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`${window.AppAssetUrl || '/'}admin/roles`);
    };

    const handlePermissionChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setData('permissions', [...data.permissions, value]);
        } else {
            setData('permissions', data.permissions.filter((p) => p !== value));
        }
    };

    return (
        <AdminLayout>
            <Head title="Create Role" />
            <div className="apt-header">
                <div className="apt-header-info">
                    <h2>Create Role</h2>
                    <p>Add a new role and assign permissions</p>
                </div>
                <Link href={route("admin.roles.index")} className="btn-secondary">
                    <i className="ri-arrow-left-line"></i> Back to Roles
                </Link>
            </div>

            <div className="apt-card">
                <div className="card-body" style={{ padding: '30px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <label className="form-label" style={{ fontWeight: 500, color: '#334155' }}>Role Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="e.g. Administrator, Content Editor"
                                style={{ maxWidth: '400px' }}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="mb-4 mt-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h5 style={{ margin: 0, fontWeight: 600, color: '#1e293b' }}>Module Permissions</h5>
                                    <p className="text-muted small mb-0">Select the specific actions this role can perform for each module.</p>
                                </div>
                            </div>
                            
                            <div className="table-responsive" style={{ border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                                <table className="table table-hover mb-0" style={{ borderCollapse: 'collapse' }}>
                                    <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                        <tr>
                                            <th style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 600, color: '#64748b', padding: '16px' }}>Module</th>
                                            <th className="text-center" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 600, color: '#64748b', padding: '16px', width: '100px' }}>View</th>
                                            <th className="text-center" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 600, color: '#64748b', padding: '16px', width: '100px' }}>Create</th>
                                            <th className="text-center" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 600, color: '#64748b', padding: '16px', width: '100px' }}>Edit</th>
                                            <th className="text-center" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 600, color: '#64748b', padding: '16px', width: '100px' }}>Delete</th>
                                            <th style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 600, color: '#64748b', padding: '16px' }}>Other Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {permissions.length > 0 ? (
                                            Object.entries(
                                                permissions.reduce((acc, perm) => {
                                                    const parts = perm.name.split(' ');
                                                    const action = parts[0];
                                                    const module = parts.length > 1 ? parts.slice(1).join(' ') : 'general';
                                                    if (!acc[module]) acc[module] = { view: null, create: null, edit: null, delete: null, others: [] };
                                                    
                                                    if (['view', 'create', 'edit', 'delete'].includes(action)) {
                                                        acc[module][action] = perm;
                                                    } else {
                                                        acc[module].others.push(perm);
                                                    }
                                                    return acc;
                                                }, {})
                                            ).map(([moduleName, actions]) => (
                                                <tr key={moduleName} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                                    <td style={{ fontWeight: 600, textTransform: 'capitalize', color: '#334155', padding: '16px' }}>
                                                        {moduleName}
                                                    </td>
                                                    <td className="text-center" style={{ padding: '16px' }}>
                                                        {actions.view && (
                                                            <input type="checkbox" style={{ appearance: 'auto', WebkitAppearance: 'checkbox', display: 'inline-block', opacity: 1, visibility: 'visible', cursor: 'pointer', width: '18px', height: '18px' }}
                                                                value={actions.view.name}
                                                                checked={data.permissions.includes(actions.view.name)}
                                                                onChange={handlePermissionChange}
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="text-center" style={{ padding: '16px' }}>
                                                        {actions.create && (
                                                            <input type="checkbox" style={{ appearance: 'auto', WebkitAppearance: 'checkbox', display: 'inline-block', opacity: 1, visibility: 'visible', cursor: 'pointer', width: '18px', height: '18px' }}
                                                                value={actions.create.name}
                                                                checked={data.permissions.includes(actions.create.name)}
                                                                onChange={handlePermissionChange}
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="text-center" style={{ padding: '16px' }}>
                                                        {actions.edit && (
                                                            <input type="checkbox" style={{ appearance: 'auto', WebkitAppearance: 'checkbox', display: 'inline-block', opacity: 1, visibility: 'visible', cursor: 'pointer', width: '18px', height: '18px' }}
                                                                value={actions.edit.name}
                                                                checked={data.permissions.includes(actions.edit.name)}
                                                                onChange={handlePermissionChange}
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="text-center" style={{ padding: '16px' }}>
                                                        {actions.delete && (
                                                            <input type="checkbox" style={{ appearance: 'auto', WebkitAppearance: 'checkbox', display: 'inline-block', opacity: 1, visibility: 'visible', cursor: 'pointer', width: '18px', height: '18px' }}
                                                                value={actions.delete.name}
                                                                checked={data.permissions.includes(actions.delete.name)}
                                                                onChange={handlePermissionChange}
                                                            />
                                                        )}
                                                    </td>
                                                    <td style={{ padding: '16px' }}>
                                                        {actions.others.map(perm => (
                                                            <label key={perm.id} style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', marginRight: '15px', marginBottom: 0 }}>
                                                                <input type="checkbox" style={{ appearance: 'auto', WebkitAppearance: 'checkbox', display: 'inline-block', opacity: 1, visibility: 'visible', cursor: 'pointer', width: '18px', height: '18px', marginRight: '6px' }}
                                                                    value={perm.name}
                                                                    checked={data.permissions.includes(perm.name)}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <span style={{ fontSize: '14px', textTransform: 'capitalize', color: '#475569' }}>{perm.name.split(' ')[0]}</span>
                                                            </label>
                                                        ))}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center text-muted" style={{ padding: '30px' }}>No permissions available.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {errors.permissions && <div className="text-danger mt-2" style={{ fontSize: '13px' }}>{errors.permissions}</div>}
                        </div>

                        <div className="d-flex justify-content-end gap-3 mt-5 pt-4" style={{ borderTop: '1px solid #e2e8f0' }}>
                            <Link href={`${window.AppAssetUrl || '/'}admin/roles`} className="btn btn-light" style={{ padding: '10px 24px', fontWeight: 500 }}>Cancel</Link>
                            <button type="submit" className="btn btn-primary" disabled={processing} style={{ padding: '10px 24px', fontWeight: 500 }}>
                                {processing ? 'Creating...' : 'Create Role'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
