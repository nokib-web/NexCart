export default function AdminDashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc">↗︎ 40 (2%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Sales</div>
                    <div className="stat-value">$89,400</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Pending Approvals</div>
                    <div className="stat-value">5</div>
                </div>
            </div>
        </div>
    )
}
