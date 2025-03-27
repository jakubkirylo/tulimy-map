import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { PointOfInterest } from '../../poi/poi.interfaces';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-popup-template',
  imports: [CommonModule, CarouselModule],
  templateUrl: './popup-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupTemplateComponent {
  public poi = input<PointOfInterest>();
  protected images = computed(
    () => this.poi()?.banners?.map((b) => ({ src: `assets/${b}` })) ?? []
  );
}
