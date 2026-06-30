import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ program }) {
    const { data, setData, put, processing, errors } = useForm({
        name: program.name || '',
        slug: program.slug || '',
        short_desc: program.short_desc || '',
        description: program.description || '',
        level: program.level || '',
        format: program.format || '',
        duration: program.duration || '',
        sort_order: program.sort_order || 0,
        is_active: program.is_active,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`${window.AppAssetUrl || '/'}admin/programs/${program.id}`);
    };

    return (
        <AdminLayout>
            <Head title={`Edit ${program.name}`} />

            <div className="admin-page-header d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="admin-page-title h4 mb-0">Edit Program</h2>
                    <p className="text-muted mb-0">{program.name}</p>
                </div>
                <Link href={route("admin.programs.index")} className="btn btn-light d-flex align-items-center gap-2">
                    <i className="ri-arrow-left-line"></i> Back to Programs
                </Link>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Program Name *</label>
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
                            <div className="mb-4">
                                <label className="form-label fw-medium">Slug (Optional)</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                />
                                {errors.slug && <div className="invalid-feedback">{errors.slug}</div>}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Level</label>
                                <select
                                    className="form-select"
                                    value={data.level || ''}
                                    onChange={e => setData('level', e.target.value)}
                                >
                                    <option value="">Select Level</option>
                                    <option value="Undergraduate">Undergraduate</option>
                                    <option value="Postgraduate">Postgraduate</option>
                                    <option value="Executive">Executive</option>
                                    <option value="Doctoral">Doctoral</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Format</label>
                                <select
                                    className="form-select"
                                    value={data.format || ''}
                                    onChange={e => setData('format', e.target.value)}
                                >
                                    <option value="">Select Format</option>
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Online / Hybrid">Online / Hybrid</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Duration</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={data.duration || ''}
                                    onChange={e => setData('duration', e.target.value)}
                                    placeholder="e.g. 2 Years"
                                />
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Short Description</label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    value={data.short_desc || ''}
                                    onChange={e => setData('short_desc', e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Full Description</label>
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    value={data.description || ''}
                                    onChange={e => setData('description', e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-4">
                                <label className="form-label fw-medium">Sort Order</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={data.sort_order}
                                    onChange={e => setData('sort_order', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-md-6 d-flex align-items-center">
                            <div className="form-check form-switch mt-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="isActive"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                />
                                <label className="form-check-label ms-2" htmlFor="isActive">
                                    Active (visible to public)
                                </label>
                            </div>
                        </div>

                        <div className="col-12">
                            <hr className="my-4" />
                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route("admin.programs.index")} className="btn btn-light">Cancel</Link>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Update Program'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </AdminLayout>
    );
}
