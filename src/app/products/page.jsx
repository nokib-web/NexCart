import ProductCard from '@/components/ProductCard';
import React from 'react';
import { API_URL } from '@/config';
import FilterSidebar from '@/components/FilterSidebar';
import Link from 'next/link';

const Products = async ({ searchParams }) => {
    // Await searchParams before accessing properties
    const params = await searchParams;
    const { search, category, minPrice, maxPrice, sort, page } = params || {};

    const currentPage = parseInt(page) || 1;

    // Construct query string for API
    const queryParams = new URLSearchParams();
    if (search) queryParams.set("search", search);
    if (category) queryParams.set("category", category);
    if (minPrice) queryParams.set("minPrice", minPrice);
    if (maxPrice) queryParams.set("maxPrice", maxPrice);
    if (sort) queryParams.set("sort", sort);
    queryParams.set("page", currentPage);
    queryParams.set("page", currentPage);
    // queryParams.set("limit", 12); // Don't add limit to generated links, only to backend fetch

    let products = [];
    let totalPages = 1;

    try {
        const data = await fetch(`${API_URL}/products?${queryParams.toString()}&limit=12`, { cache: 'no-store' });
        if (data.ok) {
            const result = await data.json();
            // Handle both old array format (fallback) and new object format
            if (Array.isArray(result)) {
                products = result;
            } else {
                products = result.products;
                totalPages = result.totalPages;
            }
        } else {
            console.error("Failed to fetch products:", data.statusText);
        }
    } catch (err) {
        console.error("Error fetching products:", err);
    }

    // Helper to generate pagination links
    const getPageLink = (pageNum) => {
        const newParams = new URLSearchParams(queryParams.toString());
        newParams.set('page', pageNum);
        return `/products?${newParams.toString()}`;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl text-secondary font-bold"><span className='text-primary'>Our</span> Products</h1>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    Explore our premium collection of hoodies designed for comfort,
                    durability, and style. Find the perfect fit for every season.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className='w-full md:w-auto flex-shrink-0'>
                    <FilterSidebar />
                </aside>

                {/* Product Grid */}
                <div className='flex-grow'>
                    {products?.length > 0 ? (
                        <>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' >
                                {products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-12 gap-2">
                                    {currentPage > 1 && (
                                        <Link href={getPageLink(currentPage - 1)} className="btn btn-outline btn-sm">
                                            Prev
                                        </Link>
                                    )}

                                    {[...Array(totalPages)].map((_, i) => {
                                        const p = i + 1;
                                        return (
                                            <Link
                                                key={p}
                                                href={getPageLink(p)}
                                                className={`btn btn-sm ${p === currentPage ? 'btn-primary text-white' : 'btn-outline'}`}
                                            >
                                                {p}
                                            </Link>
                                        );
                                    })}

                                    {currentPage < totalPages && (
                                        <Link href={getPageLink(currentPage + 1)} className="btn btn-outline btn-sm">
                                            Next
                                        </Link>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-semibold text-gray-500">No products found.</h2>
                            <p className="text-gray-400">Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;