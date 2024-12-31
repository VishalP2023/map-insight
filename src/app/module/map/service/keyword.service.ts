import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TableHeaderMetaData } from '../../shared/model/table-header-list.model';
import { KeywordDetails } from '../models/Keyword.model';


@Injectable()
export class KeywordService {
  constructor(private httpClient: HttpClient) { }


  create(keywordDetails: FormData): Observable<KeywordDetails> {
    return this.httpClient.post<KeywordDetails>(`${environment.baseUrl}/keyword/save`, keywordDetails);
  }

  getMetadata(): Observable<TableHeaderMetaData> {
    const token =sessionStorage.getItem('access_token')!;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Replace YOUR_ACCESS_TOKEN with the token variable
    });
    // return this.httpClient.get<TableHeaderMetaData>(`${environment.baseUrl}/data-table-metadata/keyword`);
    return this.httpClient.get<TableHeaderMetaData>(
      `${environment.baseUrl}/data-table-metadata/keyword`,
      { headers }
    );
  }

  getAll(param: HttpParams): Observable<{ content: Array<any>, totalPages: number }> {
    const token = sessionStorage.getItem('access_token')!;
    const options = {
      params: param,
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`, // Add the Authorization header
      }),
    };
    return this.httpClient.get<{ content: Array<any>, totalPages: number }>(`${environment.baseUrl}/keyword/search?`, options);
  }

  getById(id: number): Observable<KeywordDetails> {
    return this.httpClient.get<KeywordDetails>(`${environment.baseUrl}/keyword/get-by-id/${id}`);
  }

  update(keywordDetails: any): Observable<KeywordDetails> {
    return this.httpClient.put<KeywordDetails>(`${environment.baseUrl}/keyword/save`, keywordDetails);
  }

  delete(keywordId: number): Observable<KeywordDetails> {
    return this.httpClient.delete<KeywordDetails>(`${environment.baseUrl}/keyword/${keywordId}`);
  }

  getList(){
    return this.httpClient.get<KeywordDetails>(`${environment.baseUrl}/keyword/get-list`);
  }
}
