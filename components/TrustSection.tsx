"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { PanelExplosion, HalftoneOverlay, SpeedLines } from "@/components/manga/Elements";
import { ShieldIcon, ClockIcon, StarIcon, HeadphonesIcon } from "@/components/icons";

const icons = [ShieldIcon, ClockIcon, StarIcon, HeadphonesIcon];

export function TrustSection() {
  const { t, locale } = useI18n();

  const items = [
    { title: t.trust.verified, desc: t.trust.verifiedDesc },
    { title: t.trust.payments, desc: t.trust.paymentsDesc },
    { title: t.trust.delivery, desc: t.trust.deliveryDesc },
    { title: t.trust.support, desc: t.trust.supportDesc },
  ];

  return (
    <section className="relative bg-muted overflow-hidden">
      <SpeedLines count={10} />
      <HalftoneOverlay className="!opacity-[0.05]" />

      <span className="absolute top-6 right-[8%] font-manga text-foreground/[0.03] text-7xl sm:text-8xl select-none pointer-events-none tracking-wider">SECURE</span>
      <span className="absolute bottom-6 left-[5%] font-manga text-foreground/[0.03] text-6xl select-none pointer-events-none tracking-wider">SAFE</span>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block font-manga text-sm tracking-widest text-primary mb-3"
            style={{ textShadow: "2px 2px 0 rgba(45,138,86,0.15)" }}
          >
            ★ {locale === "id" ? "MENGAPA KAMI" : "WHY US"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-manga text-3xl sm:text-4xl tracking-wide"
          >
            <span className="text-foreground" style={{ textShadow: "3px 3px 0 rgba(45,138,86,0.15)" }}>
              {t.trust.title}
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <PanelExplosion key={i}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -4, rotate: i % 2 === 0 ? 1 : -1 }}
                  className="manga-panel bg-white p-5 sm:p-6 text-center cursor-default group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center manga-outline bg-primary/10 text-primary"
                  >
                    <Icon size={26} />
                  </motion.div>
                  <h3 className="font-manga tracking-wide text-sm" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.1)" }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-foreground/55 leading-relaxed font-medium">{item.desc}</p>

                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-0.5 w-16 mx-auto bg-primary/30" />
                    <div className="h-px w-12 mx-auto bg-primary/20 mt-1" />
                    <div className="h-px w-8 mx-auto bg-primary/10 mt-1" />
                  </div>
                </motion.div>
              </PanelExplosion>
            );
          })}
        </div>
      </div>
    </section>
  );
}
