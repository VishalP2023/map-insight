import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }

  login(obj :any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/login`, obj);
  }
}
