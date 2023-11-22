import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListArticlesComponent } from './articles/list-articles/list-articles.component';
import { DetailArticlesComponent } from './articles/detail-articles/detail-articles.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './service/auth/auth.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ListArticlesComponent,
    DetailArticlesComponent,
    AuthComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
