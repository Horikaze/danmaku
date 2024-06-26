import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { NextAuthProvider } from "./lib/AuthContext";
import NavBar from "./mainComponents/navbar/NavBar";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Danmaku",
  description: "meow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body
          className={`${montserrat.className} flex items-center justify-center`}
        >
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
          <main className="container pt-20">{children}</main>
        </body>
      </NextAuthProvider>
    </html>
  );
}
