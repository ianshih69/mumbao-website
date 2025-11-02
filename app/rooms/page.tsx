import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoomCard from "@/components/RoomCard";
import { rooms } from "@/data/rooms";

export default function RoomsPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--bg-main)] min-h-screen py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-[var(--title-main)] mb-4">房型介紹</h1>
          <p className="text-[var(--text-main)] mb-8">挑選最適合你的雲朵小窩。</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((r) => (
              <RoomCard key={r.slug} slug={r.slug} title={r.title} desc={r.desc} image={r.image} features={r.features} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}




