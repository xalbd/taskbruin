"use client"
import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '@/app/globals.css'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Navbar />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;

