import AdminNavbar from "@/src/@modules/admin/components/layout/AdminNavbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen overflow-hidden bg-[#f0f2f5]">
      <AdminNavbar />

      {/* <div className="flex-1 flex flex-col overflow-hidden"> */}
      <div className="flex-1 overflow-y-auto">{children}</div>
      {/* </div> */}
    </main>
  );
};

export default layout;
