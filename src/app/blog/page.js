"use client";

import { useState, useEffect } from "react";
import LayoutNav from "@/components/LayoutNav";
import LayoutFooter from "@/components/LayoutFooter";
import WaveDivider from "@/components/WaveDivider";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = e.target;
    const formData = new FormData(form);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save article.");
        return;
      }
      await fetchPosts();
      setShowForm(false);
      form.reset();
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] font-sans">
      <LayoutNav activeNav="blog" />

      <section className="bg-[#1C5472] px-4 py-10 md:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00FCB8]">Blog</p>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Articles &amp; insights</h1>
          <p className="mt-4 text-[#39B2B2]">
            Tips, updates and ideas from the Frontline Financial team.
          </p>
        </div>
      </section>

      <WaveDivider fill="#0A1628" />

      <section className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="rounded-lg bg-[#00FCB8] px-6 py-3 font-bold text-[#0A1628] transition hover:opacity-95"
            >
              {showForm ? "Cancel" : "Create new article"}
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mb-14 rounded-xl border border-white/10 bg-[#111827] p-6 md:p-8"
            >
              <h2 className="text-xl font-bold text-white">New article</h2>
              <p className="mt-1 text-sm text-[#9CA3AF]">Add a photo, title, and content.</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="blog-image" className="block text-sm font-medium text-white/90">
                    Photo
                  </label>
                  <input
                    id="blog-image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="mt-1.5 block w-full text-sm text-white/80 file:mr-4 file:rounded-lg file:border-0 file:bg-[#00FCB8] file:px-4 file:py-2 file:font-medium file:text-[#0A1628] file:transition file:hover:opacity-90"
                  />
                </div>
                <div>
                  <label htmlFor="blog-title" className="block text-sm font-medium text-white/90">
                    Title
                  </label>
                  <input
                    id="blog-title"
                    name="title"
                    type="text"
                    required
                    placeholder="Article title"
                    className="mt-1.5 w-full rounded-lg border border-white/20 bg-[#0A1628] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                  />
                </div>
                <div>
                  <label htmlFor="blog-content" className="block text-sm font-medium text-white/90">
                    Content
                  </label>
                  <textarea
                    id="blog-content"
                    name="content"
                    rows={8}
                    placeholder="Write your article content here..."
                    className="mt-1.5 w-full rounded-lg border border-white/20 bg-[#0A1628] px-4 py-3 text-white placeholder:text-white/40 focus:border-[#00FCB8] focus:outline-none focus:ring-1 focus:ring-[#00FCB8]"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-400">{error}</p>
              )}
              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-[#00FCB8] px-6 py-2.5 font-bold text-[#0A1628] transition hover:opacity-95 disabled:opacity-60"
                >
                  {submitting ? "Saving…" : "Publish article"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-white/30 px-6 py-2.5 font-medium text-white transition hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <p className="text-center text-[#9CA3AF]">Loading articles…</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-[#9CA3AF]">
              No articles yet. Click &quot;Create new article&quot; to add one.
            </p>
          ) : (
            <ul className="space-y-8">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="rounded-xl border border-white/10 bg-[#111827] overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {post.imagePath && (
                      <div className="relative h-48 w-full shrink-0 md:h-auto md:w-64">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.imagePath}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-6">
                      <h3 className="text-xl font-bold text-white">{post.title}</h3>
                      <p className="mt-2 text-sm text-[#9CA3AF]">
                        {new Date(post.createdAt).toLocaleDateString("en-AU", {
                          dateStyle: "medium",
                        })}
                      </p>
                      <p className="mt-3 whitespace-pre-wrap text-[#94a3b8]">{post.content || "—"}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <LayoutFooter />
    </div>
  );
}
