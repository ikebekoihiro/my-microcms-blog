'use client';

import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.title}>JAMstack Blog</h1>

        <p className={styles.description}>
          Next.js App Router と microCMS を用いて構築した、
          ポートフォリオ用の技術ブログです。
        </p>

        <ul className={styles.techList}>
          <li>Next.js (App Router)</li>
          <li>TypeScript</li>
          <li>microCMS</li>
          <li>SSG / ISR</li>
          <li>Vercel</li>
        </ul>
      </div>
    </section>
  );
};
