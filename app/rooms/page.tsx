import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import RoomCard from "@/components/RoomCard";
import { rooms } from "@/data/rooms";

export default function RoomsPage() {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-semibold text-[var(--title-main)]">房型介紹</h1>
        <p className="mt-3 text-[var(--text-main)]">挑選最適合你的雲朵小窩。</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((r) => (
            <RoomCard key={r.slug} slug={r.slug} title={r.title} desc={r.desc} image={r.image} features={r.features} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}




