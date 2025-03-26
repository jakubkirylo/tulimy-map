import { Injectable } from '@angular/core';
import { PointOfInterest, PoiType } from './poi.interfaces';
import { Observable, of } from 'rxjs';

export const PoiTypeIconMap: Record<PoiType, string> = {
  [PoiType.Home]: 'pi-home',
  [PoiType.KidsShop]: 'pi-shop',
  [PoiType.Restaurant]: 'pi-moon',
  [PoiType.Cloths]: 'pi-clothes',
  [PoiType.Services]: 'pi-eraser',
};

const pois: PointOfInterest[] = [
  {
    id: 1,
    name: 'Tulimy.com',
    coordinates: [52.2161740267298, 21.2321494716019],
    description: 'Tulimy – sklep z rękodziełem i oryginalnymi upominkami',
    banner: 'tulimy.com.png',
    type: PoiType.Home,
    www: 'https://www.tulimy.com',
    address: 'Jana Pawła II 126, 05-077 Warszawa',
    phone: '506-498-916',
  },
  {
    id: 2,
    name: 'Pan to Felek',
    coordinates: [52.21673426548601, 21.230340447498804],
    description: 'Pan to Felek - wyjątkowy sklep dla wyjątkowych dzieci',
    type: PoiType.KidsShop,
    address: 'Zachodu Słońca 2, 05-077 Warszawa-Wesoła',
  },
  {
    id: 3,
    name: 'Frykasy Rarytasy',
    coordinates: [52.21671454557293, 21.230879571451485],
    type: PoiType.Restaurant,
    banner: 'frykasy.png',
    address: 'Jana Pawła II 17C, 05-077 Warszawa-Wesoła',
    www: 'https://frykasyrarytasy.com.pl/',
  },
  {
    id: 4,
    name: 'Poprawki krawieckie - Ludmiła Rutkowska',
    coordinates: [52.241286972230505, 21.191266853653485],
    type: PoiType.Services,
    address: 'Brata Alberta 37, 05-075 Warszawa-Wesoła',
  },
  {
    id: 5,
    name: 'Mosca - biżuteria handmade',
    description: 'Mosca - biżuteria handmade',
    coordinates: [52.24194551286675, 21.183380409580675],
    type: PoiType.Services,
    www: 'https://www.mosca.com.pl',
    phone: '504-693-610',
    address: 'Zachodnia 9, 05-075 Warszawa-Wesoła',
  },
  {
    id: 6,
    name: 'KLASS Gemüse kebab',
    coordinates: [52.21752098540856, 21.138885296168947],
    type: PoiType.Restaurant,
  },
];

@Injectable({
  providedIn: 'root',
})
export class PoiService {
  public getPois(): Observable<PointOfInterest[]> {
    const decoratedPois = pois.map((poi) => ({
      ...poi,
      icon: PoiTypeIconMap[poi.type] || 'pi-default',
    }));
    return of(decoratedPois);
  }
}
