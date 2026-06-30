import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AdminFilterBar from '../../../Components/AdminFilterBar';

export default function Index({ emails, filters = {} }) {
    const [showModal, setShowModal] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        is_active: true
    });

    const handleFilter = (newFilters) => {
        router.get(route('admin.notification-emails.index'), newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const advancedFilters = [
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                { value: '1', label: 'Active' },
                { value: '0', label: 'Inactive' }
            ]
        }
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.notification-emails.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            }
        });
    };

    const toggleStatus = (id, currentStatus) => {
        router.put(route('admin.notification-emails.update', id), {
            is_active: !currentStatus
        });
    };

    const deleteEmail = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.notification-emails.destroy', id));
            }
        });
    };

    return (
        <AdminLayout title="Notification Emails">
            <Head title="Notification Emails" />

            <div className="apt-header">
                <div className="apt-header-info">
                    <h2>Notification Emails</h2>
                    <p>Manage the list of administrative emails that receive system alerts (like new contacts, brochures, or applications).</p>
                </div>
                <button onClick={() => setShowModal(true)} className="apt-create-btn" style={{ border: 'none' }}>
                    <i className="ri-add-line"></i>
                    <span>Add Email</span>
                </button>
            </div>

            <AdminFilterBar 
                searchPlaceholder="Search emails by name or email..." 
                currentFilters={filters} 
                advancedFilters={advancedFilters} 
                onFilter={handleFilter} 
            />

            <div className="apt-card">
                <div className="apt-table-wrapper">
                    <table className="apt-table">
                        <thead>
                            <tr>
                                <th>Name / Role</th>
                                <th>Email Address</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emails && emails.length > 0 ? (
                                emails.map((item) => (
                                    <tr key={item.id}>
                                        <td data-label="Name">{item.name || <span className="text-muted">No Name Provided</span>}</td>
                                        <td data-label="Email Address"><strong>{item.email}</strong></td>
                                        <td data-label="Status">
                                            <span 
                                                className={`apt-badge ${item.is_active ? 'apt-badge-success' : 'apt-badge-danger'}`}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => toggleStatus(item.id, item.is_active)}
                                                title="Click to toggle status"
                                            >
                                                {item.is_active ? 'Active' : 'Disabled'}
                                            </span>
                                        </td>
                                        <td data-label="Actions" className="text-right">
                                            <button onClick={() => deleteEmail(item.id)} className="apt-action-btn apt-action-danger" title="Delete">
                                                <i className="ri-delete-bin-line"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="empty-state-row">
                                    <td colSpan="4">
                                        <div className="apt-empty">
                                            <div className="apt-empty-icon"><i className="ri-mail-forbid-line"></i></div>
                                            <h3>No Notification Emails</h3>
                                            <p>Add email addresses to start receiving alerts.</p>
                                            <button onClick={() => setShowModal(true)} className="apt-btn apt-btn-primary mt-3">
                                                <i className="ri-add-line"></i> Add First Email
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="apt-modal-overlay">
                    <div className="apt-modal">
                        <div className="apt-modal-header">
                            <h3>Add Notification Email</h3>
                            <button onClick={() => setShowModal(false)} className="apt-modal-close">
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                        <div className="apt-modal-body" style={{ padding: '20px' }}>
                            <form onSubmit={submit}>
                                <div className="form-group mb-3">
                                    <label className="form-label">Name / Role (Optional)</label>
                                    <input 
                                        type="text" 
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="e.g. Admissions Department"
                                    />
                                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email Address *</label>
                                    <input 
                                        type="email" 
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)}
                                        required
                                        placeholder="admin@versatile.edu"
                                    />
                                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                                </div>
                                <div className="form-group form-switch mt-2">
                                    <input 
                                        className="form-check-input"
                                        type="checkbox" 
                                        id="isActiveSwitch"
                                        checked={data.is_active} 
                                        onChange={e => setData('is_active', e.target.checked)} 
                                    />
                                    <label className="form-check-label ms-2" htmlFor="isActiveSwitch">
                                        Receive Notifications?
                                    </label>
                                </div>
                                <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                                    <button type="button" onClick={() => setShowModal(false)} className="btn-light">Cancel</button>
                                    <button type="submit" disabled={processing} className="btn-primary">
                                        {processing ? 'Saving...' : 'Save Email'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .text-muted { color: #94a3b8; font-style: italic; }
                .apt-modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                .apt-modal {
                    background: #fff;
                    width: 500px;
                    max-width: 90%;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                    overflow: hidden;
                }
                .apt-modal-header {
                    padding: 20px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .apt-modal-header h3 { margin: 0; font-size: 18px; color: #1e293b; }
                .apt-modal-close {
                    background: none; border: none; font-size: 20px; cursor: pointer; color: #64748b;
                }
            `}</style>
        </AdminLayout>
    );
}
