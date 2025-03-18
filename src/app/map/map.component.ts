import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PoiService } from '../poi/poi.service';
import { toLatLng } from '../poi/poi.helpers';
import { PoiType } from '../poi/poi.interfaces';
import { BrowserModule } from '@angular/platform-browser';

const TulimyCoordinates: any = [52.2161740267298, 21.2321494716019];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class MapComponent implements OnInit {
  private viewContainer = inject(ViewContainerRef);
  private poiService = inject(PoiService);

  @ViewChild('popupDataTemplate', { static: false })
  public popupDataTemplate?: TemplateRef<any>;

  private map: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Dynamically import Leaflet only in the browser
      const L = await import('leaflet');
      const iconRetinaUrl = 'assets/marker-icon-2x.png';
      const iconUrl = 'assets/marker-icon.png';
      const shadowUrl = 'assets/marker-shadow.png';
      const iconDefault = L.icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      });
      L.Marker.prototype.options.icon = iconDefault;

      this.map = L.map('map').setView(TulimyCoordinates, 13);

      // Add a tile layer
      L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
          'Tulimy.com',
      }).addTo(this.map);

      // Add pois
      this.poiService.getPois().subscribe((pois) => {
        pois.forEach((poi) => {
          const marker = L.marker(toLatLng(poi.coordinates)).addTo(this.map);
          if (this.popupDataTemplate) {
            marker.bindPopup(
              this.viewContainer.createEmbeddedView(this.popupDataTemplate, {
                poi,
              }).rootNodes[0]
            );
          }

          // marker.addTo(this.map);

          // If Home then open popup right away. Delay to give time for rendering
          if (poi.type === PoiType.Home) {
            setTimeout(() => {
              marker.openPopup();
            }, 100);
          }
        });
      });
    }
  }
}
