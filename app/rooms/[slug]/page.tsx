import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { rooms } from "@/data/rooms";

type Props = { params: { slug: string } };

export default function RoomDetailPage({ params }: Props) {
  const room = rooms.find((r) => r.slug === params.slug);
  if (!room) return notFound();

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-amber-100 bg-amber-50">
            <Image src={room.image} alt={room.title} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-wide">
              {room.title}
            </h1>
            <p className="mt-3 text-zinc-700">{room.desc}</p>

            {room.features?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {room.features.map((f) => (
                  <span key={f} className="rounded-full px-3 py-1 text-xs bg-amber-50 text-amber-700 border border-amber-100">
                    {f}
                  </span>
                ))}
              </div>
            ) : null}

            <a href="#booking" className="mt-8 inline-block rounded-full px-5 py-2 bg-yellow-600 text-white shadow-sm">
              預約此房型
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}




