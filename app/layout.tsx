import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import NextTopLoader from 'nextjs-toploader';

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "task-nest",
  description: "Task nest all in one for your productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased container mx-auto m-4`}
      >
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
