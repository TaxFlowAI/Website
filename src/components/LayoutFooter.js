import FooterLogo from "@/components/FooterLogo";
import ComplianceFooter from "@/components/ComplianceFooter";

export default function LayoutFooter() {
  return (
    <>
      <ComplianceFooter />
      <footer id="contact" className="bg-[#1C5472] px-4 py-14 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center">
              <FooterLogo />
            </div>
            <p className="mt-2 text-sm font-normal text-white/80">Building toward one goal: quality finance for every Australian. 500 down. Millions to go.</p>
            <div className="mt-4 flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 transition-colors hover:text-[#00FCB8]" aria-label="LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 transition-colors hover:text-[#00FCB8]" aria-label="Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.073.072 2.012.342.347 2.01.072 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.27 4.905 2.618 7.054 7.073 7.229C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.175 6.78-2.618 7.229-7.073.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-7.073-7.229C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="/" className="text-sm text-white/80 transition-colors hover:text-[#00FCB8]">Home</a></li>
              <li><a href="/about" className="text-sm text-white/80 transition-colors hover:text-[#00FCB8]">About Us</a></li>
              <li><a href="/#contact" className="text-sm text-white/80 transition-colors hover:text-[#00FCB8]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="/#brokers" className="text-sm text-white/80 transition-colors hover:text-[#00FCB8]">Brokers</a></li>
              <li><a href="/assetsolutions" className="text-sm text-white/80 transition-colors hover:text-[#00FCB8]">Asset Solutions</a></li>
              <li><a href="/contact" className="text-sm text-white/80 transition-colors hover:text-[#00FCB8]">Book a Consultation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li><a href="tel:+61422959486" className="transition-colors hover:text-[#00FCB8]">+61 422 959 486</a></li>
              <li><a href="mailto:operations@frontline.financial" className="transition-colors hover:text-[#00FCB8]">operations@frontline.financial</a></li>
              <li>150 George Street Parramatta 2150</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/20 pt-8">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-white/60 sm:text-left">Legal</p>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:justify-between sm:items-start">
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-white/90">Home Loans (Frontline Financial Brokers)</p>
              <p className="mt-1 text-sm font-normal text-white/70">Frontline Financial Brokers © 2025 All Rights Reserved</p>
              <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                <a href="/credit-guide" className="text-white/70 transition-colors hover:text-[#00FCB8]">Credit Guide</a>
                <a href="/privacy-consent" className="text-white/70 transition-colors hover:text-[#00FCB8]">Privacy Consent</a>
                <a href="/calculator-disclaimer-broking" className="text-white/70 transition-colors hover:text-[#00FCB8]">Calculator Disclaimer</a>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm font-semibold text-white/90">Asset &amp; Personal Finance (Frontline Financial: Asset Solutions)</p>
              <p className="mt-1 text-sm font-normal text-white/70">Frontline Financial: Asset Solutions © 2025 All Rights Reserved</p>
              <div className="mt-2 flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
                <a href="/credit-guide-asset-solutions" className="text-white/70 transition-colors hover:text-[#00FCB8]">Credit Guide &amp; Quote</a>
                <a href="/privacy-consent-asset-solutions" className="text-white/70 transition-colors hover:text-[#00FCB8]">Privacy Consent</a>
                <a href="/calculator-disclaimer-asset-solutions" className="text-white/70 transition-colors hover:text-[#00FCB8]">Calculator Disclaimer</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
