import "./globals.css";
import type { ReactNode } from "react";
import StarfieldCanvas from "@/components/StarfieldCanvas";
import MeteorShower from "@/components/MeteorShower";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <StarfieldCanvas />
        <MeteorShower intensity={200} showBackground={false} />
        <div style={{ position: "relative", zIndex: 10 }}>
          {children}
        </div>
        {/** 之後可在這裡加入更高層的漂浮元件（可點擊） **/}
        {/** <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 20 }}>
              <FloatingMumbao />
            </div> **/}
      </body>
    </html>
  );
}
