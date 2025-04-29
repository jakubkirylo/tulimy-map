import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private tokenKey = 'auth_token';

  login(username: string, password: string): Observable<any> {
    // TODO JWK: for swa cli to dummy login
    // TODO JWK: write custom auth azure function
    // window.location.href = '/.auth/login/aad';

    return this.http
      .post<{ token: string }>('/.auth/login/aad', { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
