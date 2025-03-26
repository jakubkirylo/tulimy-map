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
}
