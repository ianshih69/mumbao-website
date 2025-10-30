
export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-amber-50/70 backdrop-blur border-b">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <a href="/" className="font-semibold tracking-wide">MUMBAO Stay</a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="/rooms" className="hover:opacity-70">房型介紹</a>
          <a href="/about" className="hover:opacity-70">關於慢寶</a>
          <a href="/contact" className="hover:opacity-70">聯絡我們</a>
          <a href="#booking" className="rounded-full px-3 py-1.5 bg-yellow-600 text-white hover:opacity-90 shadow-sm">預約訂房</a>
        </div>
      </nav>
    </header>
  );
}
