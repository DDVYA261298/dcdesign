"use client";

import React, { useState } from "react";

interface Props {
  onSelectCategory: (category: string) => void;
}

export default function ProjectsFilter({ onSelectCategory }: Props) {
  const categories = ["All", "Residential", "Commercial", "Hospitality", "Office"];
  const [selected, setSelected] = useState("All");

  return (
    <div className="flex gap-4 flex-wrap py-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            setSelected(cat);
            onSelectCategory(cat);
          }}
          className={`px-4 py-2 rounded-full ${
            selected === cat
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
