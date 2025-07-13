"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { ClientSidebar } from "../components/clientSidebar";
import SessionWrapper from "@/components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
    <html lang="en">
      <body className={inter.className + " flex"}>
        <ClientSidebar />
        <main className="flex-1 p-6 bg-white">
          {children}
        </main>
      </body>
    </html>
    </SessionWrapper>
  );
}