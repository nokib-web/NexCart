"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FilterSidebar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [sort, setSort] = useState(searchParams.get("sort") || "");
    const [search, setSearch] = useState(searchParams.get("search") || "");

    // Use a ref to track if it's the initial mount to avoid overwriting URL params immediately
    const isMounted = React.useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const params = new URLSearchParams();
        if (category && category !== "All") params.set("category", category);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (sort) params.set("sort", sort);
        if (search) params.set("search", search);

        // Reset to page 1 when filters change (so we don't carry over page=2 to a new filter result)
        // We do this by simply NOT setting 'page' here, which defaults to 1.

        router.push(`/products?${params.toString()}`);
    }, [category, minPrice, maxPrice, sort, search, router]);

    return (
        <div className="bg-base-100 p-4 rounded-lg shadow-sm w-full md:w-64 h-fit">
            <h3 className="font-bold text-lg mb-4">Filters</h3>

            {/* Search */}
            <div className="mb-6">
                <label className="label">
                    <span className="label-text">Search</span>
                </label>
                <input
                    type="text"
                    placeholder="Search..."
                    className="input input-bordered w-full input-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Categories */}
            <div className="mb-6">
                <label className="label">
                    <span className="label-text">Category</span>
                </label>
                <select
                    className="select select-bordered w-full select-sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Sweaters">Sweaters</option>
                    <option value="Accessories">Accessories</option>
                </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <label className="label">
                    <span className="label-text">Price Range</span>
                </label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        className="input input-bordered w-full input-sm"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        className="input input-bordered w-full input-sm"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>

            {/* Sorting */}
            <div className="mb-6">
                <label className="label">
                    <span className="label-text">Sort By</span>
                </label>
                <select
                    className="select select-bordered w-full select-sm"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                </select>
            </div>

            {/* Clear Filters */}
            <button
                className="btn btn-outline btn-sm w-full"
                onClick={() => {
                    setCategory("");
                    setMinPrice("");
                    setMaxPrice("");
                    setSort("");
                    setSearch("");
                }}
            >
                Clear Filters
            </button>
        </div>
    );
};

export default FilterSidebar;
