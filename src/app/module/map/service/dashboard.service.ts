import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableHeaderMetaData } from '../../shared/model/table-header-list.model';

@Injectable()

export class DashboardService {

  constructor(private httpClient: HttpClient) { }
  
  getDashboardCount(count:number): Observable<any> {
        return this.httpClient.get<any>(
              `${environment.baseUrl}/dashboard/all-counts?months=${count}`);
    } 

    getPlaceMetadata(): Observable<TableHeaderMetaData> {
        return this.httpClient.get<TableHeaderMetaData>(
          `${environment.baseUrl}/data-table-metadata/place-list-dashboard`);
      }
    
      getAllPlaceData(param: HttpParams): Observable<{ content: Array<any>, totalPages: number }> {
        const options = {
          params: param,
        };
        return this.httpClient.get<{ content: Array<any>, totalPages: number }>(`${environment.baseUrl}/dashboard/place-details?`, options);
      }


      getGeoCodeMetadata(): Observable<TableHeaderMetaData> {
        return this.httpClient.get<TableHeaderMetaData>(
          `${environment.baseUrl}/data-table-metadata/geocode-list-dashboard`);
      }
    
      getAllGeoCodeData(param: HttpParams): Observable<{ content: Array<any>, totalPages: number }> {
        const options = {
          params: param,
        };
        return this.httpClient.get<{ content: Array<any>, totalPages: number }>(`${environment.baseUrl}/dashboard/geocode-details?`, options);
      }

      getContactMetadata(): Observable<TableHeaderMetaData> {
        return this.httpClient.get<TableHeaderMetaData>(
          `${environment.baseUrl}/data-table-metadata/contact-details-dashboard`);
      }
    
      getAllContactData(param: HttpParams): Observable<{ content: Array<any>, totalPages: number }> {
        const options = {
          params: param,
        };
        return this.httpClient.get<{ content: Array<any>, totalPages: number }>(`${environment.baseUrl}/dashboard/contact-details?`, options);
      }
  }