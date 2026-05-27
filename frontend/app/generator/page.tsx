"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import api from "@/services/api";
import {
  FileText,
  ChevronDown,
  Sparkles,
  Copy,
  Check,
  ArrowLeft,
} from "lucide-react";

import GlassCard from "../components/ui/GlassCard";
import GradientButton from "../components/ui/GradientButton";
import AnimatedBackground from "../components/ui/AnimatedBackground";

const documentTypes = [
  { value: "Legal Notice", icon: "📜", desc: "Send formal legal notices" },
  { value: "Rent Agreement", icon: "🏠", desc: "Draft rental contracts" },
  { value: "Affidavit", icon: "📋", desc: "Sworn statements for court" },
  { value: "Complaint Letter", icon: "✉️", desc: "File formal complaints" },
  { value: "NDA", icon: "🔒", desc: "Non-disclosure agreements" },
];

export default function GeneratorPage() {
  const [documentType, setDocumentType] = useState("Legal Notice");
  const [details, setDetails] = useState("");
  const [generatedDoc, setGeneratedDoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  const selectedType = documentTypes.find((t) => t.value === documentType)!;

  async function generate() {
    try {
      setLoading(true);

      const res = await api.post("/api/generator/generate", {
        type: documentType,
        details: {
          content: details,
        },
      });

      setGeneratedDoc(res.data.document);
    } catch (error) {
      console.log(error);
      alert("Generation failed");
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(generatedDoc);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.log("Copy failed");
    }
  }

  // Current step
  const step = generatedDoc ? 3 : details.trim() ? 2 : 1;

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Dashboard
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl shadow-[0_0_24px_rgba(99,102,241,0.25)]">
              <FileText size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="gradient-text">Document Generator</span>
              </h1>
              <p className="text-[var(--text-muted)] text-sm mt-0.5">
                Generate professional legal documents with AI
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="flex items-center gap-3 mb-8"
        >
          {[
            { num: 1, label: "Choose Type" },
            { num: 2, label: "Enter Details" },
            { num: 3, label: "Generate" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  step >= s.num
                    ? "bg-[var(--accent-cyan-dim)] text-[var(--accent-cyan)] border border-[rgba(34,211,238,0.2)]"
                    : "bg-[rgba(100,180,255,0.05)] text-[var(--text-muted)] border border-[var(--glass-border)]"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] ${
                    step >= s.num
                      ? "bg-[var(--accent-cyan)] text-[var(--bg-primary)]"
                      : "bg-[rgba(100,180,255,0.1)] text-[var(--text-muted)]"
                  }`}
                >
                  {step > s.num ? "✓" : s.num}
                </span>
                {s.label}
              </div>
              {i < 2 && (
                <div
                  className={`w-8 h-px transition-colors duration-300 ${
                    step > s.num
                      ? "bg-[var(--accent-cyan)]"
                      : "bg-[var(--glass-border)]"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Document Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          className="mb-6"
        >
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Document Type
          </label>

          <div className="relative">
            <button
              onClick={() => setShowTypeMenu(!showTypeMenu)}
              className="w-full glass flex items-center justify-between rounded-[var(--radius-lg)] px-5 py-4 cursor-pointer hover:border-[rgba(100,180,255,0.2)] transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{selectedType.icon}</span>
                <div className="text-left">
                  <p className="font-medium text-[var(--text-primary)]">
                    {selectedType.value}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {selectedType.desc}
                  </p>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`text-[var(--text-muted)] transition-transform duration-200 ${
                  showTypeMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {showTypeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-20 w-full mt-2 glass-strong rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-lg)]"
                >
                  {documentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => {
                        setDocumentType(type.value);
                        setShowTypeMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all cursor-pointer ${
                        documentType === type.value
                          ? "bg-[var(--accent-cyan-dim)]"
                          : "hover:bg-[rgba(100,180,255,0.05)]"
                      }`}
                    >
                      <span className="text-lg">{type.icon}</span>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            documentType === type.value
                              ? "text-[var(--accent-cyan)]"
                              : "text-[var(--text-primary)]"
                          }`}
                        >
                          {type.value}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {type.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Details Textarea */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="mb-6"
        >
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Details & Requirements
          </label>

          <textarea
            placeholder="Provide the key details for your document — parties involved, dates, terms, specific clauses, etc."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="input-field h-40 resize-none rounded-[var(--radius-lg)]"
          />

          <div className="flex justify-between mt-2">
            <p className="text-xs text-[var(--text-muted)]">
              Be as specific as possible for better results
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {details.length} characters
            </p>
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          <GradientButton
            variant="primary"
            size="lg"
            icon={Sparkles}
            loading={loading}
            onClick={generate}
            disabled={!details.trim()}
          >
            {loading ? "Generating Document…" : "Generate Document"}
          </GradientButton>
        </motion.div>

        {/* Generated Document */}
        <AnimatePresence>
          {generatedDoc && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              <GlassCard glow className="!rounded-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-[var(--text-primary)]">
                        Generated Document
                      </h2>
                      <p className="text-xs text-[var(--text-muted)]">
                        {documentType}
                      </p>
                    </div>
                  </div>

                  <GradientButton
                    variant="ghost"
                    size="sm"
                    icon={copied ? Check : Copy}
                    onClick={copyToClipboard}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </GradientButton>
                </div>

                <div className="bg-[rgba(10,15,30,0.5)] rounded-[var(--radius-md)] p-5 border border-[var(--glass-border)]">
                  <pre className="whitespace-pre-wrap text-[0.88rem] leading-relaxed text-[var(--text-secondary)] font-[var(--font-mono)]">
                    {generatedDoc}
                  </pre>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}