"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import {
  LayoutDashboardIcon,
  FileTextIcon,
  SendIcon,
  MessageIcon,
  WalletIcon,
  MegaphoneIcon,
  UserIcon,
  SettingsIcon,
  PlusIcon,
  ChevronLeftIcon,
  LogOutIcon,
} from "@/components/icons";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();

  const links = [
    { label: t.dashboard.overview, href: "/dashboard", icon: LayoutDashboardIcon },
    { label: t.dashboard.postINeed, href: "/dashboard/post", icon: PlusIcon },
    { label: t.dashboard.myPosts, href: "/dashboard/my-posts", icon: FileTextIcon },
    { label: t.dashboard.proposals, href: "/dashboard/proposals", icon: SendIcon },
    { label: t.dashboard.messages, href: "/dashboard/messages", icon: MessageIcon },
    { label: t.dashboard.earnings, href: "/dashboard/earnings", icon: WalletIcon },
    { label: t.dashboard.campaigns, href: "/dashboard/campaigns", icon: MegaphoneIcon },
    { label: t.dashboard.profile, href: "/dashboard/profile", icon: UserIcon },
    { label: t.dashboard.settings, href: "/dashboard/settings", icon: SettingsIcon },
  ];

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col bg-white border-r-[3px] border-foreground">
      <div className="flex h-16 items-center gap-2.5 px-6 border-b-[3px] border-foreground bg-primary/5">
        <Image
          src="/images/ineed-logo.jpg"
          alt="ineed"
          width={32}
          height={32}
          className="h-8 w-8 rounded-lg object-cover manga-outline-sm"
          priority
        />
        <span className="text-base font-manga tracking-wider text-foreground">ineed</span>
        <span className="ml-auto text-[10px] font-bold text-white bg-primary px-2 py-0.5 manga-outline-sm">
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
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer border-2 ${
                isActive
                  ? "bg-primary/10 text-primary border-primary/30 shadow-[2px_2px_0_var(--color-primary)]"
                  : "text-foreground/60 hover:bg-muted hover:text-foreground border-transparent hover:border-foreground/10"
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t-[3px] border-foreground space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-foreground/60 transition-all duration-200 hover:bg-muted hover:text-foreground cursor-pointer border-2 border-transparent hover:border-foreground/10"
        >
          <ChevronLeftIcon size={18} />
          {t.dashboard.backToHome}
        </Link>
        <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-destructive transition-all duration-200 hover:bg-destructive/10 cursor-pointer w-full border-2 border-transparent hover:border-destructive/20">
          <LogOutIcon size={18} />
          {t.dashboard.signOut}
        </button>
      </div>
    </aside>
  );
}
