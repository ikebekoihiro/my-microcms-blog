// app/blog/[id]/page.tsx
import { notFound } from 'next/navigation';
import { client } from '@/libs/microcms';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const { contents } = await client.getList({ endpoint: 'blog' });
    return contents.map((post: any) => ({
      id: post.id,
    }));
  } catch {
    return [];
  }
}

export default async function BlogPage({ params }: Props) {
  const { id } = await params;

  let post;
  try {
    post = await client.get({ endpoint: 'blog', contentId: id });
  } catch {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      
      {post.publishedAt && (
        <time className="block text-gray-500 mb-8">
          {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
        </time>
      )}

      {/* ここが100%正しい書き方！！ */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  );
}