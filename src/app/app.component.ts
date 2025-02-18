import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, MenubarModule, PanelModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tulimy-map';
  protected items: MenuItem[] = [
    {
      label: 'Strona główna',
    },
    { label: 'O projekcie' },
    { label: 'O Tulimy' },
    { label: 'Kontakt' },
  ];
}
