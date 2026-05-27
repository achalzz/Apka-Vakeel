"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {
  MessageSquare,
  FileText,
  Scale,
  Sparkles,
  ChevronRight,
  Newspaper,
  Clock,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { clsx } from "clsx";
import api from "@/services/api";

interface Chat {
  id: string;
  question: string;
  response: string;
}

interface NewsArticle {
  title: string;
  description: string;
  source: string;
  url?: string;
  publishedAt: string;
  category: string;
}

interface SidebarProps {
  history: Chat[];
  onSelectChat: (chat: Chat) => void;
}

const navItems = [
  { href: "/", icon: MessageSquare, label: "AI Chat" },
  { href: "/generator", icon: FileText, label: "Generate Docs" },
  { href: "/rights", icon: Scale, label: "Know Your Rights" },
];

export default function Sidebar({ history, onSelectChat }: SidebarProps) {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await api.get("/api/rights/news");
        setNews((res.data.articles || []).slice(0, 4));
      } catch (e) {
        console.log(e);
      } finally {
        setNewsLoading(false);
      }
    }
    loadNews();
  }, []);

  function timeAgo(dateStr: string) {
    try {
      const diff = Date.now() - new Date(dateStr).getTime();
      const h = Math.floor(diff / 3600000);
      if (h < 1) return "Just now";
      if (h < 24) return `${h}h ago`;
      const d = Math.floor(h / 24);
      if (d < 7) return `${d}d ago`;
      return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    } catch { return ""; }
  }

  return (
    <aside className="w-[280px] flex-shrink-0 h-screen sticky top-0 flex flex-col glass-strong border-r-0" style={{ borderRight: "1px solid var(--glass-border)" }}>
      {/* Logo */}
      <div className="p-6 pb-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_28px_rgba(34,211,238,0.35)] transition-shadow duration-300 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Apka Vakeel"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
              Apka Vakeel
            </h1>
            <p className="text-[0.65rem] text-[var(--text-muted)] uppercase tracking-widest">
              AI Legal Assistant
            </p>
          </div>
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />

      {/* Navigation */}
      <nav className="px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={clsx("nav-item", isActive && "active")}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute right-3"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <ChevronRight size={14} className="text-[var(--accent-cyan)]" />
                  </motion.div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3 py-4 min-h-0">
        <h3 className="text-[0.7rem] uppercase tracking-widest text-[var(--text-muted)] font-semibold px-3 mb-3">
          Recent Chats
        </h3>

        <div className="space-y-1">
          {history.length === 0 ? (
            <p className="text-[0.8rem] text-[var(--text-muted)] px-3 py-2">
              No conversations yet
            </p>
          ) : (
            history.slice(0, 10).map((chat, i) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                onClick={() => onSelectChat(chat)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-sm)] cursor-pointer text-[0.82rem] text-[var(--text-secondary)] hover:bg-[rgba(34,211,238,0.05)] hover:text-[var(--text-primary)] transition-all duration-200 group"
              >
                <Sparkles size={12} className="flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-colors" />
                <span className="truncate">
                  {chat.question.slice(0, 35)}
                  {chat.question.length > 35 ? "…" : ""}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />

      {/* Live News Widget */}
      <div className="px-3 py-3 max-h-[220px] overflow-y-auto">
        <div className="flex items-center gap-2 px-2 mb-2">
          <Newspaper size={12} className="text-rose-400" />
          <h3 className="text-[0.7rem] uppercase tracking-widest text-[var(--text-muted)] font-semibold">
            Legal News
          </h3>
          <span className="ml-auto flex items-center gap-1 text-[0.6rem] text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>

        {newsLoading ? (
          <div className="space-y-2 px-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="skeleton w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="skeleton h-3 w-full mb-1" />
                  <div className="skeleton h-2 w-14" />
                </div>
              </div>
            ))}
          </div>
        ) : news.length > 0 ? (
          <div className="space-y-0">
            {news.map((article, i) => (
              <a
                key={i}
                href={article.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-start px-2 py-2 rounded-lg group hover:bg-[rgba(34,211,238,0.04)] transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] mt-[6px] flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="flex-1 min-w-0">
                  <p className="text-[0.72rem] leading-snug text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] transition-colors line-clamp-2">
                    {article.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[0.6rem] text-[var(--accent-cyan)] opacity-60 font-medium truncate max-w-[80px]">
                      {article.source}
                    </span>
                    <span className="flex items-center gap-0.5 text-[0.55rem] text-[var(--text-muted)]">
                      <Clock size={7} />
                      {timeAgo(article.publishedAt)}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : null}

        <Link
          href="/rights"
          className="flex items-center justify-center gap-1 mt-2 mx-2 py-2 rounded-lg text-[0.72rem] font-medium text-[var(--accent-cyan)] bg-[rgba(34,211,238,0.05)] hover:bg-[rgba(34,211,238,0.1)] border border-[rgba(34,211,238,0.1)] transition-colors cursor-pointer"
        >
          Read More
          <ChevronRight size={12} />
        </Link>
      </div>

      {/* User section */}
      <div className="p-4 mt-auto">
        <div className="mx-1 mb-3 h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />

        {!isSignedIn ? (
          <SignInButton mode="modal">
            <button className="w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-shadow duration-300 cursor-pointer">
              Sign In
            </button>
          </SignInButton>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-2 py-1">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-[rgba(34,211,238,0.2)]",
                  },
                }}
              />
              <span className="text-sm text-[var(--text-secondary)]">
                My Account
              </span>
            </div>
            <SignOutButton>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] text-sm text-[var(--text-muted)] hover:text-rose-400 hover:bg-[rgba(244,63,94,0.06)] transition-all cursor-pointer">
                <LogOut size={14} />
                Sign Out
              </button>
            </SignOutButton>
          </div>
        )}
      </div>
    </aside>
  );
}
