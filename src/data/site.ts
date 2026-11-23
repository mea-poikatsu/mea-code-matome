// サイト共通の設定。GA4測定IDはユーザーから提供され次第ここに入れる。
// 空のままならGA4スクリプトは出力されない。
export const SITE = {
  name: '紹介コードまとめブログ',
  operator: 'メア',
  siteUrl: 'https://coolcoolcoolcool161-a11y.github.io/mea-code-matome',
  description:
    'ポイ活の紹介コード・招待コードを19サービス分まとめて掲載。ワラウ最大2,500pt、ハピタス最大2,300P、モッピー最大7,000P、TikTok・TikTok Lite、PayPay、メルカリ、エアウォレット、楽天モバイル、オリくじ、ポケカツ、Freecash、SMBC Olive、Muse、サンポ、ぶたまる、ミラポイ、トクエル、dipsファームの特典・条件・紹介リンクを一覧で比較。コードはコピーボタンでそのまま使えます。',
  dateModified: '2026-11-21',
  gaMeasurementId: 'G-8BB8V3DRW8',
  xAccount: 'https://x.com/pppppuririn',
  hubUrl:
    'https://coolcoolcoolcool161-a11y.github.io/mea-poikatsu-media/',
  // みんなの紹介コード掲示板（公開中）
  boardUrl: 'https://coolcoolcoolcool161-a11y.github.io/mea-keijiban/',
} as const;

// Astro 5ではcontent collectionのentry.idに拡張子（.md）が付くため、URL用スラッグに変換する
export const slugOf = (id: string) => id.replace(/\.md$/, '');

// 旧サイト（紹介コードまとめブログ v16）の見出し分け（4部門）
export const CATEGORIES = [
  { slug: 'point-sites', name: 'ポイントサイト系' },
  { slug: 'sns-video', name: 'SNS・動画系' },
  { slug: 'payment', name: '決済・キャッシュレス系' },
  { slug: 'other', name: 'その他' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const CATEGORY_NAMES: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.name]),
);

// 旧サイトの一覧表の並び（ワラウ→ハピタス→モッピー→TikTok→TikTok Lite→PayPay→メルカリ→エアウォレット→楽天モバイル→オリくじ→ポケカツ→Freecash→Olive→Muse→サンポ→ぶたまる→ミラポイ→トクエル→dips）
// 注：旧サイトの一覧表にはMuseの行がなかった（18行）が、カードとJSON-LDにはMuseが含まれていたため、新サイトの一覧表にはMuseを含めた19行にしている。
export const MATOME_ORDER = [
  'freecash',
  'warau',
  'tiktok',
  'tiktok-lite',
  'moppy',
  'hapitas',
  'paypay',
  'mercari',
  'airwallet',
  'rakuten-mobile',
  'orikuji',
  'pokekatsu',
  'olive',
  'muse',
  'sampo',
  'butamaru',
  'mirapoi',
  'tokueru',
  'dips',
] as const;

// 姉妹ブログ（旧サイトには姉妹ブログ欄がなかったため、他サイトと同じ5件を新設。旧muse.ai URL。2026-11-21にGitHub Pagesの新URLへ更新済み）
export const SISTER_BLOGS = [
  {
    name: 'ポイ活ブログ',
    note: 'ランキングや特集が充実した総合版',
    url: 'https://coolcoolcoolcool161-a11y.github.io/mea-poikatsu-blog/',
  },
  {
    name: 'おすすめ紹介コード',
    note: 'メアのおすすめ順に並べた紹介コード版',
    url: 'https://coolcoolcoolcool161-a11y.github.io/mea-ranking/',
  },
  {
    name: 'ポイ活コード検索',
    note: 'サービス名で検索してすぐ探せる検索版',
    url: 'https://coolcoolcoolcool161-a11y.github.io/mea-code-search/',
  },
  {
    name: 'ポイ活マガジン',
    note: '読み物スタイルでじっくり紹介する雑誌版',
    url: 'https://coolcoolcoolcool161-a11y.github.io/mea-poikatsu-magazine/',
  },
  {
    name: 'かんたん紹介コード案内',
    note: '大きな文字で分かりやすく案内するかんたん版',
    url: 'https://coolcoolcoolcool161-a11y.github.io/mea-kantan-guide/',
  },
  {
    name: 'ゲームポイ活ブログ',
    note: 'ゲームで貯める案件に特化した版',
    url: 'https://coolcoolcoolcool161-a11y.github.io/mea-game-poikatsu/',
  },
] as const;

// 旧サイトのFAQ 6件をそのまま移行
export const FAQS = [
  {
    q: '紹介コードはどこに入力するの？',
    a: '登録画面の「招待コード」欄や、アプリ内の設定ページなどに入力するよ。各サービスで場所は少しちがうから、カードの紹介文やリンク先の説明を見てね。',
  },
  {
    q: '登録には何か条件があるの？',
    a: '登録自体は無料のところが多いよ。特典をもらうには各サービスの条件があるから、カードの「条件」欄や紹介文をチェックしてね。',
  },
  {
    q: 'TikTokを始めるときの注意点は？',
    a: 'Wi-FiをOFFにしてモバイル通信でアクセスすること、招待URLを直接開くこと、「ダウンロードを開く」ではなく紹介URLから進むこと。この3点が大事だよ！',
  },
  {
    q: '楽天モバイルはどうやって申し込むの？',
    a: '紹介リンクから楽天IDでログインして、翌々月末日までに楽天モバイルのプランを申し込んでね。プランの利用を開始して、Rakuten Linkアプリから発信通話をすると条件達成だよ。',
  },
  {
    q: '自分の紹介コードを掲示板に投稿できますか？',
    a: 'できるよ！メアの掲示板では、あなたの紹介コードも投稿できるんだ。掲示板のルールに従って投稿してね。',
  },
  {
    q: 'ポケカツにはなぜリンクがないの？',
    a: 'ポケカツは招待コードのみで登録する仕組みだよ。登録リンクがないから、コード「2BGZ325P」をコピーして使ってね。',
  },
] as const;
