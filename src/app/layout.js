import { DM_Sans } from "next/font/google";
import "./globals.css";

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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
