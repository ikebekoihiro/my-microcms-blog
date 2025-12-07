import { client } from '../../../libs/microcms';
import styles from './page.module.css';
import dayjs from 'dayjs';

export const revalidate = 0;
export const dynamic = "force-dynamic";

type Props = {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  category: { name: string };
};

async function getBlogPost(id: string): Promise<Props> {
  const data = await client.get({
    endpoint: 'blog',
    contentId: id,
  });
  return data;
}

// 記事詳細ページ
export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPost(params.id);

  const formattedDate = dayjs(post.publishedAt).format('YY.MM.DD');

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.date}>{formattedDate}</div>
      <div className={styles.category}>カテゴリー：{post.category?.name}</div>
      <div className={styles.post} dangerouslySetInnerHTML={{ __html: post.body }} />
    </main>
  );
}
