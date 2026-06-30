import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Pagination from '../../../Components/Pagination';
import AdminFilterBar from '../../../Components/AdminFilterBar';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ enquiries, activeTab, courses = [], filters = {} }) {
    const handleFilter = (newFilters) => {
        router.get(route('admin.enquiries'), { ...newFilters, type: activeTab }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const advancedFilters = [
        {
            name: 'course_id',
            label: 'Filter by Course',
            type: 'select',
            options: courses.map(c => ({ value: c.id, label: c.name }))
        },
        {
            name: 'date',
            label: 'Date',
            type: 'date'
        }
    ];
    return (
        <AdminLayout title="Enquiries & Leads">
            <Head title="Enquiries & Leads" />

            <div className="apt-header">
                <div className="apt-header-info">
                    <h2>Enquiries & Leads</h2>
                    <p>View brochure downloads and contact requests.</p>
                </div>
            </div>

            <div className="apt-tabs" style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px', padding: '0 5px' }}>
                <Link 
                    href={route("admin.enquiries", {type: "brochure_download"})} 
                    style={{ 
                        padding: '10px 15px', 
                        fontWeight: activeTab === 'brochure_download' ? '600' : '500',
                        color: activeTab === 'brochure_download' ? '#2563eb' : '#64748b',
                        borderBottom: activeTab === 'brochure_download' ? '2px solid #2563eb' : '2px solid transparent',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <i className="ri-file-download-line"></i> Brochure Downloads
                </Link>
                <Link 
                    href={route("admin.enquiries", {type: "contact_request"})} 
                    style={{ 
                        padding: '10px 15px', 
                        fontWeight: activeTab === 'contact_request' ? '600' : '500',
                        color: activeTab === 'contact_request' ? '#2563eb' : '#64748b',
                        borderBottom: activeTab === 'contact_request' ? '2px solid #2563eb' : '2px solid transparent',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <i className="ri-message-3-line"></i> Contact Requests
                </Link>
            </div>

            <AdminFilterBar 
                searchPlaceholder="Search by name, email or phone..." 
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
                                <th>Email & Phone</th>
                                <th>Course</th>
                                {activeTab === 'contact_request' && <th>Message</th>}
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enquiries.data && enquiries.data.length > 0 ? (
                                enquiries.data.map((enquiry, index) => (
                                    <tr key={enquiry.id}>
                                        <td data-label="S.No">{(enquiries.from || 1) + index}</td>
                                        <td data-label="Name">
                                            <div className="apt-cell-name">{enquiry.name}</div>
                                        </td>
                                        <td data-label="Email & Phone">
                                            <div className="apt-cell-email">{enquiry.email}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{enquiry.phone}</div>
                                        </td>
                                        <td data-label="Course">
                                            {enquiry.course ? enquiry.course.name : '-'}
                                        </td>
                                        {activeTab === 'contact_request' && (
                                            <td data-label="Message" style={{ maxWidth: '300px', whiteSpace: 'normal', wordBreak: 'break-word', fontSize: '13px' }}>
                                                {enquiry.message || '-'}
                                            </td>
                                        )}
                                        <td data-label="Date">{new Date(enquiry.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="empty-state-row">
                                    <td colSpan={activeTab === 'contact_request' ? 6 : 5}>
                                        <div className="apt-empty">
                                            <div className="apt-empty-icon"><i className="ri-folder-open-line"></i></div>
                                            <h3>No enquiries found</h3>
                                            <p>Brochure downloads and contact requests will appear here.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {enquiries.links && enquiries.links.length > 3 && (
                    <div className="apt-footer">
                        <Pagination links={enquiries.links} />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
