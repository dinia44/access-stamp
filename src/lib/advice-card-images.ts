import type { AdviceArticle } from "@/lib/mock-data";

/** Stable hash for picking images from pools */
export function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function u(photo: string): string {
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=800&q=80`;
}

/** Fallback when category pool missing */
const FALLBACK_POOL = [
  u("photo-1576765608535-5f03d6910bbf"),
  u("photo-1544027993-37dbfe37962a"),
  u("photo-1499951360447-b19be558fe63"),
  u("photo-1517245386807-bb43f82c33c4"),
  u("photo-1529156069898-49953e39b3ac"),
  u("photo-1516637090014-cb1ab78511f7"),
] as const;

/** Same-origin SVG covers — reliable on all hosts (no external CDN). */
const LOCAL_TRANSPORT_COVERS = [
  "/images/advice/covers/transport-1.svg",
  "/images/advice/covers/transport-2.svg",
  "/images/advice/covers/transport-3.svg",
] as const;

const LOCAL_TRAVEL_COVERS = [
  "/images/advice/covers/travel-1.svg",
  "/images/advice/covers/travel-2.svg",
  "/images/advice/covers/travel-3.svg",
] as const;

const LOCAL_EQUIPMENT_COVERS = [
  "/images/advice/covers/equipment-1.svg",
  "/images/advice/covers/equipment-2.svg",
  "/images/advice/covers/equipment-3.svg",
] as const;

/**
 * Per-section image pools. Transport, travel & equipment use local SVGs; others use Unsplash.
 * Same slug always maps to the same image via hash.
 */
const CATEGORY_IMAGE_POOLS: Record<AdviceArticle["categorySlug"], readonly string[]> = {
  rights: [
    u("photo-1589829545856-d10d557cf95f"),
    u("photo-1450101499163-c8848c66ca85"),
    u("photo-1521791136064-7986c2922126"),
    u("photo-1454165804606-c3d57bc86b40"),
    u("photo-1507679799987-c73779587ccf"),
    u("photo-1568992687947-822a12a7039d"),
  ],
  education: [
    u("photo-1498243691581-b145c3f54a5a"),
    u("photo-1516627145497-ae6968895b74"),
    u("photo-1577896851231-70ef18881754"),
    u("photo-1523050854058-8df90110c9f1"),
    u("photo-1427504494785-3a9ca7044f45"),
    u("photo-1434030216411-0b793f4b4173"),
  ],
  transport: LOCAL_TRANSPORT_COVERS,
  cars: [
    u("photo-1489824904134-891ab64532f1"),
    u("photo-1519641471654-76ce4337a053"),
    u("photo-1492144534655-ae79c964c9d7"),
    u("photo-1558618047-3c8c76ca7d13"),
    u("photo-1449965408869-eaa3f722e40d"),
    u("photo-1503376780353-7e66929fa8fd"),
  ],
  sport: [
    u("photo-1571019613454-1cb2f99b2d8b"),
    u("photo-1517649763962-0c62306601b7"),
    u("photo-1540497077202-7c8a3999166f"),
    u("photo-1517836357463-d25dfeac3438"),
    u("photo-1599058918144-1ffbbe6bc804"),
    u("photo-1476484132128-7bf5a36069da"),
  ],
  workplace: [
    u("photo-1521737711867-e3b97375f902"),
    u("photo-1497366216548-37526070297c"),
    u("photo-1497215842964-222b430dc094"),
    u("photo-1520607162513-77705c0f306d"),
    u("photo-1519389950473-47ba0277781c"),
    u("photo-1565688537855-8c246cb48009"),
  ],
  care: [
    u("photo-1576091160399-112ba8d25d1d"),
    u("photo-1584515933487-779052d13604"),
    u("photo-1579684385127-1ef15d5081ad"),
    u("photo-1516733725897-1e73c87944c9"),
    u("photo-1516714819001-8ee7a13b71d7"),
    u("photo-1516574187841-c2389dfc93b6"),
  ],
  equipment: LOCAL_EQUIPMENT_COVERS,
  emergency: [
    u("photo-1584438784894-089d6a62b8fa"),
    u("photo-1584820927498-cfe521198f79"),
    u("photo-1516574187841-c2389dfc93b6"),
    u("photo-1564730614570-230d14e24fef"),
    u("photo-1586773860418-d372422d8fce"),
    u("photo-1474631245212-32dc3c8310c6"),
  ],
  "new-to-disability": [
    u("photo-1516534775068-ba3e7458af70"),
    u("photo-1519494026892-80bbd2d6fd0d"),
    u("photo-1559757175-7bcb04669959"),
    u("photo-1573497019940-1c28c88b4f2e"),
    u("photo-1529156069898-49953e39b3ac"),
    u("photo-1517245386807-bb43f82c33c4"),
  ],
  travel: LOCAL_TRAVEL_COVERS,
};

/** Hero imagery for /advice hub category tiles */
export const ADVICE_HUB_CATEGORY_IMAGES: Record<
  string,
  { src: string; alt: string }
> = {
  "/advice/rights": {
    src: u("photo-1589829545856-d10d557cf95f"),
    alt: "Legal documents and scales of justice, symbolic of rights and benefits",
  },
  "/advice/education": {
    src: u("photo-1498243691581-b145c3f54a5a"),
    alt: "Student studying with a laptop in a bright library",
  },
  "/advice/transport": {
    src: LOCAL_TRANSPORT_COVERS[0],
    alt: "Accessible transport — trains, buses, and getting around",
  },
  "/advice/cars": {
    src: u("photo-1489824904134-891ab64532f1"),
    alt: "Wheelchair symbol and accessible parking context",
  },
  "/advice/sport": {
    src: u("photo-1571019613454-1cb2f99b2d8b"),
    alt: "Adaptive sport and activity",
  },
  "/advice/workplace": {
    src: u("photo-1521737711867-e3b97375f902"),
    alt: "Colleagues collaborating in an office",
  },
  "/advice/care": {
    src: u("photo-1576091160399-112ba8d25d1d"),
    alt: "Hands holding supportively",
  },
  "/advice/equipment": {
    src: LOCAL_EQUIPMENT_COVERS[0],
    alt: "Wheelchairs, home equipment, and assistive technology",
  },
  "/advice/emergency": {
    src: u("photo-1584438784894-089d6a62b8fa"),
    alt: "Emergency phone and support",
  },
  "/advice/new-to-disability": {
    src: u("photo-1516534775068-ba3e7458af70"),
    alt: "Person planning with notes and tea",
  },
  "/advice/travel": {
    src: LOCAL_TRAVEL_COVERS[0],
    alt: "Planes, hotels, and accessible travel planning",
  },
};

export function getAdviceArticleCardImage(article: {
  slug: string;
  title: string;
  categorySlug: AdviceArticle["categorySlug"];
  heroImage?: { src: string; alt: string };
}): { src: string; alt: string } {
  if (article.heroImage?.src && article.heroImage.alt) {
    return { src: article.heroImage.src, alt: article.heroImage.alt };
  }
  const pool = CATEGORY_IMAGE_POOLS[article.categorySlug] ?? FALLBACK_POOL;
  const src = pool[hashSeed(`${article.categorySlug}:${article.slug}`) % pool.length];
  return {
    src,
    alt: `Illustration for guide: ${article.title}`,
  };
}

/** Manual topic cards / non-article links — stable image from category + seed string */
export function getAdviceSceneImage(
  categorySlug: AdviceArticle["categorySlug"],
  seed: string,
): { src: string; alt: string } {
  const pool = CATEGORY_IMAGE_POOLS[categorySlug] ?? FALLBACK_POOL;
  const src = pool[hashSeed(`${categorySlug}:${seed}`) % pool.length];
  return {
    src,
    alt: `Photo for: ${seed}`,
  };
}
