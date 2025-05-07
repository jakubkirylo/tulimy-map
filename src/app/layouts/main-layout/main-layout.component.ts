import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { AuthService } from '../../features/admin/infrastructure/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    MenubarModule,
    PanelModule,
    CarouselModule,
  ],
  host: { ngSkipHydration: 'true' }, // for PrimeNG Carousel
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  private readonly authService = inject(AuthService);
  title = 'tulimy-map';

  protected items: MenuItem[] = [];
  protected images = [
    { src: 'assets/right1.png', alt: 'Right Image 1' },
    { src: 'assets/right2.png', alt: 'Right Image 2' },
  ];

  ngOnInit(): void {
    this.refreshMenuItems();
  }

  protected isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  protected logout(): void {
    this.authService.logout();
    this.refreshMenuItems();
  }

  private refreshMenuItems(): void {
    this.items = [
      {
        label: 'Strona główna',
        routerLink: '/map',
      },
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
}
