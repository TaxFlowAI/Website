import { notFound } from "next/navigation";
import FeaturePage from "@/components/taxflow/FeaturePage";
import { FEATURE_PAGES } from "@/components/taxflow/featurePages";

/* One static page per feature. The loans page is its own route (Frontline
   Financial brand) at /taxflow/features/loans. */
export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = FEATURE_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  const url = `/taxflow/features/${page.slug}`;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      ...(page.hero ? { images: [{ url: page.hero.src, width: 1536, height: 1024, alt: page.hero.alt }] } : {}),
    },
  };
}

export default async function FeatureLandingPage({ params }) {
  const { slug } = await params;
  const page = FEATURE_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return <FeaturePage page={page} />;
}
