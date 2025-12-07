// app/blog/[id]/page.tsx
import { notFound } from 'next/navigation';
import { client } from '@/libs/microcms';
import type { Blog } from '@/types/blog';

interface Props {
  params: Promise<{ id: string }>;   // ← ここが大事！Promise に変更
}

export async function generateStaticParams() {
  const { contents } = await client.getList<Blog>({ endpoint: 'blog' });
  return contents.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPage({ params }: Props) {
  const { id } = await params;                 // ← await で展開
  let post: Blog;

  try {
    post = await client.get<Blog>({
      endpoint: 'blog',
      contentId: id,
    });
  } catch {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <time className="text-gray-500">
        {new Date(post.publishedAt!).toLocaleDateString('ja-JP')}
      </time>

      <div
        className="prose prose-lg max-w-none mt-12"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </article>
  );
}