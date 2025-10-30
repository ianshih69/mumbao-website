export type Room = {
  slug: string;
  title: string;
  desc: string;
  image: string;
  features: string[];
};

export const rooms: Room[] = [
  {
    slug: "cloud-base-double",
    title: "白雲基地・雙人房",
    desc: "含早餐／Netflix／免清潔費（含寵物）",
    image: "/hero.jpg",
    features: ["雙人", "含早餐", "Netflix", "寵物友善"],
  },
  {
    slug: "starlight-blush-quad",
    title: "星頻腮紅・四人房",
    desc: "4床位／親子友善／大片採光",
    image: "/hero.jpg",
    features: ["四人", "親子友善", "採光佳"],
  },
  {
    slug: "hug-cloud-pet",
    title: "抱抱雲・寵物友善",
    desc: "毛孩備品／陽台曬太陽／空氣清淨",
    image: "/hero.jpg",
    features: ["寵物友善", "陽台", "空氣清淨"],
  },
  {
    slug: "moonlight-suite",
    title: "月光套房・雙人加大",
    desc: "景觀浴缸／黃金時刻採光／床邊閱讀燈",
    image: "/hero.jpg",
    features: ["雙人加大", "景觀浴缸", "黃金時刻"],
  },
  {
    slug: "nebula-loft-family",
    title: "星雲夾層・家庭房",
    desc: "夾層空間／小客廳／適合親子",
    image: "/hero.jpg",
    features: ["家庭房", "夾層", "小客廳"],
  },
];


