import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthappService } from 'src/services/authapp.service';
import { SalutiService } from 'src/services/data/saluti.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  utente: string = '';
  titolo: string = 'Benvenuti in Alphashop';
  sottoTitolo: string = 'Visualizza le offerte del giorno';
  saluti: string = '';
  errore: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthappService,
    private salutiService: SalutiService
  ) {}

  ngOnInit(): void {
    const user = this.authService.loggedUser();
    if (user != null)
      this.utente = user;
  }

  getSaluti = (): void => {
    this.salutiService.getSaluti(this.utente).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  };

  handleResponse = (response: Object): void => {
    this.saluti = response.toString();
  };

  handleError = (error: any): void => {
    console.log(error);
    this.errore = error.error.message;
  };
}
