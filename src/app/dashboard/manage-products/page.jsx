'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

// Next.js Image component requires a placeholder for images if using external URLs
// You should add these domains to your next.config.js if you haven't already:
// images: { domains: ['placehold.co'] }

const ManageProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const EXPRESS_API_URL = 'https://nexcart-server.onrender.com/products'; // Adjust if your port/path differs

    // 1. Function to fetch products
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(EXPRESS_API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Could not load products. Is the backend server running?");
            toast.error("Failed to fetch products.");
        } finally {
            setLoading(false);
        }
    }, [EXPRESS_API_URL]);

    // Fetch data on component mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // 2. Function to handle deletion
    const handleDelete = async (productId) => {
        // Simple confirmation modal/box (replace with custom modal if preferred)
        // NOTE: Please replace window.confirm with a custom modal UI as per instructions
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        try {
            const deleteResponse = await fetch(`${EXPRESS_API_URL}/${productId}`, {
                method: 'DELETE',
            });

            if (deleteResponse.ok) {
                toast.success('Product deleted successfully!');
                // Update state immediately to remove the deleted product
                setProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
            } else {
                const errorData = await deleteResponse.json();
                toast.error(`Deletion failed: ${errorData.message || 'Server error'}`);
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error('An unexpected error occurred during deletion.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-primary"></span></div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 bg-error/10 text-error-content rounded-xl m-8">
                <h2 className="text-xl font-bold">Error</h2>
                <p>{error}</p>
                <button onClick={fetchProducts} className="btn btn-sm btn-error mt-4">Try Again</button>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center p-12">
                <h2 className="text-2xl font-bold text-gray-700">No Products Found</h2>
                <p className="text-gray-500 mt-2">Start by adding a new product via the Add Product page.</p>
            </div>
        );
    }

    // 3. Render the grid of product cards
    return (
        <div className="container mx-auto p-4 md:p-8">
            <Toaster position="top-right" />
            <h1 className="text-4xl font-extrabold text-secondary mb-8">Manage All Products ({products.length})</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => {
                    
                    const imageSource = product.image ? product.image : '';
                    const title = product.name || 'Untitled';
                    const shortDescription = product.description || 'No description available.';
                    const price = product.price || '0.00';
                    const linkId = product._id;

                    return (
                        <div key={linkId} className="card bg-base-100 shadow-xl border border-gray-100 transition duration-300 hover:shadow-2xl">
                            
                            {/* Image */}
                            <figure className="h-48 w-full overflow-hidden relative">
                                <Image
                                    src={imageSource} 
                                    alt={title}
                                    fill
                                    className="object-cover transition duration-500 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                            </figure>

                            {/* Body */}
                            <div className="card-body p-4">
                                <h2 className="card-title text-lg font-semibold line-clamp-2 min-h-12">
                                    {title}
                                </h2>
                                <p className="text-lg font-bold text-primary">${price}</p>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-2">{shortDescription}</p>

                                {/* Actions */}
                                <div className="card-actions justify-end mt-2">
                                    {/* 🟢 NEW EDIT BUTTON */}
                                    <Link href={`/dashboard/edit-product/${linkId}`} className="btn btn-sm btn-warning text-white">
                                        Edit
                                    </Link>
                                    <Link href={`/products/${linkId}`} className="btn btn-sm btn-info text-white">
                                        View
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(linkId)} 
                                        className="btn btn-sm btn-error text-white">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ManageProductsPage;