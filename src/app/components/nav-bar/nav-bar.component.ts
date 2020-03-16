import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
//New service
import {  NavbarServiceService } from './../../shared/services/navbar-service.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  constructor(public authService: AuthService, public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone) { }
  public isLogged: boolean = false;

    ngOnInit() {
      this.getCurrentUser();
      /* this.nav.show(); bug - show in every route? */
    }

    getCurrentUser() {
      this.authService.isAuth().subscribe(auth => {
        if (auth) {
          console.log('user logged');
          this.isLogged = true;
        } else {
          console.log('NOT user logged');
          this.isLogged = false;
        }
      });
    }
  
    SignOut() {
      this.afAuth.auth.signOut();
    }
}