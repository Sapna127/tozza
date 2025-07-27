"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ClientSidebar } from "../components/clientSidebar";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex h-full`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClientSidebar />
          <main className="flex-1 p-6 bg-white dark:bg-gray-900 transition-colors duration-300">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
