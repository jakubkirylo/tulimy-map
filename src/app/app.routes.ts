import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './features/admin/pages/login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminPageComponent } from './features/admin/pages/admin-page/admin-page.component';
import { authGuard } from './features/admin/infrastructure/auth.guard';
import { GoogleMapComponent } from './features/admin/pages/google-map/google-map.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MapComponent } from './features/map/pages/map.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/map', pathMatch: 'full' },
      { path: 'map', component: MapComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'admin',
        component: AdminPageComponent,
        canActivate: [authGuard],
      },
      {
        path: 'googleMap',
        component: GoogleMapComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
  { path: '**', redirectTo: '/map' },
];
