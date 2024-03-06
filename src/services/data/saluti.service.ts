import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class SalutiService {

  constructor(private http: HttpClient) { }

  getSaluti = (utente: string): Observable<Object> => this.http.get(BASE_URL + 'api/saluti/' + utente);
}
