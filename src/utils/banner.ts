import NorrisBanner from "@/assets/norris_banner.webp";
import DaantjeBanner from "@/assets/daantje_banner.webp";
import MoosBanner from "@/assets/moos_banner.webp";
import FlynnBanner from "@/assets/flynn_banner.webp";
import { type Cat } from "@/types/types";

const banners = {
  daantje: DaantjeBanner,
  flynn: FlynnBanner,
  moos: MoosBanner,
  norris: NorrisBanner,
};

export const getBanner = (cat?: Cat) => {
  return cat ? banners[cat.name as keyof typeof banners] : null;
};
