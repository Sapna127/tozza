'use client'

import { usePathname } from 'next/navigation';
import { Sidebar } from "@/components/Sidebar";

export function ClientSidebar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isSignup = pathname === '/signup';
  if (isHomePage || isSignup) {
    return null;
  }

  return <Sidebar />;
}