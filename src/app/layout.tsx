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
  title: {
    default: "Raha Field Tracker",
    template: "%s | Raha Field Tracker",
  },
  description:
    "A field sales tracking platform for managing associates, customer visits, activities, routes, and branch-level analytics.",
  applicationName: "Raha Field Tracker",
  keywords: [
    "Field Sales",
    "Sales Tracker",
    "Associate Dashboard",
    "Branch Head Dashboard",
    "CRM",
    "Activity Tracking",
    "Location Tracking",
    "OpenRouteService",
    "Next.js",
    "MongoDB",
  ],
  authors: [
    {
      name: "Sneha Reddy",
    },
  ],
  creator: "Sneha Reddy",
  metadataBase: new URL("https://YOUR-VERCEL-URL.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}