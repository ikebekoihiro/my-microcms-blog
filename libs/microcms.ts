// libs/microcms.ts

import { createClient } from "microcms-js-sdk";

if (!process.env.SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
  throw new Error("Missing microCMS environment variables");
}

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export type Blog = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  thumbnail?: {
    url: string;
  };
};

export const getList = async () => {
  const data = await client.get<{
    contents: Blog[];
    totalCount: number;
    offset: number;
    limit: number;
  }>({
    endpoint: "blog",
  });

  return data;
};
