"use client";
import React from 'react';

const AdminAnalytics = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

            {/* Stats Grid */}
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="stats shadow bg-base-100 w-full">
                    <div className="stat p-4">
                        <div className="stat-title text-xs sm:text-sm">Total Users</div>
                        <div className="stat-value text-primary text-2xl sm:text-4xl">89</div>
                        <div className="stat-desc text-xs">21% more than last month</div>
                    </div>
                </div>

                <div className="stats shadow bg-base-100 w-full">
                    <div className="stat p-4">
                        <div className="stat-title text-xs sm:text-sm">Total Orders</div>
                        <div className="stat-value text-secondary text-2xl sm:text-4xl">450</div>
                        <div className="stat-desc text-xs">5% more than last month</div>
                    </div>
                </div>

                <div className="stats shadow bg-base-100 w-full">
                    <div className="stat p-4">
                        <div className="stat-title text-xs sm:text-sm">Total Revenue</div>
                        <div className="stat-value text-success text-2xl sm:text-4xl">$24.5k</div>
                        <div className="stat-desc text-xs">14% more than last month</div>
                    </div>
                </div>

                <div className="stats shadow bg-base-100 w-full">
                    <div className="stat p-4">
                        <div className="stat-title text-xs sm:text-sm">Active Sellers</div>
                        <div className="stat-value text-2xl sm:text-4xl">12</div>
                        <div className="stat-desc text-xs">New seller joining soon</div>
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
