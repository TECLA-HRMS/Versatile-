import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '../../../Components/Pagination';

export default function Index({ roles }) {
    const { delete: destroy } = useForm();
    const { auth } = usePage().props;
    const permissions = auth.user.permissions || [];
    
    const canCreate = permissions.includes('Create Roles');
    const canEdit = permissions.includes('Edit Roles');
    const canDelete = permissions.includes('Delete Roles');

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
                destroy(`${window.AppAssetUrl || '/'}admin/roles/${id}`);
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Roles & Permissions" />

            {/* Page header */}
            <div className="apt-header">
                <div className="apt-header-info">
                    <h2>Roles</h2>
                    <p>Manage roles and their permissions</p>
                </div>
                {canCreate && (
                    <Link href={route("admin.roles.create")} className="apt-create-btn">
                        <i className="ri-add-line"></i> Create Role
                    </Link>
                )}
            </div>

            {/* Table card */}
            <div className="apt-card">
                <div className="apt-table-wrapper">
                    <table className="apt-table">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Role Name</th>
                                    <th>Permissions</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.data && roles.data.length > 0 ? (
                                    roles.data.map((role, index) => (
                                        <tr key={role.id}>
                                            {/* S.No */}
                                            <td data-label="S.No">
                                                <span className="apt-cell-id">{(roles.from || 1) + index}</span>
                                            </td>
                                            <td data-label="Role Name">
                                                <div className="apt-user-cell">
                                                    <div className="apt-avatar">
                                                        <i className="ri-shield-keyhole-line" style={{ fontSize: 16 }}></i>
                                                    </div>
                                                    <div className="apt-user-info">
                                                        <div className="name" style={{ textTransform: 'capitalize' }}>
                                                            {role.name}
                                                        </div>
                                                        <div className="email">
                                                            {role.permissions.length} permission{role.permissions.length !== 1 ? 's' : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Permission chips */}
                                            <td data-label="Permissions">
                                                <div className="apt-chips">
                                                    {role.permissions.length > 0
                                                        ? role.permissions.map((perm) => (
                                                            <span key={perm.id} className="apt-chip">{perm.name}</span>
                                                        ))
                                                        : <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>No permissions</span>
                                                    }
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td data-label="Actions" className="text-end">
                                                <div className="apt-actions">
                                                    {canEdit && (
                                                        <Link
                                                            href={`${window.AppAssetUrl || '/'}admin/roles/${role.id}/edit`}
                                                            className="apt-btn apt-btn-edit"
                                                            title="Edit role"
                                                        >
                                                            <i className="ri-edit-line"></i>
                                                        </Link>
                                                    )}
                                                    {canDelete && (
                                                        <button
                                                            onClick={() => handleDelete(role.id)}
                                                            className="apt-btn apt-btn-delete"
                                                            title="Delete role"
                                                        >
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
                                    <tr>
                                        <td colSpan="4">
                                            <div className="apt-empty">
                                                <div className="apt-empty-icon">
                                                    <i className="ri-shield-keyhole-line"></i>
                                                </div>
                                                <h3>No roles found</h3>
                                                <p>Create a role to start assigning permissions.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                </div>
                {roles.links && (
                    <div className="apt-footer">
                        <Pagination links={roles.links} />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
