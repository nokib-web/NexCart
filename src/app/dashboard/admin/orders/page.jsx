"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { Truck, CheckCircle } from 'lucide-react';
import { API_URL } from '@/config';

const AdminOrders = () => {
    const { user, isLoaded } = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
            fetchOrders();
        }
    }, [user, isLoaded]);

    const fetchOrders = () => {
        setLoading(true);
        fetch(`${API_URL}/orders`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setOrders(data.reverse());
                else setOrders([]);
            })
            .catch(err => toast.error("Failed to load orders"))
            .finally(() => setLoading(false));
    };

    const updateStatus = (id, status) => {
        fetch(`${API_URL}/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`Order marked as ${status}`);
                    fetchOrders();
                }
            })
            .catch(err => toast.error("Failed to update status"));
    };

    if (loading) {
        return <div className="p-8 text-center text-lg">Loading orders...</div>;
    }

    if (orders.length === 0) {
        return <div className="p-8 text-center text-gray-500">No orders found.</div>;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Manage Orders</h1>

            {/* Mobile: Card Layout */}
            <div className="block lg:hidden space-y-4">
                {orders.map(order => (
                    <div key={order._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="font-mono text-xs opacity-60">{order._id}</div>
                                    <div className="text-sm text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <span className={`badge ${order.status === 'shipped' ? 'badge-success' : 'badge-warning'}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div>
                                    <div className="font-semibold">{order.customerName}</div>
                                    <div className="text-xs text-gray-600 break-all">{order.customerEmail}</div>
                                </div>

                                <div>
                                    <span className="font-medium">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                                    <div className="tooltip" data-tip={order.items.map(i => i.name).join(", ")}>
                                        <span className="badge badge-ghost badge-xs cursor-help ml-2">View items</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-lg text-primary">${order.totalPrice}</div>
                                        <div className="text-xs">
                                            <span className={`badge badge-sm ${order.paymentMethod === 'cod' ? 'badge-warning' : 'badge-info'} mr-2`}>
                                                {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
                                            </span>
                                            <span className={order.paidStatus ? 'text-success' : 'text-error'}>
                                                {order.paidStatus ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        {order.status === 'pending' && (
                                            <button
                                                onClick={() => updateStatus(order._id, 'shipped')}
                                                className="btn btn-primary btn-sm"
                                            >
                                                <Truck className="w-4 h-4" />
                                                Ship
                                            </button>
                                        )}
                                        {order.status === 'shipped' && (
                                            <div className="text-success flex items-center gap-1">
                                                <CheckCircle className="w-5 h-5" />
                                                <span>Done</span>
                                            </div>
                                        )}
                                    </div>
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
                            <th>Order ID / Date</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="hover:bg-base-50">
                                <td className="py-4">
                                    <div className="font-mono text-xs opacity-50">{order._id}</div>
                                    <div className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</div>
                                </td>
                                <td className="py-4">
                                    <div className="font-bold">{order.customerName}</div>
                                    <div className="text-xs text-gray-600">{order.customerEmail}</div>
                                </td>
                                <td className="py-4">
                                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                    <div className="tooltip" data-tip={order.items.map(i => i.name).join(", ")}>
                                        <span className="badge badge-ghost badge-xs cursor-help ml-2">View</span>
                                    </div>
                                </td>
                                <td className="py-4 font-bold text-primary">${order.totalPrice}</td>
                                <td className="py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className={`badge badge-sm ${order.paymentMethod === 'cod' ? 'badge-warning' : 'badge-info'}`}>
                                            {order.paymentMethod === 'cod' ? 'COD' : 'Online'}
                                        </span>
                                        <span className={`text-xs ${order.paidStatus ? 'text-success' : 'text-error'}`}>
                                            {order.paidStatus ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <span className={`badge ${order.status === 'shipped' ? 'badge-success' : order.status === 'pending' ? 'badge-warning' : 'badge-ghost'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-4">
                                    {order.status === 'pending' && (
                                        <button
                                            onClick={() => updateStatus(order._id, 'shipped')}
                                            className="btn btn-sm btn-primary"
                                        >
                                            <Truck className="w-4 h-4 mr-1" /> Ship
                                        </button>
                                    )}
                                    {order.status === 'shipped' && (
                                        <span className="text-success flex items-center gap-1">
                                            <CheckCircle className="w-4 h-4" /> Done
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;