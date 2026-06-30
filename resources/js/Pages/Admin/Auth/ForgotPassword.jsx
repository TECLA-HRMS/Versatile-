import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

const assets = (path) => `${window.AppAssetUrl || '/'}${path.replace(/^\/+/, '')}`;

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.password.email'));
    };

    return (
        <div className="login-container">
            <Head title="Forgot Password" />
            
            <div className="left-panel">
                <div className="logo-background">
                    <img src={assets('assets/images/logo/remove-bg.png')} alt="University Logo" className="logo" />
                </div>
                <h1 className="welcome-text">Versatile Business School</h1>
                <p className="welcome-subtext">Administrative Management Portal</p>
            </div>

            <div className="right-panel">
                <div className="form-container">
                    <div className="header">
                        <h2 className="title">Reset Password</h2>
                        <p className="subtitle">Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.</p>
                    </div>

                    {status && <div className="status-message">{status}</div>}

                    <form onSubmit={submit} className="form">
                        <div className="input-group">
                            <label htmlFor="email" className="label">Email address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                className="input-field"
                                placeholder="admin@versatile.com"
                            />
                            {errors.email && <div className="error-text">{errors.email}</div>}
                        </div>

                        <div className="action-group">
                            <Link href={route('admin.login.get')} className="back-link">
                                Back to Login
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="submit-button"
                            >
                                {processing ? 'Sending...' : 'Email Password Reset Link'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                
                .login-container {
                    display: flex;
                    min-height: 100vh;
                    font-family: 'Inter', sans-serif;
                    background-color: #ffffff;
                }

                .left-panel {
                    flex: 1.2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
                    position: relative;
                    padding: 40px;
                    border-right: 1px solid #cbd5e1;
                }

                .logo-background {
                    background-color: #ffffff;
                    padding: 50px 60px;
                    border-radius: 40px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.05);
                    margin-bottom: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .logo {
                    width: 220px;
                    height: auto;
                }

                .welcome-text {
                    font-size: 32px;
                    font-weight: 800;
                    color: #0f172a;
                    margin-bottom: 12px;
                    text-align: center;
                    letter-spacing: -1px;
                }

                .welcome-subtext {
                    font-size: 18px;
                    color: #64748b;
                    text-align: center;
                    font-weight: 500;
                }

                .right-panel {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px;
                    background-color: #ffffff;
                }

                .form-container {
                    width: 100%;
                    max-width: 440px;
                }

                .header {
                    margin-bottom: 40px;
                }

                .title {
                    font-size: 28px;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 10px;
                    letter-spacing: -0.5px;
                }

                .subtitle {
                    color: #64748b;
                    font-size: 15px;
                    line-height: 1.5;
                }
                
                .status-message {
                    background-color: #ecfdf5;
                    border: 1px solid #10b981;
                    color: #065f46;
                    padding: 12px 16px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    margin-bottom: 24px;
                }

                .form {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .label {
                    font-size: 14px;
                    font-weight: 600;
                    color: #334155;
                }

                .input-field {
                    padding: 12px 16px;
                    border: 1px solid #cbd5e1;
                    border-radius: 10px;
                    font-size: 15px;
                    transition: all 0.2s ease;
                    outline: none;
                    font-family: inherit;
                }

                .input-field:focus {
                    border-color: #1a365d;
                    box-shadow: 0 0 0 3px rgba(26, 54, 93, 0.1);
                }
                
                .action-group {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 8px;
                }

                .back-link {
                    color: #64748b;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                    transition: color 0.2s;
                }

                .back-link:hover {
                    color: #1a365d;
                }

                .submit-button {
                    background-color: #1a365d;
                    color: #ffffff;
                    border: none;
                    padding: 14px;
                    border-radius: 10px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .submit-button:hover {
                    background-color: #0f2744;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(26, 54, 93, 0.15);
                }

                .submit-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                .error-text {
                    color: #ef4444;
                    font-size: 13px;
                    margin-top: 4px;
                    font-weight: 500;
                }

                @media (max-width: 992px) {
                    .login-container {
                        flex-direction: column;
                    }
                    .left-panel {
                        flex: none;
                        padding: 40px 20px;
                    }
                    .logo-background {
                        padding: 30px 40px;
                        margin-bottom: 30px;
                    }
                    .logo {
                        width: 160px;
                    }
                    .right-panel {
                        padding: 40px 20px;
                    }
                    .action-group {
                        flex-direction: column-reverse;
                        align-items: stretch;
                        gap: 16px;
                        margin-top: 16px;
                    }
                    .back-link {
                        text-align: center;
                    }
                }
                `}
            </style>
        </div>
    );
}
