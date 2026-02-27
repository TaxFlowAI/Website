import { NextResponse } from "next/server";
import { getDrafts } from "../store";

export async function GET(request, { params }) {
  const drafts = getDrafts();
  const draft = drafts.get(params.id);
  if (!draft) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(draft);
}

export async function PATCH(request, { params }) {
  const drafts = getDrafts();
  if (!drafts.has(params.id)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  try {
    const body = await request.json();
    const draft = { ...drafts.get(params.id), ...body, id: params.id, updatedAt: new Date().toISOString() };
    drafts.set(params.id, draft);
    return NextResponse.json(draft);
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
