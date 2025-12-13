'use client';

import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function DashboardHeader({ onMenuToggle, isSidebarOpen }) {
  return (
    <header className="w-full bg-white shadow-md border-b border-orange-200 flex items-center justify-between px-4 sm:px-6 py-4 sticky top-0 z-30">

      {/* Mobile Menu Button - Visible only on mobile */}
      <button
        onClick={onMenuToggle}
        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-orange-50 transition focus:outline-none"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <h2 className="text-xl font-bold text-gray-900 ml-2 md:ml-0">Dashboard</h2>

      <div className="flex items-center gap-4">
        {/* Potentially add notifications or other header items here */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}