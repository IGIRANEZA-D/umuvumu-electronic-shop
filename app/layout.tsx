import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchModal from "@/components/layout/SearchModal";
import { WhatsAppFloat, MobileBottomNav } from "@/components/layout/FloatingElements";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "UMUVUMU Electronic Shop — Rooted in Trust. Powered by Technology.",
  description: "Rwanda's premier electronics marketplace. Genuine phones, laptops, TVs, gaming, audio, smart devices and more. Located in Musanze City, Goico Plaza. Fast delivery across Rwanda.",
  keywords: "electronics Rwanda, phones Rwanda, laptops Rwanda, Samsung Rwanda, Apple Rwanda, UMUVUMU, Musanze electronics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logo.png" />
        <meta name="theme-color" content="#FF6701" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <StoreProvider>
          <Navbar />
          <main className="min-h-screen" style={{ paddingBottom: '80px' }}>
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <WhatsAppFloat />
          <MobileBottomNav />
          <Toaster position="top-right" />
        </StoreProvider>
      </body>
    </html>
  );
}
