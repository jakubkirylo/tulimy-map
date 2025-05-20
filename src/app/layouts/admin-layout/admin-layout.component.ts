import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, ButtonModule, MenubarModule, PanelModule],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent
  extends BaseLayoutComponent
  implements OnInit
{
  ngOnInit(): void {
    this.refreshMenuItems();
  }
}
