"use client";
import React from 'react';
import Link from 'next/link';

const PaymentSuccess = ({ params }) => {
    const { tranId } = React.use(params);
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been placed.</p>
                <div className="text-sm text-gray-500 mb-6">Transaction ID: <span className="font-mono">{tranId}</span></div>

                <Link href="/dashboard/base/orders">
                    <button className="btn btn-primary w-full">View My Orders</button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
