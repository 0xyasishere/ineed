"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import {
  LayoutDashboard,
  FileText,
  Send,
  MessageCircle,
  Wallet,
  Megaphone,
  User,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();

  const links = [
    { label: t.dashboard.overview, href: "/dashboard", icon: LayoutDashboard },
    { label: t.dashboard.myPosts, href: "/dashboard/my-posts", icon: FileText },
    { label: t.dashboard.proposals, href: "/dashboard/proposals", icon: Send },
    { label: t.dashboard.messages, href: "/dashboard/messages", icon: MessageCircle },
    { label: t.dashboard.earnings, href: "/dashboard/earnings", icon: Wallet },
    { label: t.dashboard.campaigns, href: "/dashboard/campaigns", icon: Megaphone },
    { label: t.dashboard.profile, href: "/dashboard/profile", icon: User },
    { label: t.dashboard.settings, href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col bg-white border-r border-border">
      <div className="flex h-16 items-center gap-2.5 px-6 border-b border-border">
        <Image
          src="/images/ineed-logo.jpg"
          alt="ineed"
          width={32}
          height={32}
          className="h-8 w-8 rounded-lg object-cover"
          priority
        />
        <span className="text-base font-extrabold text-foreground">ineed</span>
        <span className="ml-auto text-[10px] font-bold text-foreground/40 bg-muted rounded-full px-2 py-0.5">
          {t.nav.dashboard}
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/60 hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground/60 transition-all duration-200 hover:bg-muted hover:text-foreground cursor-pointer"
        >
          <ChevronLeft size={18} />
          {t.dashboard.backToHome}
        </Link>
        <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-destructive transition-all duration-200 hover:bg-destructive/10 cursor-pointer w-full">
          <LogOut size={18} />
          {t.dashboard.signOut}
        </button>
      </div>
    </aside>
  );
}
