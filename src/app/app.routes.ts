import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
];
