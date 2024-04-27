import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "../components/SessionProvider";
import Navbar from "../components/Navbar.tsx"
import Footer from "../components/Footer.tsx"
import { getServerSession } from "next-auth";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calender App",
  description: "Calender made by the CCP that wouldn't send ur data to the ccp",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
    <body className={inter.className}>
      <SessionProvider session={session}>
        <Navbar />
        {children}
        <Footer />
      </SessionProvider>
    </body>
  </html>
  );
}
