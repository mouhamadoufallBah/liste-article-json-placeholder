import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-article-by-user',
  templateUrl: './list-article-by-user.component.html',
  styleUrls: ['./list-article-by-user.component.css']
})
export class ListArticleByUserComponent implements OnInit {
  articles: any;
  currentUser = 1;

  dbArticle: any;

  titre: string = "";
  contenue: string = "";



  constructor(private articlesService: ArticleService) { }

  ngOnInit() {
    this.dbArticle = JSON.parse(localStorage.getItem('articles') || '[]');
    // this.articlesService.getArticles().subscribe(
    //   (data) => {
    //     this.articles = data.filter((elt: any) => elt.userId === this.currentUser)
    //    if(!localStorage.getItem('articles')){
    //     localStorage.setItem('articles', JSON.stringify(data) || '[]');
    //    }
    //   },
    //   (error) => {
    //     console.error('Erreur lors de la récupération des articles', error);
    //   }
    //   );
    this.articles = this.dbArticle.filter((elt: any) => elt.userId === this.currentUser);

  }

  showMessage(icon: any, message: any) {
    Swal.fire({
      icon: icon,
      title: message
    });
  }

  addArticle() {
    if (this.titre == "" || this.contenue == "") {
      this.showMessage('error', 'Veuillez remplir les champs');
    } else {
      const article = {
        "userId": this.currentUser,
        "id": this.dbArticle.length + 1,
        "title": this.titre,
        "body": this.contenue
      }

      this.articlesService.addArticle(article).subscribe(
        (response) => {
          this.dbArticle.push(article);
          
          localStorage.setItem('articles', JSON.stringify(this.dbArticle))
          this.showMessage('success', 'Ajout avec succées');

          this.articles = this.dbArticle.filter((elt: any) => elt.userId === this.currentUser);

          this.titre == "";
          this.contenue == ""
        },
        (error) => {
          this.showMessage('error', 'Erreur lors de la création de l\'article');
        }
      );
    }



  }
}
