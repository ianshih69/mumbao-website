import Image from "next/image";

type Props = {
  slug: string;
  title: string;
  desc: string;
  image: string;
  features?: string[];
};

export default function RoomCard({ slug, title, desc, image, features = [] }: Props) {
  return (
    <div className="group rounded-3xl border bg-white overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.03)] hover:shadow-md transition">
      <div className="relative aspect-video bg-amber-50">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="font-medium tracking-wide">{title}</h3>
        <p className="text-sm text-zinc-600 mt-1">{desc}</p>
        {features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {features.map((f) => (
              <span key={f} className="rounded-full px-2.5 py-1 text-xs bg-amber-50 text-amber-700 border border-amber-100">
                {f}
              </span>
            ))}
          </div>
        )}
        <a href={`/rooms/${slug}`} className="inline-block mt-4 text-sm text-yellow-700 group-hover:underline">查看房型 →</a>
      </div>
    </div>
  );
}
