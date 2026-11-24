// S08 招待コード図鑑：サービス事実の参照モジュール。
// 事実の正は ~/workspace/site-migration/work/services-data.json。CI（GitHub Actions）はリポジトリ外を
// 読めないため、その同期コピーを src/data/services-data.json に置いて読み込む。
// 事実（コード・紹介URL・特典・条件・期限）を更新したら、必ず正と同期コピーを両方更新すること。
import data from './services-data.json';

export interface ServiceFacts {
  slug: string;
  name: string;
  code: string | null;
  /** 併記する友達招待コード（dipsのみ） */
  friendCode: string | null;
  url: string | null;
  officialSite: string | null;
  benefit: string;
  conditions: string[];
  deadline: string | null;
  verified: string;
}

interface RawService {
  slug: string;
  name: string;
  code?: string | null;
  friendCode?: string | null;
  url?: string | null;
  officialSite?: string | null;
  benefit: string;
  conditions?: string[];
  deadline?: string | null;
  verified: string;
}

const rawServices = (data as unknown as { services: RawService[] }).services;

export const SERVICE_FACTS: Record<string, ServiceFacts> = Object.fromEntries(
  rawServices.map((s) => [
    s.slug,
    {
      slug: s.slug,
      name: s.name,
      code: s.code ?? null,
      friendCode: s.friendCode ?? null,
      url: s.url ?? null,
      officialSite: s.officialSite ?? null,
      benefit: s.benefit,
      conditions: s.conditions ?? [],
      deadline: s.deadline ?? null,
      verified: s.verified,
    },
  ]),
);

export const factsOf = (slug: string): ServiceFacts | undefined => SERVICE_FACTS[slug];

/**
 * 標本グリッドの「特典額順」並べ替えキー（円換算の編集値）の上書き。
 * 基本は各記事frontmatterの sortYen を使うが、正本の事実変更で陳腐化した分だけここで補正する。
 * - mirapoi: frontmatter sortYen=0 のままだったが、2026-11-25に正本で「招待コード入力で400ptゲット」が確定したため 400 とする。
 */
export const SPECIMEN_YEN_OVERRIDE: Record<string, number> = {
  mirapoi: 400,
};
