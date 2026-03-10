"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Zap, Gift, Star, ShoppingBag, ChevronDown } from "lucide-react";

export default function SubNav() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeTab, setActiveTab] = useState("Boys");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div className="bg-white border-b shadow-sm w-full relative z-[55]" ref={dropdownRef}>
      {/* Top Level Nav Items */}
      <div className="max-w-7xl mx-auto px-4 relative">
        <ul className="flex items-center justify-center md:gap-10 gap-6 py-4 text-sm font-bold text-gray-800 uppercase tracking-wider overflow-x-auto scrollbar-hide">
          
          {/* Categories */}
          <li>
            <button 
              onClick={() => toggleDropdown("categories")}
              className={`flex items-center gap-1 hover:text-primary transition-colors focus:outline-none ${openDropdown === "categories" ? "text-primary" : ""}`}
            >
              Categories <ChevronDown size={14} className={`transform transition-transform ${openDropdown === "categories" ? "rotate-180" : ""}`} />
            </button>
          </li>

          {/* Regular Links */}
          <li><Link href="/products?category=Men" className="hover:text-primary transition-colors block">Men</Link></li>
          <li><Link href="/products?category=Women" className="hover:text-primary transition-colors block">Women</Link></li>

          {/* Kids (Mega Menu) */}
          <li>
            <button 
              onClick={() => toggleDropdown("kids")}
              className={`flex items-center gap-1 hover:text-primary transition-colors focus:outline-none ${openDropdown === "kids" ? "text-primary" : ""}`}
            >
              Kids <ChevronDown size={14} className={`transform transition-transform ${openDropdown === "kids" ? "rotate-180" : ""}`} />
            </button>
          </li>
          
          {/* Collections */}
          <li>
            <button 
              onClick={() => toggleDropdown("collections")}
              className={`flex items-center gap-1 hover:text-primary transition-colors focus:outline-none ${openDropdown === "collections" ? "text-primary" : ""}`}
            >
              Collections <ChevronDown size={14} className={`transform transition-transform ${openDropdown === "collections" ? "rotate-180" : ""}`} />
            </button>
          </li>
        </ul>
      </div>

      {/* --- MEGA MENUS CONTAINERS --- */}
      <div className={`absolute top-full left-0 w-full bg-white border-b shadow-2xl transition-all duration-300 origin-top overflow-hidden ${openDropdown ? "opacity-100 scale-y-100 max-h-[800px] py-8" : "opacity-0 scale-y-0 max-h-0 py-0"}`}>
        
        {/* KIDS MEGA MENU */}
        {openDropdown === "kids" && (
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row animate-in fade-in duration-500">
            {/* Left Sidebar */}
            <div className="md:w-1/4 md:border-r border-gray-200 md:pr-8 pr-0 flex flex-col gap-5 text-base text-gray-600 font-medium mb-8 md:mb-0">
              <button onClick={() => setActiveTab("Boys")} className={`text-left hover:text-primary transition-colors ${activeTab === "Boys" ? "font-bold text-black border-b-2 border-primary w-max pb-1" : ""}`}>Boys</button>
              <button onClick={() => setActiveTab("Girls")} className={`text-left hover:text-primary transition-colors ${activeTab === "Girls" ? "font-bold text-black border-b-2 border-primary w-max pb-1" : ""}`}>Girls</button>
              <button onClick={() => setActiveTab("Father and Son")} className={`text-left hover:text-primary transition-colors ${activeTab === "Father and Son" ? "font-bold text-black border-b-2 border-primary w-max pb-1" : ""}`}>Father and Son Collection</button>
              <button onClick={() => setActiveTab("Mother And Daughter")} className={`text-left hover:text-primary transition-colors ${activeTab === "Mother And Daughter" ? "font-bold text-black border-b-2 border-primary w-max pb-1" : ""}`}>Mother And Daughter Collection</button>
            </div>

            {/* Right Content */}
            <div className="md:w-3/4 md:pl-12 pl-0 flex flex-col lg:flex-row gap-10">
              {/* Links List */}
              <div className="lg:w-1/3 flex flex-col gap-4 border-r border-gray-100 pr-4">
                <h3 className="text-2xl font-bold mb-4 text-black">{activeTab}</h3>
                <Link href={`/products?category=${activeTab}`} onClick={() => setOpenDropdown(null)} className="text-gray-600 hover:text-primary transition-colors text-sm font-semibold uppercase">All</Link>
                <Link href={`/products?category=${activeTab}&type=Panjabi`} onClick={() => setOpenDropdown(null)} className="text-gray-600 hover:text-primary transition-colors text-sm font-semibold uppercase">Panjabi</Link>
                <Link href={`/products?category=${activeTab}&type=Thobe`} onClick={() => setOpenDropdown(null)} className="text-gray-600 hover:text-primary transition-colors text-sm font-semibold uppercase">Thobe</Link>
                <Link href={`/products?category=${activeTab}&type=Waistcoats`} onClick={() => setOpenDropdown(null)} className="text-gray-600 hover:text-primary transition-colors text-sm font-semibold uppercase">Waistcoats</Link>
                <Link href={`/products?category=${activeTab}&type=Shirts`} onClick={() => setOpenDropdown(null)} className="text-gray-600 hover:text-primary transition-colors text-sm font-semibold uppercase">Shirts</Link>
                <Link href={`/products?category=${activeTab}&type=T-shirts`} onClick={() => setOpenDropdown(null)} className="text-gray-600 hover:text-primary transition-colors text-sm font-semibold uppercase">T-shirts And Polos</Link>
              </div>

              {/* Promo Images */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/products" onClick={() => setOpenDropdown(null)} className="group block relative h-64 md:h-72 bg-gradient-to-b from-gray-100 to-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all">
                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition-all flex items-end justify-center p-6">
                    <span className="text-xl font-bold transform translate-y-2 group-hover:-translate-y-2 text-white drop-shadow-md transition-transform duration-300">Panjabi</span>
                  </div>
                </Link>
                <Link href="/products" onClick={() => setOpenDropdown(null)} className="group block relative h-64 md:h-72 bg-gradient-to-b from-orange-50 to-orange-100 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all">
                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition-all flex items-end justify-center p-6">
                    <span className="text-xl font-bold transform translate-y-2 group-hover:-translate-y-2 text-white drop-shadow-md transition-transform duration-300">Thobe</span>
                  </div>
                </Link>
                <Link href="/products" onClick={() => setOpenDropdown(null)} className="group block relative h-64 md:h-72 bg-gradient-to-b from-blue-50 to-blue-100 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all hidden md:block">
                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition-all flex items-end justify-center p-6">
                    <span className="text-xl font-bold transform translate-y-2 group-hover:-translate-y-2 text-white drop-shadow-md transition-transform duration-300">Waistcoats</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* CATEGORIES MEGA MENU */}
        {openDropdown === "categories" && (
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 animate-in fade-in duration-500">
            <Link href="/products?category=Hoodies" onClick={() => setOpenDropdown(null)} className="group border p-6 rounded-xl hover:shadow-xl transition-all text-center bg-gray-50 border-transparent hover:border-primary">
              <div className="h-32 bg-white rounded-lg mb-4 flex items-center justify-center text-gray-300 group-hover:text-primary group-hover:bg-orange-50 transition-colors">
                <Zap size={48} />
              </div>
              <h3 className="font-bold text-lg group-hover:text-primary">Hoodies</h3>
            </Link>
            <Link href="/products?category=Jackets" onClick={() => setOpenDropdown(null)} className="group border p-6 rounded-xl hover:shadow-xl transition-all text-center bg-gray-50 border-transparent hover:border-primary">
              <div className="h-32 bg-white rounded-lg mb-4 flex items-center justify-center text-gray-300 group-hover:text-primary group-hover:bg-orange-50 transition-colors">
                <Star size={48} />
              </div>
              <h3 className="font-bold text-lg group-hover:text-primary">Jackets</h3>
            </Link>
            <Link href="/products?category=Sweaters" onClick={() => setOpenDropdown(null)} className="group border p-6 rounded-xl hover:shadow-xl transition-all text-center bg-gray-50 border-transparent hover:border-primary">
              <div className="h-32 bg-white rounded-lg mb-4 flex items-center justify-center text-gray-300 group-hover:text-primary group-hover:bg-orange-50 transition-colors">
                <Gift size={48} />
              </div>
              <h3 className="font-bold text-lg group-hover:text-primary">Sweaters</h3>
            </Link>
            <Link href="/products?category=Accessories" onClick={() => setOpenDropdown(null)} className="group border p-6 rounded-xl hover:shadow-xl transition-all text-center bg-gray-50 border-transparent hover:border-primary">
              <div className="h-32 bg-white rounded-lg mb-4 flex items-center justify-center text-gray-300 group-hover:text-primary group-hover:bg-orange-50 transition-colors">
                <ShoppingBag size={48} />
              </div>
              <h3 className="font-bold text-lg group-hover:text-primary">Accessories</h3>
            </Link>
          </div>
        )}

        {/* COLLECTIONS MEGA MENU */}
        {openDropdown === "collections" && (
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 animate-in fade-in duration-500">
             <Link onClick={() => setOpenDropdown(null)} href="/products" className="group rounded-xl p-6 lg:p-10 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all flex flex-col items-center justify-center text-center">
                <div className="bg-white p-4 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform"><Zap size={32} className="text-orange-500" /></div>
                <h4 className="font-bold text-xl group-hover:text-orange-600">Summer Vibes</h4>
                <p className="text-sm text-gray-600 mt-2">Light & breathable materials</p>
              </Link>
              <Link onClick={() => setOpenDropdown(null)} href="/products" className="group rounded-xl p-6 lg:p-10 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all flex flex-col items-center justify-center text-center">
                <div className="bg-white p-4 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform"><Gift size={32} className="text-blue-500" /></div>
                <h4 className="font-bold text-xl group-hover:text-blue-600">Winter Classics</h4>
                <p className="text-sm text-gray-600 mt-2">Stay warm and stylish</p>
              </Link>
              <Link onClick={() => setOpenDropdown(null)} href="/products" className="group rounded-xl p-6 lg:p-10 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all flex flex-col items-center justify-center text-center">
                <div className="bg-white p-4 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform"><Star size={32} className="text-purple-500" /></div>
                <h4 className="font-bold text-xl group-hover:text-purple-600">Street Wear</h4>
                <p className="text-sm text-gray-600 mt-2">Urban and edgy designs</p>
              </Link>
              <Link onClick={() => setOpenDropdown(null)} href="/products" className="group rounded-xl p-6 lg:p-10 bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-xl transition-all flex flex-col items-center justify-center text-center">
                <div className="bg-white p-4 rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform"><ShoppingBag size={32} className="text-amber-500" /></div>
                <h4 className="font-bold text-xl group-hover:text-amber-600">Premium Elite</h4>
                <p className="text-sm text-gray-600 mt-2">The highest quality fabrics</p>
              </Link>
          </div>
        )}

      </div>
    </div>
  );
}
