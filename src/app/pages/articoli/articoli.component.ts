import { Component, OnInit } from '@angular/core';
import { ArticoliService } from 'src/services/data/articoli.service';
import { Articolo } from '../../models/Articoli';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css'],
})
export class ArticoliComponent implements OnInit {
  articoli$: Articolo[] = [];
  errore: string = '';

  pagina: number = 1;
  righe: number = 10;

  filters$: Observable<string | null> = of('');
  filter: string | null = '';
  filterType: number = 0;

  constructor(
    private route: ActivatedRoute,
    private articoliService: ArticoliService
  ) {}

  ngOnInit(): void {
    this.filters$ = this.route.queryParamMap.pipe(map((params: ParamMap) => params.get('filter')));
    this.filters$.subscribe(param => (this.filter = param));
    this.refresh();
  }

  refresh = () => {
    if (this.filter) {
      this.getArticoli(this.filter);
    }
  };

  getArticoli = (filter: string) => {
    this.articoli$ = [];
    switch (this.filterType) {
      case 0:
        this.articoliService.getArticoliByCode(filter).subscribe({
          next: this.handleResponse.bind(this),
          error: this.handleError.bind(this),
        });
        break;
      case 1:
      default:
        this.articoliService.getArticoliByEan(filter).subscribe({
          next: this.handleResponse.bind(this),
          error: this.handleError.bind(this),
        });
        break;
      case 2:
        this.articoliService.getArticoliByDesc(filter).subscribe({
          next: this.handleResponse.bind(this),
          error: this.handleError.bind(this),
        });
    }
  };

  handleResponse(response: any) {
    if (this.filterType === 0 || this.filterType === 1) {
      let newArray: Articolo[] = [...this.articoli$, response];
      this.articoli$ = newArray;
    } else {
      this.articoli$ = response;
    }
    this.filterType = 0;
  }

  handleError(error: any) {
    if (this.filter && this.filterType === 0) {
      this.filterType = 1;
      this.getArticoli(this.filter);
    } else if (this.filter && this.filterType === 1) {
      this.filterType = 2;
      this.getArticoli(this.filter);
    } else {
      this.errore = error.error.message;
      this.filterType = 0;
    }
  }

  getClassByStato = (idStatoArt: string): string => {
    switch (idStatoArt) {
      case 'Attivo':
        return 'alert-success';
      case 'Sospeso':
        return 'alert-warning';
      default:
        return 'alert-danger';
    }
  };
}
