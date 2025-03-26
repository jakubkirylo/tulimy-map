export interface PointOfInterest {
  id: number;
  name: string;
  coordinates: number[]; // want to keep it as number[] as it's easier to copy coordinates from google maps
  description?: string;
  banner?: string; //url?
  www?: string;
  phone?: string;
  address?: string; // address type?
  type: PoiType;
  icon?: string;
}

export enum PoiType {
  Home = 'Home',
  KidsShop = 'KidsShop',
  Restaurant = 'Restaurant', // split to types? burgers, kebab, coffe, sushi, pizza
  Cloths = 'Cloths',
  Services = 'Usługi',
}

// Can't use L.LatLng due to lazy loading of leaflet
export interface LatLng {
  lat: number;
  lng: number;
  alt?: number | undefined;
}
