import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    ButtonModule,
    MenubarModule,
    PanelModule,
    CarouselModule,
  ],
  host: { ngSkipHydration: 'true' },
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent extends BaseLayoutComponent implements OnInit {
  protected images = [
    { src: 'assets/right1.png', alt: 'Right Image 1' },
    { src: 'assets/right2.png', alt: 'Right Image 2' },
  ];

  ngOnInit(): void {
    this.refreshMenuItems();
  }
}
