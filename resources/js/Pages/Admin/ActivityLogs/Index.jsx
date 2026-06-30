import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';

export default function ActivityLogs({ activities, filters }) {
    const [searchValues, setSearchValues] = useState({
        log_name: filters.log_name || '',
        event: filters.event || '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSearchValues(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = (e) => {
        e.preventDefault();
        router.get('/admin/activity-logs', searchValues, { preserveState: true });
    };

    const clearFilters = () => {
        setSearchValues({ log_name: '', event: '' });
        router.get(`${window.AppAssetUrl || '/'}admin/activity-logs`);
    };

    const getEventBadge = (event) => {
        switch (event) {
            case 'created': return <span className="badge bg-success bg-opacity-10 text-success px-2 py-1">Created</span>;
            case 'updated': return <span className="badge bg-primary bg-opacity-10 text-primary px-2 py-1">Updated</span>;
            case 'deleted': return <span className="badge bg-danger bg-opacity-10 text-danger px-2 py-1">Deleted</span>;
            default: return <span className="badge bg-secondary bg-opacity-10 text-secondary px-2 py-1">{event}</span>;
        }
    };

    return (
        <AdminLayout title="Activity Logs">
            <div className="d-flex justify-content-between align-items-end mb-4 pt-3">
                <div>
                    <h1 className="h3 fw-bold text-dark mb-1" style={{ letterSpacing: '-0.5px' }}>Activity Logs</h1>
                    <p className="text-muted mb-0 small">Track all system changes and user actions.</p>
                </div>
            </div>

            <div className="card border shadow-sm rounded-3 bg-white mb-4">
                <div className="card-body p-4">
                    <form onSubmit={applyFilters} className="row g-3 align-items-end">
                        <div className="col-md-4">
                            <label className="form-label text-muted small fw-medium text-uppercase mb-1" style={{letterSpacing: '0.5px', fontSize: '10px'}}>Module</label>
                            <select className="form-select border-light shadow-none" name="log_name" value={searchValues.log_name} onChange={handleFilterChange}>
                                <option value="">All Modules</option>
                                <option value="default">Default</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label text-muted small fw-medium text-uppercase mb-1" style={{letterSpacing: '0.5px', fontSize: '10px'}}>Action Type</label>
                            <select className="form-select border-light shadow-none" name="event" value={searchValues.event} onChange={handleFilterChange}>
                                <option value="">All Actions</option>
                                <option value="created">Created</option>
                                <option value="updated">Updated</option>
                                <option value="deleted">Deleted</option>
                            </select>
                        </div>
                        <div className="col-md-4 d-flex gap-2">
                            <button type="submit" className="btn btn-dark px-4 shadow-sm w-100">Filter</button>
                            <button type="button" onClick={clearFilters} className="btn btn-light border px-4 w-100">Clear</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card border shadow-sm rounded-3 bg-white">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light text-muted small text-uppercase" style={{letterSpacing: '0.5px', fontSize: '11px'}}>
                                <tr>
                                    <th className="px-4 py-3 fw-bold border-bottom-0">Timestamp</th>
                                    <th className="px-4 py-3 fw-bold border-bottom-0">User</th>
                                    <th className="px-4 py-3 fw-bold border-bottom-0">Action</th>
                                    <th className="px-4 py-3 fw-bold border-bottom-0">Subject</th>
                                    <th className="px-4 py-3 fw-bold border-bottom-0">Module</th>
                                    <th className="px-4 py-3 fw-bold border-bottom-0 text-end">Details</th>
                                </tr>
                            </thead>
                            <tbody className="border-top-0">
                                {activities.data && activities.data.length > 0 ? (
                                    activities.data.map(activity => (
                                        <tr key={activity.id}>
                                            <td className="px-4 py-3 text-muted small border-bottom-0">
                                                {new Date(activity.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                            </td>
                                            <td className="px-4 py-3 border-bottom-0">
                                                <div className="fw-medium text-dark">{activity.causer?.name || 'System'}</div>
                                            </td>
                                            <td className="px-4 py-3 border-bottom-0">
                                                {getEventBadge(activity.event)}
                                            </td>
                                            <td className="px-4 py-3 text-muted small border-bottom-0">
                                                {activity.subject_type ? activity.subject_type.split('\\').pop() : 'N/A'} #{activity.subject_id}
                                            </td>
                                            <td className="px-4 py-3 text-muted small border-bottom-0">
                                                {activity.log_name}
                                            </td>
                                            <td className="px-4 py-3 text-end border-bottom-0">
                                                <button className="btn btn-sm btn-light border rounded-pill px-3" onClick={() => alert(JSON.stringify(activity.properties, null, 2))}>
                                                    View JSON
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-5 text-muted border-bottom-0">
                                            <i className="ri-history-line fs-1 d-block mb-2 opacity-50"></i>
                                            No activity logs found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {activities.links && activities.links.length > 3 && (
                    <div className="card-footer bg-white border-top p-3 d-flex justify-content-end">
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                {activities.links.map((link, i) => (
                                    <li key={i} className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}>
                                        <Link href={link.url || '#'} className="page-link shadow-none" dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
