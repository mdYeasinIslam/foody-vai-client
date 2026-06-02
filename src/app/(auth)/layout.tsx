import ImageSection from "@/src/@modules/auth/components/ImageSection";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Bazaryo",
  description: "A modern eCommerce platform for managing and selling products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main
        className={` antialiased h-full grid grid-cols-1 md:grid-cols-2 `}
      >
      {/* <Navbar /> */}
      <ImageSection/>
        {children}
      </main>
  );
}
