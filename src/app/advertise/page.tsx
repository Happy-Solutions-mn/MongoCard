import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LegalPageShell,
  LegalSection,
} from "@/components/legal-page-shell";
import {
  AD_AUDIENCE_POINTS,
  AD_PLACEMENTS,
  ADVERTISE_CONTACT_LABEL,
  ADVERTISE_CONTACT_URL,
} from "@/lib/advertise";

export const metadata: Metadata = {
  title: "Зар сурталчилгаа",
  description:
    "МонгоКарт дээр брэнд, үйлчилгээээ сурталчлах — banner, завсрын зар, тоглоом дууссаны дараах байршил.",
};

export default function AdvertisePage() {
  return (
    <LegalPageShell title="Зар сурталчилгаа" updatedAt="2026-05-17">
      <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <Megaphone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">МонгоКарт</strong> нь Монголын
          party карт тоглоомын апп бөгөөд найзуудтайгаа тоглох үед өндөр анхаарал
          татдаг. Брэнд, апп, үйлчилгээ, эвент зэрэгээ сурталчлах боломжтой
          зарын байршлууд нээлттэй.
        </p>
      </div>

      <LegalSection title="Зарын байршил">
        <ul className="grid gap-3 sm:grid-cols-1">
          {AD_PLACEMENTS.map((placement) => (
            <li
              key={placement.id}
              className="flex gap-3 rounded-xl border border-border/60 bg-card/50 p-4"
            >
              <span className="text-2xl" aria-hidden>
                {placement.icon}
              </span>
              <div>
                <p className="font-semibold text-foreground">
                  {placement.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {placement.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="Хэнд хүрэх вэ?">
        <ul className="list-inside list-disc space-y-1 pl-2">
          {AD_AUDIENCE_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="Хэрхэн холбогдох вэ?">
        <p>
          Үнийн санал, хугацаа, контентын шаардлагаар хамтран ажиллахын тулд
          бидний Instagram хуудсанд DM илгээнэ үү. Компанийн нэр, сурталчлах
          бүтээгдэхүүн, сонирхож буй байршлыг (banner / interstitial /
          game-over) бичээрэй.
        </p>
        <p className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm text-foreground">
          <a
            href={ADVERTISE_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline underline-offset-2"
          >
            {ADVERTISE_CONTACT_LABEL}
          </a>
        </p>
        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
          <Button asChild size="lg" className="rounded-2xl font-bold">
            <a
              href={ADVERTISE_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-4 w-4" />
              Instagram-д бичих
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-2xl font-semibold"
          >
            <Link href="/">Нүүр хуудас</Link>
          </Button>
        </div>
      </LegalSection>

      <LegalSection title="Тэмдэглэл">
        <p>
          Одоогоор зарим байршилд Happy Solutions-ийн бүтээгдэхүүн (жишээ нь
          eSIM) сурталчлагдаж байна. Бусад брэнд, үйлчилгээний зар байршуулах
          хүсэлтийг шударгаар авч үзнэ. Google AdSense идэвхжсэн үед зарим
          байршилд автомат зар ч харагдаж болно.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
