import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUserId: any;

  constructor(private route: Router){}

  ngOnInit(): void {
   this.currentUserId = JSON.parse(localStorage.getItem('currentUser') || '[]')
  }

  logout(){
    localStorage.removeItem('currentUser');

    this.route.navigate(['/', 'connexion'])
  }

}
