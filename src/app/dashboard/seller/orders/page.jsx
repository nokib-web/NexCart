"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import useRole from "@/hooks/useRole";
import { API_URL } from "@/config";
import Link from "next/link";

const SellerOrders = () => {
    const { user, isLoaded } = useUser();
    const { role } = useRole();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoaded || !role) return;

        if (role === 'seller' && user) {
            const fetchOrders = async () => {
                const res = await fetch(`${API_URL}/orders?email=${user.primaryEmailAddress.emailAddress}&role=seller`);
                const data = await res.json();
                setOrders(data);
                setLoading(false);
            }
            fetchOrders();
        } else {
            // If not seller, just stop loading
            setLoading(false);
        }
    }, [isLoaded, user, role]);

    if (loading) return <div className="p-10 text-center">Loading Orders...</div>

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Orders for My Products</h2>
            {orders.length === 0 ? <p>No orders found.</p> : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>My Items</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td className="font-mono text-xs">{order._id.slice(-6)}</td>
                                    <td>{order.customerName}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>${order.totalPrice?.toFixed(2)}</td>
                                    <td>
                                        <span className="badge badge-warning">{order.status}</span>
                                    </td>
                                    <td>
                                        <div className="flex flex-col gap-1">
                                            {order.items?.filter(i => i.sellerEmail === user?.primaryEmailAddress?.emailAddress).map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-2 mb-2">
                                                    <div className="w-10 h-10 rounded-lg overflow-hidden border flex-shrink-0">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold line-clamp-1">{item.name}</p>
                                                        <p className="text-[10px] text-gray-500">
                                                            Qty: {item.quantity}
                                                            {item.size && ` • Size: ${item.size}`}
                                                            {item.color && ` • Color: ${item.color}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <Link href={`/dashboard/seller/orders/print/${order._id}`}>
                                            <button className="btn btn-xs btn-outline btn-info">
                                                Print Label
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default SellerOrders;
