"use client";

import { useI18n } from "@/lib/i18n";

const conversations = [
  { id: "1", name: "Sarah Chen", lastMessage: "I can start the project next week", time: "5m", unread: 2, avatar: "SC" },
  { id: "2", name: "Marcus Rivera", lastMessage: "The design files are ready for review", time: "1h", unread: 0, avatar: "MR" },
  { id: "3", name: "Aisha Patel", lastMessage: "Let me know if you need changes", time: "3h", unread: 1, avatar: "AP" },
  { id: "4", name: "TechCorp Inc.", lastMessage: "We'd like to proceed with your proposal", time: "1d", unread: 0, avatar: "TC" },
];

export default function MessagesPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">{t.dashboard.messagesTitle}</h1>
        <p className="mt-1 text-sm text-foreground/50">{t.dashboard.messagesDesc}</p>
      </div>

      <div className="rounded-2xl bg-white border border-border overflow-hidden">
        {conversations.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {c.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">{c.name}</h3>
                <span className="text-[11px] text-foreground/40">{c.time}</span>
              </div>
              <p className="mt-0.5 text-xs text-foreground/50 truncate">{c.lastMessage}</p>
            </div>
            {c.unread > 0 && (
              <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {c.unread}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
