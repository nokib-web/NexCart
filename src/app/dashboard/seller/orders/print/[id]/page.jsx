"use client";
import React, { useEffect, useState } from 'react';
import { API_URL } from '@/config';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

const PrintOrder = ({ params }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    // Resolving params
    const [id, setId] = useState(null);

    useEffect(() => {
        // Next.js 15+ params are async, but standard prop usage often allows synchronous access if not using async server component features.
        // To be safe and compatible with recent changes:
        if (params instanceof Promise) {
            params.then(p => setId(p.id));
        } else {
            setId(params.id);
        }
    }, [params]);

    useEffect(() => {
        if (!id) return;

        const fetchOrder = async () => {
            try {
                const res = await fetch(`${API_URL}/orders/${id}`);
                const data = await res.json();
                setOrder(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load order", error);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) return <div className="p-10 text-center">Loading Invoice...</div>;
    if (!order) return <div className="p-10 text-center text-red-500">Order not found</div>;

    // Filter items if this is a seller view (optional, but requested context implies seller managing *their* orders)
    // However, a shipping label usually implies the whole package. 
    // If multiple sellers are involved in one order (marketplace model), shipping might be complex.
    // For now, assuming we show the whole order or just the seller's part?
    // "document which i can add to shipment company" usually implies the packaging for THAT seller's items.

    const sellerItems = order.items.filter(item => item.sellerEmail === user?.primaryEmailAddress?.emailAddress);

    // If sellerItems is empty, maybe the user is Admin? If so show all.
    const displayItems = sellerItems.length > 0 ? sellerItems : order.items;

    return (
        <div className="bg-white text-black min-h-screen p-8 max-w-[210mm] mx-auto">
            {/* Print Controls - Hide when printing */}
            <div className="mb-8 flex justify-between items-center no-print">
                <button
                    onClick={() => window.history.back()}
                    className="btn btn-outline"
                >
                    &larr; Back
                </button>
                <h1 className="text-xl font-bold text-gray-400">Print Preview</h1>
                <button
                    onClick={handlePrint}
                    className="btn btn-primary"
                >
                    Print Document
                </button>
            </div>

            {/* Shipping Label / Invoice Container */}
            <div className="border-2 border-gray-800 p-8" id="printable-area">

                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">INVOICE</h1>
                        <p className="text-gray-600 font-mono">#{order._id.toUpperCase()}</p>
                        <p className="text-sm text-gray-500 mt-1">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-2xl font-bold flex items-center gap-2 justify-end">
                            Nex<span className="text-primary">Cart</span>
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Logistic Partner Copy</p>
                    </div>
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-2 gap-12 mb-8">
                    <div>
                        <h3 className="text-gray-500 uppercase text-xs font-bold mb-2">From (Seller)</h3>
                        <p className="font-bold text-lg">{displayItems[0]?.sellerEmail || "NexCart Seller"}</p>
                        <p className="text-gray-600">Dhaka, Bangladesh</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500 uppercase text-xs font-bold mb-2">To (Customer)</h3>
                        <p className="font-bold text-lg">{order.customerName}</p>
                        <p className="text-gray-600">{order.customerEmail}</p>
                        <p className="text-gray-600">Dhaka, Bangladesh</p> {/* Placeholder address if not in order */}
                        <p className="text-gray-600 mt-2 font-mono">{order.customerPhone || "Phone: N/A"}</p>
                    </div>
                </div>

                {/* Info Bar */}
                <div className="bg-gray-100 p-4 flex justify-between mb-8 border border-gray-200">
                    <div>
                        <span className="block text-xs text-gray-500 uppercase">Payment Method</span>
                        <span className="font-bold uppercase">{order.paymentMethod}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 uppercase">Shipping Method</span>
                        <span className="font-bold">Standard Delivery</span>
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 uppercase">Total Items</span>
                        <span className="font-bold">{displayItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                    </div>
                </div>

                {/* Items Table */}
                <table className="w-full mb-8">
                    <thead>
                        <tr className="border-b-2 border-gray-800">
                            <th className="text-left py-2">Item Description</th>
                            <th className="text-center py-2">Size</th>
                            <th className="text-center py-2">Color</th>
                            <th className="text-center py-2">Qty</th>
                            <th className="text-right py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayItems.map((item, idx) => (
                            <tr key={idx} className="border-b border-gray-200">
                                <td className="py-3">
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.productId}</p>
                                </td>
                                <td className="text-center py-3">{item.size || "-"}</td>
                                <td className="text-center py-3">
                                    {item.color ? (
                                        <span className="inline-flex items-center gap-1">
                                            <span className="w-3 h-3 border rounded-full" style={{ backgroundColor: item.color }}></span>
                                            {item.color}
                                        </span>
                                    ) : "-"}
                                </td>
                                <td className="text-center py-3">{item.quantity}</td>
                                <td className="text-right py-3">${item.price?.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Footer Total */}
                <div className="flex justify-end border-t-2 border-gray-800 pt-4">
                    <div className="w-64">
                        <div className="flex justify-between py-1">
                            <span className="font-bold text-xl">Total</span>
                            <span className="font-bold text-xl">${order.totalPrice?.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Scan Code Placeholder */}
                <div className="mt-12 text-center border-t border-dashed border-gray-300 pt-8">
                    <p className="font-mono text-3xl tracking-widest">{order._id.toUpperCase()}</p>
                    <p className="text-xs text-gray-400 mt-2">Scan this code for internal processing</p>
                </div>

            </div>

            <style jsx global>{`
                @media print {
                    .no-print, .navbar, footer {
                        display: none !important;
                    }
                    body {
                        background: white;
                        color: black;
                        -webkit-print-color-adjust: exact;
                    }
                    #printable-area {
                        border: none;
                        padding: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default PrintOrder;
