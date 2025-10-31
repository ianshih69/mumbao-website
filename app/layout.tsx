import "./globals.css";
import type { ReactNode } from "react";
import StarfieldCanvas from "@/components/StarfieldCanvas";
import MeteorShower from "@/components/MeteorShower";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        {/* 背景特效：星空 + 流星 */}
        <StarfieldCanvas />
        <MeteorShower intensity={200} showBackground={false} />

        {/* 主要內容層，確保網站本體在特效之上 */}
        <div style={{ position: "relative", zIndex: 10 }}>
          {children}
        </div>

        {/* 吉祥物：雲 + 抹布 */}
        <div className="mascot-fly-anim pointer-events-none">
          {/* 外層容器：決定抹布的整體大小（我們保留原來大小） */}
          <div className="relative w-32 sm:w-40 md:w-48">
            {/* 雲：只縮雲，讓雲不要那麼大。用 w-[80%] 控制大小，mx-auto 置中 */}
            <img
              src="/images/cloud.png"
              alt="cloud"
              className="
                block
                w-[65%] h-auto
                mx-auto
                cloud-bob-anim
              "
              loading="lazy"
              decoding="async"
            />

            {/* 抹布角色：維持原本大小，不縮。重新定位腳在雲上 */}
            <img
              src="/images/dog.png"
              alt="dog"
              className="
                absolute
                left-1/2
                bottom-[50%]
                w-[50%] h-auto
                dog-idle-anim
              "
              style={{ transform: 'translateX(-50%)' }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </body>
    </html>
  );
}
