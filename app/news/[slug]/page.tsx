import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// 示例新闻数据（后续可以移到 data 文件或 API）
const newsData: Record<string, { title: string; date: string; content: string; image: string }> = {
  "news-1": {
    title: "春日慢活之旅開跑",
    date: "2025-03-15",
    content: `
      <p>迎接春暖花開的季節，我們準備了特別的慢活體驗活動，讓您在悠閒的步調中感受大自然的美好。</p>
      <p>活動期間，我們將舉辦多場戶外體驗課程，包括自然觀察、手作工坊等，讓您在放鬆的同時也能獲得滿滿的收穫。</p>
      <p>歡迎所有對慢活生活有興趣的朋友報名參加，讓我們一起在春日中感受時光的美好。</p>
    `,
    image: "/images/page1.jpg",
  },
  "news-2": {
    title: "全新房型即將開放",
    date: "2025-03-10",
    content: `
      <p>我們正在準備一間全新的星空套房，擁有絕佳的觀星視角，敬請期待！</p>
      <p>這間套房特別設計了天窗，讓您在夜晚可以躺在床上欣賞滿天星空。房間內也配備了專業的觀星設備，讓您能夠更深入地探索宇宙的奧秘。</p>
    `,
    image: "/images/page1.jpg",
  },
  "news-3": {
    title: "寵物友善設施升級",
    date: "2025-03-05",
    content: `
      <p>為了讓毛孩們也能享受舒適的住宿體驗，我們新增了多項寵物友善設施。</p>
      <p>包括專屬的寵物備品、戶外活動區域、以及貼心的寵物照護服務。我們希望每一位訪客，包括毛孩們，都能在這裡度過愉快的時光。</p>
    `,
    image: "/images/page1.jpg",
  },
};

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = newsData[params.slug];
  
  if (!news) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="bg-[var(--bg-main)] min-h-screen py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[var(--accent-main)] hover:underline mb-8"
          >
            ← 返回最新消息
          </Link>
          
          <article>
            <p className="text-sm text-[var(--text-main)]/70 mb-4">
              {news.date}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold text-[var(--title-main)] mb-8">
              {news.title}
            </h1>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[var(--border-main)] mb-8">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div 
              className="prose prose-lg max-w-none text-[var(--text-main)] space-y-6"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

