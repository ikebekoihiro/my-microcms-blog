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
    post = await client.get({
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
        {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('ja-JP')}
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