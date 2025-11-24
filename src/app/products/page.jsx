import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';
import React from 'react';

const Products = async () => {
    const data = await fetch('https://nexcart-server.onrender.com//products')
    const products = await data.json()
    console.log(products)

    return (
        <div>
            <div className="text-center my-10">
                <h1 className="text-4xl text-secondary font-bold"><span className='text-primary'>Our</span> Products</h1>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    Explore our premium collection of hoodies designed for comfort,
                    durability, and style. Find the perfect fit for every season.
                </p>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                {/* Search Bar */}
                <div className="flex items-center w-full md:w-1/2">
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <Search className="w-5 h-5 text-gray-500" />
                        <input type="text" className="grow" placeholder="Search products..." />
                    </label>
                </div>

                {/* Category Filter */}
                <select className="select select-bordered w-full md:w-1/4">
                    <option defaultValue="" >
                        Filter by Category
                    </option>
                    <option>All</option>
                    <option>Hoodies</option>
                    <option>Jackets</option>
                    <option>Sweaters</option>
                    <option>Accessories</option>
                </select>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10' >
                {
                    products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Products;