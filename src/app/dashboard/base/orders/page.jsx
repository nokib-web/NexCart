"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import useRole from "@/hooks/useRole";
import { API_URL } from "@/config";

const CustomerOrders = () => {
    const { user, isLoaded } = useUser();
    const { role } = useRole();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && user && role) {
            // Fetch orders based on role.
            // If customer, fetch my orders.
            // If seller, should go to seller/orders but this is fine too if we handle it.
            // But this page is /dashboard/base/orders (from sidebar).

            const fetchOrders = async () => {
                const res = await fetch(`${API_URL}/orders?email=${user.primaryEmailAddress.emailAddress}&role=${role}`);
                const data = await res.json();
                setOrders(data);
                setLoading(false);
            }
            fetchOrders();
        }
    }, [isLoaded, user, role]);

    if (loading) return <div className="p-10 text-center">Loading Orders...</div>

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">My Orders</h2>
            {orders.length === 0 ? <p className="text-gray-500">No orders found.</p> : (
                <>
                    {/* Mobile: Card Layout */}
                    <div className="block lg:hidden space-y-4">
                        {orders.map(order => (
                            <div key={order._id} className="card bg-base-100 shadow-xl">
                                <div className="card-body p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="font-mono text-xs opacity-60 bg-base-200 px-2 py-0.5 rounded">#{order._id.slice(-6)}</div>
                                            <div className="text-sm text-gray-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        <span className={`badge ${order.status === 'shipped' ? 'badge-success' : 'badge-warning'}`}>
                                            {order.status}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center bg-base-50 p-2 rounded-lg">
                                            <span className="text-sm font-medium">Total</span>
                                            <span className="font-bold text-primary text-lg">${order.totalPrice?.toFixed(2)}</span>
                                        </div>

                                        <div className="pt-2">
                                            <div className="text-xs font-semibold mb-2 uppercase text-gray-400">Items</div>
                                            <div className="flex flex-wrap gap-2">
                                                {order.items?.map((item, idx) => (
                                                    <div key={idx} className="avatar">
                                                        <div className="w-10 h-10 rounded-lg border border-base-200 overflow-hidden">
                                                            <img src={item.image} alt={item.name} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop/Tablet: Table Layout */}
                    <div className="hidden lg:block overflow-x-auto bg-base-100 shadow-md rounded-xl">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-base-200">
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id} className="hover:bg-base-50">
                                        <td className="py-4 font-mono text-xs font-semibold text-gray-500">{order._id.slice(-6)}</td>
                                        <td className="py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="py-4 font-bold text-primary">${order.totalPrice?.toFixed(2)}</td>
                                        <td className="py-4">
                                            <span className={`badge ${order.status === 'shipped' ? 'badge-success' : 'badge-warning'}`}>{order.status}</span>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex -space-x-3 hover:space-x-1 transition-all">
                                                {order.items?.map((item, idx) => (
                                                    <div key={idx} className="avatar border border-white rounded-full">
                                                        <div className="w-8 h-8 rounded-full">
                                                            <img src={item.image} alt={item.name} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}

export default CustomerOrders;
