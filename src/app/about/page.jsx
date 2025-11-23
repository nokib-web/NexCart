import {
  Shirt,
  Leaf,
  ShieldCheck,
  HeartHandshake,
  Factory,
  Globe2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Top Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          About <span className="text-primary">NexCart</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          NexCart is a modern apparel brand specializing in premium-quality
          hoodies. We combine comfort, style, and sustainability to deliver a
          product you’ll love wearing every day.
        </p>
      </section>

      {/* Values / Features */}
      <section className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="card bg-base-100 shadow-xl p-8  hover:shadow-2xl transition">
          <Shirt size={44} className="text-primary mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Premium Craftsmanship</h3>
          <p className="text-gray-500">
            Our hoodies are made from soft, durable fabrics designed for perfect
            comfort and long-lasting wear.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="card bg-base-100 shadow-xl p-8  hover:shadow-2xl transition">
          <Leaf size={44} className="text-primary mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Eco-Friendly Production</h3>
          <p className="text-gray-500">
            We are committed to reducing plastic use and promoting
            environmentally responsible manufacturing.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="card bg-base-100 shadow-xl p-8  hover:shadow-2xl transition">
          <ShieldCheck size={44} className="text-primary mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Trusted Quality</h3>
          <p className="text-gray-500">
            Every hoodie passes a strict quality check to ensure the highest
            standards of comfort and durability.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-base-300 rounded-xl py-20 mt-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">

          {/* Mission */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To make high-quality hoodies accessible for everyone and build a
              sustainable fashion experience that respects people and the planet.
            </p>
          </div>

          {/* Vision */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To become a global hoodie brand known for comfort, style, and
              eco-responsibility — setting new standards in modern apparel.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why <span className="text-primary">Customers Trust Us</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6  rounded-xl shadow-xl hover:shadow-lg transition">
            <Factory size={40} className="text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Modern Manufacturing</h3>
            <p className="text-gray-500">
              Our hoodies are produced using refined techniques and quality
              materials.
            </p>
          </div>

          <div className="p-6  rounded-xl shadow-xl hover:shadow-lg transition">
            <Globe2 size={40} className="text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Global Standard</h3>
            <p className="text-gray-500">
              NexCart aligns with international quality benchmarks in apparel.
            </p>
          </div>

          <div className="p-6  rounded-xl shadow-xl hover:shadow-lg transition">
            <HeartHandshake size={40} className="text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Customer-First Ethics</h3>
            <p className="text-gray-500">
              Transparency, support, and satisfaction are at the core of our
              mission.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
