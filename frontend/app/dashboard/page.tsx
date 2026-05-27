"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/services/api";
import {
  MessageSquare,
  FileText,
  Scale,
  User,
  Sparkles
} from "lucide-react";

export default function Dashboard() {

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello 👋 I am Apka Vakeel. How can I help you?"
    }
  ]);

  async function askAI() {

    if (!question.trim()) return;

    const currentQuestion = question;

    const userMessage = {
      role: "user",
      content: currentQuestion
    };

    setMessages(prev => [
      ...prev,
      userMessage
    ]);

    setQuestion("");

    try {

      setLoading(true);

      const res = await api.post(
        "/api/ai/chat",
        {
          question: currentQuestion
        }
      );

      const aiMessage = {
        role: "assistant",
        content: res.data.response
      };

      setMessages(prev => [
        ...prev,
        aiMessage
      ]);

    } catch (error) {

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong."
        }
      ]);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}

      <aside className="w-72 border-r border-slate-800 bg-slate-900 p-6">

        <h1 className="text-3xl font-bold mb-12">
          ⚖️ Apka Vakeel
        </h1>

        <div className="space-y-6">

          <div className="flex gap-3">
            <MessageSquare />
            <span>AI Chat</span>
          </div>

          <div className="flex gap-3">
            <FileText />
            <span>Documents</span>
          </div>

          <Link
            href="/rights"
            className="
              flex
              gap-3
              items-center
              p-2
              rounded-lg
              hover:bg-slate-800
              transition
              cursor-pointer
            "
          >

            <Scale />

            <span>

              Rights

            </span>

          </Link>

          <div className="flex gap-3">
            <User />
            <span>Profile</span>
          </div>

        </div>

      </aside>

      {/* Main */}

      <main className="flex-1 p-10">

        <h1 className="text-4xl font-bold">
          AI Legal Assistant
        </h1>

        <p className="text-slate-400 mt-2">
          Ask legal questions instantly
        </p>

        {/* Input */}

        <div className="bg-slate-900 rounded-3xl p-8 mt-8">

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Describe your legal issue..."
            className="
              w-full
              h-32
              bg-slate-800
              rounded-xl
              p-5
              outline-none
              resize-none
            "
          />

          <button
            onClick={askAI}
            disabled={loading}
            className="
              mt-5
              bg-blue-600
              px-6
              py-3
              rounded-xl
              flex
              gap-2
              items-center
              hover:bg-blue-700
              transition
            "
          >

            <Sparkles size={18} />

            {loading
              ? "Thinking..."
              : "Ask AI"}

          </button>

        </div>

        {/* Chat */}

        <div className="
          mt-8
          bg-slate-900
          rounded-2xl
          p-6
          h-[450px]
          overflow-y-auto
        ">

          {messages.map((message, index) => (

            <div
              key={index}
              className={`mb-5 flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === "user"
                    ? "bg-blue-600"
                    : "bg-slate-800"
                }`}
              >

                <p className="whitespace-pre-wrap">
                  {message.content}
                </p>

              </div>

            </div>

          ))}

          {loading && (

            <div className="bg-slate-800 p-4 rounded-xl w-fit">

              AI is thinking...

            </div>

          )}

        </div>

      </main>

    </div>

  );

}