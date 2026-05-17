export const AD_SPACE_LABEL = "Таны сурталчилгааны орон зай";

export const ADVERTISE_CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_ADVERTISE_EMAIL ?? "hello@happysolutions.mn";

export const ADVERTISE_MAIL_SUBJECT =
  "МонгоКарт — зар сурталчилгааны хүсэлт";

export function advertiseMailtoHref(body?: string): string {
  const params = new URLSearchParams({
    subject: ADVERTISE_MAIL_SUBJECT,
  });
  if (body) params.set("body", body);
  return `mailto:${ADVERTISE_CONTACT_EMAIL}?${params.toString()}`;
}

export const AD_PLACEMENTS = [
  {
    id: "banner",
    icon: "📱",
    title: "Доод banner",
    description:
      "Нүүр болон тоглоомын дэлгэцийн доод хэсэгт байнга харагдах компакт зар.",
  },
  {
    id: "interstitial",
    icon: "⏸️",
    title: "Завсрын зар (interstitial)",
    description:
      "Тоглоомын явцад тодорхой картын тооны дараа бүтэн дэлгэцээр гардаг зар.",
  },
  {
    id: "game-over",
    icon: "🏆",
    title: "Тоглоом дууссаны дараа",
    description:
      "Тоглоом дуусах үед харагдах том карт хэлбэрийн сурталчилгаа.",
  },
] as const;

export const AD_AUDIENCE_POINTS = [
  "Монгол хэлээр party тоглоомд дуртай залуучууд",
  "Найзуудтайгаа цуг цахимаар болон шууд уулздаг хэрэглэгчид",
  "Бүртгэлгүй, шууд тоглож эхлэх хялбар апп — өндөр оролцоо",
] as const;
