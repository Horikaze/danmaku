import type { Metadata } from "next";
import { Montserrat, Poppins, Noto_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NavBar from "./(main)/components/navbar/NavBar";
import "./globals.css";
import { NextAuthProvider } from "./lib/AuthContext";
const montserrat = Montserrat({ subsets: ["latin"] });
const popins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
  title: "Danmaku",
  description: "meow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  searchParams: any;
}>) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body
          className={`${notoSans.className} flex items-center justify-center`}
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
