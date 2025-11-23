
import { ChartNoAxesGantt, CirclePlusIcon, CircleUserRoundIcon, UserRoundPen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {

    const user = true;

    const link = <>
        <li><Link href='/' > Home </Link></li>
        <li><Link href='/products' > All Products </Link></li>
        <li><Link href='/about' > About Us </Link></li>
        <li><Link href='/cart' > Cart </Link></li>
        <li><Link href='/faq' > FAQ </Link></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
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
                <Link className='font-bold text-2xl' href='/' >NexCart</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {link}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        (<div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className=" m-1"><CircleUserRoundIcon/></div>
                            <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><Link href='/profile' >   <UserRoundPen /> Profile</Link></li>
                                <li><Link href='/dashboard/add-products' >     <CirclePlusIcon /> Add Products</Link></li>
                                <li><Link href='/dashboard/manage-products' >   <ChartNoAxesGantt /> Manage Products</Link></li>
                                <button className='btn btn-primary btn-sm' >Logout</button>
                              
                                
                            </ul>
                        </div>)
                        :
                        (<Link href='/login' > <button className='btn btn-secondary'>Login</button> </Link>)
                }
            </div>
        </div>
    );
};

export default Navbar;