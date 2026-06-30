import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Pagination from '../../../Components/Pagination';
import AdminFilterBar from '../../../Components/AdminFilterBar';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ applications, courses = [], filters = {} }) {
    const handleFilter = (newFilters) => {
        router.get(route('admin.applications'), newFilters, {
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
            label: 'Applied Date',
            type: 'date'
        }
    ];
    return (
        <AdminLayout title="Applications">
            <Head title="Applications" />

            <div className="apt-header">
                <div className="apt-header-info">
                    <h2>Applications</h2>
                    <p>View all student applications submitted through the Apply Now page.</p>
                </div>
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
                                <th>Applicant</th>
                                <th>Contact Info</th>
                                <th>Course</th>
                                <th>Academics</th>
                                <th>Document</th>
                                <th>Applied On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.data && applications.data.length > 0 ? (
                                applications.data.map((application, index) => (
                                    <tr key={application.id}>
                                        <td data-label="S.No">{(applications.from || 1) + index}</td>
                                        <td data-label="Applicant">
                                            <div className="apt-cell-name">{application.first_name} {application.last_name}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>{application.gender}</div>
                                        </td>
                                        <td data-label="Contact Info">
                                            <div className="apt-cell-email">{application.email}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{application.phone}</div>
                                        </td>
                                        <td data-label="Course">
                                            <span className="apt-badge apt-badge-primary">
                                                {application.course ? application.course.name : '-'}
                                            </span>
                                        </td>
                                        <td data-label="Academics">
                                            <div style={{ fontSize: '13px', fontWeight: '500' }}>{application.undergrad_degree}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>CGPA/Pct: {application.undergrad_cgpa}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>Exp: {application.work_experience} Yrs</div>
                                        </td>
                                        <td data-label="Document">
                                            {application.document_path ? (
                                                <a href={`/storage/${application.document_path}`} target="_blank" rel="noreferrer" className="apt-btn apt-btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>
                                                    <i className="ri-download-2-line"></i> Download
                                                </a>
                                            ) : (
                                                <span style={{ color: '#94a3b8' }}>No Doc</span>
                                            )}
                                        </td>
                                        <td data-label="Applied On">{new Date(application.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="empty-state-row">
                                    <td colSpan="7">
                                        <div className="apt-empty">
                                            <div className="apt-empty-icon"><i className="ri-folder-open-line"></i></div>
                                            <h3>No applications found</h3>
                                            <p>New student applications will appear here.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {applications.links && applications.links.length > 3 && (
                    <div className="apt-footer">
                        <Pagination links={applications.links} />
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
