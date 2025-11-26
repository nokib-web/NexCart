"use client";

import { ShoppingCart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function AddToCartButton({ productId }) {
  const { user } = useUser();
  const userId = user?.id;

  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please login first!");
      return;
    }

    try {
      const res = await fetch("https://nexcart-server.onrender.com/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId,
          quantity: 1,
        }),
      });

      if (!res.ok) throw new Error("Failed");

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
      className="w-full bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl shadow-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-95"
    >
      <ShoppingCart size={22} />
      Add to Cart
    </button>
  );
}