import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private getLoader: Observable<boolean>;

  constructor(
    private client: HttpClient
  ) {
    this.getLoader = this.loaderStatus.asObservable();
  }

  getUser(username: string): Observable<Object> {
    return this.client.get(environment.git_endpoint + username);
  }

  getLoaderStatus(): Observable<boolean> {
    return this.getLoader;
  }

  setLoaderStatus(status: boolean): void {
    this.loaderStatus.next(status);
  }
}
