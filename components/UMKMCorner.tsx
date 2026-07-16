"use client";

import { motion } from "framer-motion";
import { Rocket, Store, TrendingUp, Star, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function UMKMCorner() {
  const { t } = useI18n();

  const umkmFeatures = [
    { icon: Store, title: t.umkm.feat1Title, desc: t.umkm.feat1Desc },
    { icon: TrendingUp, title: t.umkm.feat2Title, desc: t.umkm.feat2Desc },
    { icon: Star, title: t.umkm.feat3Title, desc: t.umkm.feat3Desc },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative overflow-hidden manga-panel bg-gradient-to-br from-accent via-accent/90 to-gold p-8 sm:p-12"
      >
        {/* Halftone overlay */}
        <div className="absolute inset-0 halftone" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-4xl"
            >
              🚀
            </motion.span>
            <h2 className="text-2xl sm:text-3xl font-manga tracking-wide text-foreground" style={{ textShadow: "2px 2px 0 rgba(45,138,86,0.15)" }}>
              UMKM Power-Up!
            </h2>
          </div>
          <p className="text-sm font-medium text-foreground/70 max-w-md mb-8">
            {t.umkm?.subtitle || "Bisnis naik level! Bergabung dan naikkan level bisnismu."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {umkmFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="manga-outline-sm bg-white/80 backdrop-blur-sm p-4 cursor-pointer"
                >
                  <div className="flex h-10 w-10 items-center justify-center manga-outline-sm bg-primary/10 mb-3">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{feat.title}</h3>
                  <p className="mt-1 text-xs text-foreground/60">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.95 }}
            className="manga-outline-sm bg-foreground text-white px-6 py-3 text-sm font-bold cursor-pointer flex items-center gap-2"
          >
            {t.umkm?.cta || "Gabung Sekarang"}
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
