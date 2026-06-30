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
        <AppLayout title="Terms & Conditions">
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
                    left: -10%;
                    width: 50%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(253, 199, 47, 0.15) 0%, rgba(253, 199, 47, 0) 70%);
                    transform: rotate(-45deg);
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
                    background: #fdc72f;
                    border-radius: 2px;
                }
                .policy-section p {
                    font-size: 16px;
                    line-height: 1.8;
                    color: #475569;
                    margin-bottom: 16px;
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
                        <h1 className="policy-title">Terms & Conditions</h1>
                        <p className="policy-subtitle">Please read these terms carefully before using our services.</p>
                    </div>
                </section>

                <div className="container">
                    <div className="policy-container">
                        
                        <div className="policy-section animate-on-scroll">
                            <p>
                                Welcome to <strong>Versatile Business School</strong>. By accessing our website, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our website.
                            </p>
                        </div>

                        <div className="policy-section animate-on-scroll">
                            <h4>1. Educational Services</h4>
                            <p>
                                The information provided on this website regarding our courses, admissions, and placements is for general informational purposes only. We strive to keep the information up-to-date and correct, but we make no representations or warranties of any kind about the completeness or availability with respect to the website.
                            </p>
                            <p>
                                Course curriculum, fees, and faculty assignments are subject to change without notice at the discretion of the management.
                            </p>
                        </div>

                        <div className="policy-section animate-on-scroll">
                            <h4>2. Admissions & Placements</h4>
                            <p>
                                Admission to our programs and subsequent job placements are subject to fulfilling the eligibility criteria, passing the required tests and interviews, and specific terms outlined during the admission process. 
                            </p>
                            <p>
                                While we provide 100% placement assistance and specialized training, securing a job ultimately depends on the candidate's performance during interviews and employer requirements.
                            </p>
                        </div>

                        <div className="policy-section animate-on-scroll">
                            <h4>3. Intellectual Property</h4>
                            <p>
                                This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                            </p>
                        </div>
                        
                        <div className="policy-section animate-on-scroll">
                            <h4>4. External Links</h4>
                            <p>
                                From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
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
