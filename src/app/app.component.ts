import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    MenubarModule,
    PanelModule,
    CarouselModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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
