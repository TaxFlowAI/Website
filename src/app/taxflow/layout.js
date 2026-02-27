import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-heading-tf",
});

export const metadata = {
  title: "TaxFlowAI — Your Tax Life, Organised",
};

export default function TaxFlowLayout({ children }) {
  return <div className={`${plusJakarta.variable} font-sans`}>{children}</div>;
}
