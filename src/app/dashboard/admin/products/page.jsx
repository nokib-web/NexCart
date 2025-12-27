"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Edit, Trash2, Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_URL } from '@/config';

const AdminManageProducts = () => {
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
        // Admin should see ALL products (fetching 1000 for now to cover mostly all)
        fetch(`${API_URL}/products?limit=1000`)
            .then(res => res.json())
            .then(data => {
                if (data.products && Array.isArray(data.products)) {
                    setProducts(data.products);
                } else if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to load products");
            })
            .finally(() => setLoading(false));
    }

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this product? Action is irreversible.")) return;

        // Admin delete - pass admin email for verification
        fetch(`${API_URL}/products/${id}?email=${user.primaryEmailAddress.emailAddress}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to delete");
                return res.json();
            })
            .then(() => {
                toast.success("Product deleted by Admin");
                fetchProducts();
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to delete product");
            });
    };

    if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin inline mr-2" />Loading All Products...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage All Products (Admin)</h1>
                {/* Admin can also add products if they want, but mainly for management */}
                <Link href="/dashboard/add-products" className="btn btn-primary">
                    <Plus className="w-5 h-5 mr-2" /> Add New
                </Link>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-10 bg-base-100 rounded-xl shadow">
                    <h3 className="text-lg font-semibold">No products found</h3>
                </div>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto bg-base-100 shadow-xl rounded-xl">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-base-200">
                                    <th>Product</th>
                                    <th>Seller</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-base-50">
                                        <td>
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
                                        <td>
                                            <div className="text-sm opacity-70">
                                                {product.sellerEmail || product.email || "Unknown"}
                                            </div>
                                        </td>
                                        <td>${product.price}</td>
                                        <td>
                                            <span className="badge badge-ghost badge-sm">{product.category}</span>
                                        </td>
                                        <td className="flex gap-2">
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

                    {/* Mobile Card View (Admin Products) */}
                    <div className="md:hidden space-y-4">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white p-4 rounded-xl shadow-md flex gap-4">
                                <div className="avatar">
                                    <div className="w-20 h-20 rounded-xl">
                                        <img src={product.image} alt={product.title} className="object-cover w-full h-full" />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-gray-800 line-clamp-1">{product.title}</h3>
                                        <p className="text-xs text-gray-500">{product.brand}</p>
                                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">Seller: {product.sellerEmail || product.email}</p>
                                    </div>

                                    <div className="flex justify-between items-end mt-2">
                                        <span className="text-primary font-bold">${product.price}</span>
                                        <div className="flex gap-2">
                                            <Link href={`/dashboard/edit-product/${product._id}`} className="btn btn-sm btn-ghost btn-square">
                                                <Edit className="w-4 h-4 text-blue-600" />
                                            </Link>
                                            <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-ghost btn-square text-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )
            }
        </div >
    );
};

export default AdminManageProducts;
