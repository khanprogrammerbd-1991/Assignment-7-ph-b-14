
import CategoryClient from "@/components/CategoryClient";
import { getAllCategories, getAllProducts } from "@/lib/utils";
import Link from "next/link";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const categoriesData = await getAllCategories();
  const productsData = await getAllProducts();

  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.data || categoriesData?.categories || [];

  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.data || productsData?.products || [];

  // Find matching category by slug or id
  const category = categories.find(
    (c) => c.slug === slug || c.id === slug
  );

  // Filter products matching this category
  const filteredProducts = products.filter(
    (p) => p.category === slug || p.categorySlug === slug || p.category === category?.id
  );

  // Empty state / Invalid slug: 404-style message + CTA button
  if (!category || filteredProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="bg-white rounded-2xl border border-[#E5E2DC] p-10 shadow-xs">
          <div className="text-5xl mb-4">🧺</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h1>
          <p className="text-sm sm:text-base text-[#666666] mt-2 mb-6">
            আপনি যে বিভাগটি খুঁজছেন তা বিদ্যমান নেই অথবা বর্তমানে খালি রয়েছে।
          </p>
          <Link
            href="/"
            className="btn btn-sm sm:btn-md bg-[#0A3D2E] hover:bg-[#0E5A42] text-white border-none rounded-xl px-6"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return <CategoryClient category={category} products={filteredProducts} />;
}