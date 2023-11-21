import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit{
  articles: any;

  constructor(private articlesService: ArticleService){}

  ngOnInit(){
    this.articlesService.getArticle().subscribe(
      (data) => {
        this.articles = data
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles', error);
      }
    );


  }


}
