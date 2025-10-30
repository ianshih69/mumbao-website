import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-semibold">慢寶宇宙的誕生</h1>
        <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-amber-100 bg-amber-50 shadow-lg">
            <Image src="/mumbao.png" alt="慢寶" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <div>
            <p className="text-zinc-700 leading-7">
              慢寶是來自宇宙的小無尾熊，象徵療癒與願望守護。當你感到心累或步伐太快，
              牠會把你輕輕抱進雲朵裡，提醒你：慢慢來也值得被愛。
            </p>
            <p className="mt-4 text-zinc-700 leading-7">
              在奶油白的宇宙背景中，柔和的陰影與雲朵圓角承載著光；金色點亮願望，
              陪你靜靜把心安放好，重新出發。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


