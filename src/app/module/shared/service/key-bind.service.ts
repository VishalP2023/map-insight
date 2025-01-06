import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class KeyBindService {

 constructor(private httpClient: HttpClient) { }

 getAll(): Observable<any> {
  return this.httpClient.get<any>(`${environment.baseUrl}/google-api/get-list`);
}

  bind(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/google-api/activate/${id}`);
  }

  get(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/google-api/get-activated-key`);
  }
}
