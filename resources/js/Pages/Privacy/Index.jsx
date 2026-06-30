import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index() {
    
    // Simple fade-in animation on mount
    useEffect(() => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, 100 * index);
        });
    }, []);

    return (
        <AppLayout title="Privacy Policy">
            <style>{`
                .policy-hero {
                    position: relative;
                    padding: 120px 0 80px;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    color: white;
                    text-align: center;
                    overflow: hidden;
                }
                .policy-hero::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -10%;
                    width: 50%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 70%);
                    transform: rotate(45deg);
                    pointer-events: none;
                }
                .policy-title {
                    font-size: 48px;
                    font-weight: 800;
                    margin-bottom: 20px;
                    font-family: 'Prata', serif;
                    background: linear-gradient(to right, #ffffff, #e2e8f0);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .policy-subtitle {
                    font-size: 18px;
                    color: #94a3b8;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .policy-container {
                    position: relative;
                    max-width: 900px;
                    margin: -40px auto 100px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 24px;
                    padding: 60px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
                    z-index: 10;
                }
                .policy-section {
                    margin-bottom: 40px;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }
                .policy-section.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .policy-section h4 {
                    font-size: 22px;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .policy-section h4::before {
                    content: '';
                    display: block;
                    width: 24px;
                    height: 3px;
                    background: #10b981;
                    border-radius: 2px;
                }
                .policy-section p {
                    font-size: 16px;
                    line-height: 1.8;
                    color: #475569;
                    margin-bottom: 16px;
                }
                .policy-section ul {
                    list-style-type: none;
                    padding-left: 0;
                    margin-bottom: 16px;
                }
                .policy-section ul li {
                    position: relative;
                    padding-left: 24px;
                    margin-bottom: 8px;
                    font-size: 16px;
                    color: #475569;
                    line-height: 1.6;
                }
                .policy-section ul li::before {
                    content: '•';
                    position: absolute;
                    left: 0;
                    color: #10b981;
                    font-weight: bold;
                    font-size: 20px;
                }
                .last-updated {
                    margin-top: 60px;
                    padding-top: 24px;
                    border-top: 1px solid #e2e8f0;
                    font-size: 14px;
                    color: #94a3b8;
                    font-style: italic;
                    text-align: center;
                }
                @media (max-width: 768px) {
                    .policy-container {
                        padding: 30px;
                        margin: -20px 15px 60px;
                    }
                    .policy-title { font-size: 36px; }
                }
            `}</style>

            <main className="bg-light">
                <section className="policy-hero">
                    <div className="container">
                        <h1 className="policy-title">Privacy Policy</h1>
                        <p className="policy-subtitle">Learn how we collect, use, and protect your personal information.</p>
                    </div>
                </section>

                <div className="container">
                    <div className="policy-container">
                        
                        <div className="policy-section animate-on-scroll">
                            <p>
                                At <strong>Versatile Business School</strong>, we are deeply committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines the types of information we gather when you use our website, and how we handle that data.
                            </p>
                        </div>

                        <div className="policy-section animate-on-scroll">
                            <h4>1. Information We Collect</h4>
                            <p>
                                We collect information that you provide directly to us when you interact with our website. This may include:
                            </p>
                            <ul>
                                <li><strong>Personal Identity:</strong> Your name, email address, phone number, and physical address.</li>
                                <li><strong>Academic Data:</strong> Information submitted during applications, such as transcripts, test scores, and previous degrees.</li>
                                <li><strong>Usage Data:</strong> Anonymous data about how you browse our website (via cookies and analytics tools).</li>
                            </ul>
                        </div>

                        <div className="policy-section animate-on-scroll">
                            <h4>2. How We Use Your Information</h4>
                            <p>
                                The data we collect is utilized strictly for educational and administrative purposes, which include:
                            </p>
                            <ul>
                                <li>Processing admission applications and course enrollments.</li>
                                <li>Communicating important announcements, events, and updates.</li>
                                <li>Responding to your inquiries and providing support.</li>
                                <li>Improving the layout, design, and usability of our website.</li>
                            </ul>
                        </div>

                        <div className="policy-section animate-on-scroll">
                            <h4>3. Data Sharing and Security</h4>
                            <p>
                                We respect your privacy. <strong>We do not sell, trade, or rent your personal identification information to others.</strong>
                            </p>
                            <p>
                                We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and data stored on our servers.
                            </p>
                        </div>
                        
                        <div className="policy-section animate-on-scroll">
                            <h4>4. Use of Cookies</h4>
                            <p>
                                Our website uses "cookies" to enhance user experience. Your web browser places cookies on your hard drive for record-keeping purposes and sometimes to track information about them. You may choose to set your web browser to refuse cookies, but note that some parts of the site may not function properly as a result.
                            </p>
                        </div>

                        <div className="last-updated animate-on-scroll">
                            Last updated: June 2026
                        </div>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
