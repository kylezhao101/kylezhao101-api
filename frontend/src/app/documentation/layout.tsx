import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "kylezhao101/api/documentation",
  description: "Generated by create next app",
};

export default function DocumentationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex pt-20 lg:pt-14 w-full">
      <Sidebar />
      <div className="container mb-20">
        {children}
      </div>
    </div>
  );
}
