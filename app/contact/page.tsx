import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-semibold">聯絡我們</h1>
        <form className="mt-8 grid gap-4 max-w-xl">
          <div>
            <label className="block text-sm text-zinc-700">姓名</label>
            <input className="mt-1 w-full rounded-xl border bg-white px-3 py-2" placeholder="請輸入姓名" />
          </div>
          <div>
            <label className="block text-sm text-zinc-700">Email</label>
            <input type="email" className="mt-1 w-full rounded-xl border bg-white px-3 py-2" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm text-zinc-700">留言</label>
            <textarea rows={5} className="mt-1 w-full rounded-xl border bg-white px-3 py-2" placeholder="想對慢寶說的話…" />
          </div>
          <button type="button" className="mt-2 rounded-full px-5 py-2 bg-yellow-600 text-white shadow-sm">送出</button>
        </form>
      </main>
      <Footer />
    </>
  );
}


