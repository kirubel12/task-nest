import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";

const poppins = Poppins({
  weight: ['400', '600'],
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
    <html lang="en">
      <body
        className={`${poppins.className} antialiased container mx-auto m-4 space-x-4`}
      >
        {children}
      </body>
    </html>
  );
}
