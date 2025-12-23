'use client';

import Link from "next/link";
import styles from "./BlogCard.module.css";

type BlogCardProps = {
  id: string;
  title: string;
  createdAt: string;
  description?: string;
  thumbnailUrl?: string;
};

export const BlogCard = ({
  id,
  title,
  createdAt,
  description,
  thumbnailUrl,
}: BlogCardProps) => {
  return (
    <article className={styles.card}>
      <Link href={`/blog/${id}`} className={styles.link}>
        {thumbnailUrl && (
          <div className={styles.thumb}>
            <img src={thumbnailUrl} alt={title} />
          </div>
        )}

        <div className={styles.body}>
          <time className={styles.date}>
            {new Date(createdAt).toLocaleDateString("ja-JP")}
          </time>

          <h2 className={styles.title}>{title}</h2>

          {description && (
            <p className={styles.description}>{description}</p>
          )}

          <span className={styles.readMore}>続きを読む →</span>
        </div>
      </Link>
    </article>
  );
};
