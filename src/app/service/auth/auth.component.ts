import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email: string = "";
  password: string = "";

  //variable qui nous permet de recuperer un objet a traver le mail saisie dans notre tableau users
  findUser: any;

  //variable qui nous permettra de recuperer notre local storage
  db: any;

  constructor(private route: Router, private userservice: UserService) { }
  ngOnInit(): void { }

  showMessage(icon: any, message: any) {
    Swal.fire({
      icon: icon,
      title: message
    });
  }


  login() {
    //Affichage message d'erreur
    // Sinon on essaye de trouver le user correspondant✅
    if (this.email == "" || this.password == "") {
      this.showMessage('error', 'Email ou mot de passe incorecte');
    } else {
      this.userservice.getAuthComponent().subscribe(
        (response) => {
          this.findUser = response.find((elt: any) => elt.email === this.email)
        }

      );

      //on verifie si notre variable à trouver un objet correspondant
      if (this.findUser) {
        //On verifie si le mot de passe est bon
        if (this.password === 'passer') {
          this.showMessage('success', 'Email ou mot de passe incorecte');
        }
        //enregistrer l'utilisateur connecter
        localStorage.setItem('currentUser', JSON.stringify(this.findUser.id));

        //vider les champs
        this.email = "";
        this.password = "";
      } else {
        this.showMessage('error', 'Email ou mot de passe incorecte');
        this.route.navigate(['/', 'list-articles']);

      }
    }
  }
}


