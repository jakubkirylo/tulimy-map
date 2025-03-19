import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoiService } from '../poi/poi.service';
import { toLatLng } from '../poi/poi.helpers';
import { PoiType } from '../poi/poi.interfaces';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [CommonModule],
})
export class MapComponent implements OnInit, AfterViewInit {
  private poiService = inject(PoiService);

  @ViewChild('popupDataTemplate', { static: false })
  popupDataTemplate!: TemplateRef<any>;

  private map: any;

  ngOnInit(): void {
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

    this.map = L.map('map').setView([52.2161740267298, 21.2321494716019], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tulimy.com',
    }).addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.poiService.getPois().subscribe((pois) => {
      pois.forEach((poi) => {
        const marker = L.marker(toLatLng(poi.coordinates)).addTo(this.map);

        if (this.popupDataTemplate) {
          const view = this.popupDataTemplate.createEmbeddedView({ poi });
          view.detectChanges();

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
