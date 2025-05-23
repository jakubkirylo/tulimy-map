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

interface PoiTypeOption {
  label: string;
  value: string;
}

interface City {
  name: string;
  code: string;
}

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

  cities: City[] | undefined;
  selectedCity: City | undefined = { name: 'Rome', code: 'RM' };

  public poiForm: PoiTypeOption = { label: 'Home', value: 'Home' };

  public newPoi: PointOfInterest = {
    id: '',
    name: '',
    coordinates: [],
    type: PoiType.Home,
  };

  pois2: PoiTypeOption[] = [];

  public readonly poiTypes: PoiTypeOption[] = Object.values(PoiType).map(
    (t) => ({
      label: t.toString(),
      value: t.toString(),
    })
  );

  ngOnInit() {
    this.pois2 = [
      { label: 'Home', value: 'Home' },
      { label: 'Kebab', value: 'Kebab' },
    ];
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
    console.warn('poitTypes', this.poiTypes);
    console.warn('pois2', this.pois2);
    console.warn('poinForm', this.poiForm);
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
