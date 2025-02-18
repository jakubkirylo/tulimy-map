import { isPlatformBrowser } from '@angular/common';
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

const TulimyCoordinates: any = [52.2161740267298, 21.2321494716019];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  private viewContainer = inject(ViewContainerRef);

  @ViewChild('popupBannerTemplate', { static: false })
  public popupBannerTemplate?: TemplateRef<any>;

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

      // Create the map in the #map container
      this.map = L.map('map').setView(TulimyCoordinates, 15);

      // Add a tile layer
      L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          'copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
          'Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
      }).addTo(this.map);

      if (this.popupBannerTemplate) {
        const view = this.viewContainer.createEmbeddedView(
          this.popupBannerTemplate
        );
        const popupElement = view.rootNodes[0] as HTMLElement;

        L.marker(TulimyCoordinates)
          .addTo(this.map)
          .bindPopup(popupElement)
          .openPopup();
      }
    }
  }
}
