import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-semibold text-[var(--title-main)]">聯絡我們</h1>
        <form className="mt-8 grid gap-4 max-w-xl">
          <div>
            <label className="block text-sm text-[var(--text-main)]">姓名</label>
            <input className="mt-1 w-full rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-3 py-2 text-[var(--text-main)]" placeholder="請輸入姓名" />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-main)]">Email</label>
            <input type="email" className="mt-1 w-full rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-3 py-2 text-[var(--text-main)]" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-main)]">留言</label>
            <textarea rows={5} className="mt-1 w-full rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] px-3 py-2 text-[var(--text-main)]" placeholder="想對慢寶說的話…" />
          </div>
          <button type="button" className="mt-2 rounded-full px-5 py-2 bg-[var(--accent-main)] text-white shadow-sm border border-[var(--border-main)]">送出</button>
        </form>
      </main>
      <Footer />
    </>
  );
}


