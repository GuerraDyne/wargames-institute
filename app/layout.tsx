import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout";

export const metadata: Metadata = {
  title: "Wargames.Institute | Strategic Simulation & Model Abstraction",
  description: "A research and education platform dedicated to using wargames and simulations to understand complex systems and train strategic thinking.",
  keywords: ["wargames", "simulations", "strategic thinking", "model abstraction", "systems thinking", "decision science"],
  authors: [{ name: "Wargames.Institute" }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: "Wargames.Institute",
    description: "Turning complex problems into playable systems through strategic simulation.",
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
