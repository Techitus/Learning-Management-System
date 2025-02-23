/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

interface Category {
  id: number;
  name: string;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Books" },
    { id: 3, name: "Clothing" },
  ]);



  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Categories</h1>
        
      </div>

      <div className="bg-black/30 rounded-lg shadow">
        <div className="divide-y divide-gray-600  justify-between">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center  justify-between p-4 hover:bg-black/50"
            >
              <span className="text-lg  text-white/90">{category.name}</span>
              
            </div>
          ))}
          {categories.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No categories found. Inform Admin to Add Categories.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}