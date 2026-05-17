import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LegalPageShell,
  LegalSection,
} from "@/components/legal-page-shell";
import { gameTypes } from "@/lib/game-data";
import {
  HAPPYSOLUTIONS_INSTAGRAM_LABEL,
  HAPPYSOLUTIONS_INSTAGRAM_URL,
} from "@/lib/happysolutions-contact";

export const metadata: Metadata = {
  title: "Бидний тухай",
  description:
    "МонгоКарт — Монголд анх удаа гарч буй party карт тоглоомын мобайл-ээ авч явах боломжтой апп.",
};

export default function AboutPage() {
  return (
    <LegalPageShell title="Бидний тухай" updatedAt="2026-05-01">
      <p>
        <strong className="text-foreground">МонгоКарт</strong> нь Монгол хэлээр
        бүрэн орчуулагдсан, найзуудтайгаа уулзахдаа эсвэл цахим хэлбэрээр
        тоглож болох party карт тоглоомын апп юм. Үнэгүй, бүртгэлгүй, шууд
        утсан дээрээ нээгээд тоглож эхэлнэ.
      </p>

      <LegalSection title="Юу тоглож болох вэ?">
        <ul className="list-inside list-disc space-y-1 pl-2">
          {gameTypes.map((g) => (
            <li key={g.id}>
              <span className="mr-1" aria-hidden>
                {g.icon}
              </span>
              <strong className="text-foreground">{g.name}</strong> —{" "}
              {g.description}
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="Бид яагаад үүнийг хийсэн бэ?">
        <p>
          Гадаад хэлтэй party game-уудаас Монголд тааруулсан, нутагшсан, хэн ч
          хүрч авч тоглож болохуйц зүйл хүсээд алга байсан. МонгоКарт бол
          хариулт нь — эхлэхэд хялбар, найзуудтайгаа цуг инээх ийшээр сэтгэгдэл
          үлдээх тоглоомын цуглуулга.
        </p>
      </LegalSection>

      <LegalSection title="Бүтээгчид">
        <p>
          МонгоКартыг{" "}
          <a
            href="https://happysolutions.mn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Happy Solutions
          </a>{" "}
          баг бүтээж байна. Санал, шүүмж, хамтран ажиллах хүсэлтэй бол биднийг{" "}
          <a
            href={HAPPYSOLUTIONS_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            {HAPPYSOLUTIONS_INSTAGRAM_LABEL}
          </a>{" "}
          Instagram хуудсаар холбогдоорой.
        </p>
      </LegalSection>

      <div className="pt-2">
        <Button asChild size="lg" className="rounded-2xl px-6 font-bold">
          <Link href="/">Нүүр хуудас руу буцах</Link>
        </Button>
      </div>
    </LegalPageShell>
  );
}
