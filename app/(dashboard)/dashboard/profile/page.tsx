"use client";

import { useI18n } from "@/lib/i18n";
import { Camera } from "lucide-react";

export default function ProfilePage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">{t.dashboard.profileTitle}</h1>
        <p className="mt-1 text-sm text-foreground/50">{t.dashboard.profileDesc}</p>
      </div>

      <div className="rounded-2xl bg-white border border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-extrabold text-primary">
              JD
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white cursor-pointer">
              <Camera size={12} />
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
            <input type="text" defaultValue="John Doe" className="w-full rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">Email</label>
            <input type="email" defaultValue="john@example.com" className="w-full rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">Bio</label>
            <textarea rows={3} defaultValue="Full-stack developer & UI/UX designer based in Jakarta." className="w-full rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground outline-none resize-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10" />
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
          <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
