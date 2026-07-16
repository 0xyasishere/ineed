"use client";

import { motion } from "framer-motion";
import { Shield, Clock, CreditCard, HeadphonesIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const icons = [Shield, CreditCard, Clock, HeadphonesIcon];

export function TrustSection() {
  const { t } = useI18n();

  const features = [
    { title: t.trust.verified, desc: t.trust.verifiedDesc },
    { title: t.trust.payments, desc: t.trust.paymentsDesc },
    { title: t.trust.delivery, desc: t.trust.deliveryDesc },
    { title: t.trust.support, desc: t.trust.supportDesc },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-manga tracking-wide text-foreground" style={{ textShadow: "3px 3px 0 var(--color-border)" }}>
          {t.trust.title}
        </h2>
        <p className="mt-3 text-foreground/60 text-sm max-w-md mx-auto font-medium">
          {t.trust.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -4, rotate: 1 }}
              className="manga-panel bg-white p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center manga-outline-sm bg-primary/10">
                <Icon size={24} className="text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs text-foreground/60 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
