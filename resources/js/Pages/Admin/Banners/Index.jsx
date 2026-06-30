import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components/Pagination';
import AdminFilterBar from '@/Components/AdminFilterBar';

export default function Index({ banners, filters = {} }) {
    const { flash, auth } = usePage().props;
    const permissions = auth.user.permissions || [];
    
    const canCreate = permissions.includes('Create Banners');
    const canEdit = permissions.includes('Edit Banners');
    const canDelete = permissions.includes('Delete Banners');

    const handleFilter = (newFilters) => {
        router.get(route('admin.banners.index'), newFilters, {
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
                router.delete(route('admin.banners.destroy', id));
            }
        });
    };

    const handleToggleStatus = (id, currentStatus) => {
        Swal.fire({
            title: currentStatus ? 'Deactivate Banner?' : 'Activate Banner?',
            text: currentStatus ? "This banner will be hidden from the public website." : "This banner will become visible on the public website.",
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
                router.put(route('admin.banners.toggle-status', id), {}, {
                    preserveScroll: true,
                    preserveState: true,
                });
            }
        });
    };

    return (
        <AdminLayout title="Manage Banners">
            <div className="apt-header">
                <div className="apt-header-info">
                    <h2>Banners</h2>
                    <p>Manage home page slider banners.</p>
                </div>
                {canCreate && (
                    <Link href={route('admin.banners.create')} className="apt-create-btn">
                        <i className="ri-add-line"></i>
                        <span>Add Banner</span>
                    </Link>
                )}
            </div>

            <AdminFilterBar 
                searchPlaceholder="Search banners by title..." 
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
                                <th>Order</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.data && banners.data.length > 0 ? (
                                banners.data.map((banner, index) => (
                                    <tr key={banner.id}>
                                        <td data-label="S.No">{(banners.from || 1) + index}</td>
                                        <td data-label="Order">{banner.order}</td>
                                        <td data-label="Image">
                                            <img src={window.assets(banner.image)} alt="Banner" style={{ width: '120px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                        </td>
                                        <td data-label="Title">
                                            <div className="apt-cell-name">{banner.title || '—'}</div>
                                            <div className="apt-cell-email">{banner.subtitle || ''}</div>
                                        </td>
                                        <td data-label="Status">
                                            <button 
                                                onClick={() => canEdit && handleToggleStatus(banner.id, banner.is_active)}
                                                disabled={!canEdit}
                                                className={`btn btn-sm rounded-pill d-inline-flex align-items-center border-0 py-1 px-3 fw-medium ${banner.is_active ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}
                                                style={{ fontSize: '12px', transition: 'all 0.2s', letterSpacing: '0.3px', cursor: canEdit ? 'pointer' : 'default', opacity: canEdit ? 1 : 0.8 }}
                                                title={canEdit ? "Click to change status" : "Status"}
                                            >
                                                <span className={`rounded-circle me-2 ${banner.is_active ? 'bg-success' : 'bg-danger'}`} style={{ width: '6px', height: '6px', display: 'inline-block' }}></span>
                                                {banner.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td data-label="Actions" className="text-end">
                                            <div className="apt-actions">
                                                {canEdit && (
                                                    <Link href={route('admin.banners.edit', banner.id)} className="apt-btn apt-btn-edit" title="Edit">
                                                        <i className="ri-pencil-line"></i>
                                                    </Link>
                                                )}
                                                {canDelete && (
                                                    <button onClick={() => handleDelete(banner.id)} className="apt-btn apt-btn-delete" title="Delete">
                                                        <i className="ri-delete-bin-line"></i>
                                                    </button>
                                                )}
                                                {!canEdit && !canDelete && (
                                                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>No Access</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="empty-state-row">
                                    <td colSpan="6">
                                        <div className="apt-empty">
                                            <div className="apt-empty-icon"><i className="ri-image-line"></i></div>
                                            <h3>No banners found</h3>
                                            <p>Get started by creating your first banner.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {banners.links && banners.links.length > 3 && (
                    <div className="apt-footer">
                        <Pagination links={banners.links} />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
