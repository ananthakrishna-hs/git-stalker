import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private client: HttpClient
  ) { }

  getUser(username: string): Observable<Object> {
    return this.client.get(environment.git_endpoint + username);
  }
}
