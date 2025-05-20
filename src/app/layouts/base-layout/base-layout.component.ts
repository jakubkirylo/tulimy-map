// shared/base-layout.component.ts
import { Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../features/admin/infrastructure/auth.service';

@Directive()
export abstract class BaseLayoutComponent {
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);

  protected title = 'tulimy-map';
  protected items: MenuItem[] = [];

  protected refreshMenuItems(): void {
    this.items = [
      { label: 'Strona główna', routerLink: '/map' },
      { label: 'O projekcie' },
      { label: 'O Tulimy', url: 'https://tulimy.com/o-nas/' },
      { label: 'Kontakt', routerLink: '/contact' },
      {
        label: 'Admin',
        routerLink: '/admin',
        visible: this.authService.isAuthenticated(),
      },
      {
        label: 'Google Map',
        routerLink: '/googleMap',
        visible: this.authService.isAuthenticated(),
      },
    ];
  }

  protected isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  protected logout(): void {
    this.authService.logout();
    this.refreshMenuItems();
    this.router.navigate(['/map']);
  }

  protected login(): void {
    this.router.navigate(['/login']);
  }
}
