import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { PoiService } from '../poi/poi.service';
import { toLatLng } from '../poi/poi.helpers';
import { PoiType } from '../poi/poi.interfaces';
import { MarkerIconComponent } from './marker-icon/marker-icon.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [CommonModule, MarkerIconComponent],
})
export class MapComponent implements OnInit, AfterViewInit {
  private poiService = inject(PoiService);

  @ViewChild('popupDataTemplate', { static: false })
  popupDataTemplate!: TemplateRef<any>;

  @ViewChild('markerIconTemplate', { static: false })
  markerIconTemplate!: TemplateRef<any>;

  private map: any;

  ngOnInit(): void {
    this.map = L.map('map').setView([52.2161740267298, 21.2321494716019], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tulimy.com',
    }).addTo(this.map);
  }

  ngAfterViewInit(): void {
    // For each POI, create a custom marker icon based on its type.
    this.poiService.getPois().subscribe((pois) => {
      pois.forEach((poi) => {
        const iconName = poi.icon || 'home';
        // TODO: fill color based on POI Type as well?
        const fillColor = 'fill-amber-600';

        const view = this.markerIconTemplate.createEmbeddedView({
          iconName,
          fillColor,
        });
        view.detectChanges();

        const container = document.createElement('div');
        view.rootNodes.forEach((node) => container.appendChild(node));

        const divIcon = L.divIcon({
          html: container.innerHTML,
          iconSize: [40, 53],
          iconAnchor: [20, 40],
          popupAnchor: [0, -35],
          className: 'border-0',
        });

        const marker = L.marker(toLatLng(poi.coordinates), {
          icon: divIcon,
        }).addTo(this.map);

        if (this.popupDataTemplate) {
          const viewPopup = this.popupDataTemplate.createEmbeddedView({ poi });
          viewPopup.detectChanges();

          const popupContainer = document.createElement('div');
          viewPopup.rootNodes.forEach((node) =>
            popupContainer.appendChild(node)
          );

          marker.bindPopup(popupContainer);

          if (poi.type === PoiType.Home) {
            marker.openPopup();
          }
        }
      });
    });
  }
}
