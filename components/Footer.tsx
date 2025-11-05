
export default function Footer() {
  return (
    <footer className="bg-[var(--bg-card)] text-[var(--text-main)] py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* 桌面端：原本的排版 */}
        <div className="hidden md:block">
          {/* 第一行：聯絡資訊 */}
          <div className="text-center text-sm mb-4">
            <span>TEL: +886 9876543210</span>
            <span className="mx-2">|</span>
            <span>ADD. : 264宜蘭縣員山鄉深洲二路158號</span>
            <span className="mx-2">|</span>
            <span>統編: 12345678</span>
          </div>

          {/* 第二行：社群媒體 */}
          <div className="text-center text-sm mb-4">
            <span className="mr-2">Follow us on:</span>
            <a href="#" className="inline-block mx-[5px]" aria-label="Facebook">
              <img src="/images/Facebook.webp" alt="Facebook" className="w-5 h-5 inline object-contain" />
            </a>
            <a href="#" className="inline-block mx-[5px]" aria-label="Instagram">
              <img src="/images/IG.webp" alt="Instagram" className="w-5 h-5 inline object-contain" />
            </a>
            <a href="#" className="inline-block mx-[5px]" aria-label="LINE">
              <img src="/images/LINE.webp" alt="LINE" className="w-5 h-5 inline object-contain" />
            </a>
            <a href="mailto:hello@thewanderingwalls.com" className="inline-block mx-[5px]" aria-label="Email">
              <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          {/* 第三行：版權資訊 */}
          <div className="text-center text-xs text-[var(--text-main)]/70">
            <span>Copyright © 2025 MUMBAO Studio all rights reserved.</span>
            <span className="mx-2">|</span>
            <a href="/sitemap" className="hover:underline">Sitemap</a>
            <span className="mx-2">|</span>
            <span>Design by Ian</span>
          </div>
        </div>

        {/* 手機端：垂直排列的排版 */}
        <div className="md:hidden text-center">
          {/* 聯絡資訊：每行一個項目 */}
          <div className="text-sm mb-4 space-y-2">
            <div>TEL : +886 9876543210</div>
            <div>ADD. : 264宜蘭縣員山鄉深洲二路158號</div>
            <div>統編 : 12345678</div>
          </div>

          {/* 社群媒體 */}
          <div className="text-sm mb-4">
            <span className="mr-2">Follow us on :</span>
            <a href="#" className="inline-block mx-[5px]" aria-label="Facebook">
              <img src="/images/Facebook.webp" alt="Facebook" className="w-5 h-5 inline object-contain" />
            </a>
            <a href="#" className="inline-block mx-[5px]" aria-label="Instagram">
              <img src="/images/IG.webp" alt="Instagram" className="w-5 h-5 inline object-contain" />
            </a>
            <a href="#" className="inline-block mx-[5px]" aria-label="LINE">
              <img src="/images/LINE.webp" alt="LINE" className="w-5 h-5 inline object-contain" />
            </a>
            <a href="mailto:hello@thewanderingwalls.com" className="inline-block mx-[5px]" aria-label="Email">
              <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          {/* 版權資訊：分成兩行 */}
          <div className="text-xs text-[var(--text-main)]/70 space-y-1">
            <div>Copyright © 2025 MUMBAO Studio all rights reserved.</div>
            <div>
              <span className="mx-2">|</span>
              <a href="/sitemap" className="hover:underline">Sitemap</a>
              <span className="mx-2">|</span>
              <span>Design by Ian</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
