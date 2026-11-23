# 紹介コードまとめブログ（mea-code-matome）

メアのポイ活メディア「紹介コードまとめブログ」の独立サイト版。Astro＋Markdownで構築し、Cloudflare Pages（Free）で公開する。旧サイト（muse.ai）は移行完了＋ユーザー最終承認があるまで削除しない。

## 公開URL（暫定）

- https://mea-code-matome.pages.dev （Cloudflare Pagesのプロジェクト作成時にサブドメインが確定したら `astro.config.mjs`・`public/robots.txt`・`public/sitemap.xml` のURLを書き換えること）

## 内容

- 記事：全19サービス分の個別記事ページ（`src/content/articles/`）。カテゴリ4部門（ポイントサイト系3／SNS・動画系2／決済・キャッシュレス系3／その他11）。記事本文は「まとめ・一覧比較」の切り口で書き分け、旧サイトの紹介文（原文）をそのまま掲載。
- トップページ：全19サービス比較の一覧表（コードのコピーボタン付き・19行）、みんなの紹介コード掲示板の案内、部門別カード一覧（全19サービス）、使い方はかんたん3ステップ、FAQ 6件、ご利用にあたっての注意 3件、姉妹ブログ、AdMax 3箇所
- カテゴリページ：4部門
- サイト内検索：`/search/`（ビルド時に `/search-index.json` を生成し、ブラウザ内で絞り込み）
- 法務ページ：広告・紹介報酬に関する表記／プライバシーポリシー／利用規約・免責事項（旧サイトには法務ページがなかったため、他サイトと同じ標準文言を新規で採用）
- SEO：ページごとの固有title・meta description・canonical・XMLサイトマップ（31 URL）・robots.txt・OGP・JSON-LD（WebPage／ItemList／FAQPage／Article／BreadcrumbList）・パンくず・内部リンク・モバイル対応。JavaScriptなしでも記事本文はHTMLに含まれる。

## 旧サイトからの移行メモ（2026-11-21）

- 旧サイトの紹介文（原文）19件は `artifact.export` のHTMLから抽出し、記事の「紹介文（原文）」にそのまま移行（PayPayの「上記のを入力します」など原文のまま）。欠落した内容はなし。
- 旧サイトの一覧表にはMuseの行がなかった（18行）が、カードとJSON-LDにはMuseが含まれていたため、新サイトの一覧表にはMuseを含めた19行にしている。
- 旧サイトには法務ページ（開示・プライバシー・免責）がなかったため、他サイトと同じ標準文言を新規で採用（指令書 §5 の必須要素のため）。
- 旧サイトには姉妹ブログ欄がなかったため、他サイトと同じ6件を新設（旧muse.ai URL）。
- 掲示板リンクは暫定で https://mea-keijiban.pages.dev を使用し、「新しい掲示板は公開準備中です」と明記（旧サイトの掲示板リンクは muse.ai 内の相対リンクだった）。
- 旧サイトの一覧表でTikTok Liteのサービス名リンクは #tiktok を指していたが、新サイトではTikTokとTikTok Liteは別記事のため #tiktok-lite を指す。

## 紹介コード・URLの扱い

- コード・紹介URL・特典額・条件は `src/content/articles/*.md` のfrontmatterと本文に記載。変更するときは `~/workspace/*-referral-post.txt` と台帳 `~/workspace/site-migration-inventory.md` §4.1 で照合すること。
- ワラウのレートは1pt＝1円（公式確認済み）。紹介URLは `/bEs5`（コード `bEs7` と末尾が違うのが正しい）。公式バナーHTMLの `/boav` は使わないこと。
- Freecashは招待コード入力後、初回DLで1,430円分ゲット（旧表記「招待された側は初回DLで1,430円分」は誤りで使わないこと）。
- トクエルの記事ファイル名は `tokueru.md`（公式ドメイン tokueru.jp・既存6サイトのスラッグと一致）。`tokueu.md` は誤り。
- ミラポイの招待特典400ptは公式未確認のため金額を記載しないこと（旧サイト通り「招待特典あり／金額はアプリ内でご確認ください」とする）。

## 画像について

- `public/images/` の画像5ファイルはGitHubの `push_files` では送れない（UTF-8テキストのみ対応）。GitHub Web UIのドラッグ＆ドロップで `public/images/` にアップロードすること。アップロードが済むまでデプロイ先では画像が表示されない。
- hero.jpg＝ヒーローバナー、banner-muse.jpg＝Muse紹介画像、banner-official-{warau,moppy,hapitas}＝公式細型バナー3枚。5枚すべて旧サイトのexportから抽出したバイトとSHA256一致。旧ブログにはFreecash HQバナーがなかったため banner-freecash.jpg は置かない。

## ビルド

- `npm run build`（Astro 5）。`node_modules` は `../poikatsu-magazine/node_modules` へのシンボリックリンク（同じAstroバージョンを共有）。ビルド前に `ls -la node_modules` でリンクが有効なことを確認すること。
- ビルド後、簡易サーバーで全URLの200確認を行うこと（トップ・記事19件・カテゴリ4件・検索・FAQ・運営者情報・お問い合わせ・法務3件・サイトマップ・robots.txt・検索インデックス・画像5件）。
- `dist/` はビルド成果物。GitHubへのプッシュ対象外（マニフェストから除外）。

## プッシュ

- `github push-files --owner mea-poikatsu --repo mea-code-matome --branch main --message "紹介コードまとめブログ Astro版 初回コミット" --source-dir ~/workspace/site-migration/poikatsu-code-matome --paths-file ~/workspace/site-migration/work/poikatsu-code-matome-paths-textonly.txt`
- 手順書 `/opt/hatch/connectors/github/references/snapshot-push.md` に従うこと。プッシュ前に `list_commits` でリポジトリが空（409 Git Repository is empty）であることを確認し、プッシュ直前にも再確認すること。
- 同期記録は `~/workspace/site-migration/poikatsu-code-matome.muse-github-snapshot-sync.json` に保存する。
