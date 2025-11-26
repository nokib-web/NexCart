'use client';

import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function DashboardHeader({ onMenuToggle, isSidebarOpen }) {
  return (
    <header className="w-full bg-white shadow-md border-b border-orange-200 flex items-center justify-between px-6 py-4 ">
      
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuToggle}
        className="md:hidden p-3 rounded-xl bg-orange-100 hover:bg-orange-200 transition"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>

      <div className="flex items-center">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}