import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { UsernameValidators } from 'src/app/validators/username.validators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private title: Title,
    private auth: AuthService,
    private afs: AngularFirestore
  ) {}

  isTaken = false;

  emailform = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace
    ]),
    displayname: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required
    ]),
    passwordConfirm: new FormControl('',
      Validators.required
    )
  }, this.passwordMatchValidator);

  googleform = new FormGroup({
    googleusername: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace
    ])
  });

  passwordMatchValidator(g: FormGroup) {
    if (g.get('password').value && g.get('passwordConfirm').value) {
      return g.get('passwordConfirm').value === g.get('password').value
       ? null : {'mismatch': true};
    }
 }


  get username() {
    return this.emailform.get('username');
  }
  get displayname() {
    return this.emailform.get('displayname');
  }
  get email() {
    return this.emailform.get('email');
  }
  get password() {
    return this.emailform.get('password');
  }

  ngOnInit() {
    this.title.setTitle('Signup');
  }

  search($event) {
    const q = $event.target.value;
    this.checkUsername(q);
  }

  checkUsername(q) {
    this.afs.collection('users', ref => ref.where('userName', '==', q)).valueChanges().subscribe(user => {
      if (user[0]) {
        this.isTaken = true;
      } else {
        this.isTaken = false;
      }
    });
  }


  register(type) {
    if (type === 'email'
      && !this.password.errors
      && !this.username.errors
      && !this.displayname.errors
      && !this.email.errors && !this.isTaken) {
      const data = {
        username: this.username.value,
        displayname: this.displayname.value,
        email: this.email.value,
        password: this.password.value,
        type: 'email'
      };
      this.auth.SignUp(data);
    }
  }

}
