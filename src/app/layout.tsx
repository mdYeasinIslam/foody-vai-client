import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../@styles/main.scss";
import WrapperComp from "../@base/container/WrapperComp";
import Provider from "../@base/providers/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodyVai",
  description: "It's an e-commerce website for food lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
    >
      <body>
        <Provider>
          <WrapperComp>{children}</WrapperComp>
        </Provider>
      </body>
    </html>
  );
}
