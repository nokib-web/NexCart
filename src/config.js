

// Automatically switch API URL based on environment (Dev vs Prod)
export const API_URL = process.env.NODE_ENV === 'production'
    ? (process.env.NEXT_PUBLIC_API_URL || "https://nexcart-server.onrender.com")
    : "http://localhost:5000";
