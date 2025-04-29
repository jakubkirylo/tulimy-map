import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private tokenKey = 'auth_token';

  public login(username: string, password: string): Observable<any> {
    // TODO JWK: for swa cli to dummy login
    // TODO JWK: write custom auth azure function
    window.location.href = '/.auth/login/aad?post_login_redirect_uri=/admin';
    return of(null);

    return this.http
      .post<{ token: string }>('/.auth/login/aad', { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
