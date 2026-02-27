"use client";

import { createContext, useContext } from "react";

/**
 * Optional override for which entity's compliance to show (e.g. on /financial-calculators based on active tab).
 * If set, ComplianceFooter uses this instead of the route-based entity.
 */
export const ComplianceEntityContext = createContext(null);

export function useComplianceEntityOverride() {
  return useContext(ComplianceEntityContext);
}
