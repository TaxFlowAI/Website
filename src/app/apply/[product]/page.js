import { notFound } from "next/navigation";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import { APPLICATION_LIST, getApplication } from "@/data/finance-applications";
import ApplicationForm from "./ApplicationForm";
import ApplicationDetails from "./ApplicationDetails";

/* The finance applications the home page selector leads to. /api/contact emails
   the right inbox. Home loans also go to Zapier and Broker Engine. Asset Solutions
   leads also go to Ambition Cloud, and the client is emailed a privacy consent link.
   Kept out of search (noindex) because they're forms, not content. */

export const dynamicParams = false;

export function generateStaticParams() {
  return APPLICATION_LIST.map((app) => ({ product: app.slug }));
}

export async function generateMetadata({ params }) {
  const { product } = await params;
  const app = getApplication(product);
  if (!app) return {};
  return {
    title: `${app.title} | Frontline Financial`,
    description: app.intro,
    alternates: { canonical: `/apply/${app.slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function ApplicationPage({ params }) {
  const { product } = await params;
  const app = getApplication(product);
  if (!app) notFound();

  return (
    <div className="min-h-screen bg-[#F5F5EF] font-sans">
      <LayoutNav activeNav={app.activeNav} />

      <section id="application" className="section-dot-grid-dark relative scroll-mt-20 px-4 pt-8 pb-14 md:px-6 md:pt-14 md:pb-20 lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#00FCB8] opacity-[0.08] blur-[100px]" aria-hidden />
        <ApplicationForm slug={app.slug} />
      </section>

      <ApplicationDetails app={app} />

      <section className="px-4 py-10 md:px-6 lg:px-8">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-[#1C5472]/80">
          General information only. This page doesn&apos;t take into account your objectives, financial situation or
          needs. Lender criteria, fees and charges apply, and all applications are subject to the lender&apos;s
          assessment and approval.
        </p>
      </section>

      <LayoutFooter />
    </div>
  );
}
