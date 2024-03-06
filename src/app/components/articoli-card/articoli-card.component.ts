import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Articolo } from 'src/app/models/Articoli';

@Component({
  selector: 'app-articoli-card',
  templateUrl: './articoli-card.component.html',
  styleUrls: ['./articoli-card.component.css'],
})
export class ArticoliCardComponent implements OnInit {
  @Input() articolo: any;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  editArt = () => this.edit.emit(this.articolo.codArt);

  deleteArt = () => this.delete.emit(this.articolo.codArt);
}
