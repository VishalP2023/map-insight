import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableHeaderMetaData } from '../../shared/model/table-header-list.model';

@Injectable()
export class SearchLocationService {
  
    constructor(private httpClient: HttpClient) { }

     getMetadata(): Observable<TableHeaderMetaData> {
        return this.httpClient.get<TableHeaderMetaData>(
          `${environment.baseUrl}/data-table-metadata/location-list`);
      }
    
      getAll(param: HttpParams): Observable<{ content: Array<any>, totalPages: number }> {
        const options = {
          params: param,
        };
        return this.httpClient.get<{ content: Array<any>, totalPages: number }>(`${environment.baseUrl}/place/search?location=thane&sector=1`, options);
      }
}
