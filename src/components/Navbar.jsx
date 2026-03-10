"use client";

import { useState, useEffect, useRef } from "react";
import { ChartNoAxesGantt, CirclePlusIcon, ShoppingCart, Search, User, Menu, X, ChevronDown, Zap, Gift, Star, ShoppingBag } from 'lucide-react';
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

    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    
    // Mega Menu States
    const [openMega, setOpenMega] = useState(null);
    const [activeKidsTab, setActiveKidsTab] = useState("Boys");
    const navbarRef = useRef(null);

    // Sync Users
    useEffect(() => {
        if (user && isSignedIn) {
            const userData = {
                name: user.fullName || user.firstName,
                email: user.primaryEmailAddress.emailAddress,
                image: user.imageUrl,
            }
            fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userData)
            })
        }
    }, [user, isSignedIn])

    // Scroll Header visibility
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            if (currentScrollPos < prevScrollPos || currentScrollPos < 50) {
                setVisible(true);
            } else if (currentScrollPos > prevScrollPos && currentScrollPos > 50) {
                setVisible(false);
                setOpenMega(null); // close mega menus when scrolling down
            }
            setPrevScrollPos(currentScrollPos);
        };

        const optimizedScroll = () => { requestAnimationFrame(handleScroll); };
        window.addEventListener("scroll", optimizedScroll, { passive: true });
        return () => window.removeEventListener("scroll", optimizedScroll);
    }, [prevScrollPos]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setOpenMega(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isLoaded) return null;
    if (pathname && pathname.startsWith('/dashboard')) return null;

    const toggleMega = (menu) => {
        setOpenMega(openMega === menu ? null : menu);
    };

    return (
        <>
            <div 
            ref={navbarRef}
            className={`
                sticky top-0 left-0 right-0 z-[60] 
                bg-white
                transition-transform duration-400 ease-out border-b shadow-sm
                ${visible ? 'translate-y-0' : '-translate-y-full'}
            `}
        >
            {/* TOP CONTACT BAR  */}
            <div className="bg-gray-50 border-b py-1.5 px-4 md:px-8 text-xs font-semibold text-gray-500 flex justify-between items-center hidden md:flex w-full">
                <div className="flex gap-4">
                    <span className="hover:text-primary cursor-pointer transition">English</span>
                    <span className="flex items-center gap-1 hover:text-primary cursor-pointer transition">✉ support@nexcart.global</span>
                    <span className="flex items-center gap-1 hover:text-primary cursor-pointer transition">✆ Contact</span>
                </div>
                <div className="flex gap-4">
                    <Link href="/company/about" className="hover:text-primary transition">Inside Story</Link>
                    <Link href="/company/faq" className="hover:text-primary transition">FAQ</Link>
                    {isSignedIn && <Link href="/dashboard" className="hover:text-primary transition">Dashboard</Link>}
                </div>
            </div>

            {/* MAIN NAVBAR */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    
                    {/* LEFT: LOGO */}
                    <div className="flex-shrink-0 flex items-center lg:w-1/5">
                        <button className="btn btn-ghost lg:hidden mr-2 p-0 px-2" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <Link className='font-bold flex items-center text-2xl tracking-tighter' href='/'>
                            <Image src="/logo.svg" alt="N-Cart Logo" width={40} height={40} style={{ objectFit: "contain" }} className="mr-2" />
                            Nex<span className="text-primary">Cart</span>
                        </Link>
                    </div>

                    {/* CENTER: DESKTOP NAV LINKS */}
                    <div className="hidden lg:flex items-center justify-center flex-1 lg:w-3/5">
                        <ul className="flex items-center gap-8 font-semibold text-sm uppercase tracking-wide text-gray-900">
                            <li>
                                <button onClick={() => toggleMega('categories')} className={`flex items-center gap-1 hover:text-primary transition-colors focus:outline-none ${openMega === "categories" ? "text-primary border-b-2 border-primary pb-1 -mb-1" : "pb-1 -mb-1 border-b-2 border-transparent"}`}>
                                    Categories <ChevronDown size={14} className={`transform transition-transform ${openMega === "categories" ? "rotate-180" : ""}`} />
                                </button>
                            </li>
                            <li><NavLink href='/products?category=Men' className="hover:text-primary transition-colors pb-1 -mb-1 border-b-2 border-transparent hover:border-primary">Men</NavLink></li>
                            <li><NavLink href='/products?category=Women' className="hover:text-primary transition-colors pb-1 -mb-1 border-b-2 border-transparent hover:border-primary">Women</NavLink></li>
                            <li>
                                <button onClick={() => toggleMega('kids')} className={`flex items-center gap-1 hover:text-primary transition-colors focus:outline-none ${openMega === "kids" ? "text-primary border-b-2 border-primary pb-1 -mb-1" : "pb-1 -mb-1 border-b-2 border-transparent"}`}>
                                    Kids <ChevronDown size={14} className={`transform transition-transform ${openMega === "kids" ? "rotate-180" : ""}`} />
                                </button>
                            </li>
                            <li>
                                <button onClick={() => toggleMega('collections')} className={`flex items-center gap-1 hover:text-primary transition-colors focus:outline-none ${openMega === "collections" ? "text-primary border-b-2 border-primary pb-1 -mb-1" : "pb-1 -mb-1 border-b-2 border-transparent"}`}>
                                    Collections <ChevronDown size={14} className={`transform transition-transform ${openMega === "collections" ? "rotate-180" : ""}`} />
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* RIGHT: ICONS */}
                    <div className="flex items-center justify-end gap-3 sm:gap-6 lg:w-1/5">
                        <button className="text-gray-800 hover:text-primary transition">
                            <Search size={20} />
                        </button>

                        {isSignedIn ? (
                            <button onClick={() => setIsProfileMenuOpen(true)} className="text-gray-800 hover:text-primary transition focus:outline-none">
                                <User size={20} />
                            </button>
                        ) : (
                            <Link href='/login' className="text-gray-800 hover:text-primary transition font-semibold text-sm uppercase">
                                Login
                            </Link>
                        )}
                        
                        <Link href="/cart" className="text-gray-800 hover:text-primary transition relative">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                </div>
            </div>

            {/* --- MEGA MENUS DROP DOWN AREA --- */}
            <div className={`absolute top-full left-0 w-full bg-white border-b shadow-2xl transition-all duration-300 origin-top overflow-hidden z-[50] ${openMega ? "opacity-100 scale-y-100 max-h-[800px] py-8" : "opacity-0 scale-y-0 max-h-0 py-0"}`}>
                
                {/* CATEGORIES MEGA MENU */}
                {openMega === "categories" && (
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 animate-in fade-in duration-500">
                    <Link href="/products?category=Hoodies" onClick={() => setOpenMega(null)} className="group border p-6 rounded-xl hover:shadow-xl transition-all text-center bg-gray-50 border-transparent hover:border-primary">
                      <div className="h-32 bg-white rounded-lg mb-4 flex items-center justify-center text-gray-300 group-hover:text-primary group-hover:bg-orange-50 transition-colors">
                        <Zap size={48} />
                      </div>
                      <h3 className="font-bold text-lg group-hover:text-primary">Hoodies</h3>
                    </Link>
                    <Link href="/products?category=Jackets" onClick={() => setOpenMega(null)} className="group border p-6 rounded-xl hover:shadow-xl transition-all text-center bg-gray-50 border-transparent hover:border-primary">
                      <div className="h-32 bg-white rounded-lg mb-4 flex items-center justify-center text-gray-300 group-hover:text-primary group-hover:bg-orange-50 transition-colors">
                        <Star size={48} />
                      </div>
                      <h3 className="font-bold text-lg group-hover:text-primary">Jackets</h3>
                    </Link>
                    <Link href="/products?category=Sweaters" onClick={() => setOpenMega(null)} className="group border p-6 rounded-xl hover:shadow-xl transition-all text-center bg-gray-50 border-transparent hover:border-primary">
                      <div className="h-32 bg-white rounded-lg mb-4 flex items-center justify-center text-gray-300 group-hover:text-primary group-hover:bg-orange-50 transition-colors">
                        <Gift size={48} />
                      </div>
                      <h3 className="font-bold text-lg group-hover:text-primary">Sweaters</h3>
                    </Link>
                    <Link href="/products?category=Accessories" onClick={() => setOpenMega(null)} className="group border p-6 rounded-xl hover:shadow-xl transition-all text-center bg-gray-50 border-transparent hover:border-primary">
                      <div className="h-32 bg-white rounded-lg mb-4 flex items-center justify-center text-gray-300 group-hover:text-primary group-hover:bg-orange-50 transition-colors">
                        <ShoppingBag size={48} />
                      </div>
                      <h3 className="font-bold text-lg group-hover:text-primary">Accessories</h3>
                    </Link>
                </div>
                )}

                {/* KIDS MEGA MENU */}
                {openMega === "kids" && (
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row animate-in fade-in duration-500">
                    <div className="md:w-1/4 md:border-r border-gray-200 md:pr-8 pr-0 flex flex-col gap-5 text-base text-gray-600 font-medium mb-8 md:mb-0">
                        <button onClick={() => setActiveKidsTab("Boys")} className={`text-left hover:text-primary transition-colors ${activeKidsTab === "Boys" ? "font-bold text-black border-b-2 border-primary w-max pb-1" : ""}`}>Boys</button>
                        <button onClick={() => setActiveKidsTab("Girls")} className={`text-left hover:text-primary transition-colors ${activeKidsTab === "Girls" ? "font-bold text-black border-b-2 border-primary w-max pb-1" : ""}`}>Girls</button>
                        <button onClick={() => setActiveKidsTab("Father and Son")} className={`text-left hover:text-primary transition-colors ${activeKidsTab === "Father and Son" ? "font-bold text-black border-b-2 border-primary w-max pb-1" : ""}`}>Father and Son</button>
                    </div>
                    <div className="md:w-3/4 md:pl-12 pl-0 flex flex-col lg:flex-row gap-10">
                        <div className="lg:w-1/3 flex flex-col gap-4 border-r border-gray-100 pr-4">
                            <h3 className="text-2xl font-bold mb-4 text-black">{activeKidsTab}</h3>
                            <Link href={`/products?category=${activeKidsTab}`} onClick={() => setOpenMega(null)} className="text-gray-600 hover:text-primary transition-colors text-sm font-semibold uppercase">All Items</Link>
                            <Link href={`/products?category=${activeKidsTab}&type=Panjabi`} onClick={() => setOpenMega(null)} className="text-gray-600 hover:text-primary transition-colors text-sm font-semibold uppercase">Panjabi</Link>
                            <Link href={`/products?category=${activeKidsTab}&type=Thobe`} onClick={() => setOpenMega(null)} className="text-gray-600 hover:text-primary transition-colors text-sm font-semibold uppercase">Thobe</Link>
                            <Link href={`/products?category=${activeKidsTab}&type=Shirts`} onClick={() => setOpenMega(null)} className="text-gray-600 hover:text-primary transition-colors text-sm font-semibold uppercase">Shirts</Link>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-6">
                            <div className="group block relative h-48 md:h-64 bg-gradient-to-b from-gray-100 to-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all flex items-center justify-center">
                                <span className="text-xl font-bold text-gray-800">New Arrivals</span>
                            </div>
                            <div className="group block relative h-48 md:h-64 bg-gradient-to-b from-orange-50 to-orange-100 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all flex items-center justify-center">
                                <span className="text-xl font-bold text-orange-800">Best Sellers</span>
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {/* COLLECTIONS MEGA MENU */}
                {openMega === "collections" && (
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 animate-in fade-in duration-500">
                    <Link onClick={() => setOpenMega(null)} href="/products" className="group rounded-xl p-8 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all flex flex-col items-center justify-center text-center">
                        <div className="bg-white p-4 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform"><Zap size={32} className="text-orange-500" /></div>
                        <h4 className="font-bold text-xl group-hover:text-orange-600">Summer Vibes</h4>
                    </Link>
                    <Link onClick={() => setOpenMega(null)} href="/products" className="group rounded-xl p-8 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all flex flex-col items-center justify-center text-center">
                        <div className="bg-white p-4 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform"><Gift size={32} className="text-blue-500" /></div>
                        <h4 className="font-bold text-xl group-hover:text-blue-600">Winter Classics</h4>
                    </Link>
                    <Link onClick={() => setOpenMega(null)} href="/products" className="group rounded-xl p-8 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all flex flex-col items-center justify-center text-center">
                        <div className="bg-white p-4 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform"><Star size={32} className="text-purple-500" /></div>
                        <h4 className="font-bold text-xl group-hover:text-purple-600">Street Wear</h4>
                    </Link>
                    <Link onClick={() => setOpenMega(null)} href="/products" className="group rounded-xl p-8 bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-xl transition-all flex flex-col items-center justify-center text-center">
                        <div className="bg-white p-4 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform"><ShoppingBag size={32} className="text-amber-500" /></div>
                        <h4 className="font-bold text-xl group-hover:text-amber-600">Premium Elite</h4>
                    </Link>
                </div>
                )}
            </div>
        </div>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[65] bg-black/50 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}
            <div className={`fixed top-0 left-0 z-[70] h-full w-80 bg-white shadow-2xl transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out overflow-y-auto`}>
                <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 btn btn-ghost btn-circle"><X size={24} /></button>
                <ul className="menu text-base-content min-h-full w-80 p-4 space-y-4 pt-16 uppercase font-bold text-sm tracking-widest">
                    <li><NavLink href='/' onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink></li>
                    <li><NavLink href='/products?category=Men' onClick={() => setIsMobileMenuOpen(false)}>Men</NavLink></li>
                    <li><NavLink href='/products?category=Women' onClick={() => setIsMobileMenuOpen(false)}>Women</NavLink></li>
                    <li><NavLink href='/products' onClick={() => setIsMobileMenuOpen(false)}>Kids Collection</NavLink></li>
                    <li><NavLink href='/products' onClick={() => setIsMobileMenuOpen(false)}>All Categories</NavLink></li>
                    {isSignedIn && role === 'customer' ? <li><NavLink href='/cart' onClick={() => setIsMobileMenuOpen(false)}>Cart ({cartCount})</NavLink></li> : null}
                </ul>
            </div>

            {/* Profile Sidebar */}
            {isProfileMenuOpen && (
                <div className="fixed inset-0 z-[65] bg-black/50 transition-opacity" onClick={() => setIsProfileMenuOpen(false)}></div>
            )}
            <div className={`fixed top-0 right-0 z-[70] h-full w-80 bg-white shadow-2xl transform ${isProfileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out overflow-y-auto`}>
                <button onClick={() => setIsProfileMenuOpen(false)} className="absolute top-4 right-4 btn btn-ghost btn-circle"><X size={24} /></button>
                <ul className="menu text-base-content min-h-full w-80 p-4 space-y-4 pt-16">
                        <div className="flex flex-col items-center mb-6">
                            <div className="avatar w-20 h-20 mb-2">
                                <Image src={user?.imageUrl || '/placeholder.jpg'} alt="Profile" width={80} height={80} className="rounded-full border-2 border-primary" />
                            </div>
                            <h2 className="text-xl font-bold">{user?.fullName}</h2>
                            <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
                        </div>
                        {role === 'seller' || role === 'admin' ? <>
                            <li><NavLink href='/dashboard/add-products' onClick={() => setIsProfileMenuOpen(false)}><CirclePlusIcon /> Add Products</NavLink></li>
                            <li><NavLink href='/dashboard/manage-products' onClick={() => setIsProfileMenuOpen(false)}><ChartNoAxesGantt /> Manage Products</NavLink></li>
                        </> : null}
                        <div className="mt-8">
                            <SignOutButton>
                                <button className='btn bg-linear-to-r from-orange-500 to-amber-400 w-full'>Logout</button>
                            </SignOutButton>
                        </div>
                    </ul>
                </div>
        </>
    );
};

export default Navbar;