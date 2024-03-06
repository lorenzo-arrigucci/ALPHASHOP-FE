import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { ArticoliCardComponent } from './components/articoli-card/articoli-card.component';
import { CoreModule } from './core/core.module';
import { ArticoliComponent } from './pages/articoli/articoli.component';
import { ErrorComponent } from './pages/error/error.component';
import { GridArticoliComponent } from './pages/grid-articoli/grid-articoli.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RegistrazioneComponent } from './pages/registrazione/registrazione.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ArticoliComponent,
    LogoutComponent,
    GridArticoliComponent,
    ArticoliCardComponent,
    RegistrazioneComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, CoreModule, HttpClientModule, NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
