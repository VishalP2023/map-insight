import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = sessionStorage.getItem('access_token');
    // Add token to headers if available and not accessing the authentication endpoint
    if (token != null && !authReq.url.includes('/auth/accessToken')) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error: any) => {
        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('/auth/accessToken') &&
          (error.status === 401 || error.status === 403 || error.status === 0)
        ) {
          // Handle 401/403: Redirect to login or logout
          this.handleUnauthorizedError();
        }
        // Propagate other errors
        return throwError(() => error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handleUnauthorizedError(): void {
    // Clear session storage or any relevant user data
    sessionStorage.clear();

    // Navigate to login page
    this.router.navigate(['/login']).then(() => {
      console.error('User is not authorized. Redirecting to login...');
    });
  }
}
