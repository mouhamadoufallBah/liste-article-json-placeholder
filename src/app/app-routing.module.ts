import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArticlesComponent } from './articles/list-articles/list-articles.component';
import { DetailArticlesComponent } from './articles/detail-articles/detail-articles.component';
import { ListArticleByUserComponent } from './articles/list-article-by-user/list-article-by-user.component';

const routes: Routes = [
  {path: 'articles', component:ListArticlesComponent},
  {path: 'articlesByUser', component:ListArticleByUserComponent},
  {path: 'detail-articles', component:DetailArticlesComponent},
  {path: '', redirectTo:'articles', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
