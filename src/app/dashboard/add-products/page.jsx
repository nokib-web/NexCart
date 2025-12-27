'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';
import { API_URL } from '@/config';

const AddProductPage = () => {
    const { user } = useUser();

    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: '',
        description: '',
        material: '',
        price: '',
        image: '',
        colors: '',
        sizes: '',
        stock: '',
    });
    const [loading, setLoading] = useState(false);

    const categories = ["Hoodies", "Jackets", "Sweaters", "Accessories", "T-Shirts", "Pants"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Process comma-separated strings into arrays
            const colorsArray = formData.colors.split(',').map(item => item.trim()).filter(item => item !== '');
            const sizesArray = formData.sizes.split(',').map(item => item.trim()).filter(item => item !== '');

            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                colors: colorsArray,
                sizes: sizesArray,
                email: user?.primaryEmailAddress?.emailAddress,
                sellerEmail: user?.primaryEmailAddress?.emailAddress,
            }

            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (res.ok) {
                toast.success('Product added successfully!');
                setFormData({
                    name: '', brand: '', category: '', description: '', material: '',
                    price: '', image: '', colors: '', sizes: '', stock: ''
                });
            } else {
                toast.error(`Failed to add product. Status: ${res.status}`);
            }

        } catch (error) {
            console.error('Submission error:', error);
            toast.error('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <Toaster position="top-center" />
            <h1 className="text-3xl font-bold mb-8 text-center text-primary">Add New Product</h1>

            <form onSubmit={handleSubmit} className="card bg-base-100 shadow-2xl p-8 border border-base-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Basic Info */}
                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label"><span className="label-text font-semibold">Product Name</span></label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" placeholder="e.g. Premium Cotton Hoodie" required />
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label"><span className="label-text font-semibold">Brand</span></label>
                        <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="input input-bordered w-full" placeholder="e.g. NexCart" required />
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label"><span className="label-text font-semibold">Category</span></label>
                        <select name="category" value={formData.category} onChange={handleChange} className="select select-bordered w-full" required>
                            <option value="" disabled>Select Category</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label"><span className="label-text font-semibold">Price ($)</span></label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="input input-bordered w-full" step="0.01" placeholder="0.00" required />
                    </div>

                    <div className="form-control col-span-2">
                        <label className="label"><span className="label-text font-semibold">Short Description</span></label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} className="input input-bordered w-full" placeholder="Brief summary of the product" required />
                    </div>

                    <div className="form-control col-span-2">
                        <label className="label"><span className="label-text font-semibold">Material / Details</span></label>
                        <textarea name="material" value={formData.material} onChange={handleChange} className="textarea textarea-bordered w-full h-24" placeholder="Detailed material info, care instructions, etc." required></textarea>
                    </div>

                    {/* Inventory & Variants */}
                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label"><span className="label-text font-semibold">Stock Quantity</span></label>
                        <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="input input-bordered w-full" placeholder="Available units" required />
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label"><span className="label-text font-semibold">Image URL</span></label>
                        <input type="url" name="image" value={formData.image} onChange={handleChange} className="input input-bordered w-full" placeholder="https://..." />
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label"><span className="label-text font-semibold">Colors (comma separated)</span></label>
                        <input type="text" name="colors" value={formData.colors} onChange={handleChange} className="input input-bordered w-full" placeholder="Red, Blue, Black" />
                    </div>

                    <div className="form-control col-span-2 md:col-span-1">
                        <label className="label"><span className="label-text font-semibold">Sizes (comma separated)</span></label>
                        <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} className="input input-bordered w-full" placeholder="S, M, L, XL" />
                    </div>

                </div>

                <div className="mt-8 flex justify-end">
                    <button type="submit" className={`btn btn-primary px-8 ${loading ? 'loading' : ''}`} disabled={loading}>
                        {loading ? 'Adding Product...' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;