// 記事本文（Markdown）の外部ドメインリンクへ rel="sponsored nofollow" を自動付与する rehype プラグイン。
// 自サイト（mea-poikatsu.github.io）へのリンク・相対リンクには付けない。
// .astro コンポーネント側のリンク（ServiceCard 等）は対象外で、既存の rel はそのまま維持される。
const SITE_HOST = 'mea-poikatsu.github.io';

function visit(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'element' && node.tagName === 'a') {
    const href = node.properties?.href;
    if (typeof href === 'string' && /^https?:\/\//i.test(href)) {
      try {
        if (new URL(href).hostname !== SITE_HOST) {
          const current = node.properties.rel;
          const tokens = Array.isArray(current)
            ? [...current]
            : typeof current === 'string'
              ? current.split(/\s+/).filter(Boolean)
              : [];
          for (const t of ['sponsored', 'nofollow']) {
            if (!tokens.includes(t)) tokens.push(t);
          }
          node.properties.rel = tokens.join(' ');
        }
      } catch {
        // URL として解釈できない href は触らない
      }
    }
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) visit(child);
  }
}

export default function rehypeSponsored() {
  return (tree) => {
    visit(tree);
  };
}
