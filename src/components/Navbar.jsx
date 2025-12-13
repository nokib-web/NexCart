'use client';

import { useState, useEffect } from "react";
import { ChartNoAxesGantt, CirclePlusIcon, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import NavLink from './NavLink';
import { useUser, SignOutButton } from '@clerk/nextjs';
import useRole from "@/hooks/useRole";
import { API_URL } from "@/config";
import { useCart } from "@/context/CartContext";

import { usePathname } from 'next/navigation';

const Navbar = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const { role } = useRole();
    const pathname = usePathname();
    const { cartCount } = useCart();

    // Scroll state
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    // Sidebar States
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    useEffect(() => {
        if (user && isSignedIn) {
            const userData = {
                name: user.fullName || user.firstName,
                email: user.primaryEmailAddress.emailAddress,
                image: user.imageUrl,
            }
            fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
        }
    }, [user, isSignedIn])

    useEffect(() => {
        const handleScroll = () => {
            // Close menus on scroll if needed, or leave them open. 
            // Normally sidebars close on route change or overlay click.
            const currentScrollPos = window.scrollY;
            if (currentScrollPos < prevScrollPos || currentScrollPos < 100) {
                setVisible(true);
            }
            else if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
                setVisible(false);
            }
            setPrevScrollPos(currentScrollPos);
        };

        let ticking = false;
        const optimizedScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", optimizedScroll, { passive: true });
        return () => window.removeEventListener("scroll", optimizedScroll);
    }, [prevScrollPos]);

    if (!isLoaded) return null;

    // Hide navbar on dashboard pages
    if (pathname && pathname.startsWith('/dashboard')) return null;

    const navLinks = (
        <ul className="menu text-base-content min-h-full w-80 p-4 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <li><NavLink className='font-semibold text-lg' href='/' onClick={() => setIsMobileMenuOpen(false)}> Home </NavLink></li>
            <li><NavLink className='font-semibold text-lg' href='/products' onClick={() => setIsMobileMenuOpen(false)}> All Products </NavLink></li>
            {
                isSignedIn && role === 'customer' ? <li><NavLink className='font-semibold text-lg' href='/cart' onClick={() => setIsMobileMenuOpen(false)}> Cart ({cartCount}) </NavLink></li> : ""
            }
            <li><NavLink className='font-semibold text-lg' href='/company/about' onClick={() => setIsMobileMenuOpen(false)}> About Us </NavLink></li>
            <li><NavLink className='font-semibold text-lg' href='/company/faq' onClick={() => setIsMobileMenuOpen(false)}> FAQ </NavLink></li>

            {
                isSignedIn ?
                    <li><NavLink className='font-semibold text-lg' href='/dashboard' onClick={() => setIsMobileMenuOpen(false)}> Dashboard </NavLink></li> :
                    <li><NavLink className='font-semibold text-lg' href='/register' onClick={() => setIsMobileMenuOpen(false)}> Register </NavLink></li>
            }
        </ul>
    );

    const profileLinks = (
        <ul className="menu text-base-content min-h-full w-80 p-4 space-y-4">
            <div className="flex flex-col items-center mb-6">
                <div className="avatar w-20 h-20 mb-2">
                    <Image src={user?.imageUrl || '/placeholder.jpg'} alt="Profile" width={80} height={80} className="rounded-full border-2 border-primary" />
                </div>
                <h2 className="text-xl font-bold">{user?.fullName}</h2>
                <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>

            {/* Profile Link Removed as per request */}

            {
                role === 'seller' || role === 'admin' ? <>
                    <li><NavLink href='/dashboard/add-products' onClick={() => setIsProfileMenuOpen(false)}> <CirclePlusIcon /> Add Products</NavLink></li>
                    <li><NavLink href='/dashboard/manage-products' onClick={() => setIsProfileMenuOpen(false)}> <ChartNoAxesGantt /> Manage Products</NavLink></li>
                </> : ''
            }

            <div className="mt-auto">
                <SignOutButton>
                    <button className='btn bg-linear-to-r from-orange-500 to-amber-200 w-full mt-2'>Logout</button>
                </SignOutButton>
            </div>
        </ul>
    );

    return (
        <>
            {/* Navbar Wrapper - Fixed & Full Width for Background */}
            <div
                className={`
                    fixed top-0 left-0 right-0 z-50 
                    bg-linear-to-r from-orange-100 to-amber-100 shadow-xl
                    transition-transform duration-400 ease-out
                    ${visible ? 'translate-x-0' : '-translate-y-full'}
                    will-change-transform
                `}
                style={{ backdropFilter: visible ? 'blur(10px)' : 'none' }}
            >
                {/* Inner Container - Aligned to max-w-7xl */}
                <div className="navbar max-w-7xl mx-auto">
                    <div className="navbar-start">
                        {/* Mobile Menu Button - Opens Left Sidebar */}
                        <button
                            className="btn btn-ghost lg:hidden"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </button>

                        <Link className='font-bold flex items-center text-2xl' href='/' >
                            <Image
                                src="/logo.svg"
                                alt="N-Cart Logo"
                                width={50}
                                height={30}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: "contain" }}
                            />
                            Nex<span className="text-primary">Cart</span>
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        {/* Desktop Links - Horizontal */}
                        <ul className="menu menu-horizontal px-1 font-semibold">
                            <li><NavLink href='/'> Home </NavLink></li>
                            <li><NavLink href='/products'> All Products </NavLink></li>
                            <li><NavLink href='/company/about'> About Us </NavLink></li>
                            <li><NavLink href='/company/faq'> FAQ </NavLink></li>
                            {
                                isSignedIn ?
                                    <li><NavLink href='/dashboard'> Dashboard </NavLink></li> :
                                    <li><NavLink href='/register'> Register </NavLink></li>
                            }
                        </ul>
                    </div>

                    <div className="navbar-end">
                        {/* Cart Icon */}
                        {isSignedIn && role === 'customer' && (
                            <Link href="/cart" className="btn btn-ghost btn-circle mr-2 relative">
                                <ShoppingCart className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/4 -translate-y-1/4">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}


                        {isSignedIn ? (
                            // Avatar Button - Opens Right Sidebar (Profile)
                            <button onClick={() => setIsProfileMenuOpen(true)} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full border border-orange-300">
                                    <img src={user?.imageUrl} alt="Profile" />
                                </div>
                            </button>
                        ) : (
                            <Link href='/login'>
                                <button className='btn bg-linear-to-r from-orange-500 to-amber-400 border-0 rounded-lg'>Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* This prevents content from being hidden under navbar when it's visible */}
            <div className="h-20" />

            {/* Mobile Menu Sidebar (Left) */}
            <div className={`fixed inset-0 z-[60] transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className="relative w-80 h-full bg-base-100 shadow-xl overflow-y-auto">
                    <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 btn btn-ghost btn-circle"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                    {navLinks}
                </div>
            </div>

            {/* Profile Sidebar (Right) */}
            <div className={`fixed inset-0 z-[60] transform ${isProfileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:right-0`}>
                {/* Backdrop */}
                {isProfileMenuOpen && <div className="absolute inset-0 bg-black/50" onClick={() => setIsProfileMenuOpen(false)}></div>}

                {/* Sidebar Content - align right */}
                <div className={`absolute right-0 top-0 w-80 h-full bg-base-100 shadow-xl overflow-y-auto transform ${isProfileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
                    <button onClick={() => setIsProfileMenuOpen(false)} className="absolute top-4 right-4 btn btn-ghost btn-circle"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                    {profileLinks}
                </div>
            </div>
        </>
    );
};

export default Navbar;