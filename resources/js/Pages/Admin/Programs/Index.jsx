import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components/Pagination';
import AdminFilterBar from '@/Components/AdminFilterBar';

export default function Index({ programs, filters = {} }) {
    const { delete: destroy } = useForm();
    const { auth } = usePage().props;
    const permissions = auth.user.permissions || [];
    
    const canCreate = permissions.includes('create programs');
    const canEdit = permissions.includes('edit programs');
    const canDelete = permissions.includes('delete programs');

    const handleFilter = (newFilters) => {
        router.get(route('admin.programs.index'), newFilters, {
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
                destroy(`${window.AppAssetUrl || '/'}admin/programs/${id}`);
            }
        });
    };

    const handleToggleStatus = (id, currentStatus) => {
        Swal.fire({
            title: currentStatus ? 'Deactivate Program?' : 'Activate Program?',
            text: currentStatus ? "This program will be hidden from the public website." : "This program will become visible on the public website.",
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
                router.put(`${window.AppAssetUrl || '/'}admin/programs/${id}/toggle-status`, {}, {
                    preserveScroll: true,
                    preserveState: true,
                });
            }
        });
    };

    return (
        <AdminLayout title="Programs">
            <Head title="Programs" />

            <div className="apt-header">
                <div className="apt-header-info">
                    <h2>Programs</h2>
                    <p>Manage course programs and their categories.</p>
                </div>
                {canCreate && (
                    <Link href={route("admin.programs.create")} className="apt-create-btn">
                        <i className="ri-add-line"></i>
                        <span>Add Program</span>
                    </Link>
                )}
            </div>

            <AdminFilterBar 
                searchPlaceholder="Search programs by name..." 
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
                                <th>Name</th>
                                <th>Level</th>
                                <th>Format</th>
                                <th>Courses</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.data && programs.data.length > 0 ? (
                                programs.data.map((program, index) => (
                                    <tr key={program.id}>
                                        <td data-label="S.No">{(programs.from || 1) + index}</td>
                                        <td data-label="Name">
                                            <div className="apt-cell-name">{program.name}</div>
                                            <div className="apt-cell-email">{program.slug}</div>
                                        </td>
                                        <td data-label="Level">{program.level || '—'}</td>
                                        <td data-label="Format">{program.format || '—'}</td>
                                        <td data-label="Courses">
                                            <span className="apt-badge apt-badge-primary">
                                                {program.courses_count || 0}
                                            </span>
                                        </td>
                                        <td data-label="Status">
                                            <button 
                                                onClick={() => canEdit && handleToggleStatus(program.id, program.is_active)}
                                                disabled={!canEdit}
                                                className={`btn btn-sm rounded-pill d-inline-flex align-items-center border-0 py-1 px-3 fw-medium ${program.is_active ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}
                                                style={{ fontSize: '12px', transition: 'all 0.2s', letterSpacing: '0.3px', cursor: canEdit ? 'pointer' : 'default', opacity: canEdit ? 1 : 0.8 }}
                                                title={canEdit ? "Click to change status" : "Status"}
                                            >
                                                <span className={`rounded-circle me-2 ${program.is_active ? 'bg-success' : 'bg-danger'}`} style={{ width: '6px', height: '6px', display: 'inline-block' }}></span>
                                                {program.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td data-label="Actions" className="text-end">
                                            <div className="apt-actions">
                                                {canEdit && (
                                                    <Link href={`${window.AppAssetUrl || '/'}admin/programs/${program.id}/edit`} className="apt-btn apt-btn-edit" title="Edit">
                                                        <i className="ri-pencil-line"></i>
                                                    </Link>
                                                )}
                                                {canDelete && (
                                                    <button onClick={() => handleDelete(program.id)} className="apt-btn apt-btn-delete" title="Delete">
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
                                    <td colSpan="7">
                                        <div className="apt-empty">
                                            <div className="apt-empty-icon"><i className="ri-folder-open-line"></i></div>
                                            <h3>No programs found</h3>
                                            <p>Get started by creating your first program.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {programs.links && programs.links.length > 3 && (
                    <div className="apt-footer">
                        <Pagination links={programs.links} />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
