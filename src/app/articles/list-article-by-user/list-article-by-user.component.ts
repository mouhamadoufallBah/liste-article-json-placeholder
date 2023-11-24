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
  currentArticle: any;

  tableauElementArchiver = [];

  dbArticle: any;

  titre: string = "";
  contenue: string = "";

  //pagination
  articlesParPage = 6;
  pageActuelle = 1 ;



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

    //liste des article de l'utilisateur connecter
    this.articles = this.dbArticle.filter((elt: any) => elt.userId === this.currentUser).reverse();

  }

  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    return this.articles.slice(indexDebut, indexFin);
  }
  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.articles.length / this.articlesParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.articles.length / this.articlesParPage);
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
      //stocker ce que l'utlisateur saisie dans un nouvau tableau
      const article = {
        "userId": this.currentUser,
        "id": this.dbArticle.length + 1,
        "title": this.titre,
        "body": this.contenue
      }

      //utiliser notre service pour ajouter
      this.articlesService.addArticle(article).subscribe(
        (response) => {
          //ajouter  l'objet article dans notre tableau
          this.dbArticle.push(article);

          //persister dans notre local storage
          localStorage.setItem('articles', JSON.stringify(this.dbArticle))
          this.showMessage('success', 'Ajout avec succées');

          //reactualiser la liste
          this.articles = this.dbArticle.filter((elt: any) => elt.userId === this.currentUser).reverse();

          //vider les champs
          this.titre == "";
          this.contenue == ""
        },
        (error) => {
          this.showMessage('error', 'Erreur lors de la création de l\'article');
        }
      );
    }
  }

  //recuperer l'objet qu'on a cliqué pour modifier
  getCurrentArticle(id: number) {
    this.currentArticle = this.articles.find((elt: any) => elt.id === id);

    //remplir les input
    this.titre = this.currentArticle.title;
    this.contenue = this.currentArticle.body;
  }

  //mis a jour
  updateArticle() {
    if (this.titre == "" || this.contenue == "") {
      this.showMessage('error', 'Veuillez remplir tout les champs');
    } else {
      //utilisation de notre services
      this.articlesService.updateArticle(this.currentArticle, this.titre, this.contenue)

      //persister dans le local storage
      localStorage.setItem('articles', JSON.stringify(this.articles));
      this.showMessage('success', 'classe ajouté avec succées');

      //vider les champs
      this.titre == "";
      this.contenue == "";

      //reactualiser le tableaux
      this.articles = this.dbArticle.filter((elt: any) => elt.userId === this.currentUser).reverse();
    }
  }

  deleteArticle(articleId: number) {
    //l'index de l'element selectionner
    const index = this.articles.findIndex((article: any) => article.id === articleId);
    if (index !== -1) {
      // Supprimer l'article de la liste
      this.articles.splice(index, 1);

      //persistrer
      localStorage.setItem('articles', JSON.stringify(this.articles));
    }

    Swal.fire({
      title: "etes-vous sûr?",
      text: "de vouloir supprimer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui je veus supprimer"
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.articles.findIndex((article: any) => article.id === articleId);
        if (index !== -1) {
          // Supprimer l'article de la liste
          this.articles.splice(index, 1);

          this.showMessage('success', 'Articles supprimée avec succès');
        } else {
          this.showMessage('error', 'Article non trouvée');
        }
        Swal.fire({
          title: "Supression!",
          text: "Article supprimer avec succées.",
          icon: "success"
        });

        localStorage.setItem('articles', JSON.stringify(this.articles));
      }
    });

  }

  archiver(article: any) {
  }

}
