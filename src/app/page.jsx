// app/page.jsx
import Link from "next/link";
import { ShoppingBag, TrendingUp, ShieldCheck, Truck, Star, Gift, Zap, Globe, Lock, BadgeCheck, Zap as FastZap, RotateCcw, CheckCircle, Shield } from "lucide-react";

// Lazy-load the client carousel so the server HTML isn't blocked by its JS.
// It will hydrate on the client after the HTML is delivered.

import ProductCard from "@/components/ProductCard";
import Carousel from "@/components/CarouselWrapper";

export default async function Home() {
  // Use ISR to cache the top-products for 60s (faster TTFB + LCP)
  const res = await fetch("https://nexcart-server.onrender.com/top-products", {
    next: { revalidate: 60 },
  });

  // If your API sometimes fails, guard it to avoid throwing during SSR
  const products = (await res.json()) || [];

  const testimonials = [
    {
      name: "Aarav Patel",
      text: "Amazing quality and fast delivery. The hoodie is so comfortable!",
      rating: 5,
      location: "Mumbai",
      verified: true,
    },
    {
      name: "Mehedi Hasan",
      text: "Stylish, comfortable, and totally worth the price!",
      rating: 5,
      location: "Dhaka",
      verified: true,
    },
    {
      name: "Sana Khan",
      text: "Size was perfect and fabric feels premium. Love it!",
      rating: 4,
      location: "Karachi",
      verified: true,
    },
    {
      name: "Rohan Sharma",
      text: "Best hoodie I've ever owned. Customer service is amazing.",
      rating: 5,
      location: "Delhi",
      verified: true,
    },
  ];

  return (
    <div className="w-full">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        .marquee-bg {
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 100%);
        }
        .marquee-content {
          display: flex;
          width: max-content;
          animation: marquee 60s linear infinite;
        }
        .marquee-testimonials {
          animation-duration: 80s;
        }
        .marquee-trust {
          animation-duration: 60s;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        .marquee-item {
          flex: 0 0 384px;
          padding: 0 0.75rem;
        }
        .trust-item, .stat-item {
          flex: 0 0 250px;
          padding: 0 1rem;
        }
      `}</style>

      {/* ================= HERO BANNER ================= */}
      <Carousel />
      {/* ================= TRENDING NOW SECTION ================= */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-secondary">
              <Zap className="inline mr-2 text-yellow-500" size={32} />Trending <span className="text-primary">Now</span>
            </h2>
            <Link href="/products" className="text-primary hover:underline font-semibold">
              View All →
            </Link>
          </div>

          <p className="text-center mb-10 text-gray-600">
            Discover our best-selling items, loved by thousands for comfort and style.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </section>



      {/* ================= FEATURES SECTION ================= */}
      <section className="py-20 bg-linear-to-r from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose <span className="text-primary">NexCart</span>?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <ShieldCheck size={32} />,
                title: "Premium Quality",
                desc: "Crafted with durable, soft and breathable fabrics.",
              },
              {
                icon: <Truck size={32} />,
                title: "Fast Delivery",
                desc: "Quick, reliable shipping to your doorstep.",
              },
              {
                icon: <TrendingUp size={32} />,
                title: "Trending Designs",
                desc: "Stay stylish with the latest hoodie trends.",
              },
              {
                icon: <ShoppingBag size={32} />,
                title: "Easy Returns",
                desc: "Hassle-free return and refund policy.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="card bg-base-200 p-6 text-center shadow-xl hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                <div className="flex justify-center mb-3 text-primary">{f.icon}</div>
                <h3 className="font-semibold text-xl">{f.title}</h3>
                <p className="text-gray-600 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="marquee-container relative">
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          <div className="marquee-content marquee-trust marquee-reverse">
            {Array.from({ length: 8 }).flatMap(() => [
              { label: "Happy Customers", value: "10K+" },
              { label: "Products", value: "500+" },
              { label: "Countries Served", value: "50+" },
              { label: "Average Rating", value: "4.8/5" },
            ]).map((stat, i) => (
              <div key={i} className="stat-item text-center">
                <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS WITH MARQUEE ================= */}
      <section className="py-20 bg-base-200 overflow-hidden">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">
            Loved by <span className="text-primary">10,000+ Customers</span>
          </h2>
          <p className="text-center text-gray-600 mt-4">Real reviews from real customers - scroll to see more</p>
        </div>

        <div className="marquee-container marquee-bg">
          <div className="marquee-content marquee-testimonials">
            {Array.from({ length: 8 }).flatMap(() => testimonials).map((t, i) => (
              <div key={i} className="marquee-item">
                <div className="card bg-white p-6 shadow-md hover:shadow-xl transition rounded-xl border border-gray-200 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={16}
                        className={j < t.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4 leading-relaxed text-sm">&quot;{t.text}&quot;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-xs text-gray-500">{t.location}</p>
                    </div>
                    {t.verified && (
                      <CheckCircle size={16} className="text-green-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST & SECURITY SECTION ================= */}
      <section className="py-12 bg-white border-t border-b border-gray-200">
        <div className="marquee-container relative">
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          <div className="marquee-content marquee-trust">
            {Array.from({ length: 8 }).flatMap(() => [
              { icon: <Lock size={40} />, label: "100% Secure" },
              { icon: <BadgeCheck size={40} />, label: "Verified Seller" },
              { icon: <Gift size={40} />, label: "Gift Wrapping" },
              { icon: <Globe size={40} />, label: "Worldwide Shipping" },
              { icon: <ShoppingBag size={40} />, label: "Multiple Payments" },
            ]).map((badge, i) => (
              <div key={i} className="trust-item">
                <div className="text-primary mb-2 flex justify-center">{badge.icon}</div>
                <p className="text-sm font-semibold text-gray-700 text-center">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER SECTION ================= */}
      <section className="py-16 bg-gradient-to-r from-primary to-orange-500 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Get Exclusive Offers</h2>
          <p className="text-lg mb-8">
            Subscribe now and get 15% OFF your first order + early access to new collections!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full sm:w-80 text-black placeholder-gray-500"
            />
            <button className="btn bg-white text-primary hover:bg-gray-100 px-8 font-bold">
              Subscribe
            </button>
          </div>
          <p className="text-xs mt-4 opacity-90">We never spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ================= WHY SHOP WITH US DETAILED ================= */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Customers Choose <span className="text-primary">NexCart</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <RotateCcw className="w-8 h-8" />, title: "Free Returns", desc: "30-day return guarantee on all orders. No questions asked." },
              { icon: <CheckCircle className="w-8 h-8" />, title: "Authentic Products", desc: "100% genuine items directly from manufacturers." },
              { icon: <Shield className="w-8 h-8" />, title: "Buyer Protection", desc: "Your payments are secured with SSL encryption." },
              { icon: <FastZap className="w-8 h-8" />, title: "Super Fast Shipping", desc: "Delivery within 3-5 business days across India." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <div className="text-primary flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA BANNER ================= */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,...')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Upgrade Your Wardrobe?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers. Shop now and get free shipping on orders over 500 tk!
          </p>
          <Link href="/products" className="btn bg-gradient-to-r from-primary to-orange-500 text-white hover:shadow-lg px-10 py-3 text-lg font-bold">
            Explore All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
