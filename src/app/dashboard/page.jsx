"use client";

import { TrendingUp, ShoppingCart, Users, Package } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 min-h-screen bg-gray-50">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
        Dashboard Overview
      </h1>

      {/* Stats Cards – Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Total Sales */}
        <div className="bg-orange-50 border border-orange-200 p-4 sm:p-5 lg:p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Total Sales</p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-1">
                $24,500
              </h3>
              <p className="text-xs text-green-600 mt-2">+12% from last month</p>
            </div>
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
          </div>
        </div>

        {/* Orders */}
        <div className="bg-blue-50 border border-blue-200 p-4 sm:p-5 lg:p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Orders</p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-1">
                1,204
              </h3>
              <p className="text-xs text-blue-600 mt-2">+8% this week</p>
            </div>
            <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
          </div>
        </div>

        {/* Customers */}
        <div className="bg-green-50 border border-green-200 p-4 sm:p-5 lg:p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Customers</p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-1">
                980
              </h3>
              <p className="text-xs text-green-600 mt-2">+5% new users</p>
            </div>
            <Users className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
          </div>
        </div>

        {/* Products */}
        <div className="bg-purple-50 border border-purple-200 p-4 sm:p-5 lg:p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Products</p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-1">
                340
              </h3>
              <p className="text-xs text-purple-600 mt-2">24 in stock low</p>
            </div>
            <Package className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Recent Orders Table – Mobile Friendly */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Recent Activity</h2>
        </div>

        {/* Mobile: Card View | Desktop: Table */}
        <div className="block lg:hidden">
          {/* Mobile Cards */}
          {[
            { name: "Nazmul Hasan Nokib", id: "#ORD-1201", status: "success", amount: "$120" },
            { name: "Sharmin Hena", id: "#ORD-1198", status: "warning", amount: "$85" },
            { name: "Mrs. HAsan", id: "#ORD-1191", status: "error", amount: "$0" },
          ].map((order, i) => (
            <div key={i} className="p-4 border-b last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{order.name}</p>
                  <p className="text-sm text-gray-500">{order.id}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "success"
                      ? "bg-green-100 text-green-800"
                      : order.status === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status === "success" ? "Completed" : order.status === "warning" ? "Pending" : "Canceled"}
                </span>
              </div>
              <p className="text-right font-bold text-gray-700 mt-2">{order.amount}</p>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Nazmul Hasan Nokib</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#ORD-1201</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">$120</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Sharmin Hena</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#ORD-1198</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">$85</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Mrs. Hasan</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#ORD-1191</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Canceled
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">$0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts – Stack on mobile, side-by-side on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 lg:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Sales Analytics</h2>
          <div className="h-64 sm:h-80 bg-linear-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center">
            <p className="text-gray-600 text-lg">Chart coming soon</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 lg:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Visitors Analytics</h2>
          <div className="h-64 sm:h-80 bg-linear-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
            <p className="text-gray-600 text-lg">Chart coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}