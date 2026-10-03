import Link from "next/link";
import TaxFlowHeader from "@/components/taxflow/TaxFlowHeader";
import TaxFlowAppFooter from "@/components/taxflow/TaxFlowAppFooter";
import { container } from "@/components/taxflow/TaxFlowShared";
import { SIGN_IN_EMBED_HTML } from "@/components/taxflow/signInEmbed";

/* Sign-in page. The form is the app's own embed, rendered as raw HTML and posted
   straight to the TaxFlowAI app (no iframe, no JavaScript). The app only accepts
   posts from frontline.financial and www.frontline.financial, so on localhost and
   preview deploys a sign-in bounces to the app's login page with an error.
   Not linked from the header or footer, and kept out of search and the sitemap,
   until the owner confirms the embed-login endpoint is deployed. */
export const metadata = {
  title: "Sign in",
  description: "Sign in to your TaxFlowAI client or accountant portal.",
  alternates: { canonical: "/taxflow/sign-in" },
  robots: { index: false, follow: true },
};

export default function TaxFlowSignInPage() {
  return (
    <div className="tc-page min-h-screen">
      <TaxFlowHeader />

      <section className={`${container} pb-20 pt-10 md:pb-28 md:pt-14`}>
        <h1 className="sr-only">Sign in to TaxFlowAI</h1>
        <div dangerouslySetInnerHTML={{ __html: SIGN_IN_EMBED_HTML }} />
        <p
          className="tc-mono mx-auto mt-7 max-w-[400px] text-center text-[11px] tracking-[0.14em]"
          style={{ color: "#94A3B8" }}
        >
          EVERY SIGN-IN IS CONFIRMED WITH A ONE-TIME CODE
        </p>
        <p className="mx-auto mt-3 max-w-[400px] text-center text-[12.5px] leading-relaxed" style={{ color: "#94A3B8" }}>
          See how we protect your account on our{" "}
          <Link href="/taxflow/security" className="tc-link">Data security</Link> page, and our{" "}
          <Link href="/taxflow/privacy-policy" className="tc-link">Privacy Policy</Link>.
        </p>
      </section>

      <TaxFlowAppFooter />
    </div>
  );
}
