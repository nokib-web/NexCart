import Link from 'next/link';
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
                    
                    {/* Brand & About */}
                    <div className="flex flex-col gap-6">
                        <Link className='font-bold flex items-center text-3xl text-white tracking-tighter' href='/'>
                            <Image src="/logo.svg" alt="N-Cart Logo" width={40} height={40} style={{ objectFit: "contain" }} className="mr-2 brightness-0 invert" />
                            Nex<span className="text-primary">Cart</span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Experience the pinnacle of comfort and style. We craft premium apparel for men, women, and kids, focusing on high-quality fabrics and modern designs.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-white font-bold text-lg uppercase tracking-wider">Inside NexCart</h3>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/company/about" className="hover:text-primary transition-colors flex items-center gap-2 text-sm"><ArrowRight size={14}/> About Us</Link></li>
                            <li><Link href="/company/contact" className="hover:text-primary transition-colors flex items-center gap-2 text-sm"><ArrowRight size={14}/> Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors flex items-center gap-2 text-sm"><ArrowRight size={14}/> Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors flex items-center gap-2 text-sm"><ArrowRight size={14}/> Store Locations</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-white font-bold text-lg uppercase tracking-wider">Help & Support</h3>
                        <ul className="flex flex-col gap-3">
                            <li><Link href="/company/faq" className="hover:text-primary transition-colors flex items-center gap-2 text-sm"><ArrowRight size={14}/> FAQ</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors flex items-center gap-2 text-sm"><ArrowRight size={14}/> Shipping & Delivery</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors flex items-center gap-2 text-sm"><ArrowRight size={14}/> Returns & Exchanges</Link></li>
                            <li><Link href="/company/terms&condition" className="hover:text-primary transition-colors flex items-center gap-2 text-sm"><ArrowRight size={14}/> Terms & Conditions</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors flex items-center gap-2 text-sm"><ArrowRight size={14}/> Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-white font-bold text-lg uppercase tracking-wider">Contact Info</h3>
                        <ul className="flex flex-col gap-4 text-sm mt-2">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                                <span>123 Style Avenue, Fashion District<br/>Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone size={18} className="text-primary shrink-0" />
                                <span>+880 1234 567890</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail size={18} className="text-primary shrink-0" />
                                <span>support@nexcart.global</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>Copyright © {new Date().getFullYear()} - All rights reserved by NexCart Shopping Ltd.</p>
                    <div className="flex gap-6">
                        <Link href="/company/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/company/terms&condition" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;