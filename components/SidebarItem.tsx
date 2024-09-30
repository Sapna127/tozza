"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      className={`flex items-center gap-4 cursor-pointer p-3 mt-5 pl-6 rounded-lg transition-all duration-300 ease-in-out 
        ${selected ? "bg-green-400 w-[200px]  text-white" : "text-slate-500 hover:bg-slate-100 hover:text-green-400"}`}
      onClick={() => {
        router.push(href);
      }}
    >
      <div className={`transition-transform duration-300 ease-in-out ${selected ? "scale-110" : "scale-100"}`}>
        {icon}
      </div>
      <div className={`font-semibold transition-colors duration-300 ${selected ? "text-white" : ""}`}>
        {title}
      </div>
    </div>
  );
};
