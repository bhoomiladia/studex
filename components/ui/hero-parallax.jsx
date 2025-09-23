"use client"; // Use this if using Next.js app directory

import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function HeroParallax({ products }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  // Animate when in view
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, duration: 0.8 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="py-10 px-5">
      <motion.div
        className="flex gap-6 overflow-x-auto no-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {products.map((product, index) => (
          <motion.a
            key={index}
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md hover:scale-105 transform transition"
            variants={itemVariants}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg">{product.title}</h3>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
