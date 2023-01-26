import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  colapse: boolean = false

  constructor(private router:Router){}

  showMenu(){
    this.colapse = !this.colapse
  }

  canColapse(){
    return  this.router.url !== '/login' && this.router.url !== '/register'
  }
}
