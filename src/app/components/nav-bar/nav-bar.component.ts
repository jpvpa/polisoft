import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "./../../shared/services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
//New service
import {  NavbarServiceService } from './../../shared/services/navbar-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  constructor(public authService: AuthService, public nav: NavbarServiceService) { }
  //public isLoggedIn: boolean = false;

    ngOnInit() {
      this.nav.show(); //bug - show in every route?
    }
}