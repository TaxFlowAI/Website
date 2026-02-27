import { NextResponse } from "next/server";
import { getDrafts } from "./store";

/**
 * Loan application drafts (fact find). All dollar amounts in payload should be in cents (integer).
 * Replace with DB (loan_applications + related tables) in production.
 */
function generateId() {
  return `draft_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export async function POST(request) {
  const drafts = getDrafts();
  try {
    const body = await request.json();
    const id = body.id && drafts.has(body.id) ? body.id : generateId();
    const { id: _id, ...data } = body;
    const draft = { id, ...data, updatedAt: new Date().toISOString() };
    drafts.set(id, draft);
    return NextResponse.json(draft);
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(request) {
  const drafts = getDrafts();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const draft = drafts.get(id);
    if (!draft) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(draft);
  }
  return NextResponse.json(Array.from(drafts.values()));
}
