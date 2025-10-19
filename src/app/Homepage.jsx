"use client";
import Hero from "@/components/hero/Hero";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* About Section */}
      <section className="py-20 px-6 sm:px-10 lg:px-32 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-200">
            About <span className="text-green-600">Ganesh Cosmetics</span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-200">
            At Ganesh Cosmetics, we believe everyone deserves to look and feel
            confident without overspending. Our wide range of skincare,
            haircare, and beauty products are made with love and tested for
            quality to bring you the best results — naturally and affordably.
          </p>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background px-6 sm:px-10 lg:px-32">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Our <span className="text-green-600">Featured Products</span>
          </h2>
          <p className="text-gray-200 mt-4 text-lg">
            Discover our best-selling products that redefine beauty and
            self-care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              src: "https://res.cloudinary.com/dcp27ipgt/image/upload/v1728224440/products/s1mnlevrpdze6fdqtzn1.jpg",
              name: "Awibi Diaper",
            },
            {
              src: "https://res.cloudinary.com/dcp27ipgt/image/upload/v1718075694/products/fqy7gnrwzezfwrunboyn.jpg",
              name: "Himalaya Baby Cream",
            },
            {
              src: "https://res.cloudinary.com/dcp27ipgt/image/upload/v1710856483/products/znmtt59919ngwlwwuy55.jpg",
              name: "Fogg Body Perfume",
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <Image
                src={p.src}
                alt={p.name}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{p.name}</h3>

                <Link
                  href="/products"
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  Explore →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 sm:px-10 lg:px-32 bg-background">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-200">
            What Our <span className="text-green-600">Customers Say</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Sita Sharma",
              quote:
                "Ganesh Cosmetics products are gentle and really effective. I love their herbal range!",
            },
            {
              name: "Ramesh Adhikari",
              quote:
                "Affordable and high-quality. My whole family uses Ganesh products now.",
            },
            {
              name: "Anjali KC",
              quote: "Their face cream gives amazing glow — totally worth it!",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-green-50 rounded-2xl p-8 shadow-md hover:shadow-lg"
            >
              <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
              <h4 className="font-semibold text-green-700">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
