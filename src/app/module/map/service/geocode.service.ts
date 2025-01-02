import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableHeaderMetaData } from '../../shared/model/table-header-list.model';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor(private httpClient: HttpClient) { }
  
       getMetadata(): Observable<TableHeaderMetaData> {
          return this.httpClient.get<TableHeaderMetaData>(
            `${environment.baseUrl}/data-table-metadata/geocode-list`);
        }
      
        getAll(param: HttpParams): Observable<{ content: Array<any>, totalPages: number }> {
          const options = {
            params: param,
          };
          return this.httpClient.get<{ content: Array<any>, totalPages: number }>(`${environment.baseUrl}/geocode/get-all?`, options);
        }

          create(geoCodeAddress: FormData): Observable<any> {
            const body = {
              address: geoCodeAddress
            };
            return this.httpClient.post<any>(`${environment.baseUrl}/geocode/generate?address=${geoCodeAddress}`, {});

            //return this.httpClient.post<any>(`${environment.baseUrl}/geocode/generate`, body);
          }
  }
  
