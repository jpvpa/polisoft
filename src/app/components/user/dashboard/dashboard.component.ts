import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { Router } from "@angular/router";
//New dashboard
import { NavbarServiceService } from 'src/app/shared/services/navbar-service.service';
import { UserService } from '../../../shared/services/user.service';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { PlatformLocation } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  //¿Estoy o no estoy? => private isButtonVisible = true;

  @ViewChild('modalContainer', {static: false}) modalContent: ElementRef;
  modalRef;
  closeResult;
  room;

  displayName;
  userName;
  photoURL = '../../';
  status;
  email;
  userid = null;

  currentuid;

  showInvalid: boolean;
  isLoaded: boolean;
  isCurrentUser: boolean;
  isLoggedIn: boolean;

  filename;
  isUser: boolean;
  profileInfoClass = 'row justify-content-center ml-md-2 ml-lg-auto justify-content-lg-end';

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private userService: UserService,
    private titleService: Title,
    private auth: AuthService,
    private afs: AngularFirestore,
    private location: PlatformLocation
  ) {
    location.onPopState((event) => {
      // ensure that modal is opened
      if (this.modalRef !== undefined) {
          this.modalRef.close();
      }
    });
   }

  ngOnInit() {
    this.getCurrentUser();
    this.isUser = false;
    this.titleService.setTitle('Dashboard');

    this.isLoggedIn = false;
    this.isLoaded = false;
    this.userService.retrieveUserDocumentFromUsername(this.router.url.slice(6)).subscribe(
      user => {
        if (user[0]) {
          const uservar: any = user[0];
          this.displayName = uservar.displayName;
          this.userName = uservar.userName;
          this.status = uservar.status;
          this.photoURL = uservar.photoURL;
          this.userid = uservar.uid;
          this.email = uservar.email;
          this.isLoaded = true;
          this.titleService.setTitle(this.displayName + ' @' + this.userName);
          this.checkCurrentUser();
        } else {
          this.isLoaded = true;
          this.showInvalid = true;
        }
    }); 
  }

  checkCurrentUser() {
    this.auth.getAuthState().subscribe(
      user => {
        console.log(user)
        if (user) {
          if (this.userid) {
            this.isLoggedIn = true;
            this.currentuid = user.uid;
            if (this.userid === user.uid) {
              this.isCurrentUser = true;
              this.profileInfoClass = 'row justify-content-center ml-md-2 ml-lg-auto';
            }
          }
        } else {
          this.isLoggedIn = false;
          this.profileInfoClass = 'row justify-content-center ml-md-2 ml-lg-auto';
        }
    });
  } 

  getCurrentUser() {
    this.auth.getAuthState().subscribe(
      user => {
        if (user) {
          this.userService.retrieveUserDocument(user.uid).subscribe(
            userDoc => {
              if (userDoc) {
                this.displayName = userDoc.displayName;
                this.userName = userDoc.userName;
                this.photoURL = userDoc.photoURL;
                this.userid = userDoc.uid;
                this.status = userDoc.status;
                this.email = userDoc.email;

              }
            });
        } else {
          this.router.navigateByUrl('sign-in');
        }
    });
  }
  logout() {
    this.isUser = false;
    this.auth.logout();
  }
  sendTo(path) {
    if (path === 'update') {
      this.router.navigateByUrl('update-dashboard');
    }
  }
}