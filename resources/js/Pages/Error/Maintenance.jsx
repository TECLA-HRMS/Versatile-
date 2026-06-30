import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Maintenance() {
    return (
        <>
            <Head title="Under Maintenance" />
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                
                * { margin: 0; padding: 0; box-sizing: border-box; }
                
                .forbidden-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Inter', -apple-system, sans-serif;
                    background: #F9FAFB;
                    padding: 2rem;
                    -webkit-font-smoothing: antialiased;
                }
                
                .forbidden-container {
                    text-align: center;
                    max-width: 480px;
                }
                
                .forbidden-icon {
                    width: 80px;
                    height: 80px;
                    border-radius: 20px;
                    background: #FEF3C7;
                    color: #D97706;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    margin: 0 auto 1.75rem;
                }
                
                .forbidden-code {
                    font-size: 4.5rem;
                    font-weight: 800;
                    color: #111827;
                    letter-spacing: -0.04em;
                    line-height: 1;
                    margin-bottom: 0.75rem;
                }
                
                .forbidden-title {
                    font-size: 1.35rem;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 0.75rem;
                }
                
                .forbidden-message {
                    font-size: 0.95rem;
                    color: #6B7280;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }
                
                .forbidden-actions {
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .btn-primary-action {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    background: #111827;
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    font-size: 0.88rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: background 0.2s;
                    cursor: pointer;
                }
                .btn-primary-action:hover { background: #1F2937; color: #fff; }
                
                .forbidden-hint {
                    margin-top: 2rem;
                    padding: 1rem 1.25rem;
                    background: #F3F4F6;
                    border: 1px solid #E5E7EB;
                    border-radius: 10px;
                    font-size: 0.82rem;
                    color: #4B5563;
                    line-height: 1.5;
                }
            `}} />

            <div className="forbidden-page">
                <div className="forbidden-container">
                    <div className="forbidden-icon">
                        <i className="ri-tools-line"></i>
                    </div>
                    
                    <div className="forbidden-code">503</div>
                    <h1 className="forbidden-title">Under Maintenance</h1>
                    <p className="forbidden-message">The application portal is currently undergoing scheduled maintenance. We will be back online shortly.</p>
                    
                    <div className="forbidden-actions">
                        <Link href={route('admin.login.get')} className="btn-primary-action">
                            <i className="ri-admin-line"></i> Admin Login
                        </Link>
                    </div>
                    
                    <div className="forbidden-hint">
                        <i className="ri-time-line"></i> Thank you for your patience while we improve our systems.
                    </div>
                </div>
            </div>
        </>
    );
}
