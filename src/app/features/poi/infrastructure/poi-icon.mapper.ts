import { PoiType } from '../domain/poi.interfaces';

export const PoiTypeIconMap: Record<PoiType, string> = {
  [PoiType.Home]: 'featured_seasonal_and_gifts',
  [PoiType.KidsShop]: 'toys_fan',
  [PoiType.Restaurant]: 'restaurant',
  [PoiType.Cloths]: 'checkroom',
  [PoiType.Services]: 'handyman',
  [PoiType.Tailor]: 'apparel',
  [PoiType.Jewelry]: 'diamond',
  [PoiType.Kebab]: 'kebab_dining',
};
