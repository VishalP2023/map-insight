import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeyConfig } from '../model/key-config';

@Injectable()
export class KeyConfigService {
 constructor(private httpClient: HttpClient) { }


  create(keyconfigDetails: FormData): Observable<KeyConfig> {
    return this.httpClient.post<KeyConfig>(`${environment.baseUrl}/google-api/save`, keyconfigDetails);
  }

}
