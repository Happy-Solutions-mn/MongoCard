export const AD_SPACE_LABEL = "Таны сурталчилгааны орон зай";

export {
  HAPPYSOLUTIONS_INSTAGRAM_URL as ADVERTISE_CONTACT_URL,
  HAPPYSOLUTIONS_INSTAGRAM_HANDLE,
  HAPPYSOLUTIONS_INSTAGRAM_LABEL as ADVERTISE_CONTACT_LABEL,
} from "./happysolutions-contact";

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
