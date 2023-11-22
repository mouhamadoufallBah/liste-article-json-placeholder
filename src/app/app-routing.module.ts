import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListArticlesComponent } from './articles/list-articles/list-articles.component';
import { DetailArticlesComponent } from './articles/detail-articles/detail-articles.component';
import { AuthComponent } from './service/auth/auth.component';

const routes: Routes = [
  {path: 'connexion', component:AuthComponent},
  {path: 'articles', component:ListArticlesComponent},
  {path: 'detail-articles', component:DetailArticlesComponent},

  {path: '', redirectTo:'articles', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
