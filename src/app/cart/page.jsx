"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config";

export default function CartPage() {
  const { user } = useUser();
  const userId = user?.id;
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [enrichedCart, setEnrichedCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState(new Set());
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/cart/${userId}`);
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

  useEffect(() => {
    if (cart.length === 0) {
      setEnrichedCart([]);
      return;
    }

    const enrichCartItems = async () => {
      try {
        const productIds = cart.map(item => item.productId);

        const res = await fetch(`${API_URL}/products/by-ids`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productIds }),
        });

        const products = await res.json();

        const productMap = {};
        products.forEach(p => {
          productMap[p._id] = p;
        });

        const enriched = cart.map(item => ({
          ...item,
          product: productMap[item.productId] || null,
        }));

        setEnrichedCart(enriched);
      } catch (err) {
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
      const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
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
      await fetch(`${API_URL}/cart/${cartItemId}`, { method: "DELETE" });
      setCart(prev => prev.filter(item => item._id !== cartItemId));
      toast.success("Removed from cart");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  const [paymentMethod, setPaymentMethod] = useState('online');

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const orderData = {
        userId: userId,
        customerEmail: user?.primaryEmailAddress?.emailAddress,
        items: enrichedCart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product?.price,
          name: item.product?.name,
          image: item.product?.image,
          sellerEmail: item.product?.sellerEmail
        })),
        totalPrice: parseFloat(enrichedCart.reduce(
          (sum, item) => sum + (item.product?.price || 0) * item.quantity,
          0
        ).toFixed(2)),
        customerName: user?.fullName || user?.firstName || 'Valued Customer',
        paymentMethod: paymentMethod,
      }

      if (paymentMethod === 'cod') {
        // Cash on Delivery Logic
        const res = await fetch(`${API_URL}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...orderData,
            status: 'pending',
            paymentStatus: 'unpaid',
            transactionId: `COD-${Date.now()}` // Generate a dummy ID for COD
          }),
        });

        if (res.ok) {
          toast.success("Order Placed Successfully!");
          setCart([]); // Clear local state immediately for UX
          setEnrichedCart([]);
          // Redirect to dashboard/orders (customer)
          router.push('/dashboard/base/orders');
        } else {
          toast.error("Failed to place order.");
          setCheckingOut(false);
        }

      } else {
        // Online Payment Logic (SSLCommerz)
        const res = await fetch(`${API_URL}/create-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        const data = await res.json();
        if (data.url) {
          window.location.replace(data.url);
        } else {
          toast.error("Failed to initiate payment.");
          setCheckingOut(false);
        }
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
      setCheckingOut(false);
    }
  }

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
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10">Your Cart</h1>

      {enrichedCart.length === 0 ? (
        <p className="text-center py-20 text-xl sm:text-2xl text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-6">
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
                  className="
                    flex flex-col sm:flex-row 
                    gap-6 p-5 sm:p-6 
                    bg-white bg-linear-to-br from-orange-50 to-amber-100 
                    rounded-2xl shadow-xl hover:shadow-3xl transition
                  "
                >
                  <Image
                    src={product.image || "/placeholder.jpg"}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="rounded-xl object-cover w-full sm:w-[140px] h-[140px]"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">{product.category}</p>

                    <p className="text-xl sm:text-2xl font-bold text-orange-600 mt-3">
                      ${product.price.toFixed(2)}
                    </p>

                    {/* Quantity control */}
                    <div className="flex items-center gap-4 mt-5">
                      <button
                        onClick={() => updateQuantity(item._id, item.productId, item.quantity, -1)}
                        disabled={isItemUpdating || item.quantity <= 1}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="text-xl font-bold w-10 text-center">
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

                  {/* RIGHT SIDE PRICE + REMOVE BTN */}
                  <div className="flex sm:flex-col justify-between sm:items-end text-right">
                    <p className="text-lg sm:text-xl font-semibold mb-2">
                      Total: ${(product.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN SUMMARY */}
          <div className="lg:col-span-4">
            <div className="bg-linear-to-br from-orange-400 to-amber-200 text-white p-6 sm:p-8 rounded-2xl shadow-xl sticky top-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 text-base sm:text-lg">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="border-t border-white/30 pt-4">
                  <div className="flex justify-between text-xl sm:text-2xl font-bold">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="pt-6">
                  <h3 className="font-semibold mb-3">Payment Method</h3>
                  <div className="flex flex-col gap-2">
                    <label className="label cursor-pointer justify-start gap-3 bg-white/20 p-3 rounded-lg hover:bg-white/30 transition">
                      <input
                        type="radio"
                        name="radio-payment"
                        className="radio radio-primary border-white checked:border-white"
                        checked={paymentMethod === 'online'}
                        onChange={() => setPaymentMethod('online')}
                      />
                      <span className="label-text text-white font-medium">Pay Online (SSLCommerz)</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3 bg-white/20 p-3 rounded-lg hover:bg-white/30 transition">
                      <input
                        type="radio"
                        name="radio-payment"
                        className="radio radio-primary border-white checked:border-white"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <span className="label-text text-white font-medium">Cash on Delivery</span>
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full mt-8 py-4 bg-white text-orange-500 font-bold text-lg rounded-xl hover:bg-orange-50 transition"
              >
                {checkingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
