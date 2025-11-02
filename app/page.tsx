"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoomCard from "@/components/RoomCard";
import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/data/rooms";

export default function Home() {
  const newsItems = [
    {
      slug: "news-1",
      title: "春日慢活之旅開跑",
      date: "2025-03-15",
      excerpt:
        "迎接春暖花開的季節，我們準備了特別的慢活體驗活動，讓您在悠閒的步調中感受大自然的美好。",
      image: "/images/page1.jpg",
    },
    {
      slug: "news-2",
      title: "全新房型即將開放",
      date: "2025-03-10",
      excerpt:
        "我們正在準備一間全新的星空套房，擁有絕佳的觀星視角，敬請期待！",
      image: "/images/page1.jpg",
    },
    {
      slug: "news-3",
      title: "寵物友善設施升級",
      date: "2025-03-05",
      excerpt:
        "為了讓毛孩們也能享受舒適的住宿體驗，我們新增了多項寵物友善設施。",
      image: "/images/page1.jpg",
    },
  ];

  return (
    <>
      {/* [0] Header */}
      <Header />

      {/* [1] Hero Section */}
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/page1.jpg"
            alt="MUMBAO Stay Hero"
            fill
            className="object-cover"
            priority
          />
          {/* 底部深色半透明遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* 播放按鈕 */}
        <div className="relative z-10 w-full pb-12 px-4 md:px-8">
          <div className="mx-auto max-w-6xl flex justify-start md:justify-start">
            <button
              className="group relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all flex items-center justify-center"
              aria-label="播放介紹影片"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
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
              rounded-xl
              border border-[var(--border-main)]/40
              bg-[var(--bg-card)]
              overflow-hidden
              shadow-[0_8px_24px_rgba(0,0,0,0.2)]
            ">
              <Image
                src="/images/page1.jpg"
                alt="關於我們"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
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


      {/* [3] 最新消息（Wandering Walls 版） */}
      <section className="bg-[#A4835E] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-4">

          {/* 標題：細字、超大字距、置中 */}
          <h2
            className="
              text-[#1a1a1a]
              text-xl md:text-2xl
              font-normal
              leading-none
              tracking-[0.4em]
              text-center
              mb-12 md:mb-14
            "
          >
            最 新 消 息
          </h2>

          {/* 兩欄卡片：桌機 2 欄，手機只顯示第 1 欄 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-12">

            {newsItems.slice(0, 2).map((item, idx) => (
              <article
                key={item.slug}
                className={
                  // 第一則：永遠顯示
                  // 第二則：只有 md(>=768px) 以上才顯示
                  idx === 0
                    ? "flex flex-col"
                    : "hidden md:flex flex-col"
                }
              >
                {/* 圖片區：大圖，無圓角，佔滿寬度，比例 6:5 */}
                <div
                  className="
                    relative
                    w-full
                    overflow-hidden
                    bg-black/10
                    aspect-[6/5]    /* 寬 : 高 = 6 : 5，接近他們首頁視覺那種「房子/食物大圖」的高度感 */
                  "
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* 文字區 */}
                <div className="mt-4">
                  {/* 標題（粗度正常，接近官網那種不加粗 / 不花俏） */}
                  <Link
                    href={`/news/${item.slug}`}
                    className="
                      block
                      text-[#1a1a1a]
                      text-base md:text-lg
                      leading-snug
                      font-normal
                    "
                  >
                    {item.title}
                  </Link>

                  {/* 日期（淡一階、縮寫成 2025.08.01 這種格式） */}
                  <p
                    className="
                      mt-2
                      text-[#1a1a1a]/70
                      text-sm
                      leading-relaxed
                      tracking-wide
                    "
                  >
                    {item.date.replace(/-/g, ".")}
                  </p>
                </div>
              </article>
            ))}

          </div>

          {/* 更多 + 置中 */}
          <div className="text-center">
            <Link
              href="/news"
              className="
                inline-flex items-center gap-1
                text-[#1a1a1a]
                text-sm md:text-base
                leading-none
              "
            >
              <span>更多</span>
              <span>＋</span>
            </Link>
          </div>

        </div>
      </section>


      {/* [4] 房型介紹（上方分隔線，不滿版） */}
      <section className="bg-[#A4835E] py-16 md:py-24">
        {/* 分隔線，對齊內容寬度，不全螢幕 */}
        <div className="max-w-6xl mx-auto h-px bg-white/50 mb-12 px-4"></div>

        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-normal tracking-[0.15em] text-[var(--title-main)] mb-8 text-center">
            房型介紹
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {rooms.slice(0, 6).map((room) => (
              <RoomCard
                key={room.slug}
                slug={room.slug}
                title={room.title}
                desc={room.desc}
                image={room.image}
                features={room.features}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-main)] bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--accent-main)] hover:text-white transition-colors font-medium shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
            >
              查看全部房型 →
            </Link>
          </div>
        </div>
      </section>

      {/* [5] 線上訂房 CTA */}
      <section className="bg-[var(--bg-card)] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-normal tracking-[0.15em] text-[var(--title-main)] mb-4 text-center">
            線上訂房
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
