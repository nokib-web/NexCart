"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { user } = useUser();
  const userId = user?.id;

  const [cart, setCart] = useState([]); // Raw cart from DB
  const [enrichedCart, setEnrichedCart] = useState([]); // Cart + full product details
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState(new Set());

  // Fetch user's cart
  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/cart/${userId}`);
        const data = await res.json();
        setCart(data);
      } catch (err) {
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  // Enrich cart items with full product data
  useEffect(() => {
    if (cart.length === 0) {
      setEnrichedCart([]);
      return;
    }

    const enrichCartItems = async () => {
      try {
        const productIds = cart.map(item => item.productId);

        const res = await fetch("http://localhost:5000/products/by-ids", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productIds }),
        });

        const products = await res.json();

        // Map products by ID for fast lookup
        const productMap = {};
        products.forEach(p => {
          productMap[p._id] = p;
        });

        // Merge cart + product details
        const enriched = cart.map(item => ({
          ...item,
          product: productMap[item.productId] || null,
        }));

        setEnrichedCart(enriched);
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        toast.error("Some product details couldn't load");
      }
    };

    enrichCartItems();
  }, [cart]);

  const updateQuantity = async (cartItemId, productId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;

    setUpdatingItems(prev => new Set(prev).add(cartItemId));

    try {
      const res = await fetch(`http://localhost:5000/cart/${cartItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty }),
      });

      if (res.ok) {
        setCart(prev =>
          prev.map(item =>
            item._id === cartItemId ? { ...item, quantity: newQty } : item
          )
        );
        toast.success("Cart updated");
      }
    } catch (err) {
      toast.error("Failed to update");
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev);
        next.delete(cartItemId);
        return next;
      });
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await fetch(`http://localhost:5000/cart/${cartItemId}`, { method: "DELETE" });
      setCart(prev => prev.filter(item => item._id !== cartItemId));
      toast.success("Removed from cart");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  if (!userId) {
    return <p className="text-center py-20 text-xl">Please login to view your cart.</p>;
  }

  if (loading) {
    return <p className="text-center py-20 text-2xl">Loading your cart...</p>;
  }

  const totalPrice = enrichedCart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  ).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

      {enrichedCart.length === 0 ? (
        <p className="text-center py-20 text-2xl text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {enrichedCart.map((item) => {
                const product = item.product;
                const isItemUpdating = updatingItems.has(item._id);

                if (!product) {
                  return (
                    <div key={item._id} className="p-6 bg-red-50 rounded-xl text-red-600">
                      Product not found (ID: {item.productId})
                    </div>
                  );
                }

                return (
                  <div
                    key={item._id}
                    className="flex gap-6 p-6 bg-white bg-linear-to-br from-orange-50 to-amber-100 rounded-2xl shadow-xl  hover:shadow-3xl transition"
                  >
                    <Image
                      src={product.image || "/placeholder.jpg"}
                      alt={product.name}
                      width={140}
                      height={140}
                      className="rounded-xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                      <p className="text-gray-600 mt-1">{product.category}</p>
                      <p className="text-2xl font-bold text-orange-600 mt-3">
                        ${product.price?.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-4 mt-6">
                        <button
                          onClick={() => updateQuantity(item._id, item.productId, item.quantity, -1)}
                          disabled={isItemUpdating || item.quantity <= 1}
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="text-xl font-bold w-12 text-center">
                          {isItemUpdating ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item._id, item.productId, item.quantity, 1)}
                          disabled={isItemUpdating}
                          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right space-y-4">
                      <p className="text-lg font-semibold">
                        ${(product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Summary */}
          <div className="lg:col-span-4">
            <div className="bg-linear-to-br from-orange-400 to-amber-200 text-white p-8 rounded-2xl shadow-xl sticky top-6">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 text-lg">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-white/30 pt-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-8 py-5 bg-white text-orange-500 font-bold text-xl rounded-xl hover:bg-orange-50 transition transform hover:scale-105">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}