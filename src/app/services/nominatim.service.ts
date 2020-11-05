import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LatLng } from 'leaflet';

import { NominatimResponse } from '../models/nominatim-response.model';

import { environment } from '../../environments/environment';

const NOMINATIM_URL = environment.nominatimUrl;

@Injectable({
  providedIn: 'root',
})
export class NominatimService {
  constructor(private http: HttpClient) { }

  /**
   * Looks up an address or place and returns its coordinates.
   * @param query - The query to perform.
   */
  public addressLookup(query: string, bounds: any): Observable<NominatimResponse[]> {
    const options = {
      params: {
        'accept-language': 'es',
        addressdetails: '1',
        bounded: '1',
        format: 'json',
        q: query,
        viewbox: bounds.toBBoxString(),
      },
    };
    return this.http.get<NominatimResponse[]>(`https://${NOMINATIM_URL}/search`, options).pipe(
      map(
        (data: any[]) => data.map(
          (item: any) => new NominatimResponse(
            new LatLng(item.lat, item.lon),
            item.display_name,
            item.type,
            item.address,
          ),
        ),
      ),
    );
  }

}
