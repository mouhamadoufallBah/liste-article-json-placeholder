import { Component } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-list-article-by-user',
  templateUrl: './list-article-by-user.component.html',
  styleUrls: ['./list-article-by-user.component.css']
})
export class ListArticleByUserComponent {
  articles: any;
  currentUser = 1;

  titre: string = "";
  contenue: string = "";



  constructor(private articlesService: ArticleService) { }

  ngOnInit() {
    this.articlesService.getArticles().subscribe(
      (data) => {
        this.articles = data.filter((elt: any) => elt.userId === this.currentUser)
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles', error);
      }
    );
  }

  addArticle() {
    const article = {
      "userId": this.currentUser,
      "id": this.articles.length + 1,
      "title": this.titre,
      "body": this.contenue
    }

    this.articlesService.addArticle(article).subscribe(
      (response) => {
        console.log('Article créé avec succès:', response);
      },
      (error) =>{
        console.error('Erreur lors de la création de l\'article', error);
      }
    );


  }
}
