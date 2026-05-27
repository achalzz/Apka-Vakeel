"use client";

import { motion } from "framer-motion";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  index: number;
}

export default function ChatBubble({ role, content, index }: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mr-3 mt-1 text-xs font-bold shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          ⚖
        </div>
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-5 py-3.5 text-[0.9rem] leading-relaxed ${
          isUser
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md shadow-[0_4px_16px_rgba(59,130,246,0.2)]"
            : "glass text-[var(--text-primary)] rounded-bl-md"
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ml-3 mt-1 text-xs font-bold shadow-[0_0_12px_rgba(99,102,241,0.2)]">
          U
        </div>
      )}
    </motion.div>
  );
}
