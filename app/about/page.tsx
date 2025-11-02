import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--bg-main)] min-h-screen py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-[var(--title-main)] mb-8">
            關於我們
          </h1>
          
          <div className="prose prose-lg max-w-none text-[var(--text-main)] space-y-6">
            <p className="leading-7">
              在慢節奏的生活中，找到屬於自己的時光。慢慢蒔光致力於打造一個讓人放鬆、療癒的空間，
              讓每一位訪客都能在繁忙的生活中，找回內心的平靜與美好。
            </p>
            
            <p className="leading-7">
              我們相信，什麼都不做，也值得被愛。在這裡，時間不再是壓力，而是可以慢慢品味的美好。
            </p>
            
            <h2 className="text-2xl font-semibold text-[var(--title-main)] mt-8 mb-4">
              我們的理念
            </h2>
            <p className="leading-7">
              慢慢蒔光以「慢活」為核心理念，希望每位訪客都能在這個空間中找到屬於自己的節奏。
              我們提供的不僅是一個住宿的地方，更是一個可以讓心靈休息、重新充電的空間。
            </p>
            
            <h2 className="text-2xl font-semibold text-[var(--title-main)] mt-8 mb-4">
              環境與設施
            </h2>
            <p className="leading-7">
              我們的空間設計融合了自然元素與現代舒適，每個房間都經過精心設計，
              希望能為您帶來最舒適的住宿體驗。無論是想要安靜閱讀、觀星、或是與寵物共度時光，
              這裡都能滿足您的需求。
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-[var(--border-main)]/30">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--accent-main)] hover:underline"
            >
              ← 返回首頁
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
