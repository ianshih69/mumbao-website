"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LatestNewsSection from "@/components/LatestNewsSection";
import Image from "next/image";
import HeroRotator from "@/components/HeroRotator";
import RoomsMosaic from "@/components/RoomsMosaic";

export default function Home() {

  return (
    <>
      {/* [0] Header */}
      <Header />

      {/* [1] Hero Section */}
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <HeroRotator />
          {/* 底部深色半透明遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

      </section>

      {/* [2] About Section - 使用和 Header 一樣的背景圖 */}
      <section
        className="
          relative
          border-t border-[var(--border-main)]/30
          py-16 md:py-24
          bg-cover bg-center bg-no-repeat
        "
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        {/* 很淡很淡的奶油遮罩，為了讓字跟卡片讀得清楚，但不會把背景整個蓋掉 */}
        <div className="absolute inset-0 bg-[var(--bg-header)]/10 pointer-events-none"></div>

        {/* 內容本體，要用 relative 才不會被遮罩蓋掉 */}
        <div className="relative mx-auto max-w-6xl px-4 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-start">
          
          {/* 左邊：圖片卡片 */}
          <div className="md:w-1/2 w-full">
            <div className="
              relative
              border border-[var(--border-main)]/40
              bg-[var(--bg-card)]
              overflow-hidden
              shadow-[0_8px_24px_rgba(0,0,0,0.2)]
              aspect-[3/2]
            ">
              <Image
                src="/images/page2/page2.webp"
                alt="關於我們"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 右邊：純文字敘述（沒有「關於我們」大標題） */}
          <div className="md:w-1/2 w-full text-[var(--text-main)] leading-relaxed space-y-6 text-base md:text-lg">
            <p>
              在慢節奏的生活中，找到屬於自己的時光。慢慢蒔光致力於打造一個讓人放鬆、
              療癒的空間，讓每一位訪客都能在繁忙的生活中，找到內心的平靜與美好。
            </p>
            <p>
              我們相信，什麼都不做，也值得被愛。在這裡，時間不再是壓力，而是可以慢慢
              品味的美好。
            </p>

            <a
              href="/about"
              className="inline-block text-[var(--accent-main)] hover:underline transition-colors font-medium"
            >
              閱讀更多 →
            </a>
          </div>
        </div>
      </section>


      {/* [3] 最新消息 */}
      <LatestNewsSection />

      {/* 第三圖頁與第四圖頁之間的白色分隔線 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 h-[1px] bg-white/50 -mt-2 md:-mt-5 mb-0"></div>

      {/* [4] 房型馬賽克輪播 */}
      <div className="-mt-2 md:-mt-5">
        <RoomsMosaic />
      </div>

      {/* [5] 線上訂房 CTA */}
      <section className="bg-[var(--bg-card)] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-normal tracking-[0.15em] text-[var(--title-main)] mb-4 text-center">
            線上訂房2
          </h2>
          <p className="text-[var(--text-main)] leading-7 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            想直接下訂？加入 LINE 詢問空房或索取官方訂房表。
          </p>
          <a
            href="#booking"
            className="inline-block px-8 py-4 rounded-full bg-[var(--accent-main)] text-white hover:opacity-90 transition-opacity shadow-lg border border-[var(--border-main)] font-medium text-sm md:text-base"
          >
            立即訂房
          </a>
        </div>
      </section>

      {/* [6] Footer */}
      <Footer />
    </>
  );
}
