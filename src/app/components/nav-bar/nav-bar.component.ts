import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "./../../shared/services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  

  constructor(public authService: AuthService/* , public afAuth: AngularFireAuth */) { }
 /*  public isLoggedIn: boolean = false; */
    ngOnInit() {
     /*  this.getCurrentUser(); */
    }

    /* getCurrentUser() {
      this.authService.isAuth().subscribe(auth => {
        if (auth) {
          console.log('user logged');
          this.isLoggedIn = true;
        } else {
          console.log('NOT user logged');
          this.isLoggedIn = false;
        }
      });
    }
  
    SignOut() {
      this.afAuth.auth.signOut();
    }  */

    
}
