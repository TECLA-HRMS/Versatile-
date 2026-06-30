import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import Pagination from '@/Components/Pagination';
import AdminFilterBar from '@/Components/AdminFilterBar';

export default function Index({ users, filters }) {
    const { delete: destroy } = useForm();
    const { auth } = usePage().props;
    const permissions = auth.user.permissions || [];
    
    const canCreate = permissions.includes('Create Users');
    const canEdit = permissions.includes('Edit Users');
    const canDelete = permissions.includes('Delete Users');

    const handleFilter = (newFilters) => {
        router.get(route('admin.users.index'), newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const advancedFilters = [
        {
            name: 'role',
            label: 'Role',
            type: 'select',
            options: [
                { value: 'super-admin', label: 'Super Admin' },
                { value: 'admin', label: 'Admin' }
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
                destroy(`${window.AppAssetUrl || '/'}admin/users/${id}`);
            }
        });
    };

    return (
        <AdminLayout title="Users">
            <Head title="Users" />

            <div className="apt-header">
                <div className="apt-header-info">
                    <h2>Users</h2>
                    <p>Manage admin users and their access levels.</p>
                </div>
                {canCreate && (
                    <Link href={route("admin.users.create")} className="apt-create-btn">
                        <i className="ri-user-add-line"></i>
                        <span>Add User</span>
                    </Link>
                )}
            </div>

            <AdminFilterBar 
                searchPlaceholder="Search users by name or email..." 
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
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data && users.data.length > 0 ? (
                                users.data.map((user, index) => (
                                    <tr key={user.id}>
                                        <td data-label="S.No">{(users.from || 1) + index}</td>
                                        <td data-label="User">
                                            <div className="apt-user-cell">
                                                <div className="apt-avatar">{user.name?.charAt(0)?.toUpperCase()}</div>
                                                <div className="apt-user-info">
                                                    <div className="name">{user.name}</div>
                                                    <div className="email">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Email">{user.email}</td>
                                        <td data-label="Role">
                                            <span className="apt-badge apt-badge-primary">
                                                {user.roles?.[0]?.name || 'No Role'}
                                            </span>
                                        </td>
                                        <td data-label="Status">
                                            <span className="apt-badge apt-badge-success">Active</span>
                                        </td>
                                        <td data-label="Actions" className="text-end">
                                            <div className="apt-actions">
                                                {canEdit && (
                                                    <Link href={`${window.AppAssetUrl || '/'}admin/users/${user.id}/edit`} className="apt-btn apt-btn-edit" title="Edit">
                                                        <i className="ri-pencil-line"></i>
                                                    </Link>
                                                )}
                                                {canDelete && (
                                                    <button onClick={() => handleDelete(user.id)} className="apt-btn apt-btn-delete" title="Delete">
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
                                            <div className="apt-empty-icon"><i className="ri-user-line"></i></div>
                                            <h3>No users found</h3>
                                            <p>Add your first admin user to get started.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {users.links && users.links.length > 3 && (
                    <div className="apt-footer">
                        <Pagination links={users.links} />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
