import AddToCartButton from "@/components/AddToCartButton";
import { ShoppingCart, Star, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default async function ProductDetails({ params }) {
    const { id } = await params;

    const res = await fetch(`https://nexcart-server.onrender.com/products/${id}`, {
        cache: "no-store",
    });
    const product = await res.json();

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            {/* Top Grid */}
            <div className="grid md:grid-cols-2 gap-12">

                {/* Product Image */}
                <div className="rounded-xl overflow-hidden shadow-lg ">
                    <Image
                        src={product.image}
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
                            <span className="text-lg font-medium">{product.rating} / 5</span>
                        </div>

                        <p className="text-xl font-semibold text-primary mb-4">
                            ${product.price}
                        </p>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Sizes */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Available Sizes</h3>
                            <div className="flex gap-3">
                                {product.sizes?.map((s) => (
                                    <span
                                        key={s}
                                        className="px-4 py-2 bg-primary  rounded-lg cursor-pointer hover:bg-amber-600 hover:text-white transition"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Available Colors</h3>
                            <div className="flex gap-3">
                                {product.colors?.map((c) => (
                                    <div
                                        key={c}
                                        className="w-8 h-8 rounded-full border"
                                        style={{ backgroundColor: c }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Add To Cart Section */}
                    <div>
                        <AddToCartButton productId={product._id} />
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
        </div>
    );
}
