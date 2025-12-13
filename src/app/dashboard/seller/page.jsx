export default function SellerDashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>
            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-title">My Products</div>
                    <div className="stat-value">25</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Sales</div>
                    <div className="stat-value">$4,200</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
                <div className="stat">
                    <div className="stat-title">New Orders</div>
                    <div className="stat-value">12</div>
                </div>
            </div>
        </div>
    )
}
