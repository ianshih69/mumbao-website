"use client";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import RoomCard from "@/components/RoomCard";
import Image from "next/image";
import { rooms } from "@/data/rooms";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <NavBar />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              慢慢蒔光・<span className="text-yellow-700">MUMBAO</span> Stay
            </h1>
            <div className="mt-6 flex gap-3">
              <a href="#booking" className="rounded-full px-4 py-2 bg-yellow-600 text-white hover:opacity-90 shadow-sm">立即預約</a>
              <a href="#rooms" className="rounded-full px-4 py-2 border hover:bg-white">看房型</a>
            </div>
          </motion.div>
          <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden border border-amber-100 shadow-lg">
            <Image src="/hero.jpg" alt="MUMBAO Stay Hero" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-white text-lg md:text-xl drop-shadow">「什麼都不做，也值得被愛。」</p>
            </div>
          </div>
        </div>
      </section>

      {/* 房型 */}
      <section id="rooms" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold">房型一覽</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((r, idx) => (
            <motion.div
              key={r.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.08 }}
            >
              <RoomCard slug={r.slug} title={r.title} desc={r.desc} image={r.image} features={r.features} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 品牌敘事 */}
      <section id="story" className="bg-amber-50/60">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold">慢寶宇宙</h2>
          <p className="mt-4 text-zinc-700 leading-7">
            關鍵字：療癒、宇宙、慢寶、雲朵、光。以奶油白為基底，
            金色作為重點色，雲朵圓角與柔和陰影帶來被守護的安心感。
          </p>
        </div>
      </section>

      {/* 訂房／聯絡 */}
      <section id="booking" className="bg-amber-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-semibold">訂房與聯絡</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border bg-white p-5">
              <p className="text-sm text-zinc-700">想直接下訂？加入 LINE 詢問空房或索取官方訂房表。</p>
              <a className="mt-4 inline-block rounded-xl px-4 py-2 bg-black text-white" href="#">
                加入 LINE 官方
              </a>
            </div>
            <div className="rounded-2xl border bg-white p-5" id="contact">
              <p className="text-sm text-zinc-700">E-mail：hello@mumbao.studio</p>
              <p className="text-sm text-zinc-700 mt-2">地址：宜蘭員山（完成訂房後提供詳細位置）</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
