import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SharedService {

  public toogle: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http:HttpClient) { }

    public isStringUrl = new BehaviorSubject<any | undefined>("");
  emit(value: any) {
    this.isStringUrl.next(value);
  }
  on(): Observable<String | undefined> {
    return this.isStringUrl.asObservable();
  }
}
