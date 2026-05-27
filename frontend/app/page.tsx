"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/services/api";
import {
  Sparkles,
  Upload,
  FileUp,
  X,
  Send,
  MessageSquare,
  FileSearch,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import ChatBubble from "./components/ChatBubble";
import TypingIndicator from "./components/TypingIndicator";
import GlassCard from "./components/ui/GlassCard";
import GradientButton from "./components/ui/GradientButton";
import AnimatedBackground from "./components/ui/AnimatedBackground";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Chat {
  id: string;
  question: string;
  response: string;
}

type ActiveTab = "chat" | "upload";

export default function Dashboard() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Chat[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("chat");
  const [analysis, setAnalysis] = useState("");
  const [analysisError, setAnalysisError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello 👋 I am Apka Vakeel, your AI legal assistant. I can help you with legal questions, analyze documents, and guide you through Indian law. How can I assist you today?",
    },
  ]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Load chat history
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await api.get("/api/ai/history");
        if (res.data.success) {
          setHistory(res.data.chats);
        }
      } catch (error) {
        console.log("History Error:", error);
      }
    }
    loadHistory();
  }, []);

  async function askAI() {
    if (!question.trim()) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: currentQuestion },
    ]);

    setQuestion("");

    try {
      setLoading(true);

      const res = await api.post("/api/ai/chat", {
        question: currentQuestion,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.response },
      ]);

      const historyRes = await api.get("/api/ai/history");
      setHistory(historyRes.data.chats);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function uploadDocument() {
    try {
      if (!selectedFile) return;

      setUploading(true);
      setAnalysis("");
      setAnalysisError("");

      const formData = new FormData();
      formData.append("document", selectedFile);

      const res = await api.post("/api/documents/upload", formData, {
        headers: { "Content-Type": undefined } as any,
      });

      console.log(res.data);

      // Set the analysis result in the dedicated panel
      setAnalysis(res.data.analysis);

      // Also add to chat for reference
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `📄 Document Analysis for "${selectedFile.name}":\n\n${res.data.analysis}`,
        },
      ]);
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log("Upload error details:", error.response.data);
        setAnalysisError(
          error.response.data.error || JSON.stringify(error.response.data)
        );
      } else {
        console.log(error);
        setAnalysisError("Document upload failed. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  }

  function handleSelectChat(chat: Chat) {
    setActiveTab("chat");
    setMessages([
      { role: "user", content: chat.question },
      { role: "assistant", content: chat.response },
    ]);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAI();
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setActiveTab("upload");
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setAnalysis("");
      setAnalysisError("");
    }
  }

  function clearFile() {
    setSelectedFile(null);
    setAnalysis("");
    setAnalysisError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="flex min-h-screen">
      <AnimatedBackground />

      <Sidebar history={history} onSelectChat={handleSelectChat} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="px-8 pt-7 pb-2"
        >
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">AI Legal Assistant</span>
          </h1>
          <p className="text-[var(--text-muted)] mt-1 text-sm">
            Ask legal questions, upload documents for AI analysis, and get instant guidance
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="px-8 pt-3 pb-2">
          <div className="max-w-3xl mx-auto flex gap-1 p-1 rounded-xl bg-[rgba(15,25,50,0.5)] border border-[var(--glass-border)] w-fit">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === "chat"
                  ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-[var(--accent-cyan)] border border-[rgba(34,211,238,0.2)] shadow-[0_0_12px_rgba(34,211,238,0.08)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] border border-transparent"
              }`}
            >
              <MessageSquare size={16} />
              AI Chat
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === "upload"
                  ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-[var(--accent-cyan)] border border-[rgba(34,211,238,0.2)] shadow-[0_0_12px_rgba(34,211,238,0.08)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] border border-transparent"
              }`}
            >
              <FileSearch size={16} />
              Upload & Analyze
            </button>
          </div>
        </div>

        {/* ===================== CHAT TAB ===================== */}
        {activeTab === "chat" && (
          <motion.div
            key="chat-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto px-8 pb-4 pt-2">
              <div className="max-w-3xl mx-auto">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <ChatBubble
                      key={index}
                      role={message.role}
                      content={message.content}
                      index={index}
                    />
                  ))}
                  {loading && <TypingIndicator />}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>
            </div>

            <div className="px-8 pb-6 pt-2">
              <div className="max-w-3xl mx-auto">
                <GlassCard noPadding className="!rounded-2xl transition-all duration-300">
                  <textarea
                    ref={textareaRef}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your legal question or issue…"
                    rows={3}
                    className="w-full bg-transparent px-5 pt-4 pb-2 text-[0.92rem] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none resize-none"
                  />
                  <div className="flex items-center justify-end px-4 pb-3">
                    <GradientButton
                      variant="accent"
                      size="sm"
                      icon={question.trim() ? Send : Sparkles}
                      loading={loading}
                      onClick={askAI}
                      disabled={!question.trim() && !loading}
                    >
                      {loading ? "Thinking…" : "Ask AI"}
                    </GradientButton>
                  </div>
                </GlassCard>
                <p className="text-center text-[0.7rem] text-[var(--text-muted)] mt-2 opacity-60">
                  Press Enter to send · Shift+Enter for new line
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============== UPLOAD & ANALYZE TAB ============== */}
        {activeTab === "upload" && (
          <motion.div
            key="upload-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 overflow-y-auto px-8 pb-8 pt-2"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Upload Section */}
              <GlassCard className="!rounded-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-[0_0_16px_rgba(16,185,129,0.2)]">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                      Upload Legal Document
                    </h2>
                    <p className="text-xs text-[var(--text-muted)]">
                      Upload a PDF for AI-powered analysis and insights
                    </p>
                  </div>
                </div>

                {/* Drop Zone */}
                <div
                  className={`drop-zone ${dragOver ? "drag-over" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {!selectedFile ? (
                    <div className="py-4">
                      <div className="w-14 h-14 rounded-2xl bg-[rgba(34,211,238,0.08)] flex items-center justify-center mx-auto mb-4 border border-[rgba(34,211,238,0.12)]">
                        <Upload size={24} className="text-[var(--accent-cyan)]" />
                      </div>
                      <p className="text-[var(--text-secondary)] font-medium mb-1">
                        Drop your PDF here or click to browse
                      </p>
                      <p className="text-sm text-[var(--text-muted)]">
                        Supports PDF files for legal document analysis
                      </p>
                    </div>
                  ) : (
                    <div className="py-2">
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[rgba(16,185,129,0.1)] flex items-center justify-center border border-[rgba(16,185,129,0.15)]">
                          <FileUp size={22} className="text-emerald-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-[var(--text-primary)]">
                            {selectedFile.name}
                          </p>
                          <p className="text-sm text-[var(--text-muted)]">
                            {(selectedFile.size / 1024).toFixed(1)} KB · PDF Document
                          </p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); clearFile(); }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-rose-400 hover:bg-[rgba(244,63,94,0.1)] transition-all cursor-pointer ml-2"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <div className="mt-5 flex items-center gap-3">
                  <GradientButton
                    variant="success"
                    size="lg"
                    icon={FileSearch}
                    loading={uploading}
                    onClick={uploadDocument}
                    disabled={!selectedFile}
                    className="flex-1"
                  >
                    {uploading ? "Analyzing Document…" : "Upload & Analyze"}
                  </GradientButton>
                  {selectedFile && !uploading && (
                    <GradientButton variant="ghost" size="lg" onClick={clearFile}>
                      Clear
                    </GradientButton>
                  )}
                </div>
              </GlassCard>

              {/* Uploading State */}
              <AnimatePresence>
                {uploading && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <GlassCard className="!rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[rgba(34,211,238,0.1)] flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-[var(--accent-cyan)] border-t-transparent rounded-full animate-spin" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[var(--text-primary)] mb-1">
                            Analyzing your document…
                          </p>
                          <p className="text-sm text-[var(--text-muted)]">
                            Our AI is reading and extracting insights
                          </p>
                          <div className="mt-3 h-1.5 bg-[rgba(100,180,255,0.08)] rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              initial={{ width: "0%" }}
                              animate={{ width: "85%" }}
                              transition={{ duration: 8, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Analysis Results */}
              <AnimatePresence>
                {analysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <GlassCard glow className="!rounded-2xl">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_16px_rgba(34,211,238,0.2)]">
                          <CheckCircle2 size={20} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                            AI Document Analysis
                          </h2>
                          <p className="text-xs text-[var(--text-muted)]">
                            {selectedFile ? selectedFile.name : "Analysis complete"}
                          </p>
                        </div>
                        <span className="ml-auto badge badge-cyan">✓ Complete</span>
                      </div>
                      <div className="bg-[rgba(10,15,30,0.5)] rounded-[var(--radius-md)] p-5 border border-[var(--glass-border)]">
                        <p className="text-[0.9rem] leading-relaxed text-[var(--text-secondary)] whitespace-pre-wrap">
                          {analysis}
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error State */}
              <AnimatePresence>
                {analysisError && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <GlassCard className="!rounded-2xl !border-[rgba(244,63,94,0.2)]">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[rgba(244,63,94,0.1)] flex items-center justify-center flex-shrink-0">
                          <AlertCircle size={20} className="text-rose-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-rose-400 mb-1">Analysis Failed</h3>
                          <p className="text-sm text-[var(--text-secondary)]">{analysisError}</p>
                          <button
                            onClick={() => { setAnalysisError(""); uploadDocument(); }}
                            className="mt-3 text-sm text-[var(--accent-cyan)] hover:underline cursor-pointer"
                          >
                            Try again →
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty State */}
              {!analysis && !analysisError && !uploading && (
                <GlassCard className="!rounded-2xl text-center !py-10">
                  <FileSearch size={40} className="text-[var(--text-muted)] mx-auto mb-4 opacity-40" />
                  <p className="text-[var(--text-secondary)] font-medium mb-1">
                    No document analyzed yet
                  </p>
                  <p className="text-sm text-[var(--text-muted)] max-w-sm mx-auto">
                    Upload a legal document to get AI-powered analysis including key clauses, potential issues, and a plain-language summary
                  </p>
                </GlassCard>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}