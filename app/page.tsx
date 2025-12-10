// app/page.tsx
import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN!,
  apiKey: process.env.API_KEY!,
});

export default async function Home() {
  const data = await client.get({
    endpoint: "blog",
    queries: { limit: 50 },
  });

  const blogs = data.contents;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ブログ一覧</h1>

      {/* カードレイアウト案1（高品質デザイン） */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <a
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="group block bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* 画像 */}
            <div className="aspect-video overflow-hidden">
              <img
                src={blog.thumbnail?.url || "/noimage.png"}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* 本文エリア */}
            <div className="p-6">
              {/* カテゴリー（ある場合のみ表示） */}
              {blog.categories?.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {blog.categories.map((cat) => (
                    <span
                      key={cat.id}
                      className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}

              {/* タイトル */}
              <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {blog.title}
              </h2>

              {/* 説明文 or 本文ダイジェスト */}
              <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                {blog.description ||
                  blog.content?.replace(/<[^>]+>/g, "").slice(0, 80) + "..."}
              </p>

              {/* 日付 */}
              <div className="mt-4 text-xs text-gray-400">
                {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
