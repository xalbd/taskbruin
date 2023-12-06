import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavBar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskBruin",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} pb-5`}>
        <SessionProvider session={session}>
          <ThemeProvider>
            <NavBar />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
