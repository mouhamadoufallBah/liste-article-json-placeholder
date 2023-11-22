import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListArticlesComponent } from './articles/list-articles/list-articles.component';
import { DetailArticlesComponent } from './articles/detail-articles/detail-articles.component';
import { HttpClientModule } from '@angular/common/http';
import { ListArticleByUserComponent } from './articles/list-article-by-user/list-article-by-user.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ListArticlesComponent,
    DetailArticlesComponent,
    ListArticleByUserComponent,
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
