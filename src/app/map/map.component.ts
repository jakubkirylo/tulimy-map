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
import { PoiService } from '../poi/poi.service';
import { toLatLng } from '../poi/poi.helpers';
import { PoiType } from '../poi/poi.interfaces';
import * as L from 'leaflet';
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

  @ViewChild('appWidgets', { read: ElementRef })
  private _appWidgetsRef?: ElementRef;

  private map: any;

  ngOnInit(): void {
    this.map = L.map('map').setView([52.2161740267298, 21.2321494716019], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tulimy.com',
    }).addTo(this.map);
  }

  ngAfterViewInit(): void {
    const iconHtml = this._appWidgetsRef?.nativeElement.innerHTML || '';
    const divIcon = L.divIcon({
      html: iconHtml,
      iconSize: [40, 53],
      iconAnchor: [20, 40],
      popupAnchor: [0, -35],
      className: 'border-0',
    });
    L.Marker.prototype.options.icon = divIcon;

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
