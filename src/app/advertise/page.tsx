import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LegalPageShell,
  LegalSection,
} from "@/components/legal-page-shell";
import {
  AD_AUDIENCE_POINTS,
  AD_PLACEMENTS,
  ADVERTISE_CONTACT_EMAIL,
  advertiseMailtoHref,
} from "@/lib/advertise";

export const metadata: Metadata = {
  title: "Зар сурталчилгаа",
  description:
    "МонгоКарт дээр брэнд, үйлчилгээээ сурталчлах — banner, завсрын зар, тоглоом дууссаны дараах байршил.",
};

const MAIL_BODY = `Сайн байна уу,

МонгоКарт дээр зар сурталчилгаа байршуулах хүсэлт илгээж байна.

Компанийн нэр:
Вэбсайт:
Сурталчлах бүтээгдэхүүн/үйлчилгээ:
Сонирхож буй байршил (banner / interstitial / game-over):
Товч тайлбар:

Холбоо барих:
`;

export default function AdvertisePage() {
  const mailto = advertiseMailtoHref(MAIL_BODY);

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
          доорх имэйлээр бидэнтэй холбогдоорой. Илгээхэд бэлэн загварчилсан
          имэйл нээгдэнэ — мэдээллээ бөглөөд илгээнэ үү.
        </p>
        <p className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3 font-mono text-sm text-foreground">
          {ADVERTISE_CONTACT_EMAIL}
        </p>
        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
          <Button asChild size="lg" className="rounded-2xl font-bold">
            <a href={mailto}>
              <Mail className="mr-2 h-4 w-4" />
              Имэйл илгээх
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
