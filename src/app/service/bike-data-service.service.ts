import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BikeDataServiceService {
  headers = new HttpHeaders().set('Client-Identifier', 'sunilsingh-csod');
  baseUrl = 'https://gbfs.urbansharing.com/';
  constructor(private httpClient: HttpClient) {
  }

  getAllStationInformation(): Observable<any> {
    const apiUrl = this.baseUrl + 'oslobysykkel.no/station_information.json';
    return this.httpClient.get(apiUrl, {
      headers: this.headers
    });
  }

  getAllBikeAndDocAvailability(): Observable<any> {
    const apiUrl = this.baseUrl + 'oslobysykkel.no/station_status.json';
    return this.httpClient.get(apiUrl, {
      headers: this.headers
    });
  }
}
