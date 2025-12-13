"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                // In a real app, include auth token here
                // 'Authorization': `Bearer ${token}`
                // For now, relies on backend check (which likely needs the admin email in body/query or token, but I implemented verifyAdmin reading email from query/body - I need to send it if I want it to work)
                // Wait, my verifyAdmin reads email from body/query/params. So I need to send the current admin's email.
                // But this is a GET request. I should better use query param.
                // Oh, I didn't update the fetch to include email. Let's fix that.
            }
        })
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }

    // Correction: I need to pass the admin's email to the backend for verification.
    // Since I can't easily get it here without useUser, let's just assume for now I will rely on the backend checking if I am an admin. 
    // BUT: My verifyAdmin middleware CHECKS user from DB using provided email. 
    // So I MUST send the email.

    // Let's refactor to use useUser.

    return (
        <AdminUsersContent />
    )
};

import { useUser } from "@clerk/nextjs";
import { API_URL } from "@/config";

const AdminUsersContent = () => {
    const { user, isLoaded } = useUser();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
            setLoading(true);
            fetch(`${API_URL}/users?email=${user.primaryEmailAddress.emailAddress}`)
                .then(async (res) => {
                    if (!res.ok) {
                        const errData = await res.json().catch(() => ({}));
                        throw new Error(errData.message || errData.error || `Error: ${res.statusText}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    if (Array.isArray(data)) {
                        setUsers(data);
                    } else {
                        console.error("Data is not an array:", data);
                        toast.error("Failed to load users: Invalid data format");
                    }
                })
                .catch(err => {
                    console.error("Fetch error:", err);
                    toast.error(err.message);
                })
                .finally(() => setLoading(false));
        }
    }, [user, isLoaded]);

    if (loading) return <div className="p-10 text-center">Loading users...</div>;

    const handleRoleUpdate = (id, newRole) => {
        fetch(`${API_URL}/users/role/${id}?email=${user.primaryEmailAddress.emailAddress}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ role: newRole })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("User role updated!")
                    // Refresh list
                    fetch(`${API_URL}/users?email=${user.primaryEmailAddress.emailAddress}`)
                        .then((res) => res.json())
                        .then(data => setUsers(data));
                }
            })
    }

    const handleDeleteUser = (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        fetch(`${API_URL}/users/${id}?email=${user.primaryEmailAddress.emailAddress}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("User deleted successfully!");
                    // Refresh list
                    fetch(`${API_URL}/users?email=${user.primaryEmailAddress.emailAddress}`)
                        .then((res) => res.json())
                        .then(data => setUsers(data));
                } else {
                    toast.error("Failed to delete user");
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to delete user");
            });
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Manage Users</h2>

            {/* Mobile: Card Layout */}
            <div className="block lg:hidden space-y-4">
                {users.map((u) => (
                    <div key={u._id} className="card bg-base-100 shadow-xl">
                        <div className="card-body p-5">
                            <div className="flex items-center gap-4">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-14 h-14">
                                        <img src={u.image} alt={u.name} />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">{u.name}</div>
                                    <div className="badge badge-sm mt-1">{u.role}</div>
                                </div>
                            </div>

                            <div className="divider my-1"></div>

                            <div className="text-sm text-gray-500 break-all">
                                <span className="font-semibold text-gray-700 block mb-1">Email:</span>
                                {u.email}
                            </div>

                            <div className="card-actions justify-between items-end mt-4 pt-2 border-t border-base-200">
                                <div className="form-control w-full max-w-xs">
                                    <label className="label cursor-pointer pb-0">
                                        <span className="label-text text-xs">Role</span>
                                    </label>
                                    <select
                                        className="select select-bordered select-sm w-full"
                                        defaultValue={u.role}
                                        onChange={(e) => handleRoleUpdate(u._id, e.target.value)}
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="seller">Seller</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => handleDeleteUser(u._id)}
                                    className="btn btn-error btn-outline btn-sm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto bg-base-100 shadow-xl rounded-xl">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id} className="hover:bg-base-50">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={u.image} alt={u.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{u.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 text-gray-600">{u.email}</td>
                                <td className="py-4">
                                    <span className={`badge ${u.role === 'admin' ? 'badge-primary' : u.role === 'seller' ? 'badge-secondary' : 'badge-ghost'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="py-4 flex gap-2">
                                    <select
                                        className="select select-bordered select-sm"
                                        defaultValue={u.role}
                                        onChange={(e) => handleRoleUpdate(u._id, e.target.value)}
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="seller">Seller</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button
                                        onClick={() => handleDeleteUser(u._id)}
                                        className="btn btn-ghost btn-sm text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUsers;
