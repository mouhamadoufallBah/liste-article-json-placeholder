import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-list-article-by-user',
  templateUrl: './list-article-by-user.component.html',
  styleUrls: ['./list-article-by-user.component.css']
})
export class ListArticleByUserComponent {
  articles: any;

  constructor(private articlesService: ArticleService){}

  ngOnInit(){
    this.articlesService.getArticle().subscribe(
      (data) => {
        this.articles = data.filter((elt: any) => elt.userId===1)
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles', error);
      }
    );


  }
}
