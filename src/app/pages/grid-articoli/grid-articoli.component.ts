import { Component, OnInit } from '@angular/core';
import { Articolo } from 'src/app/models/Articoli';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-grid-articoli',
  templateUrl: './grid-articoli.component.html',
  styleUrls: ['./grid-articoli.component.css'],
})
export class GridArticoliComponent implements OnInit {
  articoli$: Articolo[] = [];
  errore: string = '';

  constructor(private articoliService: ArticoliService) {}

  ngOnInit(): void {
    this.articoliService.getArticoliByDesc('Barilla').subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  handleResponse(response: Articolo[]) {
    this.articoli$ = response;
  }

  handleError(error: Object) {
    this.errore = error.toString();
  }

  handleEdit = (codart: string) => {
    console.log('Call Edit: ' + codart);
  };

  handleDelete = (codart: string) => {
    console.log('Call Delete ' + codart);
  };
}
