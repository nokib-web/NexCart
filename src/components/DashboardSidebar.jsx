'use client';

import { LayoutGrid, Layers, PlusCircle, ShoppingBasket, BarChart3, Users, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const menus = [
    { title: "Overview", icon: <LayoutGrid className="w-5 h-5" />, link: "/dashboard" },
    { title: "Manage Products", icon: <Layers className="w-5 h-5" />, link: "/dashboard/manage-products" },
    { title: "Add Product", icon: <PlusCircle className="w-5 h-5" />, link: "/dashboard/add-products" },
    { title: "Orders", icon: <ShoppingBasket className="w-5 h-5" />, link: "/dashboard" },
    { title: "Analytics", icon: <BarChart3 className="w-5 h-5" />, link: "/dashboard" },
    { title: "Customers", icon: <Users className="w-5 h-5" />, link: "/dashboard" },
    { title: "Settings", icon: <Settings className="w-5 h-5" />, link: "/dashboard" },
  ];

  return (
    <>
      {/* Overlay (only on mobile) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50  md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 
          w-72 bg-white shadow-2xl border-r border-orange-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Logo + Close Button (Mobile) */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-extrabold">
              Nex<span className="text-primary">Cart</span>
            </h1>
            <button
              onClick={onClose}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu */}
          <ul className="space-y-2">
            {menus.map((m, i) => (
              <li key={i}>
                <Link
                  href={m.link}
                  onClick={onClose} // Close sidebar on mobile when clicked
                  className={`
                    flex items-center gap-3 p-4 rounded-xl font-medium transition
                    ${pathname === m.link
                      ? "bg-orange-100 text-primary shadow-md"
                      : "hover:bg-orange-50 text-gray-700"
                    }
                  `}
                >
                  {m.icon}
                  {m.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}