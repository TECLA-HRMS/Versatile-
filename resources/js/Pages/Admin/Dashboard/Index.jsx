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

            <div className="apt-header">
                <div className="apt-header-info">
                    <h2>Dashboard</h2>
                    <p>Platform overview and recent activity</p>
                </div>
            </div>

            {/* Overview Cards */}
            <div style={styles.section}>
                <div style={styles.cardGrid}>
                    {overviewCards.map((card) => (
                        <Link
                            key={card.label}
                            href={card.link}
                            style={styles.card}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = card.color;
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-color, #e2e8f0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{
                                        fontSize: '32px',
                                        fontWeight: '700',
                                        color: 'var(--text-primary, #0f172a)',
                                        lineHeight: '1',
                                        marginBottom: '6px',
                                    }}>
                                        {card.value}
                                    </div>
                                    <div style={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: 'var(--text-secondary, #64748b)',
                                    }}>
                                        {card.label}
                                    </div>
                                </div>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '10px',
                                    background: `${card.color}10`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <i className={card.icon} style={{ fontSize: '22px', color: card.color }}></i>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Application & Enquiry Stats */}
            <div style={{ ...styles.section }}>
                <div style={styles.statsGrid}>
                    {/* Application Stats */}
                    <div style={styles.statsCard}>
                        <div style={styles.statsHeader}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '8px',
                                    background: '#05966910',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <i className="ri-file-user-line" style={{ fontSize: '18px', color: '#059669' }}></i>
                                </div>
                                <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary, #1e293b)' }}>
                                    Application Statistics
                                </span>
                            </div>
                            <Link href="/admin/applications" style={{ fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
                                View All →
                            </Link>
                        </div>
                        <div style={styles.statsBody}>
                            <div style={styles.statsItem}>
                                <div style={styles.statsValue}>{applicationStats.today || 0}</div>
                                <div style={styles.statsLabel}>Today</div>
                            </div>
                            <div style={styles.statsItem}>
                                <div style={styles.statsValue}>{applicationStats.this_week || 0}</div>
                                <div style={styles.statsLabel}>This Week</div>
                            </div>
                            <div style={styles.statsItem}>
                                <div style={styles.statsValue}>{applicationStats.this_month || 0}</div>
                                <div style={styles.statsLabel}>This Month</div>
                            </div>
                            <div style={styles.statsItem}>
                                <div style={styles.statsValue}>{applicationStats.total || 0}</div>
                                <div style={styles.statsLabel}>All Time</div>
                            </div>
                        </div>
                    </div>

                    {/* Enquiry Stats */}
                    <div style={styles.statsCard}>
                        <div style={styles.statsHeader}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '8px',
                                    background: '#d9770610',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <i className="ri-mail-send-line" style={{ fontSize: '18px', color: '#d97706' }}></i>
                                </div>
                                <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary, #1e293b)' }}>
                                    Enquiry Statistics
                                </span>
                            </div>
                            <Link href="/admin/enquiries" style={{ fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
                                View All →
                            </Link>
                        </div>
                        <div style={{ ...styles.statsBody, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                            <div style={styles.statsItem}>
                                <div style={styles.statsValue}>{enquiryStats.today || 0}</div>
                                <div style={styles.statsLabel}>Today</div>
                            </div>
                            <div style={styles.statsItem}>
                                <div style={styles.statsValue}>{enquiryStats.this_week || 0}</div>
                                <div style={styles.statsLabel}>This Week</div>
                            </div>
                            <div style={styles.statsItem}>
                                <div style={styles.statsValue}>{enquiryStats.this_month || 0}</div>
                                <div style={styles.statsLabel}>This Month</div>
                            </div>
                            <div style={styles.statsItem}>
                                <div style={styles.statsValue}>{enquiryStats.brochure_downloads || 0}</div>
                                <div style={styles.statsLabel}>Brochure Downloads</div>
                            </div>
                            <div style={styles.statsItem}>
                                <div style={styles.statsValue}>{enquiryStats.contact_requests || 0}</div>
                                <div style={styles.statsLabel}>Contact Requests</div>
                            </div>
                            <div style={styles.statsItem}>
                                <div style={styles.statsValue}>{enquiryStats.total || 0}</div>
                                <div style={styles.statsLabel}>All Time</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div style={styles.section}>
                <div style={styles.statsGrid}>
                    {/* Recent Applications */}
                    <div style={styles.listCard}>
                        <div style={styles.listHeader}>
                            <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary, #1e293b)' }}>
                                Recent Applications
                            </span>
                            <Link href="/admin/applications" style={{ fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
                                View All →
                            </Link>
                        </div>
                        <div>
                            {recentApplications.length > 0 ? (
                                recentApplications.map((app) => (
                                    <div
                                        key={app.id}
                                        style={styles.listItem}
                                        onMouseOver={(e) => e.currentTarget.style.background = 'var(--hover-bg, #fafafa)'}
                                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '38px',
                                                height: '38px',
                                                borderRadius: '50%',
                                                background: '#4f46e510',
                                                border: '1px solid #4f46e520',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#4f46e5',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                flexShrink: 0,
                                            }}>
                                                {(app.first_name || 'A').charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary, #1e293b)' }}>
                                                    {app.first_name} {app.last_name}
                                                </div>
                                                <div style={{ fontSize: '13px', color: 'var(--text-secondary, #64748b)', marginTop: '2px' }}>
                                                    {app.course?.name || '—'}
                                                </div>
                                            </div>
                                        </div>
                                        <span style={{
                                            fontSize: '12px',
                                            color: 'var(--text-secondary, #94a3b8)',
                                            fontWeight: '500',
                                        }}>
                                            {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div style={{ padding: '48px 22px', textAlign: 'center', color: 'var(--text-secondary, #94a3b8)' }}>
                                    <i className="ri-inbox-line" style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}></i>
                                    <p style={{ margin: 0, fontSize: '14px' }}>No applications received yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Enquiries */}
                    <div style={styles.listCard}>
                        <div style={styles.listHeader}>
                            <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary, #1e293b)' }}>
                                Recent Enquiries
                            </span>
                            <Link href="/admin/enquiries" style={{ fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
                                View All →
                            </Link>
                        </div>
                        <div>
                            {recentEnquiries.length > 0 ? (
                                recentEnquiries.map((enquiry) => (
                                    <div
                                        key={enquiry.id}
                                        style={styles.listItem}
                                        onMouseOver={(e) => e.currentTarget.style.background = 'var(--hover-bg, #fafafa)'}
                                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '38px',
                                                height: '38px',
                                                borderRadius: '50%',
                                                background: '#d9770610',
                                                border: '1px solid #d9770620',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#d97706',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                flexShrink: 0,
                                            }}>
                                                {(enquiry.name || 'E').charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary, #1e293b)' }}>
                                                    {enquiry.name}
                                                </div>
                                                <div style={{ fontSize: '13px', color: 'var(--text-secondary, #64748b)', marginTop: '2px' }}>
                                                    {enquiry.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.3px',
                                                padding: '3px 8px',
                                                borderRadius: '4px',
                                                background: enquiry.type === 'brochure_download' ? '#dbeafe' : '#fce7f3',
                                                color: enquiry.type === 'brochure_download' ? '#1d4ed8' : '#be185d',
                                            }}>
                                                {enquiry.type === 'brochure_download' ? 'Brochure' : 'Contact'}
                                            </span>
                                            <span style={{
                                                fontSize: '12px',
                                                color: 'var(--text-secondary, #94a3b8)',
                                                fontWeight: '500',
                                            }}>
                                                {new Date(enquiry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ padding: '48px 22px', textAlign: 'center', color: 'var(--text-secondary, #94a3b8)' }}>
                                    <i className="ri-inbox-line" style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}></i>
                                    <p style={{ margin: 0, fontSize: '14px' }}>No enquiries received yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>
                    <i className="ri-flashlight-line" style={{ fontSize: '18px', color: 'var(--text-secondary, #64748b)' }}></i>
                    Quick Actions
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
                        <Link
                            key={action.label}
                            href={action.href}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '7px',
                                padding: '9px 16px',
                                borderRadius: 'var(--radius-sm, 6px)',
                                border: '1px solid var(--border-color, #e2e8f0)',
                                background: 'var(--card-bg, #ffffff)',
                                color: 'var(--text-primary, #475569)',
                                fontSize: '13px',
                                fontWeight: '500',
                                textDecoration: 'none',
                                transition: 'all 0.15s ease',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'var(--hover-bg, #f8fafc)';
                                e.currentTarget.style.borderColor = '#94a3b8';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'var(--card-bg, #ffffff)';
                                e.currentTarget.style.borderColor = 'var(--border-color, #e2e8f0)';
                            }}
                        >
                            <i className={action.icon} style={{ fontSize: '16px' }}></i>
                            {action.label}
                        </Link>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
