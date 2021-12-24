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

  fetchRepos(username: string, pageNumber: number, direction: 'asc' | 'desc'): Observable<Object> {
    return this.client.get(environment.git_endpoint + username + '/repos?' +
      `sort=created&` +
      `direction=${direction}&` +
      `per_page=${environment.max_repos_per_page}&` +
      `page=${pageNumber}`
    );
  }

  getLoaderStatus(): Observable<boolean> {
    return this.getLoader;
  }

  setLoaderStatus(status: boolean): void {
    this.loaderStatus.next(status);
  }
}
