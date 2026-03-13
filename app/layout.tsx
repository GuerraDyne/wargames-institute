import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout";

export const metadata: Metadata = {
  title: "Wargames.Institute | Strategic Simulation & Model Abstraction",
  description: "Master strategic thinking through wargames. Learn decision-making, understand complex systems, and sharpen your ability to analyze problems by making them playable.",
  keywords: ["wargames", "simulations", "strategic thinking", "model abstraction", "systems thinking", "decision science"],
  authors: [{ name: "Wargames.Institute" }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: "Wargames.Institute",
    description: "Master strategic thinking through wargames. Sharpen decision-making and understand complex systems by making them playable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
