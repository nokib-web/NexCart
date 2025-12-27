"use client";
import React, { useState } from 'react';
import { Star, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import ReviewSection from "@/components/ReviewSection";

const ProductDetailsClient = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    // Initial validation check
    const hasColors = product.colors && product.colors.length > 0;
    const hasSizes = product.sizes && product.sizes.length > 0;

    const isSelectionComplete = () => {
        if (hasColors && !selectedColor) return false;
        if (hasSizes && !selectedSize) return false;
        return true;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            {/* Top Grid */}
            <div className="grid md:grid-cols-2 gap-12">

                {/* Product Image */}
                <div className="rounded-xl overflow-hidden shadow-lg ">
                    <Image
                        src={product.image || '/placeholder.jpg'}
                        alt={product.name}
                        width={800}
                        height={800}
                        className="w-full h-[480px] object-cover rounded-xl"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl text-primary font-bold mb-4">{product.name}</h1>

                        <div className="flex items-center gap-2 mb-4">
                            <Star className="text-primary" size={22} />
                            <span className="text-lg font-medium">{product.rating || "New"} / 5</span>
                        </div>

                        <p className="text-xl font-semibold text-primary mb-4">
                            ${product.price}
                        </p>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Sizes */}
                        {hasSizes && (
                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Available Sizes</h3>
                                <div className="flex gap-3">
                                    {product.sizes.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSelectedSize(s)}
                                            className={`px-4 py-2 rounded-lg transition border font-medium
                                                ${selectedSize === s
                                                    ? 'bg-primary text-white border-primary shadow-md transform scale-105'
                                                    : 'bg-transparent text-gray-700 border-gray-300 hover:border-primary hover:text-primary'}
                                            `}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Colors */}
                        {hasColors && (
                            <div className="mb-6">
                                <h3 className="font-semibold mb-2">Available Colors</h3>
                                <div className="flex gap-3">
                                    {product.colors.map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setSelectedColor(c)}
                                            className={`w-10 h-10 rounded-full border-2 
                                                ${selectedColor === c ? 'ring-2 ring-offset-2 ring-primary border-transparent' : 'border-gray-300'}
                                            `}
                                            style={{ backgroundColor: c.toLowerCase() }} // Ensure color name consistency if possible
                                            title={c}
                                        ></button>
                                    ))}
                                    {/* Display selected color name if needed */}
                                    {selectedColor && <span className="self-center text-sm ml-2 font-medium text-gray-500">{selectedColor}</span>}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Add To Cart Section */}
                    <div>
                        {/* We pass a disabled validation check. 
                             Or we can pass 'disabled={!isSelectionComplete()}' 
                             AddToCartButton handles null checks, but UI feedback is better here. 
                         */}
                        <AddToCartButton
                            productId={product._id}
                            size={selectedSize}
                            color={selectedColor}
                            disabled={!isSelectionComplete()}
                        />
                        {!isSelectionComplete() && (
                            <p className="text-red-500 text-sm mt-2">
                                Please select {hasSizes && !selectedSize ? 'a size' : ''} {hasSizes && !selectedSize && hasColors && !selectedColor ? 'and' : ''} {hasColors && !selectedColor ? 'a color' : ''} to continue.
                            </p>
                        )}
                    </div>


                </div>

            </div>

            {/* Extra Info */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
                <div className="p-6  rounded-xl shadow-xl  bg-linear-to-r from-orange-100 to-amber-100 flex gap-3">
                    <Truck className="text-primary" size={26} />
                    <div>
                        <h4 className="font-semibold">Fast Delivery</h4>
                        <p className="text-gray-600 text-sm">Receive within 3–5 days.</p>
                    </div>
                </div>

                <div className="p-6  rounded-xl shadow-xl  bg-linear-to-r from-orange-100 to-amber-100 flex gap-3">
                    <ShieldCheck className="text-primary" size={26} />
                    <div>
                        <h4 className="font-semibold">Quality Guaranteed</h4>
                        <p className="text-gray-600 text-sm">Premium verified materials.</p>
                    </div>
                </div>

                <div className="p-6  rounded-xl shadow-xl bg-linear-to-r from-orange-100 to-amber-100  flex gap-3">
                    <Star className="text-primary" size={26} />
                    <div>
                        <h4 className="font-semibold">Top Rated</h4>
                        <p className="text-gray-600 text-sm">
                            Loved by thousands of customers.
                        </p>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <ReviewSection productId={product._id} />

            <Link href='/products'><button className="btn mt-10 mx-auto w-1/4 border-0 shadow-2xl flex justify-center  items-center btn-secondary btn-sm text-White ">Go Back</button></Link>
        </div>
    );
};

export default ProductDetailsClient;
