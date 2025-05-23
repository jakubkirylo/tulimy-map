import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoiApiService } from '../../../poi/infrastructure/poi-api.service';
import { PointOfInterest, PoiType } from '../../../poi/domain/poi.interfaces';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    FloatLabelModule,
    ButtonModule,
  ],
  templateUrl: './admin-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent {
  private readonly poiApi = inject(PoiApiService);
  public readonly pois = signal<PointOfInterest[]>([]);
  public readonly editingPoi = signal<PointOfInterest | null>(null);
  public newPoi: PointOfInterest = {
    id: '',
    name: '',
    coordinates: [],
    type: PoiType.Home,
  };
  public readonly poiTypes = Object.values(PoiType).map((t) => ({
    label: t,
    value: t,
  }));

  ngOnInit() {
    this.loadPois();
  }

  loadPois() {
    this.poiApi.getPois().subscribe((data) => this.pois.set(data));
  }

  startEdit(poi: PointOfInterest) {
    this.editingPoi.set({ ...poi });
  }

  cancelEdit() {
    this.editingPoi.set(null);
  }

  saveEdit() {
    const poi = this.editingPoi();
    if (poi) {
      this.poiApi.updatePoi(poi.id, poi).subscribe(() => {
        this.loadPois();
        this.cancelEdit();
      });
    }
  }

  deletePoi(id: string) {
    this.poiApi.deletePoi(id).subscribe(() => this.loadPois());
  }

  createPoi() {
    this.poiApi.createPoi(this.newPoi).subscribe(() => {
      this.loadPois();
      this.newPoi = { id: '', name: '', coordinates: [], type: PoiType.Home };
    });
  }
}
