import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Articolo } from 'src/app/models/Articoli';
import { HTTP_CONSTANTS } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ArticoliService {

  constructor(private http: HttpClient) {}

  getArticoliByDesc = (descrizione: string): Observable<Articolo[]> => {
    return this.http.get<Articolo[]>(`${HTTP_CONSTANTS.API.ARTICOLI.CERCA}/descrizione/${descrizione}`).pipe(
      map(response => {
        response.forEach(item => (item.idStatoArt = this.getDescStatoArticolo(item.idStatoArt)));
        return response;
      })
    );
  };

  getArticoliByCode = (codArt: string): Observable<Articolo> => {
    return this.http.get<Articolo>(`${HTTP_CONSTANTS.API.ARTICOLI.CERCA}/codice/${codArt}`).pipe(
      map(response => {
        response.idStatoArt = this.getDescStatoArticolo(response.idStatoArt);
        return response;
      })
    );
  };

  getArticoliByEan = (barcode: string): Observable<Articolo> => {
    return this.http.get<Articolo>(`${HTTP_CONSTANTS.API.ARTICOLI.CERCA}/barcode/${barcode}`).pipe(
      map(response => {
        response.idStatoArt = this.getDescStatoArticolo(response.idStatoArt);
        return response;
      })
    );
  };

  getDescStatoArticolo = (idStatoArt: string): string => {
    switch (idStatoArt) {
      case '1':
        return 'Attivo';
      case '2':
        return 'Sospeso';
      default:
        return 'Eliminato';
    }
  };
}
