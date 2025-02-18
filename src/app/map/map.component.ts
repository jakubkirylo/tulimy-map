import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-map',
  imports: [],
  template: `<p>map works!</p>`,
  styleUrl: './map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent { }
