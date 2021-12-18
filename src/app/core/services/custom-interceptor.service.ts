import { ApiService } from 'src/app/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class CustomInterceptorService implements HttpInterceptor {
  constructor(
    private apiService: ApiService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.apiService.setLoaderStatus(true);
    return next.handle(req)
    .pipe(
      finalize(() => this.apiService.setLoaderStatus(false))
    );
  }
}
