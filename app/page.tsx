// app/page.tsx

import { Hero } from "./components/Hero";
import { BlogCard } from "./components/BlogCard";
import { getList } from "@/libs/microcms";

export const revalidate = 60; // ISR（60秒）

export default async function Home() {
  const { contents: blogs } = await getList();

  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Blog List */}
      <section className="blogSection">
        <div className="inner">
          {blogs.length === 0 ? (
            <p className="empty">まだ記事がありません。</p>
          ) : (
            <div className="grid">
              {blogs.map((blog: any) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  createdAt={blog.createdAt}
                  description={blog.description}
                  thumbnailUrl={blog.thumbnail?.url}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
