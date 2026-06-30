import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        link: '',
        image: null,
        is_active: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.popups.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout title="Add Popup">
            <div className="page-title-box d-flex justify-content-between align-items-center mb-4">
                <h3 className="page-title mb-0">Add New Popup</h3>
                <Link href={route('admin.popups.index')} className="btn btn-outline-secondary">
                    <i className="ri-arrow-left-line me-1"></i> Back to Popups
                </Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="settings-form">
                        
                        <div className="form-group row mb-4">
                            <div className="col-md-4">
                                <label className="form-label">Popup Title</label>
                                <span className="form-help">(Optional) A title to display.</span>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Enter popup title" />
                                {errors.title && <div className="text-danger mt-1">{errors.title}</div>}
                            </div>
                        </div>



                        <div className="form-group row mb-4">
                            <div className="col-md-4">
                                <label className="form-label">Poster Image</label>
                                <span className="form-help">(Optional) Upload an image poster to display.</span>
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
                                <label className="form-label">Link URL</label>
                                <span className="form-help">(Optional) A URL to redirect the user to when clicked.</span>
                            </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" value={data.link} onChange={e => setData('link', e.target.value)} placeholder="e.g., /admissions or https://example.com" />
                                {errors.link && <div className="text-danger mt-1">{errors.link}</div>}
                            </div>
                        </div>

                        <div className="form-group row mb-4">
                            <div className="col-md-4">
                                <label className="form-label">Status</label>
                            </div>
                            <div className="col-md-8">
                                <div className="form-check form-switch d-flex align-items-center mt-2">
                                    <input 
                                        className="form-check-input mt-0" 
                                        type="checkbox" 
                                        role="switch"
                                        id="isActiveSwitch" 
                                        checked={data.is_active} 
                                        onChange={e => setData('is_active', e.target.checked)} 
                                        style={{ cursor: 'pointer', width: '2.5rem', height: '1.25rem' }}
                                    />
                                    <label className="form-check-label ms-2 fw-medium" htmlFor="isActiveSwitch" style={{ cursor: 'pointer' }}>Active (Visible on Home Page)</label>
                                </div>
                                <span className="form-help d-block mt-1">Setting this to active will automatically deactivate any currently active popups.</span>
                                {errors.is_active && <div className="text-danger mt-1">{errors.is_active}</div>}
                            </div>
                        </div>

                        <div className="form-actions text-end mt-4 pt-3 border-top">
                            <button type="submit" className="btn-primary" disabled={processing}>Save Popup</button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
