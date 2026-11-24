import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSponsored from './rehype-sponsored.mjs';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// 記事 frontmatter の dateModified を slug 別に読み取る（F-22: sitemap lastmod の供給源）。
// 確かな日付があるのは記事ページのみ。その他のページには lastmod を付けない。
const articlesDir = fileURLToPath(new URL('./src/content/articles/', import.meta.url));
const lastmodBySlug = {};
for (const name of readdirSync(articlesDir)) {
  if (!name.endsWith('.md')) continue;
  const text = readFileSync(path.join(articlesDir, name), 'utf8');
  const m = text.match(/dateModified:\s*["']?(\d{4}-\d{2}-\d{2})/);
  if (m) lastmodBySlug[name.replace(/\.md$/, '')] = m[1];
}

export default defineConfig({
  site: 'https://mea-poikatsu.github.io',
  base: '/mea-code-matome',
  trailingSlash: 'always',
  markdown: {
    // 本文中の外部ドメインリンクへ rel="sponsored nofollow" を自動付与（開示ページの記載と実態を一致させる）
    rehypePlugins: [rehypeSponsored],
  },
  integrations: [
    sitemap({
      serialize(item) {
        const m = item.url.match(/\/articles\/([^/]+)\/$/);
        if (m && lastmodBySlug[m[1]]) item.lastmod = lastmodBySlug[m[1]];
        return item;
      },
    }),
  ],
});
