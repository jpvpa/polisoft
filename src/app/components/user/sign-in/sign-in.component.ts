import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @ViewChild('content', {static: false}) modalContent: ElementRef; 

  error: string;
  isAdmin: any =null;
  constructor(
    private auth: AuthService,
    private router: Router,
    private titleService: Title
  ) { }

  emailform = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required
    ])
  });

  get email() {
    return this.emailform.get('email');
  }
  get password() {
    return this.emailform.get('password');
  }

  ngOnInit() {
    this.auth.checkNotLogin();
    this.titleService.setTitle('Sign In');
  }

  login(mode) {
    if (mode === 'email') {
        this.auth.getAuth().signInWithEmailAndPassword(this.email.value, this.password.value)
        .then(() => {
          this.auth.getAuthState().subscribe(user => {
            if (user) {
              if (user.emailVerified) {
                this.router.navigateByUrl('/home');
              } else {
                this.auth.getAuth().currentUser.sendEmailVerification();
                /* this.auth.getAuth().signOut().then(() => this.open(this.modalContent)); */
              }
            }
          });
        })
        .catch(err => {
          if (err.code === 'auth/user-not-found') {
            this.error = 'No User with the given Email found.';
          }
          if (err.code === 'auth/wrong-password') {
            this.error = 'Password incorrect!';
          }
          if (err.code === 'auth/user-disabled') {
            this.error = 'User has been banned. Please contact the administrator.';
          }
        });
    }
  }

}
