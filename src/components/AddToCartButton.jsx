"use client";

import { ShoppingCart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { API_URL } from "@/config";

export default function AddToCartButton({ productId, size, color, disabled }) {
  const { user } = useUser();
  const userId = user?.id;
  const { fetchCartCount } = useCart();

  const handleAddToCart = async () => {
    if (disabled) {
      toast.error("Please select options first");
      return;
    }
    if (!userId) {
      toast.error("Please login first!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId,
          quantity: 1,
          size,
          color
        }),
      });

      if (!res.ok) throw new Error("Failed");

      // Update the global cart count
      fetchCartCount();

      toast.success("Added to cart!", {
        icon: "🛒",
        duration: 2000,
        style: {
          borderRadius: "12px",
          background: "#16a34a",
          color: "#fff",
        },
      });
    } catch (err) {
      toast.error("Failed to add item");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl shadow-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <ShoppingCart size={22} />
      Add to Cart
    </button>
  );
}