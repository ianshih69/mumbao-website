

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-main)] bg-[var(--bg-card)] text-[var(--text-main)]">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <a href="#" className="underline underline-offset-4">LINE 官方</a>
            <a href="mailto:hello@mumbao.studio" className="underline underline-offset-4">E-mail</a>
            <span className="opacity-90">版權聲明</span>
          </div>
          <p>© 2025 MUMBAO Studio</p>
        </div>
      </div>
    </footer>
  );
}
