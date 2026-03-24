export interface GameType {
  id: string;
  name: string;
  description: string;
  playerRange: string;
  icon: string;
  color: string;
}

export interface Card {
  id: string;
  text: string;
  category: "light" | "medium" | "hot";
}

export interface GameData {
  id: string;
  cards: Card[];
}

export const gameTypes: GameType[] = [
  {
    id: "truth-or-dare",
    name: "Үнэн эсвэл Зориг",
    description: "Сонгодог тоглоом! Үнэнийг хэл эсвэл зоригтой даалгавар биелүүл.",
    playerRange: "2-20 хүн",
    icon: "🎭",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "drink-or-punish",
    name: "Уу эсвэл Шийтгүүл",
    description: "Даалгавар биелүүлэхгүй бол уух ёстой! 18+ тоглоом.",
    playerRange: "3-15 хүн",
    icon: "🍺",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "never-have-i-ever",
    name: "Би хэзээ ч...",
    description: "Хийж байсан бол хуруугаа буулга. Эвлүүлэх тоглоом!",
    playerRange: "4-20 хүн",
    icon: "✋",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "would-you-rather",
    name: "Аль нь дээр вэ?",
    description: "Хоёр сонголтын аль нэгийг сонго. Хэцүү шийдвэрүүд!",
    playerRange: "2-20 хүн",
    icon: "🤔",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "hot-seat",
    name: "Халуун Суудал",
    description: "Нэг хүн асуултанд хариулна. Бусад нь шүүмжилнэ!",
    playerRange: "4-12 хүн",
    icon: "🔥",
    color: "from-red-500 to-pink-600",
  },
];

