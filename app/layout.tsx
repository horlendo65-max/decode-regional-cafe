import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PesaBot — AI Savings Assistant",
  description: "From idea to MVP: an AI chat that turns a savings goal into a real M-Pesa payment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
