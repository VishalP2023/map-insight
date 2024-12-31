import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableHeaderMetaData } from '../../shared/model/table-header-list.model';

@Injectable()
export class SectorService {

  constructor(private httpClient: HttpClient) { }

  create(sectorDetails: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/sector/save`, sectorDetails);
  }

  getMetadata(): Observable<TableHeaderMetaData> {
    return this.httpClient.get<TableHeaderMetaData>(`${environment.baseUrl}/data-table-metadata/sector`);
  }

  getAll(param: HttpParams): Observable<{ content: Array<any>, totalPages: number }> {
    const options = {
      params: param
    };
    return this.httpClient.get<{ content: Array<any>, totalPages: number }>(`${environment.baseUrl}/sector/search?`, options);
  }

  getById(sectorId: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/sector/get-by-id/${sectorId}`);
  }

  update(sectorDetails: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.baseUrl}/sector/save`, sectorDetails);
  }

  delete(sectorId: number) {
    return this.httpClient.delete(`${environment.baseUrl}/sector/${sectorId}`);
  }

  getList(){
    return this.httpClient.get<any>(`${environment.baseUrl}/sector/get-list`);
  }
}
