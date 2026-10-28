// src/components/CategoryClient.jsx
"using client"; // (or normal component since it manages local sort state)
"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { toBanglaNumber } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export default function CategoryClient({ category, products }) {
  const [sortBy, setSortBy] = useState("default");

  // Numeric sorting helper
  const sortedProducts = useMemo(() => {
    const copy = [...products];
    if (sortBy === "low-to-high") {
      return copy.sort((a, b) => {
        const priceA = Number(a.today ?? a.price ?? 0);
        const priceB = Number(b.today ?? b.price ?? 0);
        return priceA - priceB;
      });
    }
    if (sortBy === "high-to-low") {
      return copy.sort((a, b) => {
        const priceA = Number(a.today ?? a.price ?? 0);
        const priceB = Number(b.today ?? b.price ?? 0);
        return priceB - priceA;
      });
    }
    return copy;
  }, [products, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Header Box */}
      <div className="bg-white rounded-2xl border border-[#E5E2DC] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E6F5EE] flex items-center justify-center text-3xl">
            {category.icon || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              {category.nameBn || category.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
              মোট {toBanglaNumber(sortedProducts.length)} টি পণ্য পাওয়া গেছে
            </p>
          </div>
        </div>

        {/* Challenge C1: Sort Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-sm font-medium text-[#555555] whitespace-nowrap">
            সাজান:
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#F5F3EE] hover:bg-[#ECE9E2] text-[#1A1A1A] text-sm font-semibold rounded-xl pl-3.5 pr-9 py-2 border border-[#D8D4CC] focus:outline-none focus:border-[#0A3D2E] cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#555555] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {sortedProducts.map((product, idx) => (
          <ProductCard key={`${product.slug || idx}`} product={product} />
        ))}
      </div>
    </div>
  );
}