"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { PanelExplosion, SpeedLines, HalftoneOverlay } from "@/components/manga/Elements";

export function UMKMCorner() {
  const { t, locale } = useI18n();

  const features = [
    { icon: "🏪", title: t.umkm.feat1Title, desc: t.umkm.feat1Desc },
    { icon: "📊", title: t.umkm.feat2Title, desc: t.umkm.feat2Desc },
    { icon: "🏅", title: t.umkm.feat3Title, desc: t.umkm.feat3Desc },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      <SpeedLines count={8} />
      <HalftoneOverlay className="!opacity-[0.04]" />

      <span className="absolute top-4 right-[6%] font-manga text-primary/[0.06] text-6xl sm:text-7xl select-none pointer-events-none">UMKM!</span>
      <span className="absolute bottom-4 left-[4%] font-manga text-accent/[0.05] text-5xl select-none pointer-events-none">GO!</span>

      <PanelExplosion>
        <div className="relative manga-panel bg-accent/10 p-8 sm:p-10">
          <SpeedLines count={10} className="!opacity-30" />
          <span className="absolute top-3 left-6 font-manga text-foreground/[0.04] text-5xl sm:text-6xl select-none pointer-events-none">POWER</span>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-block manga-outline-sm bg-accent px-3 py-1 font-manga text-xs text-white tracking-widest mb-3" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}>
                ★ SPECIAL
              </span>
              <h2 className="font-manga text-3xl sm:text-4xl tracking-wide text-foreground" style={{ textShadow: "3px 3px 0 rgba(232,168,73,0.15)" }}>
                {locale === "id" ? "Sudah Punya Toko Online?" : "Have an Online Store?"}
              </h2>
              <p className="mt-2 text-sm text-foreground/65 font-medium max-w-lg">{t.umkm.subtitle}</p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-3">
              {features.map((feature, i) => (
                <PanelExplosion key={i}>
                  <motion.div
                    whileHover={{ scale: 1.04, y: -3, rotate: i === 1 ? -1 : i === 2 ? 1 : 0 }}
                    className="manga-panel bg-white p-5 cursor-default group"
                  >
                    <motion.span
                      className="inline-block text-3xl mb-3"
                      whileHover={{ scale: 1.3, rotate: 15 }}
                    >
                      {feature.icon}
                    </motion.span>
                    <h3 className="font-manga tracking-wide text-sm" style={{ textShadow: "1px 1px 0 rgba(232,168,73,0.1)" }}>
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-foreground/55 leading-relaxed font-medium">{feature.desc}</p>

                    <div className="mt-3 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div
                          key={j}
                          className="h-px bg-accent/40"
                          style={{ width: `${20 + j * 8}px` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </PanelExplosion>
              ))}
            </div>
          </div>
        </div>
      </PanelExplosion>
    </section>
  );
}
