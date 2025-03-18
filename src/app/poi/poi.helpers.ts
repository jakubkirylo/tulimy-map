import { LatLng } from './poi.interfaces';

// TODO: handle alternative
export function toLatLng(coordinates: number[]): LatLng {
  if (coordinates.length < 2) {
    return { lat: 52.2161740267298, lng: 21.2321494716019 };
  }
  return { lat: coordinates[0], lng: coordinates[1] };
}
