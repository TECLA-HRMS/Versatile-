import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ metrics = {}, applicationStats = {}, enquiryStats = {}, recentApplications = [], recentEnquiries = [] }) {

    const overviewCards = [
        { label: 'Total Programs', value: metrics.programs || 0, icon: 'ri-book-3-line', color: '#4f46e5', link: '/admin/programs' },
        { label: 'Total Courses', value: metrics.courses || 0, icon: 'ri-graduation-cap-line', color: '#0891b2', link: '/admin/courses' },
        { label: 'Total Applications', value: metrics.applications || 0, icon: 'ri-file-user-line', color: '#059669', link: '/admin/applications' },
        { label: 'Total Enquiries', value: metrics.enquiries || 0, icon: 'ri-mail-send-line', color: '#d97706', link: '/admin/enquiries' },
        { label: 'Active Banners', value: metrics.banners || 0, icon: 'ri-image-line', color: '#be185d', link: '/admin/banners' },
        { label: 'Active Popups', value: metrics.popups || 0, icon: 'ri-window-line', color: '#7c3aed', link: '/admin/popups' },
        { label: 'Total Users', value: metrics.users || 0, icon: 'ri-user-settings-line', color: '#0d9488', link: '/admin/users' },
        { label: 'Total Roles', value: metrics.roles || 0, icon: 'ri-shield-keyhole-line', color: '#c2410c', link: '/admin/roles' },
    ];

    const styles = {
        section: {
            marginBottom: '28px',
        },
        sectionTitle: {
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--text-primary, #1e293b)',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        cardGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px',
        },
        card: {
            background: 'var(--card-bg, #ffffff)',
            borderRadius: 'var(--radius-md, 8px)',
            border: '1px solid var(--border-color, #e2e8f0)',
            padding: '20px',
            textDecoration: 'none',
            transition: 'all 0.15s ease',
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '20px',
        },
        statsCard: {
            background: 'var(--card-bg, #ffffff)',
            borderRadius: 'var(--radius-md, 8px)',
            border: '1px solid var(--border-color, #e2e8f0)',
            overflow: 'hidden',
        },
        statsHeader: {
            padding: '18px 22px',
            borderBottom: '1px solid var(--border-color, #f1f5f9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        statsBody: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: 'var(--border-color, #f1f5f9)',
        },
        statsItem: {
            padding: '18px 22px',
            background: 'var(--card-bg, #ffffff)',
        },
        statsValue: {
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--text-primary, #0f172a)',
            lineHeight: '1',
        },
        statsLabel: {
            fontSize: '13px',
            fontWeight: '500',
            color: 'var(--text-secondary, #64748b)',
            marginTop: '6px',
        },
        listCard: {
            background: 'var(--card-bg, #ffffff)',
            borderRadius: 'var(--radius-md, 8px)',
            border: '1px solid var(--border-color, #e2e8f0)',
            overflow: 'hidden',
        },
        listHeader: {
            padding: '18px 22px',
            borderBottom: '1px solid var(--border-color, #e2e8f0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        listItem: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 22px',
            borderBottom: '1px solid var(--border-color, #f8fafc)',
            transition: 'background 0.1s ease',
        },
    };

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="page-title-box">
                <div>
                    <h2 className="page-title">Dashboard Overview</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
                        Welcome back! Here's what's happening today.
                    </p>
                </div>
                <div className="title-right">
                    <div className="date-display">
                        <i className="ri-calendar-line"></i>
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </div>

            {/* Overview Cards using admin-panel.css metric-card */}
            <div className="metrics-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                {overviewCards.map((card, index) => (
                    <Link key={card.label} href={card.link} style={{ textDecoration: 'none' }}>
                        <div className="metric-card" style={{ padding: '24px', borderTopColor: card.color }}>
                            <div className="metric-header" style={{ marginBottom: '12px' }}>
                                <span className="metric-title">{card.label}</span>
                                <div style={{ 
                                    width: '40px', height: '40px', borderRadius: '10px', 
                                    background: `${card.color}15`, color: card.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <i className={`${card.icon} metric-icon`} style={{ color: card.color, fontSize: '20px' }}></i>
                                </div>
                            </div>
                            <div className="metric-value" style={{ fontSize: '32px', marginBottom: '4px' }}>
                                {card.value}
                            </div>
                            <div className="metric-subtext">
                                <span className="trend up" style={{ color: card.color }}>
                                    <i className="ri-arrow-right-up-line"></i> View details
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                {/* Application Stats */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ padding: '8px', background: 'var(--success-bg)', borderRadius: '8px', color: 'var(--success)' }}>
                                <i className="ri-file-user-line" style={{ fontSize: '18px' }}></i>
                            </div>
                            <h3 className="card-title">Application Statistics</h3>
                        </div>
                        <Link href="/admin/applications" className="btn-sm btn-secondary" style={{ textDecoration: 'none' }}>
                            View All
                        </Link>
                    </div>
                    <div className="card-body p-0" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--border-color)' }}>
                        {[
                            { label: 'Today', value: applicationStats.today || 0 },
                            { label: 'This Week', value: applicationStats.this_week || 0 },
                            { label: 'This Month', value: applicationStats.this_month || 0 },
                            { label: 'All Time', value: applicationStats.total || 0 }
                        ].map(stat => (
                            <div key={stat.label} style={{ background: 'var(--card-bg, #fff)', padding: '20px' }}>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{stat.value}</div>
                                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enquiry Stats */}
                <div className="card">
                    <div className="card-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ padding: '8px', background: 'var(--warning-bg)', borderRadius: '8px', color: 'var(--warning)' }}>
                                <i className="ri-mail-send-line" style={{ fontSize: '18px' }}></i>
                            </div>
                            <h3 className="card-title">Enquiry Statistics</h3>
                        </div>
                        <Link href="/admin/enquiries" className="btn-sm btn-secondary" style={{ textDecoration: 'none' }}>
                            View All
                        </Link>
                    </div>
                    <div className="card-body p-0" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border-color)' }}>
                        {[
                            { label: 'Today', value: enquiryStats.today || 0 },
                            { label: 'This Week', value: enquiryStats.this_week || 0 },
                            { label: 'This Month', value: enquiryStats.this_month || 0 },
                            { label: 'Brochure', value: enquiryStats.brochure_downloads || 0 },
                            { label: 'Contact', value: enquiryStats.contact_requests || 0 },
                            { label: 'Total', value: enquiryStats.total || 0 }
                        ].map(stat => (
                            <div key={stat.label} style={{ background: 'var(--card-bg, #fff)', padding: '16px' }}>
                                <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{stat.value}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                {/* Recent Applications */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Recent Applications</h3>
                    </div>
                    <div className="card-body p-0">
                        {recentApplications.length > 0 ? (
                            recentApplications.map((app) => (
                                <div key={app.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-app)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--info-bg)', color: 'var(--info)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>
                                            {(app.first_name || 'A').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                                {app.first_name} {app.last_name}
                                            </div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                                {app.course?.name || '—'}
                                            </div>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>
                                        {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <i className="ri-inbox-line" style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}></i>
                                <p style={{ margin: 0, fontSize: '14px' }}>No applications received yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Enquiries */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Recent Enquiries</h3>
                    </div>
                    <div className="card-body p-0">
                        {recentEnquiries.length > 0 ? (
                            recentEnquiries.map((enquiry) => (
                                <div key={enquiry.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-app)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--warning-bg)', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>
                                            {(enquiry.name || 'E').charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                                                {enquiry.name}
                                            </div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                                {enquiry.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '4px', background: enquiry.type === 'brochure_download' ? 'var(--info-bg)' : 'var(--danger-bg)', color: enquiry.type === 'brochure_download' ? 'var(--info)' : 'var(--danger)' }}>
                                            {enquiry.type === 'brochure_download' ? 'Brochure' : 'Contact'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <i className="ri-inbox-line" style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}></i>
                                <p style={{ margin: 0, fontSize: '14px' }}>No enquiries received yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Quick Actions</h3>
                </div>
                <div className="card-body">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {[
                            { label: 'New Program', icon: 'ri-add-circle-line', href: '/admin/programs/create' },
                            { label: 'New Course', icon: 'ri-add-circle-line', href: '/admin/courses/create' },
                            { label: 'New Banner', icon: 'ri-image-add-line', href: '/admin/banners/create' },
                            { label: 'New Popup', icon: 'ri-window-line', href: '/admin/popups/create' },
                            { label: 'Applications', icon: 'ri-file-user-line', href: '/admin/applications' },
                            { label: 'Enquiries', icon: 'ri-mail-send-line', href: '/admin/enquiries' },
                            { label: 'Users', icon: 'ri-user-add-line', href: '/admin/users' },
                            { label: 'Settings', icon: 'ri-settings-4-line', href: '/admin/settings' },
                        ].map((action) => (
                            <Link key={action.label} href={action.href} className="btn-secondary" style={{ textDecoration: 'none', background: 'var(--card-bg)' }}>
                                <i className={action.icon} style={{ fontSize: '16px' }}></i>
                                {action.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
