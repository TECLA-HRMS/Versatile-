import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components/Pagination';
import AdminFilterBar from '@/Components/AdminFilterBar';

export default function Index({ popups, filters = {} }) {
    const { flash } = usePage().props;

    const handleFilter = (newFilters) => {
        router.get(route('admin.popups.index'), newFilters, {
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

    const handleDelete = (id) => {
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
                router.delete(route('admin.popups.destroy', id));
            }
        });
    };

    const handleToggleStatus = (id, currentStatus) => {
        Swal.fire({
            title: currentStatus ? 'Deactivate Popup?' : 'Activate Popup?',
            text: currentStatus ? "This popup will be hidden." : "This popup will be shown, and other popups will be deactivated.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: currentStatus ? '#dc3545' : '#10b981',
            cancelButtonColor: '#6c757d',
            confirmButtonText: currentStatus ? 'Yes, deactivate' : 'Yes, activate',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'btn btn-primary px-4',
                cancelButton: 'btn btn-light px-4 ms-2'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(`${window.AppAssetUrl || '/'}admin/popups/${id}/toggle-status`, {}, {
                    preserveScroll: true,
                    preserveState: true,
                });
            }
        });
    };

    return (
        <AdminLayout title="Manage Popups">
            <div className="apt-header">
                <div className="apt-header-info">
                    <h2>Site Popups</h2>
                    <p>Manage popups that appear when users visit the site.</p>
                </div>
                <Link href={route('admin.popups.create')} className="apt-create-btn">
                    <i className="ri-add-line"></i>
                    <span>Add Popup</span>
                </Link>
            </div>

            <AdminFilterBar 
                searchPlaceholder="Search popups by title..." 
                currentFilters={filters} 
                advancedFilters={advancedFilters} 
                onFilter={handleFilter} 
            />

            <div className="apt-card">
                <div className="apt-table-wrapper">
                    <table className="apt-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Poster</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {popups.data && popups.data.length > 0 ? (
                                popups.data.map((popup, index) => (
                                    <tr key={popup.id}>
                                        <td data-label="S.No">{(popups.from || 1) + index}</td>
                                        <td data-label="Poster">
                                            {popup.image ? (
                                                <img src={window.assets(popup.image)} alt="Popup" style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '4px', background: '#f8fafc' }} />
                                            ) : (
                                                <span className="text-muted">No Image</span>
                                            )}
                                        </td>
                                        <td data-label="Title">
                                            <div className="apt-cell-name">{popup.title || 'Untitled Popup'}</div>
                                            {popup.link && <div className="apt-cell-email" style={{ fontSize: '12px' }}>Link: {popup.link}</div>}
                                        </td>
                                        <td data-label="Status">
                                            <button 
                                                onClick={() => handleToggleStatus(popup.id, popup.is_active)}
                                                className={`btn btn-sm rounded-pill d-inline-flex align-items-center border-0 py-1 px-3 fw-medium ${popup.is_active ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}
                                                style={{ fontSize: '12px', transition: 'all 0.2s', letterSpacing: '0.3px' }}
                                                title="Click to change status"
                                            >
                                                <span className={`rounded-circle me-2 ${popup.is_active ? 'bg-success' : 'bg-danger'}`} style={{ width: '6px', height: '6px', display: 'inline-block' }}></span>
                                                {popup.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td data-label="Actions" className="text-end">
                                            <div className="apt-actions">
                                                <Link href={route('admin.popups.edit', popup.id)} className="apt-btn apt-btn-edit" title="Edit">
                                                    <i className="ri-pencil-line"></i>
                                                </Link>
                                                <button onClick={() => handleDelete(popup.id)} className="apt-btn apt-btn-delete" title="Delete">
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="empty-state-row">
                                    <td colSpan="5">
                                        <div className="apt-empty">
                                            <div className="apt-empty-icon"><i className="ri-window-line"></i></div>
                                            <h3>No popups found</h3>
                                            <p>Get started by creating your first site popup.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {popups.links && popups.links.length > 3 && (
                    <div className="apt-footer">
                        <Pagination links={popups.links} />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
