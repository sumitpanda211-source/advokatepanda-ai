import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdvokateAI Panda — India's AI Legal Assistant",
  description: "India's smartest AI-powered legal assistant. Get legal advice, generate documents, and know your rights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}