'use client';

import { LayoutGrid, Layers, PlusCircle, ShoppingBasket, BarChart3, Users, Settings, X, ShoppingBag, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useRole from "@/hooks/useRole";

export default function DashboardSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { role } = useRole();

  const adminMenus = [
    { title: "Overview", icon: <LayoutGrid className="w-5 h-5" />, link: "/dashboard/admin" },
    { title: "Manage Users", icon: <Users className="w-5 h-5" />, link: "/dashboard/admin/users" },
    { title: "Manage Products", icon: <Layers className="w-5 h-5" />, link: "/dashboard/admin/products" },
    { title: "Manage Orders", icon: <ShoppingBasket className="w-5 h-5" />, link: "/dashboard/admin/orders" },
    { title: "Analytics", icon: <BarChart3 className="w-5 h-5" />, link: "/dashboard/admin/analytics" },
    { title: "Settings", icon: <Settings className="w-5 h-5" />, link: "/dashboard/settings" },
  ];

  const sellerMenus = [
    { title: "Overview", icon: <LayoutGrid className="w-5 h-5" />, link: "/dashboard/seller" },
    { title: "Add Product", icon: <PlusCircle className="w-5 h-5" />, link: "/dashboard/add-products" },
    { title: "My Products", icon: <Layers className="w-5 h-5" />, link: "/dashboard/manage-products" },
    { title: "Orders", icon: <ShoppingBasket className="w-5 h-5" />, link: "/dashboard/seller/orders" },
    { title: "Settings", icon: <Settings className="w-5 h-5" />, link: "/dashboard/settings" },
  ];

  const customerMenus = [
    { title: "Overview", icon: <LayoutGrid className="w-5 h-5" />, link: "/dashboard" },
    { title: "My Orders", icon: <ShoppingBag className="w-5 h-5" />, link: "/dashboard/base/orders" },
    { title: "Settings", icon: <Settings className="w-5 h-5" />, link: "/dashboard/settings" },
  ];

  let menus = [];
  if (role === 'admin') menus = adminMenus;
  else if (role === 'seller') menus = sellerMenus;
  else menus = customerMenus;


  return (
    <>
      {/* Overlay (only on mobile) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
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

        {/* Footer Link */}
        <div className="p-4 m-2 border-t border-orange-100">
          <Link href="/" className="flex items-center gap-3 p-3 rounded-xl font-medium hover:bg-orange-50 text-gray-700 transition">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </aside>
    </>
  );
}