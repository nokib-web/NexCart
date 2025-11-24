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
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId,
          quantity: 1,
        }),
      });

      toast.success("Added to cart!", {
        icon: "🛒",
        duration: 2000,
        style: {
          borderRadius: "12px",
          background: "#16a34a",
          color: "#fff",
        },
      });

      const data = await res.json();
    } catch (err) {
      toast.error("Failed to add!");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="btn bg-linear-to-r from-orange-500 to-amber-200 w-full border-0 shadow-2xl flex items-center gap-2"
    >
      <ShoppingCart size={20} /> Add to Cart
    </button>
  );
}
