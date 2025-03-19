import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map', component: MapComponent },
  { path: 'contact', component: ContactComponent },
];
