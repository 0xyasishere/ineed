"use client";

import { useI18n } from "@/lib/i18n";
import { CameraIcon } from "@/components/icons";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-manga text-foreground">👤 {t.dashboard.profileTitle}</h1>
        <p className="mt-1 text-sm text-foreground/50">{t.dashboard.profileDesc}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="manga-panel bg-white p-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-extrabold text-primary">
              JD
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white cursor-pointer">
              <CameraIcon size={12} />
            </button>
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-foreground">John Doe</h2>
            <p className="text-sm text-foreground/50">john@example.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">Full Name</label>
            <input type="text" defaultValue="John Doe" className="w-full manga-outline bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">Email</label>
            <input type="email" defaultValue="john@example.com" className="w-full manga-outline bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">Bio</label>
            <textarea rows={3} defaultValue="Full-stack developer & UI/UX designer based in Jakarta." className="w-full manga-outline bg-white px-4 py-2.5 text-sm text-foreground outline-none resize-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">Skills</label>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Figma", "Tailwind"].map((skill) => (
                <span key={skill} className="inline-flex rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {skill}
                </span>
              ))}
              <button className="inline-flex rounded-lg bg-muted px-3 py-1 text-xs font-bold text-foreground/50 hover:bg-muted/80 cursor-pointer">
                + Add
              </button>
            </div>
          </div>
          <button className="manga-outline-sm bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg cursor-pointer">
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
