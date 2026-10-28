
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/utils";

export default async function Home() {
  const productsData = await getAllProducts();
  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.data || productsData?.products || [];

  // Section A: Top 6 Risers (sorted by highest positive percentage)
  const topRisers = [...products]
    .filter((p) => {
      const pct = Number(p.change?.pct ?? p.change ?? 0);
      const dir = p.change?.dir;
      return dir === "up" || pct > 0;
    })
    .sort((a, b) => {
      const pctA = Number(a.change?.pct ?? a.change ?? 0);
      const pctB = Number(b.change?.pct ?? b.change ?? 0);
      return pctB - pctA;
    })
    .slice(0, 6);

  // Section B: Top 6 Fallers (sorted by lowest negative percentage)
  const topFallers = [...products]
    .filter((p) => {
      const pct = Number(p.change?.pct ?? p.change ?? 0);
      const dir = p.change?.dir;
      return dir === "down" || pct < 0;
    })
    .sort((a, b) => {
      const pctA = Number(a.change?.pct ?? a.change ?? 0);
      const pctB = Number(b.change?.pct ?? b.change ?? 0);
      return pctA - pctB; // negative order
    })
    .slice(0, 6);

  return (
    <div>
      <Hero />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-14">
        
        {/* Section A — আজ দাম বেড়েছে ▲ (Top 6 Risers) */}
        {topRisers.length > 0 && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                <span className="text-[#1A6B45]">আজ দাম বেড়েছে ▲</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
                গতকালের তুলনায় আজ যেসব পণ্যের দাম সবচেয়ে বেশি বৃদ্ধি পেয়েছে
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {topRisers.map((product, idx) => (
                <ProductCard key={`riser-${product.slug || idx}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section B — আজ দাম কমেছে ▼ (Top 6 Fallers) */}
        {topFallers.length > 0 && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                <span className="text-[#C0392B]">আজ দাম কমেছে ▼</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] mt-0.5">
                গতকালের তুলনায় আজ যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {topFallers.map((product, idx) => (
                <ProductCard key={`faller-${product.slug || idx}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section C — সব পণ্য (All Products Grid with anchor ID) */}
        <section id="সব-পণ্য" className="scroll-mt-28">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              সব পণ্য
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-1">
              আমাদের তালিকাভুক্ত সকল নিত্যপ্রয়োজনীয় পণ্যের আজকের সর্বশেষ খুচরা বাজার দর
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product, idx) => (
              <ProductCard key={`all-${product.slug || idx}`} product={product} />
            ))}
          </div>
        </section>

      </div>
      <Footer/>
    </div>
  );
}