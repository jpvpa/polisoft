import { Component, OnInit, Input, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
//New service
import {  NavbarServiceService } from './../../shared/services/navbar-service.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isUser: boolean;
  isAdmin: any = null;
  displayName;
  uid;
  userName;
  photoURL = '../../../assets/images/default-profile.jpg';
  email;
  constructor(public auth: AuthService, public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private userService: UserService) { }
  public isLogged: boolean = false;

    ngOnInit() {
      this.isAdmin = false;
      this.isUser = false;
      this.getUserData();
    }
  getUserData() {
    this.auth.getAuthState().subscribe(
      user => {
        if (user) {
          this.isUser = true;
          this.userService.retrieveUserDocument(user.uid).subscribe(
            userDoc => {
              if (userDoc) {
                this.displayName = userDoc.displayName;
                this.userName = userDoc.userName;
                this.photoURL = userDoc.photoURL;
                this.uid = userDoc.uid;
                this.auth.isUserAdmin(this.uid).subscribe(userRole => {
                  this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
                });
              }
            });
        } else {
          this.isUser = false;
          this.isAdmin = false;
        }
      });
  }
    sendTo(path) {
      if (path === 'dashboard') {
        this.router.navigateByUrl('dashboard/' + this.userName);
      }
      if (path === 'dashboardadmin') {
        this.router.navigateByUrl('dashboard-admin/' + this.userName);
      }
    }
    logout() {
      this.isAdmin = false;
      this.isUser = false;
      this.auth.logout();
    }
  
}