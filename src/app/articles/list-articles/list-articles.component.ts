import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { CommentaireService } from 'src/app/services/commentaire.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
  articles: any;
  commentaireByArticle: any;

  searchArticle = "";
  itemSearch: any;

  currentUser: any;
  constructor(private route: Router, private articlesService: ArticleService, private commentaireService: CommentaireService) { }

  ngOnInit() {
    this.articlesService.getArticles().subscribe(
      (data) => {
        this.articles = data
        if (!localStorage.getItem('articles')) {
          localStorage.setItem('articles', JSON.stringify(this.articles));
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des articles', error);
      }
    );



    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '0')

  }


  viewComment(id: number) {
    this.commentaireService.getComments().subscribe(
      (response) => {
        this.commentaireByArticle = response.filter((elt: any) => elt.postId === id);
      }
    );
  }

  articleFound() {
    this.itemSearch = this.articles.filter(
      (item: any) => (item.title.toLowerCase().includes(this.searchArticle.toLowerCase())));

  }

  logout() {
    localStorage.removeItem('currentUser');

    this.route.navigate(['/', 'connexion'])
  }


}
