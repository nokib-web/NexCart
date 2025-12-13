"use client";
import React from 'react';

const AdminAnalytics = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="stats shadow bg-base-100">
                    <div className="stat">
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value text-primary">89</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>

                <div className="stats shadow bg-base-100">
                    <div className="stat">
                        <div className="stat-title">Total Orders</div>
                        <div className="stat-value text-secondary">450</div>
                        <div className="stat-desc">5% more than last month</div>
                    </div>
                </div>

                <div className="stats shadow bg-base-100">
                    <div className="stat">
                        <div className="stat-title">Total Revenue</div>
                        <div className="stat-value text-success">$24,500</div>
                        <div className="stat-desc">14% more than last month</div>
                    </div>
                </div>

                <div className="stats shadow bg-base-100">
                    <div className="stat">
                        <div className="stat-title">Active Sellers</div>
                        <div className="stat-value">12</div>
                        <div className="stat-desc">New seller joining soon</div>
                    </div>
                </div>
            </div>

            {/* Placeholder Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-xl p-6">
                    <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
                    <div className="h-64 flex items-center justify-center bg-base-200 rounded-lg text-gray-500">
                        [Sales Line Chart Placeholder]
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl p-6">
                    <h2 className="text-xl font-bold mb-4">User Growth</h2>
                    <div className="h-64 flex items-center justify-center bg-base-200 rounded-lg text-gray-500">
                        [User Growth Bar Chart Placeholder]
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
