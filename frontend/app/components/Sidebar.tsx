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
  X,
} from "lucide-react";
import { clsx } from "clsx";
import api from "@/services/api";

interface Chat {
  id: string;
  question: string;
  response: string;
  data?: any;
}

interface DocumentData {
  id: string;
  name: string;
  size: number;
  createdAt: string;
  data: any;
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
  documents?: DocumentData[];
  onSelectDocument?: (doc: DocumentData) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

const navItems = [
  { href: "/", icon: MessageSquare, label: "AI Chat Workspace" },
  { href: "/generator", icon: FileText, label: "Legal Templates" },
  { href: "/rights", icon: Scale, label: "Rights Explorer" },
];

export default function Sidebar({
  history,
  onSelectChat,
  documents = [],
  onSelectDocument,
  mobileOpen = false,
  setMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await api.get("/api/rights/news");
        setNews((res.data.articles || []).slice(0, 3));
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

  const handleSelect = (chat: Chat) => {
    onSelectChat(chat);
    setMobileOpen?.(false);
  };

  const handleSelectDoc = (doc: DocumentData) => {
    onSelectDocument?.(doc);
    setMobileOpen?.(false);
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      <aside
        className={clsx(
          "w-[280px] flex-shrink-0 h-screen fixed md:sticky top-0 left-0 flex flex-col glass-strong border-r-0 z-50 md:z-auto transition-transform duration-300 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ borderRight: "1px solid var(--glass-border)" }}
      >
        {/* Close Button on Mobile */}
        {setMobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden absolute top-5 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] cursor-pointer"
          >
            <X size={18} />
          </button>
        )}

        {/* Logo Section */}
        <div className="p-6 pb-4">
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen?.(false)}>
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

        {/* Navigation Items */}
        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen?.(false)}>
                <div className={clsx("nav-item", isActive && "active")}>
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

        {/* Scrollable workspace lists */}
        <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-[rgba(255,255,255,0.03)] px-3 py-2 space-y-4">
          
          {/* List 1: Recent Chats */}
          <div>
            <h3 className="text-[0.7rem] uppercase tracking-widest text-[var(--text-muted)] font-semibold px-3 mb-2 pt-2">
              Recent Consultations
            </h3>
            <div className="space-y-1">
              {history.length === 0 ? (
                <p className="text-[0.75rem] text-[var(--text-muted)] px-3 py-1">
                  No previous sessions
                </p>
              ) : (
                history.slice(0, 5).map((chat, i) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => handleSelect(chat)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-[0.8rem] text-[var(--text-secondary)] hover:bg-[rgba(34,211,238,0.05)] hover:text-[var(--text-primary)] transition-all duration-200 group"
                  >
                    <Sparkles size={11} className="text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-colors flex-shrink-0" />
                    <span className="truncate">{chat.question}</span>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* List 2: Scanned PDFs */}
          {documents.length > 0 && (
            <div className="pt-3">
              <h3 className="text-[0.7rem] uppercase tracking-widest text-[var(--text-muted)] font-semibold px-3 mb-2">
                Scanned Diagnostics
              </h3>
              <div className="space-y-1">
                {documents.slice(0, 5).map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => handleSelectDoc(doc)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-[0.8rem] text-[var(--text-secondary)] hover:bg-[rgba(34,211,238,0.05)] hover:text-[var(--text-primary)] transition-all duration-200 group"
                  >
                    <FileText size={11} className="text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-colors flex-shrink-0" />
                    <span className="truncate">{doc.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />

        {/* News Feed Widget */}
        <div className="px-3 py-3 max-h-[160px] overflow-y-auto">
          <div className="flex items-center gap-2 px-2 mb-1.5">
            <Newspaper size={11} className="text-rose-400" />
            <h3 className="text-[0.65rem] uppercase tracking-widest text-[var(--text-muted)] font-bold">
              Legal News
            </h3>
            <span className="ml-auto flex items-center gap-0.5 text-[0.55rem] text-emerald-400 font-semibold">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>

          {newsLoading ? (
            <div className="space-y-1.5 px-2">
              {[1, 2].map((i) => (
                <div key={i} className="skeleton h-2.5 w-full rounded" />
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="space-y-0.5">
              {news.map((article, i) => (
                <a
                  key={i}
                  href={article.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-1.5 items-start px-2 py-1.5 rounded-lg group hover:bg-[rgba(34,211,238,0.04)] transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--accent-cyan)] mt-1.5 flex-shrink-0 opacity-50" />
                  <p className="text-[0.68rem] leading-tight text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] transition-colors line-clamp-2">
                    {article.title}
                  </p>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {/* User section */}
        <div className="p-4 mt-auto">
          <div className="mx-1 mb-3 h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />

          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold hover:shadow-[0_0_16px_rgba(34,211,238,0.2)] transition-shadow duration-300 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-2 py-1">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-7 h-7 ring-2 ring-[rgba(34,211,238,0.2)]",
                    },
                  }}
                />
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  My Account
                </span>
              </div>
              <SignOutButton>
                <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-[var(--text-muted)] hover:text-rose-400 hover:bg-[rgba(244,63,94,0.06)] transition-all cursor-pointer">
                  <LogOut size={12} />
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
