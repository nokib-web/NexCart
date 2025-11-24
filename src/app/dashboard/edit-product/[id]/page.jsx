'use client'; 

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const EditProductPage = () => {
    // Hooks for navigation and URL parameters
    const router = useRouter();
    const { id } = useParams(); // Get the product ID from the URL segment

    // State for loading, errors, and form data
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        material: '',
        price: '',
        imageUrl: '',
    });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const EXPRESS_API_URL = 'https://nexcart-server.onrender.com/products';

    // 1. Fetch existing product data
    useEffect(() => {
        if (!id) return;

        const fetchProductData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${EXPRESS_API_URL}/${id}`);
                
                if (!res.ok) {
                    throw new Error("Failed to fetch product details.");
                }

                const product = await res.json();
                
                // Set form data, converting price back to string for input field
                setFormData({
                    title: product.name || '',
                    material: product.material || '',
                    shortDescription: product.description || '',
                    price: product.price ? String(product.price) : '',
                    imageUrl: product.image || '',
                });
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Could not load product. Please check the ID and backend connection.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id, EXPRESS_API_URL]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 2. Handle PUT submission for updating the product
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        // Sanitize data before sending (same logic as add-product)
        const dataToSend = {
            ...formData,
            imageUrl: formData.imageUrl.trim() === '' ? null : formData.imageUrl.trim(),
            price: parseFloat(formData.price) // Ensure price is a number for MongoDB
        };

        try {
            const res = await fetch(`${EXPRESS_API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            if (res.ok) {
                toast.success('✅ Product updated successfully!');
                // Redirect back to the management page after success
                router.push('/dashboard/manage-products');
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || `Failed to update product. Status: ${res.status}`);
            }

        } catch (err) {
            console.error('Update error:', err);
            setError(err.message);
            toast.error('❌ Update failed. ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>
        );
    }
    
    if (error && !isSaving) {
        return (
            <div className="text-center p-8 bg-error/10 text-error-content rounded-xl m-8">
                <h2 className="text-xl font-bold">Error</h2>
                <p>{error}</p>
                <button onClick={() => router.push('/dashboard/manage-products')} className="btn btn-sm btn-info mt-4">Go Back</button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <Toaster position="top-center" />
            <h1 className="text-3xl font-bold mb-6 text-center text-warning">Edit Product: {formData.title || 'Loading...'}</h1>
            <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 w-full max-w-lg mx-auto">
                
                {/* Title */}
                <div className="form-control mb-4"><label className="label"><span className="label-text">Title</span></label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" required />
                </div>
                
                {/* Short Description */}
                <div className="form-control mb-4"><label className="label"><span className="label-text">Short Description</span></label>
                    <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="input input-bordered w-full" required />
                </div>

                {/* Full Description */}
                <div className="form-control mb-4"><label className="label"><span className="label-text">Material</span></label>
                    <textarea name="material" value={formData.material} onChange={handleChange} className=" input input-bordered w-full" required></textarea>
                </div>
                
                {/* Price Field */}
                <div className="form-control mb-4"><label className="label"><span className="label-text">Price ($)</span></label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="input input-bordered w-full" step="0.01" required />
                </div>
                
                {/* Optional Image URL */}
                <div className="form-control mb-6"><label className="label"><span className="label-text">Image URL (Optional)</span></label>
                    <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="input input-bordered w-full" />
                </div>
                
                {/* Submit Button */}
                <button type="submit" className={`btn btn-warning text-white ${isSaving ? 'opacity-50 pointer-events-none' : ''}`} disabled={isSaving}>
                    {isSaving ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            Saving Changes...
                        </>
                    ) : 'Update Product'}
                </button>
                
                <button type="button" onClick={() => router.back()} className="btn btn-ghost mt-2">
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditProductPage;