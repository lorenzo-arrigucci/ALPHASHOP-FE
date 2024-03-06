import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AuthappService } from 'src/services/authapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userId: string = '';
  password: string = '';

  autenticato: boolean = true;
  notlogged: boolean = false;

  filter$: Observable<string | null> = of('');
  orderby: string = '';

  errMsg: string = 'Spiacente, la userid e/o la password sono errate!';
  errMsg2: string = 'Spiacente, devi autenticarti per poter accedere alla pagina selezionata!';

  titolo: string = 'Accesso & Autenticazione';
  sottoTitolo: string = 'Procedi ad inserire la userid e la password';

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthappService
  ) {}

  ngOnInit(): void {
    this.filter$ = this.activatedRoute.queryParamMap.pipe(
      map((params: ParamMap) => params.get('nologged'))
    );
    this.filter$.subscribe(param => (this.notlogged = param ? true : false));
  }

  @HostListener('document:keyup.enter')
  gestAuth = (): void => {
    this.autenticato = this.authService.autentica(this.userId, this.password);
    this.autenticato && this.route.navigate(['welcome']);
  };
}
