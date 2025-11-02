import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  // 示例新闻数据（后续可以移到 data 文件）
  const newsItems = [
    {
      slug: "news-1",
      title: "春日慢活之旅開跑",
      date: "2025-03-15",
      excerpt: "迎接春暖花開的季節，我們準備了特別的慢活體驗活動，讓您在悠閒的步調中感受大自然的美好。",
      image: "/images/page1.jpg",
    },
    {
      slug: "news-2",
      title: "全新房型即將開放",
      date: "2025-03-10",
      excerpt: "我們正在準備一間全新的星空套房，擁有絕佳的觀星視角，敬請期待！",
      image: "/images/page1.jpg",
    },
    {
      slug: "news-3",
      title: "寵物友善設施升級",
      date: "2025-03-05",
      excerpt: "為了讓毛孩們也能享受舒適的住宿體驗，我們新增了多項寵物友善設施。",
      image: "/images/page1.jpg",
    },
    {
      slug: "news-4",
      title: "週末特別活動預告",
      date: "2025-03-01",
      excerpt: "本週末將舉辦星空觀測活動，歡迎所有對天文有興趣的朋友一同參與。",
      image: "/images/page1.jpg",
    },
  ];

  return (
    <>
      <Header />
      <main className="bg-[var(--bg-main)] min-h-screen py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-[var(--title-main)] mb-12 text-center">
            最新消息
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <article
                key={item.slug}
                className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)] overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video bg-[var(--bg-card)]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-[var(--text-main)]/70 mb-2">
                    {item.date}
                  </p>
                  <h2 className="text-lg font-semibold text-[var(--title-main)] mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-[var(--text-main)] leading-6 mb-4 line-clamp-2">
                    {item.excerpt}
                  </p>
                  <Link
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-[var(--accent-main)] hover:underline"
                  >
                    閱讀更多 →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

