// app/page.tsx
import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN!,
  apiKey: process.env.API_KEY!,
});

export default async function Home() {
  // microCMSからデータ取得
  const data = await client.get({
    endpoint: "blog",
    queries: { limit: 50 },
  });

  const blogs = data.contents; // ← 必ずここで配列になる

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ブログ一覧</h1>

      {/* カードレイアウト */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded-lg shadow hover:shadow-lg transition bg-white"
          >
            {/* サムネイル */}
            {blog.thumbnail && (
              <img
                src={blog.thumbnail.url}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}

            <div className="p-4">
              {/* タイトル */}
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>

              {/* 投稿日 */}
              <p className="text-sm text-gray-500">
                {new Date(blog.published).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
