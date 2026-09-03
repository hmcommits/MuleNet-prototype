import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MuleNet — AI Money Mule Detection Dashboard",
  description:
    "Autonomous H-GNN for Privacy-Preserving Money Mule Detection. Real-time scatter-gather network analysis with GNNExplainer evidentiary dossiers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fredoka.variable}`}>
      <body
        className={`${inter.className} antialiased`}
        style={{ background: "#020617", colorScheme: "dark" }}
      >
        {children}
      </body>
    </html>
  );
}
