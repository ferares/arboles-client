import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private loading = new Subject<boolean>();
  public modifyLoading$: Observable<boolean> = this.loading.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Updates the "loading" variable.
   * @param state - The new "loading" state.
   */
  public setLoading(state: boolean): void {
    this.loading.next(state);
  }

  /**
   * Gets the list of species from the API
   * @return Observable.
   */
  public getSpecies(): Observable<any> {
    this.setLoading(true); // Update loading status

    return this.http.get<any>(`${API_URL}/especies`).pipe(
      catchError((err) => throwError(err)),
      finalize(() => this.setLoading(false)),
    );
  }

  /**
   * Gets the list of trees from the API that match the selected filters
   * @return Observable.
   */
  public search(data): Observable<any> {
    this.setLoading(true); // Update loading status

    const params = new HttpParams()
      .set('borigen_cuyana', data.region.cuyana)
      .set('borigen_nea', data.region.nea)
      .set('borigen_noa', data.region.noa)
      .set('borigen_pampeana', data.region.pampeana)
      .set('borigen_patagonica', data.region.patagonica)
      .set('especie_id', data.species)
      .set('radio', environment.searchRadius.toString())
      .set('user_latlng', data.marker)
      .set('user_origen', data.origin)
      .set('user_sabores', data.flavors);

    return this.http.get<any>(`${API_URL}/arboles`, { params }).pipe(
      catchError((err) => throwError(err)),
      finalize(() => this.setLoading(false)),
    );
  }

  /**
   * Gets a tree from the API
   * @return Observable.
   */
  public getTree(id): Observable<any> {
    this.setLoading(true); // Update loading status

    return this.http.get<any>(`${API_URL}/arboles/${id}`).pipe(
      catchError((err) => throwError(err)),
      finalize(() => this.setLoading(false)),
    );
  }

}
