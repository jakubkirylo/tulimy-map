import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PointOfInterest } from '../domain/poi.interfaces';

@Injectable({ providedIn: 'root' })
export class PoiApiService {
  constructor(private http: HttpClient) {}

  getPois(): Observable<PointOfInterest[]> {
    return this.http.get<PointOfInterest[]>('/api/pois');
  }

  createPoi(poi: PointOfInterest): Observable<PointOfInterest> {
    return this.http.post<PointOfInterest>('/api/pois', poi);
  }

  updatePoi(id: string | number, poi: PointOfInterest): Observable<PointOfInterest> {
    return this.http.put<PointOfInterest>(`/api/pois/${id}`, poi);
  }

  deletePoi(id: string | number): Observable<void> {
    return this.http.delete<void>(`/api/pois/${id}`);
  }
}
