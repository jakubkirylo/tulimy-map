import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    ButtonModule,
    MenubarModule,
    PanelModule,
    CarouselModule,
  ],
  host: { ngSkipHydration: 'true' }, // for Ng Prime Carousel
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  title = 'tulimy-map';
  protected items: MenuItem[] = [
    {
      label: 'Strona główna',
      routerLink: '/map',
    },
    { label: 'O projekcie' },
    { label: 'O Tulimy', url: 'https://tulimy.com/o-nas/' },
    { label: 'Kontakt', routerLink: '/contact' },
  ];

  protected images = [
    { src: 'assets/right1.png', alt: 'Right Image 1' },
    { src: 'assets/right2.png', alt: 'Right Image 2' },
  ];
}
