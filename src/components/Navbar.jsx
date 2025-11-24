'use client';

import { useState, useEffect } from "react";
import { ChartNoAxesGantt, CirclePlusIcon, UserRoundPen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import NavLink from './NavLink';
import { useUser, UserButton, SignOutButton } from '@clerk/nextjs';

const Navbar = () => {
    const { isLoaded, isSignedIn } = useUser();

    // Scroll state
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            // Show navbar if:
            // - Scrolling up
            // - Or near the top (< 100px)
            if (currentScrollPos < prevScrollPos || currentScrollPos < 100) {
                setVisible(true);
            } 
            // Hide only when scrolling down AND past 100px
            else if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
                setVisible(false);
            }

            setPrevScrollPos(currentScrollPos);
        };

        // Use requestAnimationFrame for buttery smooth performance
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

    const link = (
        <>
            <li><NavLink className='font-semibold' href='/' > Home </NavLink></li>
            <li><NavLink className='font-semibold' href='/products' > All Products </NavLink></li>
            <li><NavLink className='font-semibold' href='/about' > About Us </NavLink></li>
            <li><NavLink className='font-semibold' href='/cart' > Cart </NavLink></li>
            <li><NavLink className='font-semibold' href='/faq' > FAQ </NavLink></li>
        </>
    );

    return (
        <>
            {/* Your exact navbar with perfect scroll behavior */}
            <div
                className={`
                    navbar fixed top-0 left-0 right-0 z-50 
                    bg-linear-to-r from-orange-50 to-orange-100 shadow-xl
                    transition-transform duration-400 ease-out
                    ${visible ? 'translate-y-0' : '-translate-y-full'}
                    will-change-transform
                `}
                style={{ backdropFilter: visible ? 'blur(10px)' : 'none' }}
            >
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {link}
                        </ul>
                    </div>

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

                            <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><NavLink href='/profile' > <UserRoundPen /> Profile</NavLink></li>
                                <li><NavLink href='/dashboard/add-products' > <CirclePlusIcon /> Add Products</NavLink></li>
                                <li><NavLink href='/dashboard/manage-products' > <ChartNoAxesGantt /> Manage Products</NavLink></li>

                                <SignOutButton>
                                    <button className='btn bg-linear-to-r from-orange-500 to-amber-200 btn-sm w-full mt-2'>Logout</button>
                                </SignOutButton>
                            </ul>
                        </div>
                    ) : (
                        <Link href='/login'>
                            <button className='btn btn-secondary'>Login</button>
                        </Link>
                    )}
                </div>
            </div>

            {/* This prevents content from being hidden under navbar when it's visible */}
            <div className="h-20" />
        </>
    );
};

export default Navbar;