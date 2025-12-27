"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
const SettingsPage = () => {
    const { user } = useUser();
    const [currentTheme, setCurrentTheme] = useState('light');

    const themes = [
        "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
    ];

    useEffect(() => {
        // Initialize theme-change
        const { themeChange } = require('theme-change');
        themeChange(false);
        // Set initial state from local storage for the select value
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) setCurrentTheme(savedTheme);
    }, []);

    const handleThemeChange = (e) => {
        const theme = e.target.value;
        setCurrentTheme(theme);
        // theme-change library handles the actual attribute setting via data-set-theme or data-choose-theme
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Settings</h1>

            {/* Profile Section */}
            <div className="bg-base-100 shadow-xl rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-base-200">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center md:text-left">Profile Information</h2>
                <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                    <div className="avatar">
                        <div className="w-20 sm:w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.imageUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="Profile" />
                        </div>
                    </div>
                    <div className="text-center md:text-left w-full md:w-auto overflow-hidden">
                        <h3 className="text-xl sm:text-2xl font-bold">{user?.fullName}</h3>
                        <p className="opacity-70 break-all text-sm sm:text-base">{user?.primaryEmailAddress?.emailAddress}</p>
                        <div className="flex justify-center md:justify-start">
                            <p className="badge badge-primary mt-2 uppercase">{user?.publicMetadata?.role || 'User'}</p>
                        </div>
                    </div>
                    <div className="w-full md:w-auto md:ml-auto mt-4 md:mt-0">
                        <button className="btn btn-outline btn-primary w-full md:w-auto" onClick={() => document.getElementById('manage_profile_modal').showModal()}>
                            Manage Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Appearance Section */}
            <div className="bg-base-100 shadow-xl rounded-2xl p-6 mb-8 border border-base-200">
                <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Select Theme</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        value={currentTheme}
                        onChange={handleThemeChange}
                        data-choose-theme
                    >
                        <option disabled>Pick a theme</option>
                        {themes.map(theme => (
                            <option key={theme} value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>
                        ))}
                    </select>
                    <label className="label">
                        <span className="label-text-alt">Customize your dashboard look</span>
                    </label>
                </div>
            </div>

            {/* Notification Section (Placeholder) */}
            <div className="bg-base-100 shadow-xl rounded-2xl p-6 border border-base-200">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-4">
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        <span className="label-text">Email Notifications</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-4">
                        <input type="checkbox" className="toggle toggle-secondary" checked disabled />
                        <span className="label-text">SMS Notifications (Coming Soon)</span>
                    </label>
                </div>
            </div>

            {/* Clerk Profile Modal (Placeholder action) */}
            <dialog id="manage_profile_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Manage Profile via Clerk</h3>
                    <p className="py-4">To update your password or detailed info, please use the User Button in the navbar.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default SettingsPage;
