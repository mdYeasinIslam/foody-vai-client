"use client";

import cn from "@/src/@libs/utils/_cn";
import { useAuthState } from "@/src/@modules/auth/libs/hooks/useAuthState";
import React from "react";
import { ClassNameValue } from "tailwind-merge";
interface IProps {
  className?: ClassNameValue;
  pageTitle?: string;
}
const AdminHeader: React.FC<IProps> = ({ className, pageTitle }) => {
  const { user: admin } = useAuthState();

  return (
    <header
      className={cn(
        className,
        "shrink-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm",
      )}
    >
      {/* Current page title — driven by the page itself via a context or just static */}
      <h1 className="text-xl font-bold text-[#1e2a3a]" id="admin-page-title">
        {pageTitle || "Admin Dashboard"}
      </h1>

      {/* Admin info */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 hidden sm:block">
          {admin?.email}
        </span>
        <div
          className="w-9 h-9 rounded-full bg-[#f97316] flex items-center justify-center
              text-white font-bold text-sm shrink-0"
        >
          {admin?.userName?.charAt(0)}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
