import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { switchMap, catchError, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GoogleMapsLoaderService {
  private apiLoad$: Observable<void> | null = null;

  constructor(private http: HttpClient) {}

  load(): Observable<void> {
    if (this.apiLoad$) {
      return this.apiLoad$;
    }

    this.apiLoad$ = this.http
      .get('api/GetGoogleMap', { responseType: 'text' })
      .pipe(
        take(1),
        switchMap((key: string) => {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=marker&loading=async`;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);

          return fromEvent(script, 'load').pipe(
            switchMap(
              () =>
                new Observable<void>((observer) => {
                  const interval = setInterval(() => {
                    if ((window as any).google?.maps?.Map) {
                      clearInterval(interval);
                      observer.next();
                      observer.complete();
                    }
                  }, 50);
                })
            )
          );
        }),
        catchError((err) => {
          console.warn('Failed to load Google Maps:', err);
          return EMPTY;
        })
      );

    return this.apiLoad$;
  }
}
