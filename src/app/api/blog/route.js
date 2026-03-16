import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "blog-posts.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "blog-images");

function getDataPath() {
  return DATA_PATH;
}

async function getPosts() {
  try {
    const data = await readFile(getDataPath(), "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function savePosts(posts) {
  await writeFile(getDataPath(), JSON.stringify(posts, null, 2), "utf-8");
}

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title")?.toString()?.trim();
    const content = formData.get("content")?.toString()?.trim();
    const imageFile = formData.get("image");

    if (!title) {
      return NextResponse.json({ success: false, error: "Title is required." }, { status: 400 });
    }

    let imagePath = null;
    if (imageFile && imageFile.size > 0) {
      await mkdir(UPLOAD_DIR, { recursive: true });
      const ext = path.extname(imageFile.name) || ".jpg";
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
      const filePath = path.join(UPLOAD_DIR, filename);
      const bytes = await imageFile.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));
      imagePath = `/blog-images/${filename}`;
    }

    const posts = await getPosts();
    const newPost = {
      id: String(Date.now()),
      title,
      content: content || "",
      imagePath,
      createdAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    await savePosts(posts);

    return NextResponse.json({ success: true, post: newPost });
  } catch (err) {
    console.error("[API blog] POST error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to save article." },
      { status: 500 }
    );
  }
}
