"use client";
import React from 'react';
import Link from 'next/link';

const PaymentFail = ({ params }) => {
    const { tranId } = React.use(params);
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
            <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-red-600 mb-2">Payment Failed!</h2>
                <p className="text-gray-600 mb-6">Something went wrong with your payment. Please try again.</p>
                <div className="text-sm text-gray-500 mb-6">Transaction ID: <span className="font-mono">{tranId}</span></div>

                <Link href="/cart">
                    <button className="btn btn-error text-white w-full">Try Again</button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentFail;
