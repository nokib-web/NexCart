'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // You still need react-hot-toast for the message

// No longer need: import { useAuth } from '@clerk/nextjs'; 

const AddProductPage = () => {
    // We removed useAuth(), so the form submission is simpler

    const [formData, setFormData] = useState({
        name: '',
        material: '',
        description: '',
        price: '', // The number field (e.g., Price)
        image: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. No token required! The fetch call is much simpler.
            const res = await fetch('http://localhost:5000/products', { // <-- Use the correct Express URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 2. Authorization header is REMOVED
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success('🎉 Product added successfully!');
                // Reset form fields
                setFormData({ name: '', description: '', material: '', price: '', image: '' });
            } else {
                toast.error(`❌ Failed to add product. Status: ${res.status}`);
            }

        } catch (error) {
            console.error('Submission error:', error);
            toast.error('An unexpected error occurred. Is your backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Toaster position="top-center" />
            <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
            <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 w-full max-w-lg mx-auto">

                {/* Title */}
                <div className="form-control mb-4"><label className="label"><span className="label-text">Title</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" required />
                </div>

                {/* Short Description */}
                <div className="form-control mb-4"><label className="label"><span className="label-text">Short Description</span></label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} className="input input-bordered w-full" required />
                </div>

                {/* Full Description */}
                <div className="form-control mb-4"><label className="label"><span className="label-text">Material</span></label>
                    <textarea name="material" value={formData.material} onChange={handleChange} className="input input-bordered w-full" required></textarea>
                </div>

                {/* Price Field */}
                <div className="form-control mb-4"><label className="label"><span className="label-text">Price ($)</span></label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="input input-bordered w-full" step="0.01" required />
                </div>

                {/* Optional Image URL */}
                <div className="form-control mb-6"><label className="label"><span className="label-text">Image URL (Optional)</span></label>
                    <input type="url" name="image" value={formData.image} onChange={handleChange} className="input input-bordered w-full" />
                </div>

                {/* Submit Button */}
                <button type="submit" className={`btn btn-secondary ${loading ? 'opacity-50 pointer-events-none' : ''}`} disabled={loading}>
                    {loading ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            Adding...
                        </>
                    ) : 'Submit (Add Product)'}
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;