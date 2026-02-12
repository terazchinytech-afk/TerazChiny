import React from "react";
import { getFooterData } from "@/app/lib/api";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export default async function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerData = await getFooterData();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F6] top-0">
      <NavBar className="" />
      <main className="flex-grow">{children}</main>

      <Footer data={footerData} />
    </div>
  );
}
