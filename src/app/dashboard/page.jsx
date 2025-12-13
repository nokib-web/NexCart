"use client";
import useRole from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { role, loading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (role === 'admin') router.push('/dashboard/admin');
      else if (role === 'seller') router.push('/dashboard/seller');
      // Customer stays can stay here as their overview, or we can make a specific one.
      // Let's keep customer here for now, or maybe redirect to /dashboard/base or something if we want strict separation.
      // Actually, the sidebar says "Overview" -> "/dashboard" for Customer.
      // And "Overview" -> "/dashboard/admin" for Admin.
      // So if Admin lands here, they get pushed to /admin. Good.
    }
  }, [role, loading, router]);

  if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>

  if (role === 'admin' || role === 'seller') {
    return <div className="p-10 text-center">Redirecting...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome back, Customer!</h2>
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="stat-title">My Orders</div>
          <div className="stat-value">0</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div className="stat-title">Wishlist</div>
          <div className="stat-value">5</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;