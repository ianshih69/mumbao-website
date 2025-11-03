import "./globals.css";
import type { ReactNode } from "react";
import StarfieldCanvas from "@/components/StarfieldCanvas";
import MeteorShower from "@/components/MeteorShower";
import FlyingMascot from "@/components/FlyingMascot"; // ← 新增這行

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <StarfieldCanvas />
        <MeteorShower intensity={200} showBackground={false} />

        <div style={{ position: "relative", zIndex: 10 }}>{children}</div>

        {/* JS 驅動版的飛行慢寶 */}
        <FlyingMascot />
      </body>
    </html>
  );
}
