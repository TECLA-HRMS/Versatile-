import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        short_desc: '',
        description: '',
        level: '',
        format: '',
        duration: '',
        sort_order: 0,
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`${window.AppAssetUrl || '/'}admin/programs`);
    };

    return (
        <AdminLayout title="Create Program">
            <Head title="Create Program" />

            <div className="apt-header">
                <div className="apt-header-info">
                    <h2>Create Program</h2>
                    <p>Add a new program category (e.g., MBA, BBA).</p>
                </div>
                <Link href={route("admin.programs.index")} className="btn-secondary">
                    <i className="ri-arrow-left-line"></i> Back to Programs
                </Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Program Name *</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="e.g. Master of Business Administration"
                                        required
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Slug (auto-generated if empty)</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                                        value={data.slug}
                                        onChange={e => setData('slug', e.target.value)}
                                        placeholder="e.g. mba"
                                    />
                                    {errors.slug && <div className="invalid-feedback">{errors.slug}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label">Level</label>
                                    <select className="form-select" value={data.level} onChange={e => setData('level', e.target.value)}>
                                        <option value="">Select Level</option>
                                        <option value="Undergraduate">Undergraduate</option>
                                        <option value="Postgraduate">Postgraduate</option>
                                        <option value="Executive">Executive</option>
                                        <option value="Doctoral">Doctoral</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label">Format</label>
                                    <select className="form-select" value={data.format} onChange={e => setData('format', e.target.value)}>
                                        <option value="">Select Format</option>
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        <option value="Online / Hybrid">Online / Hybrid</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label className="form-label">Duration</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={data.duration}
                                        onChange={e => setData('duration', e.target.value)}
                                        placeholder="e.g. 2 Years"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Short Description</label>
                            <textarea
                                className="form-control"
                                rows="2"
                                value={data.short_desc}
                                onChange={e => setData('short_desc', e.target.value)}
                                placeholder="Brief summary of the program..."
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Full Description</label>
                            <textarea
                                className="form-control"
                                rows="5"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Detailed program description..."
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Sort Order</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={data.sort_order}
                                        onChange={e => setData('sort_order', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label">Visibility</label>
                                    <div className="form-check form-switch mt-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="isActive"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor="isActive">
                                            Active (visible to public)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-top pt-3 mt-4">
                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route("admin.programs.index")} className="btn-light">Cancel</Link>
                                <button type="submit" className="btn-primary" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Program'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
