"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onSelectCategory: (category: string) => void;
}

export default function ProjectsFilter({ onSelectCategory }: Props) {
  const categories = ["All", "Residential", "Commercial", "Hospitality", "Office"];
  const [selected, setSelected] = useState("All");

  return (
    <div className="flex gap-4 flex-wrap justify-center py-6">
      {categories.map((cat) => (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          key={cat}
          onClick={() => {
            setSelected(cat);
            onSelectCategory(cat);
          }}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm 
            ${
              selected === cat
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
}
