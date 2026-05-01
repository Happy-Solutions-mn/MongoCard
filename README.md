# 🎴 МонгоКарт

Монгол хэлээр бүрэн бэлдсэн **party карт тоглоомын** Next.js аппликейшн.
Бүртгэлгүй, утсан дээрээ шууд тоглоно — найзуудтайгаа гэр, кафе, хүлээлгийн
танхим хаана ч уулзахдаа.

> **Statu:** Active development. Production deploy: `https://mongocard.mn`

## ✨ Боломжууд

- 🎭 **5 төрлийн тоглоом**: Үнэн эсвэл зориг, Уу эсвэл шийтгүүл, Би хэзээ ч…,
  Аль нь дээр вэ?, Халуун суудал.
- 🃏 **60+ карт** тоглоом тус бүрд (Зөөлөн / Дунд / Халуун ангиллаар).
- ✏️ **Өөрийн карт нэмэх** — `Тохиргоо` хуудаснаас локалаар хадгална.
- ↩️ **Skip / Undo / Timer** — даалгавар сорьсон хүнд цаг тохируулах боломжтой.
- 🔊 **Дуу + чичиргээ** — WebAudio API + `navigator.vibrate`.
- 💾 **Persistence** — Zustand `persist` middleware (`localStorage`).
- 🌗 **Light / Dark / System theme**.
- 📱 **PWA-ready** (manifest, theme-color, A2HS).
- 🤝 **Web Share API + clipboard fallback** — найзаа уриах.
- 📢 **AdSense slot** (ENV тохируулсан үед идэвхждэг, эс бөгөөс placeholder).
- ♿ **A11y** — pinch-to-zoom хязгаарлахгүй, role/aria-label-уудтай dialog-ууд.
- 🔍 **SEO** — OG card, Twitter card, sitemap, robots.

## 🛠️ Технологи

| Категори | Сонголт |
|---|---|
| Framework | Next.js 16 (App Router, RSC) |
| UI | React 19 + Tailwind v4 + shadcn/ui (Radix) |
| State | [Zustand](https://github.com/pmndrs/zustand) + persist |
| Animation | Framer Motion |
| Theme | next-themes |
| Toast | sonner |
| Confetti | canvas-confetti |
| Analytics | @vercel/analytics |

## 🚀 Эхлүүлэх

```bash
pnpm install
pnpm dev
# или
npm install && npm run dev
```

Дараа нь [http://localhost:3000](http://localhost:3000) рүү ор.

### Environment variables

Бүгд optional. `.env.local` файлд тохируулна.

| Variable | Тайлбар | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production-ын URL (sitemap, OG, share) | `https://mongocard.mn` |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Google AdSense client (`ca-pub-…`). Тохируулаагүй бол placeholder. | — |
| `NEXT_PUBLIC_ADSENSE_BANNER_SLOT` | Доод banner-ын slot ID | `0000000000` |
| `NEXT_PUBLIC_AD_FREQUENCY` | Хичнээн картын дараа interstitial ад үзүүлэх | `8` |
| `NEXT_PUBLIC_API_URL` | Ирээдүйн backend API base URL | — |

`.env.example` файлыг хуулаад эхэлж болно.

## 📁 Бүтэц

```
src/
├── app/                    # Next.js App Router (page, layout, manifest, robots, sitemap)
│   ├── about/              # Бидний тухай
│   ├── privacy/            # Нууцлал
│   ├── terms/              # Үйлчилгээний нөхцөл
│   ├── settings/           # Тохиргоо + custom cards удирдах
│   ├── error.tsx           # /loading.tsx, /not-found.tsx, /global-error.tsx
│   └── layout.tsx
├── components/             # shadcn/ui + reusable атомууд
├── features/
│   ├── game/components/    # GameView, HomePage, GamePage, GameOverPage…
│   └── settings/components/
├── hooks/                  # useFeedback, useToast, useMobile
├── lib/
│   ├── cards/              # Карт өгөгдөл (тоглоом тус бүрд тусдаа файл)
│   ├── game-data-types.ts  # Core types
│   ├── game-data.ts        # Тоглоомын метадата + lobby pack-ууд
│   ├── game-store.ts       # Zustand store (persist)
│   ├── player-colors.ts
│   └── env.ts
└── services/               # Ирээдүйн API client
```

## 🧠 Loop тоглоомын урсгал

```
Home (lobby pack + players)
   ↓ (тоглоом сонгох)
Setup (player names)
   ↓ (Эхлэх)
Game (карт ухах → нээх → дараагийн тоглогч)
   ↓ (бүх карт дуустал)
Game Over (confetti + share + repeat)
```

Skip товч картыг used-д үлдээгээд дараагийн тоглогчид шилжүүлнэ. Undo товч
сүүлийн алхамыг буцаана.

## 🔌 AdSense залгах

1. AdSense дансны `ca-pub-XXXX…` client ID-г `.env.local`-д бичих:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
   NEXT_PUBLIC_ADSENSE_BANNER_SLOT=1122334455
   ```
2. Build хийж deploy. Layout `<head>` дотор AdSense script автомат орно.
3. `AdsenseSlot` компонент `data-ad-slot`-р зар үзүүлнэ.

## 🤝 Хувь нэмэр оруулах

PR / issue хүлээж авна. Том өөрчлөлт оруулахаасаа өмнө issue нээж яриагаа эхлэх
санал.

## 📜 License

© Happy Solutions. Бүх эрх хуулиар хамгаалагдсан.

[Бидний тухай дэлгэрэнгүй](https://happysolutions.ltd)
