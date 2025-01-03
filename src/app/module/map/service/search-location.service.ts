import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableHeaderMetaData } from '../../shared/model/table-header-list.model';
import { Place, Sector } from '../models/place.model';
import { PlaceContact } from '../models/place-contact.model';

@Injectable()
export class SearchLocationService {
  
    constructor(private httpClient: HttpClient) { }

     getMetadata(): Observable<TableHeaderMetaData> {
        return this.httpClient.get<TableHeaderMetaData>(
          `${environment.baseUrl}/data-table-metadata/location-list`);
      }
    
      getAll(param: HttpParams): Observable<{ content: Array<Place>, totalPages: number }> {
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
          return this.httpClient.get<{ content: Array<Place>, totalPages: number }>(`${environment.baseUrl}/place/search?`, options);
        }else{
          return this.httpClient.get<{ content: Array<Place>, totalPages: number }>(`${environment.baseUrl}/place/search?`, options);
        }       
      }

      genrateData(param: HttpParams): Observable<any> {
        const options = {
          params: param,
        };        
        return this.httpClient.get<{ content: Array<any>, totalPages: number }>(`${environment.baseUrl}/place/generate-data?`, options);      
      }

      getContactDetails(placeId : string): Observable<PlaceContact> {
        return this.httpClient.get<PlaceContact>(
          `${environment.baseUrl}/place/get-contacts?placeId=`+placeId);
      }

      getSectorData(): Observable<Sector> {
        return this.httpClient.get<Sector>(
          `${environment.baseUrl}/sector/get-list`);
      } 
}
