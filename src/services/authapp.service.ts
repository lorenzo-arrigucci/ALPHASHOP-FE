import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthappService {
  constructor() {}

  autentica = (userId: string, password: string): boolean => {
    const retVal = userId === 'Nicola' && password === '123_Stella';
    if (retVal) sessionStorage.setItem('utente', userId);
    return retVal;
  };

  clearAll = (): void => sessionStorage.clear();

  loggedUser = (): string | null => (sessionStorage.getItem('utente') ? sessionStorage.getItem('utente') : '');

  isLogged = (): boolean => !!sessionStorage.getItem('utente');
}
