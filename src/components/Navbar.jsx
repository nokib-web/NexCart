'use client'; // This component must be a Client Component to use Clerk hooks

import { ChartNoAxesGantt, CirclePlusIcon, CircleUserRoundIcon, UserRoundPen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useUser, SignedIn, SignedOut, UserButton, SignOutButton } from '@clerk/nextjs'; // Import Clerk components and hook

import Image from 'next/image';
import NavLink from './NavLink';

const Navbar = () => {
    // 1. Use the useUser hook from Clerk
    const { isLoaded, isSignedIn, user } = useUser();

    // Clerk's useUser hook is asynchronous.
    // While it's loading, you might want to show a loading state or nothing.
    if (!isLoaded) {
        return null; // Or a loading spinner
    }

    const link = <>
        <li><NavLink className='font-semibold' href='/' > Home </NavLink></li>
        <li><NavLink className='font-semibold' href='/products' > All Products </NavLink></li>
        <li><NavLink className='font-semibold' href='/about' > About Us </NavLink></li>
        <li><NavLink className='font-semibold' href='/cart' > Cart </NavLink></li>
        <li><NavLink className='font-semibold' href='/faq' > FAQ </NavLink></li>
    </>
    // admin route will be here

    return (
        <div className="navbar sticky top-0 z-50 bg-linear-to-r to-orange-100 shadow-xl">
            <div className="navbar-start">

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {link}
                    </ul>
                </div>
                <Link className='font-bold flex items-center text-2xl' href='/' >
                    <Image
                        src="/logo.png"
                        alt="N-Cart Logo"
                        width={50}
                        height={30}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "contain" }}
                    />
                    NexCart
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {link}
                </ul>
            </div>

            <div className="navbar-end">

                {isSignedIn ? (
                    <div className="dropdown dropdown-end">

                        <div tabIndex={0} role="button" className="m-1">

                            <UserButton />
                        </div>

                        <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><NavLink href='/profile' > <UserRoundPen /> Profile</NavLink></li>
                            <li><NavLink href='/dashboard/add-products' > <CirclePlusIcon /> Add Products</NavLink></li>
                            <li><NavLink href='/dashboard/manage-products' > <ChartNoAxesGantt /> Manage Products</NavLink></li>



                            {/* Conditionally render admin links based  logic */}




                            <SignOutButton>
                                <button className='btn bg-linear-to-r from-orange-500 to-amber-200 btn-sm'>Logout</button>
                            </SignOutButton>
                        </ul>
                    </div>
                ) : (
                    // User is NOT signed in
                    <Link href='/login' >
                        <button className='btn btn-secondary'>Login</button>
                    </Link>
                )}


            </div>
        </div>
    );
};

export default Navbar;