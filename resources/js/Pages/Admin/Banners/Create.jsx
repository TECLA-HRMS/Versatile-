import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors, progress } = useForm({
        image: null,
        title: '',
        subtitle: '',
        button_text: '',
        button_link: '',
        order: 0,
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.banners.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout title="Add Banner">
            <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
                <h3 className="page-title mb-0">Add New Banner</h3>
                <Link href={route('admin.banners.index')} className="btn btn-outline-secondary">
                    <i className="ri-arrow-left-line me-1"></i> Back to Banners
                </Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="settings-form">
                        
                        <div className="form-group row mb-4">
                            <div className="col-md-4">
                                <label className="form-label required">Banner Image</label>
                                <span className="form-help">Upload the background image (Recommended size: 1920x1080)</span>
                            </div>
                            <div className="col-md-8">
                                <label className="image-upload-zone" style={{display: 'block', cursor: 'pointer', textAlign: 'center'}}>
                                    {data.image ? (
                                        <img src={URL.createObjectURL(data.image)} alt="Preview" style={{maxHeight: '120px', marginBottom: '10px'}} />
                                    ) : (
                                        <i className="ri-image-add-line image-upload-icon"></i>
                                    )}
                                    <div className="fw-medium text-dark">Select Image</div>
                                    <input type="file" style={{display: 'none'}} onChange={(e) => setData('image', e.target.files[0])} accept="image/*" />
                                </label>
                                {errors.image && <div className="text-danger mt-1">{errors.image}</div>}
                            </div>
                        </div>

                        <div className="form-group row mb-4">
                            <div className="col-md-4">
                                <label className="form-label">Subtitle</label>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" value={data.subtitle} onChange={e => setData('subtitle', e.target.value)} />
                                {errors.subtitle && <div className="text-danger mt-1">{errors.subtitle}</div>}
                            </div>
                        </div>

                        <div className="form-group row mb-4">
                            <div className="col-md-4">
                                <label className="form-label">Main Title</label>
                                <span className="form-help">Use '\n' or press Enter for a line break.</span>
                            </div>
                            <div className="col-md-8">
                                <textarea className="form-control" rows="3" value={data.title} onChange={e => setData('title', e.target.value)}></textarea>
                                {errors.title && <div className="text-danger mt-1">{errors.title}</div>}
                            </div>
                        </div>

                        <div className="form-group row mb-4">
                            <div className="col-md-4">
                                <label className="form-label">Button Text</label>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" value={data.button_text} onChange={e => setData('button_text', e.target.value)} />
                                {errors.button_text && <div className="text-danger mt-1">{errors.button_text}</div>}
                            </div>
                        </div>

                        <div className="form-group row mb-4">
                            <div className="col-md-4">
                                <label className="form-label">Button Link</label>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" value={data.button_link} onChange={e => setData('button_link', e.target.value)} />
                                {errors.button_link && <div className="text-danger mt-1">{errors.button_link}</div>}
                            </div>
                        </div>

                        <div className="form-group row mb-4">
                            <div className="col-md-4">
                                <label className="form-label">Display Order</label>
                            </div>
                            <div className="col-md-8">
                                <input type="number" className="form-control" value={data.order} onChange={e => setData('order', e.target.value)} />
                                {errors.order && <div className="text-danger mt-1">{errors.order}</div>}
                            </div>
                        </div>

                        <div className="form-group row mb-4">
                            <div className="col-md-4">
                                <label className="form-label">Status</label>
                            </div>
                            <div className="col-md-8">
                                <div className="form-check form-switch mt-2">
                                    <input className="form-check-input" type="checkbox" id="isActiveSwitch" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                                    <label className="form-check-label" htmlFor="isActiveSwitch">Active (Visible on Home Page)</label>
                                </div>
                            </div>
                        </div>



                        <div className="form-actions text-end mt-4 pt-3 border-top">
                            <button type="submit" className="btn-primary" disabled={processing}>Save Banner</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
