import React from "react";
import Image from "next/image";
import Link from "next/link";

// Mock news items data
const newsItems = [
  {
    title: "春日慢活之旅開跑",
    date: "2025-03-15",
    image: "/images/page1.jpg",
    slug: "news-1",
  },
  {
    title: "全新房型即將開放",
    date: "2025-03-10",
    image: "/images/page1.jpg",
    slug: "news-2",
  },
  {
    title: "寵物友善設施升級",
    date: "2025-03-05",
    image: "/images/page1.jpg",
    slug: "news-3",
  },
];

export default function LatestNewsSection() {
  // 只顯示前兩筆資料
  const displayedNews = newsItems.slice(0, 2);

  return (
    <section className="bg-[#A4835E] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4">
        {/* 區塊標題 */}
        <h2 className="text-white font-normal text-center tracking-[0.4em] text-xl md:text-2xl mb-12 md:mb-14">
          最 新 消 息
        </h2>

        {/* 最新消息列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-12">
          {displayedNews.map((item, index) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className={index === 0 ? "flex flex-col" : "hidden md:flex flex-col"}
            >
              {/* 大圖容器 */}
              <div className="group relative w-full overflow-hidden aspect-[6/5] bg-black/10 cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center transition-all duration-300 group-hover:scale-[1.03]"
                />
                {/* Hover 遮罩 + 詳細內容按鈕 */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="border border-white text-white text-base md:text-lg font-normal px-6 py-3 tracking-wide flex items-center gap-2 bg-transparent">
                    詳細內容 ＋
                  </div>
                </div>
              </div>

              {/* 卡片文字 */}
              <div className="mt-4">
                <h3 className="text-white font-normal text-base md:text-lg leading-snug">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm mt-2 leading-relaxed tracking-wide">
                  {item.date.replace(/-/g, ".")}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* 底部「更多 ＋」連結 */}
        <div className="text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-white leading-none text-sm md:text-base"
          >
            更多 ＋
          </Link>
        </div>
      </div>
    </section>
  );
}