export const gameCards: Record<string, Card[]> = {
  "truth-or-dare": [
    // Light
    { id: "tod-1", text: "Хамгийн сүүлд хэнд худал хэлсэн бэ?", category: "light" },
    { id: "tod-2", text: "Өнөө өглөө юу идсэн бэ?", category: "light" },
    { id: "tod-3", text: "Хамгийн дуртай дуугаа дуул!", category: "light" },
    { id: "tod-4", text: "Утсан дахь сүүлийн зургаа үзүүл", category: "light" },
    { id: "tod-5", text: "10 секунд нүдээ анивчихгүй бай", category: "light" },
    { id: "tod-6", text: "Хажууд суугаа хүнийг магта", category: "light" },
    { id: "tod-7", text: "Хамгийн их ичсэн үеэ ярь", category: "light" },
    { id: "tod-8", text: "Сүүлийн мессежээ чангаар унш", category: "light" },
    // Medium
    { id: "tod-9", text: "Хамгийн нууцлаг зүйлээ хуваалц", category: "medium" },
    { id: "tod-10", text: "Өрөөнд байгаа нэг хүнийг дуурайл", category: "medium" },
    { id: "tod-11", text: "Хамгийн их харамсдаг зүйлээ хэл", category: "medium" },
    { id: "tod-12", text: "Crush-ийнхаа нэрийг хэл", category: "medium" },
    { id: "tod-13", text: "Баруун хажууд суугаа хүний хөлийг массаж хий", category: "medium" },
    { id: "tod-14", text: "Хэрэв баян байсан бол юу хийх байсан?", category: "medium" },
    { id: "tod-15", text: "Хамгийн аймшигтай зүүдээ ярь", category: "medium" },
    { id: "tod-16", text: "Найзаасаа 50,000₮ зээлж чадах уу? Ярь!", category: "medium" },
    // Hot
    { id: "tod-17", text: "Хамгийн exotic зүйл юу идсэн бэ?", category: "hot" },
    { id: "tod-18", text: "Эхний үнсэлтийнхээ тухай ярь", category: "hot" },
    { id: "tod-19", text: "Хэн нэгнийг ghost хийж байсан уу?", category: "hot" },
    { id: "tod-20", text: "Социал медиад stalking хийдэг үү?", category: "hot" },
    { id: "tod-21", text: "Ямар нэг зүйлд донтсон уу?", category: "hot" },
    { id: "tod-22", text: "Хамгийн эвгүй first date-ийн тухай ярь", category: "hot" },
    { id: "tod-23", text: "Нэг өдрийн турш яг үнэнийг л хэлж чадах уу?", category: "hot" },
    { id: "tod-24", text: "Хэзээ нэгэн цагт хулгай хийж байсан уу?", category: "hot" },
  ],
  "drink-or-punish": [
    // Light
    { id: "dop-1", text: "Өнөөдөр social media шалгасан бол уу", category: "light" },
    { id: "dop-2", text: "Цагаан хувцас өмссөн бол уу", category: "light" },
    { id: "dop-3", text: "Өнөө өглөө кофе уусан бол уу", category: "light" },
    { id: "dop-4", text: "Энэ долоо хоногт gym очсон бол уу", category: "light" },
    { id: "dop-5", text: "Утсандаа 100+ app байгаа бол уу", category: "light" },
    { id: "dop-6", text: "Энэ сард кино үзсэн бол уу", category: "light" },
    { id: "dop-7", text: "Өчигдөр шөнө 12 цагаас хойш унтсан бол уу", category: "light" },
    { id: "dop-8", text: "Энд байгаа хэн нэгнийг Instagram-д follow хийдэг бол уу", category: "light" },
    // Medium
    { id: "dop-9", text: "Ex-тэйгээ холбоотой зүйл утсандаа байгаа бол уу", category: "medium" },
    { id: "dop-10", text: "Энэ сард худал хэлсэн бол уу", category: "medium" },
    { id: "dop-11", text: "Хэн нэгнийг block хийсэн бол уу", category: "medium" },
    { id: "dop-12", text: "Dating app ашигласан бол уу", category: "medium" },
    { id: "dop-13", text: "Ажлаасаа өвчтэй гэж чөлөө авсан бол уу", category: "medium" },
    { id: "dop-14", text: "Нэгнийг reject хийж байсан бол уу", category: "medium" },
    { id: "dop-15", text: "Согтуугаар эвгүй зүйл хийсэн бол уу", category: "medium" },
    { id: "dop-16", text: "Найзынхаа ex-тэй ярьж байсан бол уу", category: "medium" },
    // Hot
    { id: "dop-17", text: "One night stand хийж байсан бол уу", category: "hot" },
    { id: "dop-18", text: "Хэн нэгэнтэй энд байгаа хүнээс нууцаар уулзсан бол уу", category: "hot" },
    { id: "dop-19", text: "Crush-даа DM илгээсэн бол уу", category: "hot" },
    { id: "dop-20", text: "Энэ өрөөнд байгаа хэн нэгэнд дурласан бол уу", category: "hot" },
    { id: "dop-21", text: "Хэзээ нэгэн цагт skinny dip хийсэн бол уу", category: "hot" },
    { id: "dop-22", text: "Энэ жил 3-аас дээш хүнтэй болсон бол уу", category: "hot" },
    { id: "dop-23", text: "Ex-рүүгээ согтуугаар залгасан бол уу", category: "hot" },
    { id: "dop-24", text: "Нэгэн шөнийн тухай хэнд ч хэлээгүй бол уу", category: "hot" },
  ],
  "never-have-i-ever": [
    // Light
    { id: "nhie-1", text: "Би хэзээ ч... олон нийтийн газар унтаж байгаагүй", category: "light" },
    { id: "nhie-2", text: "Би хэзээ ч... гадаад руу аялж байгаагүй", category: "light" },
    { id: "nhie-3", text: "Би хэзээ ч... концерт үзэж байгаагүй", category: "light" },
    { id: "nhie-4", text: "Би хэзээ ч... шөнийн клубт очиж байгаагүй", category: "light" },
    { id: "nhie-5", text: "Би хэзээ ч... karaoke дуулж байгаагүй", category: "light" },
    { id: "nhie-6", text: "Би хэзээ ч... тансаг зоогийн газарт хооллож байгаагүй", category: "light" },
    { id: "nhie-7", text: "Би хэзээ ч... blind date хийж байгаагүй", category: "light" },
    { id: "nhie-8", text: "Би хэзээ ч... TikTok хийж байгаагүй", category: "light" },
    // Medium
    { id: "nhie-9", text: "Би хэзээ ч... хэн нэгнийг ghost хийж байгаагүй", category: "medium" },
    { id: "nhie-10", text: "Би хэзээ ч... найзынхаа ex-тэй flirt хийж байгаагүй", category: "medium" },
    { id: "nhie-11", text: "Би хэзээ ч... хуурамч profile үүсгэж байгаагүй", category: "medium" },
    { id: "nhie-12", text: "Би хэзээ ч... хэн нэгний утсыг нууцаар шалгаж байгаагүй", category: "medium" },
    { id: "nhie-13", text: "Би хэзээ ч... өөр хүн болж дүр эсгэж байгаагүй", category: "medium" },
    { id: "nhie-14", text: "Би хэзээ ч... эцэг эхээсээ мөнгө хулгайлж байгаагүй", category: "medium" },
    { id: "nhie-15", text: "Би хэзээ ч... ажлаасаа халагдаж байгаагүй", category: "medium" },
    { id: "nhie-16", text: "Би хэзээ ч... хэн нэгнийг бүтэн шөнө хүлээж байгаагүй", category: "medium" },
    // Hot
    { id: "nhie-17", text: "Би хэзээ ч... public gas үнсэлдэж байгаагүй", category: "hot" },
    { id: "nhie-18", text: "Би хэзээ ч... ex-тэйгээ эргэж холбогдож байгаагүй", category: "hot" },
    { id: "nhie-19", text: "Би хэзээ ч... нэг шөнийн болзоо хийж байгаагүй", category: "hot" },
    { id: "nhie-20", text: "Би хэзээ ч... хэн нэгэнд сэтгэл хөдлөлөөрөө хуурагдаж байгаагүй", category: "hot" },
    { id: "nhie-21", text: "Би хэзээ ч... нууц харилцаа үүсгэж байгаагүй", category: "hot" },
    { id: "nhie-22", text: "Би хэзээ ч... гурвалсан болзоо хийж байгаагүй", category: "hot" },
    { id: "nhie-23", text: "Би хэзээ ч... ex-ийнхээ шинэ хүнийг stalking хийж байгаагүй", category: "hot" },
    { id: "nhie-24", text: "Би хэзээ ч... хувцас солилцож байгаагүй", category: "hot" },
  ],
  "would-you-rather": [
    // Light
    { id: "wyr-1", text: "Үүрд хар өнгийн хувцас өмсөх ҮҮ, эсвэл үүрд цагаан өнгийн хувцас өмсөх ҮҮ?", category: "light" },
    { id: "wyr-2", text: "10 жилээр залуужих УУ, эсвэл 10 жилээр ухаалаг болох УУ?", category: "light" },
    { id: "wyr-3", text: "Байнга хоцрох УУ, эсвэл байнга эрт ирэх ҮҮ?", category: "light" },
    { id: "wyr-4", text: "Утасгүй амьдрах УУ, эсвэл машингүй амьдрах УУ?", category: "light" },
    { id: "wyr-5", text: "Зөвхөн кино үзэх ҮҮ, эсвэл зөвхөн ном унших УУ?", category: "light" },
    { id: "wyr-6", text: "Хязгааргүй хоол идэх ҮҮ, эсвэл хязгааргүй унтах УУ?", category: "light" },
    { id: "wyr-7", text: "Далайн эрэг дээр амьдрах УУ, эсвэл уулан дээр амьдрах УУ?", category: "light" },
    { id: "wyr-8", text: "Үүрд зун байх УУ, эсвэл үүрд өвөл байх УУ?", category: "light" },
    // Medium
    { id: "wyr-9", text: "Ex-тэйгээ нэг байранд амьдрах УУ, эсвэл хамгийн муу дайснаасаа мөнгө зээлэх ҮҮ?", category: "medium" },
    { id: "wyr-10", text: "Бүх нууцаа мэдэх хүнтэй найзлах УУ, эсвэл чамайг огт мэдэхгүй хүнтэй гэрлэх ҮҮ?", category: "medium" },
    { id: "wyr-11", text: "Өнгөрсөнөө өөрчилж чадах УУ, эсвэл ирээдүйгээ харж чадах УУ?", category: "medium" },
    { id: "wyr-12", text: "Алдартай боловч ядуу байх УУ, эсвэл үл мэдэгдэх боловч баян байх УУ?", category: "medium" },
    { id: "wyr-13", text: "Хүний бодлыг унших УУ, эсвэл үл үзэгдэх болох УУ?", category: "medium" },
    { id: "wyr-14", text: "10 жилийн турш ганцаардах УУ, эсвэл 10 жилийн турш хүн бүртэй ярих УУ?", category: "medium" },
    { id: "wyr-15", text: "Хэзээ ч худал хэлж чадахгүй байх УУ, эсвэл хэзээ ч үнэнийг сонсохгүй байх УУ?", category: "medium" },
    { id: "wyr-16", text: "Амьдралынхаа хамгийн эвгүй мөчийг дахин амьдрах УУ, эсвэл хамгийн сайн мөчөө мартах УУ?", category: "medium" },
    // Hot
    { id: "wyr-17", text: "Ex-тэйгээ дахин нийлэх ҮҮ, эсвэл crush-даа хэзээ ч хэлэхгүй байх УУ?", category: "hot" },
    { id: "wyr-18", text: "Хамгийн сайн найзынхаа хувцсыг 1 сар өмсөх ҮҮ, эсвэл түүний haircut-ийг хийлгэх ҮҮ?", category: "hot" },
    { id: "wyr-19", text: "Эхний date-дээ эвгүй чимээ гаргах УУ, эсвэл эвгүй зүйл хэлэх ҮҮ?", category: "hot" },
    { id: "wyr-20", text: "Бүх text-ээ олон нийтэд задлах УУ, эсвэл бүх зургаа задлах УУ?", category: "hot" },
    { id: "wyr-21", text: "Эцэг эхтэйгээ dating app хуваалцах УУ, эсвэл дарга тань таны Insta story харах УУ?", category: "hot" },
    { id: "wyr-22", text: "1 сарын турш өөрийгөө магтах УУ, эсвэл 1 сарын турш бусдыг шүүмжлэх ҮҮ?", category: "hot" },
    { id: "wyr-23", text: "Таны бүх хайлт history олон нийтэд харагдах УУ, эсвэл бүх DM-үүд задрах УУ?", category: "hot" },
    { id: "wyr-24", text: "Үүрд single байх УУ, эсвэл үүрд муу харилцаатай байх УУ?", category: "hot" },
  ],
  "hot-seat": [
    // Light
    { id: "hs-1", text: "Чи ямар давуу талтай вэ?", category: "light" },
    { id: "hs-2", text: "Хамгийн их баярлаж байсан өдрөө ярь", category: "light" },
    { id: "hs-3", text: "5 жилийн дараа хаана байхыг хүсэж байна?", category: "light" },
    { id: "hs-4", text: "Хамгийн их хайртай хоолоо хэл", category: "light" },
    { id: "hs-5", text: "Чиний хамгийн муу зуршил юу вэ?", category: "light" },
    { id: "hs-6", text: "Нэг өдөр хэн болохыг хүсэх вэ?", category: "light" },
    { id: "hs-7", text: "Чиний superpower юу байхыг хүсэх вэ?", category: "light" },
    { id: "hs-8", text: "Хамгийн сайн зөвлөгөө юу авсан бэ?", category: "light" },
    // Medium
    { id: "hs-9", text: "Чи юунаас хамгийн их айдаг вэ?", category: "medium" },
    { id: "hs-10", text: "Хамгийн их харамсдаг алдаагаа хэл", category: "medium" },
    { id: "hs-11", text: "Энд байгаа хүмүүсээс хэнтэй хамгийн ойр вэ?", category: "medium" },
    { id: "hs-12", text: "Чиний нууц авьяас юу вэ?", category: "medium" },
    { id: "hs-13", text: "Хэрэв 1 сая доллартай бол юу хийх вэ?", category: "medium" },
    { id: "hs-14", text: "Амьдралдаа хамгийн хэцүү шийдвэр юу байсан бэ?", category: "medium" },
    { id: "hs-15", text: "Хэн нэгнийг орхисон уу? Яагаад?", category: "medium" },
    { id: "hs-16", text: "Чиний red flag юу вэ?", category: "medium" },
    // Hot
    { id: "hs-17", text: "Хамгийн эвгүй first kiss-ийн тухай ярь", category: "hot" },
    { id: "hs-18", text: "Хэзээ хамгийн их шархалсан бэ?", category: "hot" },
    { id: "hs-19", text: "Чиний body count хэд вэ?", category: "hot" },
    { id: "hs-20", text: "Хамгийн муу relationship-ийн тухай ярь", category: "hot" },
    { id: "hs-21", text: "Чиний ick юу вэ?", category: "hot" },
    { id: "hs-22", text: "Хамгийн том худлаа юу хэлсэн бэ?", category: "hot" },
    { id: "hs-23", text: "Чамд хэн хамгийн их таалагддаг? Энд байгаа хүмүүсээс", category: "hot" },
    { id: "hs-24", text: "Хамгийн нууцлаг fantasy-гээ хэл", category: "hot" },
  ],
};

export const categoryLabels: Record<Card["category"], string> = {
  light: "Хөнгөн",
  medium: "Дунд",
  hot: "Халуун",
};

export const categoryColors: Record<Card["category"], string> = {
  light: "bg-emerald-500",
  medium: "bg-amber-500",
  hot: "bg-rose-500",
};
