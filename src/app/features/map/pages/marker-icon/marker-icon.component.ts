import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-marker-icon',
  imports: [CommonModule],
  templateUrl: './marker-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerIconComponent {
  public fillColor = input<string>();
  public iconName = input<string>();

  get dynamicBackgroundImage(): string {
    const fill = '#E17100';
    const svg = `
      <svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
        <path fill="${fill}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192
          0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 
          309.67-9.535 13.774-29.93 13.773-39.464 0z"/>
      </svg>
    `;
    const encoded = encodeURIComponent(svg)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');
    return `url("data:image/svg+xml,${encoded}")`;
  }
}
