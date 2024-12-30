import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }

  login(obj :any): Observable<any> {
    return this.http.post<any>(`http://192.168.1.46:8090/login`, obj);
  }
}
