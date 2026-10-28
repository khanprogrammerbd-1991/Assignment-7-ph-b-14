
import { getAllProducts, toBanglaNumber } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  const productsData = await getAllProducts();
  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.data || productsData?.products || [];

  // Find product by slug or id
  const product = products.find(
    (p) => p.slug === slug || String(p.id) === slug
  );

  if (!product) {
    notFound();
  }

  const name = product.nameBn || product.name || "পণ্য";
  const emoji = product.emoji || product.image || product.categoryIcon || "🛒";
  const unit = product.unit === "kg" ? "প্রতি কেজি" : `প্রতি ${product.unit || "কেজি"}`;
  const todayPrice = Number(product.today ?? product.price ?? 0);

  // Extract markets list safely
  const markets = Array.isArray(product.markets) ? product.markets : [];

  // Calculate Min, Max, and Average across markets
  let minPrice = todayPrice;
  let maxPrice = todayPrice;
  let avgPrice = todayPrice;

  if (markets.length > 0) {
    const mins = markets.map((m) => Number(m.min || todayPrice));
    const maxs = markets.map((m) => Number(m.max || todayPrice));
    minPrice = Math.min(...mins);
    maxPrice = Math.max(...maxs);
    const totalAvg = markets.reduce((acc, m) => acc + (Number(m.min) + Number(m.max)) / 2, 0);
    avgPrice = Math.round(totalAvg / markets.length);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-800 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>

      {/* Top — Summary Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-4xl sm:text-5xl bg-gray-50 p-3 rounded-xl">
            {emoji}
          </div>
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {product.categoryNameBn || product.category || "নিত্যপ্রয়োজনীয়"}
            </span>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">
              {name}
            </h1>
            <p className="text-sm text-gray-600">
              ইউনিট: {unit}
            </p>
          </div>
        </div>

        {/* Price Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100 text-center">
          <div className="bg-gray-50 p-4 rounded-lg">
            <span className="text-xs text-gray-500 block">সর্বনিম্ন দাম</span>
            <span className="text-xl font-bold text-green-700 mt-1 block">
              {toBanglaNumber(minPrice)} টাকা
            </span>
          </div>

          <div className="bg-emerald-900 text-white p-4 rounded-lg shadow-sm">
            <span className="text-xs text-emerald-200 block">গড় দাম</span>
            <span className="text-xl font-bold mt-1 block">
              {toBanglaNumber(avgPrice)} টাকা
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <span className="text-xs text-gray-500 block">সর্বোচ্চ দাম</span>
            <span className="text-xl font-bold text-red-600 mt-1 block">
              {toBanglaNumber(maxPrice)} টাকা
            </span>
          </div>
        </div>
      </div>

      {/* Market-wise Price List */}
      {markets.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {markets.map((m, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100"
              >
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    📍 {m.market} {m.division ? `(${m.division})` : ""}
                  </h3>
                  <p className="text-xs text-gray-500">{unit}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-900 text-sm">
                    {toBanglaNumber(m.min)} - {toBanglaNumber(m.max)} টাকা
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}