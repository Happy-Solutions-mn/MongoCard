import type { Metadata } from "next";
import {
  LegalPageShell,
  LegalSection,
} from "@/components/legal-page-shell";
import {
  HAPPYSOLUTIONS_INSTAGRAM_LABEL,
  HAPPYSOLUTIONS_INSTAGRAM_URL,
} from "@/lib/happysolutions-contact";

export const metadata: Metadata = {
  title: "Нууцлалын бодлого",
  description:
    "МонгоКарт аппын нууцлалын бодлого: ямар өгөгдлийг, яаж цуглуулдаг, хэрхэн хамгаалдаг.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell title="Нууцлалын бодлого" updatedAt="2026-05-01">
      <p>
        Энэхүү нууцлалын бодлого нь МонгоКарт (цаашид «Үйлчилгээ») гэж
        нэрлэгдэх вэбсайт болон холбогдох бүтээгдэхүүний хүрээнд хамаарна.
        Үйлчилгээг ашиглаж эхэлснээр та энэхүү бодлогыг хүлээн зөвшөөрсөнд
        тооцогдоно.
      </p>

      <LegalSection title="1. Бид ямар өгөгдөл цуглуулдаг вэ?">
        <p>
          МонгоКарт нь хэрэглэгчийн бүртгэл шаардахгүй учраас таны нэр, имэйл,
          утасны дугаар зэрэг хувийн өгөгдлийг шууд цуглуулдаггүй.
        </p>
        <ul className="list-inside list-disc space-y-1 pl-2">
          <li>
            Тоглогчдын нэр, тоглоомын тохиргоо, өөрийн нэмсэн карт зэрэг нь
            зөвхөн таны төхөөрөмжийн локал хадгалалтад (localStorage)
            хадгалагдана.
          </li>
          <li>
            Vercel Analytics ашиглан анонимаар хэрэглээний статистик (хуудас
            үзэлт гэх мэт) цуглуулна. IP хаяг, нарийн identifier хадгалахгүй.
          </li>
          <li>
            Google AdSense (хэрэв идэвхтэй бол) cookie ашиглан зар тохируулж
            болзошгүй. Дэлгэрэнгүйг{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google зар сурталчилгааны бодлого
            </a>
            -оос үзнэ үү.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Cookies">
        <p>
          Бид зөвхөн зайлшгүй шаардлагатай cookie (тохиргоо санах, AdSense)
          ашиглана. Та хүсвэл browser-ынхээ тохиргоонд cookie-г унтрааж болно.
        </p>
      </LegalSection>

      <LegalSection title="3. Хүүхдийн нууцлал">
        <p>
          Үйлчилгээний зарим хэсэг (Сонирхолтой, Хосуудад) 18+ контент агуулах
          тул бид 13-аас доош насны хүүхдээс өгөгдөл цуглуулахыг зорьдоггүй.
          Эцэг эх хэрэглэгчдийг хяналтандаа байлгахыг хүсье.
        </p>
      </LegalSection>

      <LegalSection title="4. Гуравдагч талын үйлчилгээнүүд">
        <p>
          МонгоКарт нь дараах үйлчилгээнүүдийг ашигладаг: Vercel (хост, хэмжилт),
          Google AdSense (хэрэв идэвхтэй бол). Эдгээр үйлчилгээ нь өөрийн гэсэн
          нууцлалын бодлоготой.
        </p>
      </LegalSection>

      <LegalSection title="5. Өгөгдөл устгах">
        <p>
          Та browser-ынхаа тохиргооноос «Site data» эсвэл МонгоКартын{" "}
          <span className="font-semibold text-foreground">Тохиргоо</span>{" "}
          хуудаснаас өөрийн нэмсэн картыг устгаж болно.
        </p>
      </LegalSection>

      <LegalSection title="6. Холбоо барих">
        <p>
          Асуулт, гомдол байвал:{" "}
          <a
            href={HAPPYSOLUTIONS_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            {HAPPYSOLUTIONS_INSTAGRAM_LABEL}
          </a>
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
