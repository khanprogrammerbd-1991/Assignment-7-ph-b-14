// src/components/marque.jsx
import { getAllProducts, toBanglaNumber } from "@/lib/utils";
import Link from "next/link";

const Marque = async () => {
  const productsData = await getAllProducts();

  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.data || productsData?.products || [];

  const tickerItems = [...products, ...products];

  return (

  



    <div className="bg-[#072B20] text-white py-2 overflow-hidden border-b border-[#124B38] text-xs sm:text-sm">
      {/* Added flex-nowrap to guarantee a single continuous line */}
      <div className="animate-marquee flex items-center flex-nowrap gap-8 px-4 whitespace-nowrap">
        {tickerItems.map((item, index) => {
          const name = item.nameBn;
          const emoji = item.emoji;
          
          const price = Number(item.today ?? item.price ?? 0);
          const unit = item.unit === "kg" ? "কেজি" : item.unit || "কেজি";
          
          const changePct = Number(item.change?.pct ?? item.change ?? 0);
          const isUp = item.change?.dir === "up" || changePct > 0;
          const isDown = item.change?.dir === "down" || changePct < 0;

          return (

            <Link
              key={`${item.slug || index}-${index}`}
              href={`/product/${item.slug || "item"}`}
              className="inline-flex items-center gap-2 whitespace-nowrap hover:opacity-80 transition-opacity shrink-0"
            >
              <span>{emoji}</span>
              <span className="font-medium text-white">{name}</span>
              <span className="text-[#9FE1CB]">
                {toBanglaNumber(price)} টাকা/{unit}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                  isUp
                    ? "text-[#5DCAA5] bg-[#0E5A42]/60"
                    : isDown
                    ? "text-[#F1948A] bg-[#78281F]/60"
                    : "text-gray-300 bg-gray-700/50"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"} {toBanglaNumber(Math.abs(changePct))}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
   
  );
};

export default Marque;