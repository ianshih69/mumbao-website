import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--bg-main)] min-h-screen py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-[var(--title-main)] mb-8">
            隱私政策
          </h1>
          
          <div className="prose prose-lg max-w-none text-[var(--text-main)] space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-[var(--title-main)] mt-8 mb-4">
                資料收集與使用
              </h2>
              <p className="leading-7">
                我們重視您的隱私權。本網站僅會收集必要的個人資料，用於提供服務及改善使用者體驗。
                我們承諾不會將您的個人資料提供給第三方，除非獲得您的同意或法律要求。
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-[var(--title-main)] mt-8 mb-4">
                Cookie 使用
              </h2>
              <p className="leading-7">
                本網站可能會使用 Cookie 來改善使用者體驗，以及用於網站分析。
                您可以透過瀏覽器設定來管理 Cookie 的使用。
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-[var(--title-main)] mt-8 mb-4">
                聯絡我們
              </h2>
              <p className="leading-7">
                如果您對於本隱私政策有任何疑問，歡迎透過以下方式與我們聯絡：
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>E-mail: hello@mumbao.studio</li>
                <li>LINE 官方帳號</li>
              </ul>
            </section>
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

