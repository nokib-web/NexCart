"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Edit, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '@/config';

const ManageProducts = () => {
    const { user, isLoaded } = useUser();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
            fetchProducts();
        }
    }, [user, isLoaded]);

    const fetchProducts = () => {
        setLoading(true);
        // Note: Ideally backend should have a /products?sellerEmail=... or similar
        // For now, I'll fetch all and filter in frontend OR updated backend to support query
        // Let's assume public /products returns everything for now.
        // A better approach is to add a query param to the backend.
        // But looking at previous code, /products is public.
        // I'll fetch all and filter for now to be safe without breaking backend changes yet.
        fetch(`${API_URL}/products`)
            .then(res => res.json())
            .then(data => {
                const myProducts = data.filter(p => p.sellerEmail === user.primaryEmailAddress.emailAddress);
                setProducts(myProducts);
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to load products");
            })
            .finally(() => setLoading(false));
    }

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        fetch(`${API_URL}/products/${id}?email=${user.primaryEmailAddress.emailAddress}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to delete");
                return res.json();
            })
            .then(() => {
                toast.success("Product deleted");
                fetchProducts();
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to delete product");
            });
    };

    if (loading) return <div className="p-10 text-center">Loading your products...</div>;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">My Products</h1>
                <Link href="/dashboard/add-products" className="btn btn-primary btn-sm sm:btn-md">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" /> Add New
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-10 bg-base-100 rounded-xl shadow">
                    <h3 className="text-lg font-semibold">No products found</h3>
                    <p className="text-gray-500 mb-4">You haven't added any products yet.</p>
                    <Link href="/dashboard/add-products" className="btn btn-outline btn-primary">
                        Add your first product
                    </Link>
                </div>
            ) : (
                <>
                    {/* Mobile: Card Layout */}
                    <div className="block lg:hidden space-y-4">
                        {products.map((product) => (
                            <div key={product._id} className="card bg-base-100 shadow-xl">
                                <div className="card-body p-5">
                                    <div className="flex gap-4">
                                        <div className="avatar">
                                            <div className="w-20 h-20 rounded-xl">
                                                <img src={product.image} alt={product.title} className="object-cover w-full h-full" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight">{product.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1">{product.brand}</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <span className="badge badge-sm badge-ghost">{product.category}</span>
                                                <span className="badge badge-sm badge-success badge-outline">In Stock</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="divider my-2"></div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-primary">${product.price}</span>
                                        <div className="flex gap-2">
                                            <Link href={`/dashboard/edit-product/${product._id}`} className="btn btn-sm btn-ghost">
                                                <Edit className="w-4 h-4 text-blue-600 mr-2" /> Edit
                                            </Link>
                                            <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-ghost text-red-600">
                                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop/Tablet: Table Layout */}
                    <div className="hidden lg:block overflow-x-auto bg-base-100 shadow-xl rounded-xl">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-base-200">
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-base-50">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={product.image} alt={product.title} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product.title}</div>
                                                    <div className="text-sm opacity-50">{product.brand}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 font-bold text-primary">${product.price}</td>
                                        <td className="py-4">
                                            <span className="badge badge-ghost badge-sm">{product.category}</span>
                                        </td>
                                        <td className="py-4">
                                            <span className="badge badge-success badge-outline">In Stock</span>
                                        </td>
                                        <td className="py-4 flex gap-2">
                                            <Link href={`/dashboard/edit-product/${product._id}`} className="btn btn-ghost btn-xs">
                                                <Edit className="w-4 h-4 text-blue-600" />
                                            </Link>
                                            <button onClick={() => handleDelete(product._id)} className="btn btn-ghost btn-xs text-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div >
    );
};

export default ManageProducts;