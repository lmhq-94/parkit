import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { League_Spartan } from "next/font/google";
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

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${leagueSpartan.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
