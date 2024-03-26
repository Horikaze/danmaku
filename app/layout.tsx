import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NavBar from "./(main)/components/navbar/NavBar";
import "./globals.css";
import { NextAuthProvider } from "./lib/AuthContext";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Danmaku",
  description: "meow",
};

export const revalidate = 60;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  searchParams: any;
}>) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={`${montserrat.className} flex items-center justify-center`}>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                borderRadius: "10px",
                background: "#2F3136",
                color: "#d8d8d8",
              },
              iconTheme: {
                primary: "white",
                secondary: "#2F3136",
              },
            }}
          />
          <NavBar />
          <main className="px-2 md:px-4 lg:px-24 xl:px-36 2xl:px-72 pt-20 w-full h-full max-w-[2000px]">
            {children}
          </main>
        </body>
      </NextAuthProvider>
    </html>
  );
}
