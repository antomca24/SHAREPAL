import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import { CartDrawer } from "@/components/cart-drawer";
import { ChatButton } from "@/components/chat-button";
import { DateModal } from "@/components/date-modal";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SearchDrawer } from "@/components/search-drawer";
import { SelectDatesButton } from "@/components/select-dates-button";
import { StoreProvider } from "@/components/store-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Gaming Consoles on Rent | SharePal",
  description:
    "Rent the latest gaming gadgets from SharePal: PS5, Xbox, Oculus VR and Racing Wheel on rent.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ubuntu.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
          <SelectDatesButton />
          <DateModal />
          <CartDrawer />
          <SearchDrawer />
          <ChatButton />
        </StoreProvider>
      </body>
    </html>
  );
}
