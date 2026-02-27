"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import FactFindWizard from "@/components/fact-find/FactFindWizard";

function FreeEligibilityTestHomeLoansContent() {
  const searchParams = useSearchParams();
  const contact = useMemo(
    () => ({
      firstName: searchParams.get("fn") || "",
      lastName: searchParams.get("ln") || "",
      email: searchParams.get("em") || "",
      phone: searchParams.get("ph") || "",
    }),
    [searchParams]
  );

  return <FactFindWizard contact={contact} />;
}

export default function FreeEligibilityTestHomeLoansPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1628] flex items-center justify-center"><p className="text-[#00FCB8]">Loading...</p></div>}>
      <FreeEligibilityTestHomeLoansContent />
    </Suspense>
  );
}
