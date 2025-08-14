import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
// Fonts will be handled by the theme
import "./globals.css";
import { Providers } from '../providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ParkIt - Smart Parking Solutions",
  description: "Professional parking management platform with real-time monitoring, reservations, and payment processing",
  keywords: "parking, management, reservations, payments, smart parking",
  authors: [{ name: "ParkIt Team" }],
  robots: "index, follow",
  openGraph: {
    title: "ParkIt - Smart Parking Solutions",
    description: "Professional parking management platform",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ParkIt - Smart Parking Solutions",
    description: "Professional parking management platform",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
