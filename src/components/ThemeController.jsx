"use client";
import React, { useEffect } from 'react';
import { themeChange } from 'theme-change';

const ThemeController = () => {
    useEffect(() => {
        themeChange(false)
    }, [])

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                Theme
                <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
                <li><button data-set-theme="light" data-act-class="ACTIVECLASS">Light</button></li>
                <li><button data-set-theme="dark" data-act-class="ACTIVECLASS">Dark</button></li>
                <li><button data-set-theme="cupcake" data-act-class="ACTIVECLASS">Cupcake</button></li>
                <li><button data-set-theme="business" data-act-class="ACTIVECLASS">Business</button></li>
            </ul>
        </div>
    );
};

export default ThemeController;
