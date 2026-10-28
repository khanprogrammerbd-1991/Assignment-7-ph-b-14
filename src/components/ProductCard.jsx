// src/components/ProductCard.jsx
import Link from "next/link";
import { toBanglaNumber } from "@/lib/utils";

const ProductCard = ({ product }) => {
  const name = product.nameBn || product.name || "পণ্য";
  const emoji = product.emoji || product.image || product.categoryIcon || "🛒";
  const price = Number(product.today ?? product.price ?? 0);
  const unit = product.unit === "kg" ? "প্রতি কেজি" : `প্রতি ${product.unit || "কেজি"}`;
  
  const changePct = Number(product.change?.pct ?? product.change ?? 0);
  const isUp = product.change?.dir === "up" || changePct > 0;
  const isDown = product.change?.dir === "down" || changePct < 0;

  return (
    <Link
      href={`/product/${product.slug || "item"}`}
      className="group bg-white rounded-2xl border border-[#E5E2DC] p-5 shadow-xs hover:shadow-md hover:border-[#1D9E75] transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Top: Emoji / Illustration & Category */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-12 h-12 rounded-xl bg-[#F5F3EE] flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
            {emoji}
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F5F3EE] text-[#555555]">
            {product.categoryNameBn || product.category || "খাদ্য"}
          </span>
        </div>

        {/* Product Name & Unit */}
        <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#0A3D2E] transition-colors">
          {name}
        </h3>
        <p className="text-xs text-[#777777] mt-0.5">{unit}</p>
      </div>

      {/* Price Row & Change Badge */}
      <div className="mt-5 pt-3 border-t border-[#F0EDE6] flex items-end justify-between gap-2">
        <div>
          <span className="block text-[11px] text-[#777777]">আজকের দাম</span>
          <span className="text-lg sm:text-xl font-bold text-[#0A3D2E]">
            {toBanglaNumber(price)} টাকা
          </span>
        </div>

        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
            isUp
              ? "bg-[#E6F5EE] text-[#1A6B45]"
              : isDown
              ? "bg-[#FDECEA] text-[#C0392B]"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"} {toBanglaNumber(Math.abs(changePct))}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;