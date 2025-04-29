import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map', component: MapComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
];
