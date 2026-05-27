import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apka Vakeel — AI Legal Assistant",
  description:
    "Your intelligent legal companion. Get instant legal guidance, generate documents, and explore constitutional rights — powered by AI.",
  keywords: ["legal assistant", "AI lawyer", "Indian law", "constitution", "legal documents"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased font-[var(--font-inter)]">
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#22d3ee",
              colorBackground: "#0c1425",
              colorInputBackground: "#111d35",
              colorInputText: "#f1f5f9",
              colorText: "#f1f5f9",
              colorTextSecondary: "#94a3b8",
              colorNeutral: "#f1f5f9",
              colorDanger: "#f43f5e",
              colorSuccess: "#10b981",
              borderRadius: "12px",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}