import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMapsLoaderService } from '../../infrastructure/GoogleMapsLoader.service';

@Component({
  selector: 'app-google-map',
  imports: [],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleMapComponent implements OnInit {
  private readonly mapService = inject(GoogleMapsLoaderService);
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  private map!: google.maps.Map;

  ngOnInit(): void {
    this.mapService.load().subscribe((_) => this.initializeMap());
  }

  private initializeMap(): void {
    const position = { lat: 52.2161740267298, lng: 21.2321494716019 };

    const map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: position,
      zoom: 16,
      disableDefaultUI: false,
      zoomControl: true,
      mapId: 'd1a39022cd4810b2',
      mapTypeId: 'roadmap',
    });

    const marker = new google.maps.marker.AdvancedMarkerElement({
      position,
      map,
      title: 'Tulimy',
    });

    // this.findPharmacies(center);
  }

  private findPharmacies(location: google.maps.LatLng): void {
    const service = new google.maps.places.PlacesService(this.map);

    const request: google.maps.places.PlaceSearchRequest = {
      location,
      radius: 1000, // in meters
      type: 'pharmacy',
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        results.forEach((place) => {
          if (place.geometry?.location) {
            new google.maps.Marker({
              position: place.geometry.location,
              map: this.map,
              title: place.name,
            });
          }
        });
      } else {
        console.warn('Places API request failed:', status);
      }
    });
  }
}
