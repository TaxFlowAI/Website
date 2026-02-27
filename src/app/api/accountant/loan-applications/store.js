/**
 * In-memory store for loan application drafts.
 * Replace with DB in production (loan_applications + loan_applicants, loan_assets, loan_liabilities, etc.).
 */
const drafts = new Map();
export function getDrafts() {
  return drafts;
}
