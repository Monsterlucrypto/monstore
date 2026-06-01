import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monstore",
  description: "Monstore 將交易返佣、電商與會員制度結合，讓會員的交易量與消費行為累積成可見的會員價值。",
  metadataBase: new URL("https://www.monstore.app"),
  openGraph: {
    title: "Monstore",
    description: "Monstore 將交易返佣、電商與會員制度結合，讓會員的交易量與消費行為累積成可見的會員價值。",
    url: "https://www.monstore.app",
    siteName: "Monstore",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Monstore",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}