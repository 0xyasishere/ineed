"use client";

import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

export default function MessagesPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const supabase = createClient();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchConversations = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*, sender:profiles!sender_id(name), receiver:profiles!receiver_id(name)")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (data) {
        const convMap = new Map<string, Conversation>();
        data.forEach((msg: Record<string, unknown>) => {
          const senderId = msg.sender_id as string;
          const receiverId = msg.receiver_id as string;
          const otherId = senderId === user.id ? receiverId : senderId;
          const otherName = senderId === user.id
            ? (msg.receiver as Record<string, unknown>)?.name as string || "Unknown"
            : (msg.sender as Record<string, unknown>)?.name as string || "Unknown";
          const isOwn = senderId === user.id;
          const read = msg.read as boolean;

          if (!convMap.has(otherId) || new Date(msg.created_at as string) > new Date(convMap.get(otherId)!.time)) {
            convMap.set(otherId, {
              id: otherId,
              name: otherName,
              lastMessage: msg.content as string,
              time: new Date(msg.created_at as string).toLocaleDateString(),
              unread: !isOwn && !read ? 1 : 0,
              avatar: otherName.slice(0, 2).toUpperCase(),
            });
          }
        });
        setConversations(Array.from(convMap.values()));
      }
    };

    fetchConversations();
  }, [user]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-manga text-foreground">💬 {t.dashboard.messagesTitle}</h1>
        <p className="mt-1 text-sm text-foreground/50">{t.dashboard.messagesDesc}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="manga-panel bg-white overflow-hidden"
      >
        {conversations.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-3xl mb-2">💬</p>
            <p className="text-sm text-foreground/40">No conversations yet</p>
          </div>
        ) : (
          conversations.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
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
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
