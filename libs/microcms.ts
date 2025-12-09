import { createClient } from "microcms-js-sdk";

if (!process.env.SERVICE_DOMAIN || !process.env.API_KEY) {
  throw new Error("Missing microCMS environment variables");
}

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN!,
  apiKey: process.env.API_KEY!,
});

export const getList = async () => {
  try {
    const data = await client.get({
      endpoint: "blog",
      queries: { limit: 100 } // 必要に応じて調整
    });

    // contents がない場合に備える
    return {
      contents: data.contents ?? [],
      totalCount: data.totalCount ?? 0,
      offset: data.offset ?? 0,
      limit: data.limit ?? 0,
    };
  } catch (error) {
    console.error("getList error:", error);
    return { contents: [] };
  }
};
