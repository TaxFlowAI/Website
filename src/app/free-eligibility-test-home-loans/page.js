"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import FactFindWizard from "@/components/fact-find/FactFindWizard";

export default function FreeEligibilityTestHomeLoansPage() {
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
