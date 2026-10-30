import { DM_Sans } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

/* The home page is a client component, so its title and description live
   here as the site-wide default. Every other page sets its own. No canonical
   here: a canonical on the root layout would be inherited by every page that
   forgets to set one. */
export const metadata = {
  metadataBase: new URL("https://frontline.financial"),
  title: "Finance Broker Parramatta | Frontline Financial",
  description:
    "Home loans and car loans from a Parramatta finance broker. We compare 30+ lenders for you. 100+ five-star Google reviews.",
  /* F-mark icon set. The ?v= suffix makes browsers drop the old cached icon. */
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon-32.png?v=2", type: "image/png", sizes: "32x32" },
      { url: "/favicon-192.png?v=2", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512.png?v=2", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: { url: "/apple-touch-icon.png?v=2", sizes: "180x180" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
