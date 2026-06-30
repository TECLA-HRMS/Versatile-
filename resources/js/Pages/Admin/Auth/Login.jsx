import React, { useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const assets = (path) => `${window.AppAssetUrl || '/'}${path.replace(/^\/+/, '')}`;


export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(assets('admin/login'));
    };

    return (
        <div className="login-container">
            <Head title="Admin Login" />
            
            <div className="left-panel">
                <div className="logo-background">
                    <img src={assets('assets/images/logo/remove-bg.png')} alt="University Logo" className="logo" />
                </div>
                <h1 className="welcome-text">Versatile Business School</h1>
                <p className="welcome-subtext">Administrative Management Portal</p>
                
                {/* Decorative background elements */}
                <div className="decorative-circle circle-1"></div>
                <div className="decorative-circle circle-2"></div>
            </div>

            <div className="right-panel">
                <div className="form-container">
                    <div className="header">
                        <div className="icon-wrapper">
                            <Lock size={24} color="#0f172a" />
                        </div>
                        <h2 className="title">Welcome Back</h2>
                        <p className="subtitle">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={submit} className="form">
                        <div className="input-group">
                            <label htmlFor="email" className="label">Email address</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={20} />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    className="input-field with-icon"
                                    placeholder="admin@versatile.com"
                                />
                            </div>
                            {errors.email && <div className="error-text">{errors.email}</div>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="password" className="label">Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={20} />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    className="input-field with-icon password-field"
                                    placeholder="••••••••"
                                />
                                <button 
                                    type="button" 
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <div className="error-text">{errors.password}</div>}
                        </div>

                        <div className="remember-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="checkbox"
                                />
                                <span>Remember me</span>
                            </label>
                            <Link href={route('admin.password.request')} className="forgot-password">Forgot password?</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="submit-button"
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>

            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
                
                .login-container {
                    display: flex;
                    min-height: 100vh;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    background-color: #ffffff;
                }

                /* Left Panel */
                .left-panel {
                    flex: 1.2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                    position: relative;
                    padding: 40px;
                    border-right: 1px solid #e2e8f0;
                    overflow: hidden;
                }

                .decorative-circle {
                    position: absolute;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%);
                    pointer-events: none;
                }

                .circle-1 {
                    width: 400px;
                    height: 400px;
                    top: -100px;
                    left: -100px;
                }

                .circle-2 {
                    width: 300px;
                    height: 300px;
                    bottom: -50px;
                    right: -50px;
                }

                .logo-background {
                    background-color: #ffffff;
                    padding: 50px 60px;
                    border-radius: 40px;
                    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(0, 0, 0, 0.05);
                    margin-bottom: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 10;
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
                    position: relative;
                    z-index: 10;
                }

                .welcome-subtext {
                    font-size: 18px;
                    color: #64748b;
                    text-align: center;
                    font-weight: 500;
                    position: relative;
                    z-index: 10;
                }

                /* Right Panel */
                .right-panel {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #ffffff;
                    padding: 60px;
                }

                .form-container {
                    width: 100%;
                    max-width: 420px;
                }

                .header {
                    margin-bottom: 40px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .icon-wrapper {
                    width: 56px;
                    height: 56px;
                    background-color: #f1f5f9;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                    border: 1px solid #e2e8f0;
                }

                .title {
                    font-size: 32px;
                    font-weight: 800;
                    color: #0f172a;
                    margin-bottom: 10px;
                    letter-spacing: -0.5px;
                }

                .subtitle {
                    font-size: 15px;
                    color: #64748b;
                    font-weight: 500;
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
                    font-weight: 700;
                    color: #1e293b;
                }

                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-icon {
                    position: absolute;
                    left: 16px;
                    color: #94a3b8;
                    transition: color 0.2s ease;
                }

                .input-field {
                    width: 100%;
                    padding: 16px 20px;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    background-color: #f8fafc;
                    font-size: 15px;
                    color: #0f172a;
                    transition: all 0.2s ease;
                    box-sizing: border-box;
                    font-family: inherit;
                }

                .input-field.with-icon {
                    padding-left: 48px;
                }

                .input-field:focus {
                    outline: none;
                    border-color: #3b82f6;
                    background-color: #ffffff;
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
                }

                .input-field:focus + .input-icon,
                .input-wrapper:focus-within .input-icon {
                    color: #3b82f6;
                }

                .password-field {
                    padding-right: 48px;
                }

                .password-toggle-btn {
                    position: absolute;
                    right: 12px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 6px;
                    border-radius: 8px;
                    color: #94a3b8;
                    transition: all 0.2s;
                }

                .password-toggle-btn:hover {
                    background-color: #e2e8f0;
                    color: #475569;
                }

                .error-text {
                    color: #ef4444;
                    font-size: 13px;
                    margin-top: 4px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .remember-group {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 4px;
                }

                .checkbox-label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    font-size: 14px;
                    color: #475569;
                    font-weight: 600;
                }

                .checkbox {
                    width: 18px;
                    height: 18px;
                    accent-color: #0f172a;
                    cursor: pointer;
                    border-radius: 6px;
                    border: 1px solid #cbd5e1;
                }

                .forgot-password {
                    font-size: 14px;
                    color: #3b82f6;
                    font-weight: 600;
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .forgot-password:hover {
                    color: #2563eb;
                    text-decoration: underline;
                }

                .submit-button {
                    background-color: #0f172a;
                    color: #ffffff;
                    border: none;
                    border-radius: 12px;
                    padding: 16px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    margin-top: 8px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06);
                }

                .submit-button:hover:not(:disabled) {
                    background-color: #1e293b;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.2), 0 4px 6px -2px rgba(15, 23, 42, 0.1);
                }

                .submit-button:active:not(:disabled) {
                    transform: translateY(0);
                    box-shadow: 0 2px 4px -1px rgba(15, 23, 42, 0.1);
                }
                
                .submit-button:disabled {
                    background-color: #94a3b8;
                    cursor: not-allowed;
                }

                /* Mobile Responsiveness */
                @media (max-width: 900px) {
                    .login-container {
                        flex-direction: column;
                    }

                    .left-panel {
                        padding: 40px 20px 30px;
                        border-right: none;
                        border-bottom: 1px solid #e2e8f0;
                        flex: none;
                    }

                    .logo-background {
                        padding: 30px;
                        margin-bottom: 24px;
                        border-radius: 28px;
                    }

                    .logo {
                        width: 160px;
                    }

                    .welcome-text {
                        font-size: 26px;
                    }

                    .welcome-subtext {
                        font-size: 16px;
                    }

                    .right-panel {
                        padding: 40px 24px;
                        align-items: flex-start;
                    }

                    .header {
                        margin-bottom: 32px;
                    }
                    
                    .icon-wrapper {
                        width: 48px;
                        height: 48px;
                        border-radius: 14px;
                        margin-bottom: 16px;
                    }

                    .title {
                        font-size: 28px;
                    }

                    .form-container {
                        max-width: 100%;
                    }
                }
                `}
            </style>
        </div>
    );
}
