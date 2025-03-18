import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  Inject,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PoiService } from '../poi/poi.service';
import { toLatLng } from '../poi/poi.helpers';
import { PoiType } from '../poi/poi.interfaces';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [CommonModule],
})
export class MapComponent implements OnInit {
  private viewContainer = inject(ViewContainerRef);
  private poiService = inject(PoiService);

  @ViewChild('popupDataTemplate', { static: false })
  popupDataTemplate!: TemplateRef<any>;

  private map: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Dynamically import Leaflet
    const L = await import('leaflet');
    const iconDefault = L.icon({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;

    // Create the map
    this.map = L.map('map').setView([52.2161740267298, 21.2321494716019], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tulimy.com',
    }).addTo(this.map);

    this.poiService.getPois().subscribe((pois) => {
      pois.forEach((poi) => {
        const marker = L.marker(toLatLng(poi.coordinates)).addTo(this.map);
        if (this.popupDataTemplate) {
          const view = this.popupDataTemplate.createEmbeddedView({ poi });
          view.detectChanges(); // Ensure all bindings update

          // Create a container element and move the rendered nodes into it.
          const container = document.createElement('div');
          view.rootNodes.forEach((node) => container.appendChild(node));
          marker.bindPopup(container);

          if (poi.type === PoiType.Home) {
            marker.openPopup();
          }
        }
      });
    });
  }
}
