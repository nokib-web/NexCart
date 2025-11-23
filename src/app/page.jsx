

import Image from "next/image";
import { ShoppingBag, TrendingUp, ShieldCheck, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const data = await fetch('http://localhost:5000/top-products')
  const products = await data.json()
  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold leading-tight">
            Premium Hoodies for Every Season
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Discover comfort, durability, and style crafted to perfection.
          </p>

          <button className="btn btn-primary mt-6 px-8 text-lg">
            Shop Now
          </button>
        </div>

        <Image
          src="/hero-bg.jpg"
          alt="Hoodie Background"
          fill
          className="object-cover opacity-20 -z-10"
        />
      </section>


      
      {/* ================= POPULAR ITEMS SECTION ================= */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Our Popular Hoodies
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {
              products.map(product=> <ProductCard product={product} key={product._id}></ProductCard>)
            }

          </div>

        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose NextCart?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck size={32} />, title: "Premium Quality", desc: "Crafted with durable, soft and breathable fabrics." },
              { icon: <Truck size={32} />, title: "Fast Delivery", desc: "Quick, reliable shipping to your doorstep." },
              { icon: <TrendingUp size={32} />, title: "Trending Designs", desc: "Stay stylish with the latest hoodie trends." },
              { icon: <ShoppingBag size={32} />, title: "Easy Returns", desc: "Hassle-free return and refund policy." }
            ].map((f, i) => (
              <div
                key={i}
                className="card bg-base-200 p-6 text-center hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                <div className="flex justify-center mb-3 text-primary">{f.icon}</div>
                <h3 className="font-semibold text-xl">{f.title}</h3>
                <p className="text-gray-600 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">What Customers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Aarav", text: "Amazing quality and fast delivery. Loved the hoodie!" },
              { name: "Mehedi", text: "Stylish, comfortable, and totally worth it!" },
              { name: "Sana", text: "Size was perfect and fabric feels premium!" },
            ].map((t, i) => (
              <div key={i} className="card bg-base-100 p-6 shadow-md hover:shadow-xl transition rounded-xl">
                <p className="text-gray-700 italic mb-3">{t.text}</p>
                <h4 className="font-semibold">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= BANNER SECTION ================= */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white text-center">
        <h2 className="text-3xl font-bold">Winter Sale is Live!</h2>
        <p className="mt-2 opacity-90">Grab your favorite hoodies at up to 40% OFF.</p>

        <button className="btn btn-white text-black mt-6 px-8">
          Shop Discounts
        </button>
      </section>

    </div>
  );
}
