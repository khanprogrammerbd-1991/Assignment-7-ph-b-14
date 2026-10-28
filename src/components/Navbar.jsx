// src/components/Navbar.js
import { getAllCategories, getAllProducts, toBanglaNumber } from "@/lib/utils";
import Link from "next/link";

const Navbar = async () => {
  // 1. Fetch both categories (for nav links) and products (for marquee ticker)
  const catagoriesData = await getAllCategories();
  const productsData = await getAllProducts();

  // Safely extract arrays from API response
  const categories = Array.isArray(catagoriesData)
    ? catagoriesData
    : catagoriesData?.data || catagoriesData?.categories || [];

  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.data || productsData?.products || [];

  // Duplicate products list for a smooth infinite loop
  const tickerItems = [...products, ...products];

  const todayBanglaDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50">
      {/* PART 1: Main Navbar */}
      <div className="bg-[#0A3D2E] text-white border-b border-[#165B46]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Logo + Bangla Date */}
          <Link href="/" className="flex flex-col">
            <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
              <span>🛒</span>
              <span>বাজার দর</span>
            </div>
            <span className="text-xs text-[#9FE1CB] mt-0.5">
              {todayBanglaDate}
            </span>
          </Link>

          {/* Middle: Category Links */}
          <nav className="flex items-center gap-1.5 flex-wrap justify-center order-3 lg:order-2 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-[#165B46]">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-[#1D9E75] text-white"
            >
              সব পণ্য
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#D4EFE6] hover:bg-[#0E5A42] hover:text-white transition-colors"
              >
                {cat.icon && <span className="mr-1">{cat.icon}</span>}
                {cat.nameBn || cat.name}
              </Link>
            ))}
          </nav>

          {/* Right: Auth Buttons */}
          <div className="flex items-center gap-2 order-2 lg:order-3">
            <Link
              href="/signin"
              className="btn btn-sm bg-transparent hover:bg-[#0E5A42] text-white border border-[#2E7D65] rounded-lg"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="btn btn-sm bg-[#1D9E75] hover:bg-[#168360] text-white border-none rounded-lg"
            >
              সাইন আপ
            </Link>
          </div>
        </div>
      </div>

     
     
    </header>
  );
};

export default Navbar;