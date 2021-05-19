import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MenubarModule} from 'primeng/menubar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarshipsComponent } from './starships/starships.component';
import { StarshipSummaryComponent } from './starship-summary/starship-summary.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import { StarshipDetailsComponent } from './starship-details/starship-details.component';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    StarshipsComponent,
    StarshipSummaryComponent,
    StarshipDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    HttpClientModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
