import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, tap } from 'rxjs';
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

        param = param.delete('page').delete('size').delete('sort');
        console.log("params",param)
        const paramsOptions={
          params: param
        }

        const user_role =sessionStorage.getItem('userRoles')!;
        if(user_role=='ADMIN'){
          return this.httpClient.get(`${environment.baseUrl}/place/generate-data`, paramsOptions)
          .pipe(
              tap(response => {
                  console.log('Response from generate-data:', response);
              }),
              switchMap(() => {
                  console.log('Calling /place/search');
                  return this.httpClient.get<{ content: Array<any>, totalPages: number }>(
                      `${environment.baseUrl}/place/search`, 
                      paramsOptions
                  );
              }),
              catchError((error) => {
                  console.error('Error in API call', error);
                  // Continue to make the second API call even if the first one fails
                  return this.httpClient.get<{ content: Array<any>, totalPages: number }>(
                      `${environment.baseUrl}/place/search`, 
                      paramsOptions
                  );
              })
          );
        }else{
          return this.httpClient.get<{ content: Array<any>, totalPages: number }>(`${environment.baseUrl}/place/search?`, options);
        }
      }

      getContactDetails(placeId : string): Observable<any> {
        return this.httpClient.get<any>(
          `${environment.baseUrl}/place/get-contacts?placeId=`+placeId);
      }

      getSectorData(): Observable<any> {
        return this.httpClient.get<any>(
          `${environment.baseUrl}/sector/get-list`);
      } 
}
