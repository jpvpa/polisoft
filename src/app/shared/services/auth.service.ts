import { Injectable, NgZone } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';

interface Roles{
  admin?: boolean;
  user?:boolean;
}

interface User {
  uid?: string;
  email?: string;
  userName?: string;
  displayName?: string;
  photoURL?: string;
  status?: string;
  joinDate?: any;
  roles?: Roles;
} 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  adminCollection: AngularFirestoreCollection<User>;
  adminObs: Observable<any>;


  private updateData: User;
  user: Observable<User>;
  userCollection: AngularFirestoreCollection<User>;
  userObs: Observable<any>;

  private authState: Observable<firebase.User>;
  private currentUser: firebase.User = null;
  private profileusername: string;
  private status: string;
  constructor(public afAuth: AngularFireAuth,
      public afs: AngularFirestore,
      public router: Router) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        console.log(user);
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  getAuth() {
    return this.afAuth.auth;
  }


  getAuthState() {
    return this.afAuth.authState;
  }
  emailLogin(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);

  }
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.afs.doc('users/' + credential.user.uid).valueChanges().subscribe(
          user => {
          if (user) {
            this.router.navigateByUrl('/home');
          } else {
            this.afAuth.auth.signOut()
            .then(() => this.router.navigateByUrl('/sign-up'));
          }
        });
      });
  }

  SignUp(userdata) {
    if (userdata.type === 'email') {
      this.SignIn(userdata);
    }
  }

  private SignIn(formdata) {
    this.afAuth.auth.createUserWithEmailAndPassword(formdata.email, formdata.password)
    .then(() => {
      this.getAuthState().subscribe(user => {
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: formdata.displayname,
            status: 'Hi, I just made an account on POLISOFT',
            userName: formdata.username,
            roles: {
              user: true
            }
          };console.log(user);
          this.updateUserData(userData);
        }
      });
    });
  }


  private updateUserData(user) {
    this.userCollection = this.afs.collection('users', ref => ref.where('uid', '==', user.uid));
    this.userObs = this.userCollection.valueChanges();
    this.userObs.forEach( userobj => {
      console.log('Existing User logged in- ', userobj[0].userName);
    })
    .then(
      (success) => {
        this.router.navigateByUrl('/home');
      })
    .catch (
      (err) => {
          console.log('New User login.\nSetting up user in database.');
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        
          const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL ? user.photoURL : '../../../assets/images/default-profile.jpg',
            status: 'Hi, I just made an account on POLISOFT',
            userName: user.userName,
            joinDate: firebase.firestore.FieldValue.serverTimestamp(),
            roles: {
              user: true
            }
          };
          if (this.afAuth.auth.currentUser) {
            this.getAuth().currentUser.sendEmailVerification().then(() => {
              this.lOut();
            });
          }
          return userRef.set(data);
        });
  }
  lOut(){
    this.afAuth.auth.signOut().then(
      () => {
      console.log('User logged out successfully.');
      this.router.navigateByUrl('verify-email-address');
    });
  }

  sendEmailVerify(){
    if (this.afAuth.auth.currentUser) {
      this.getAuth().currentUser.sendEmailVerification().then(() => {
        this.lOut();
      });
    }
  }

  logout() {
    this.afAuth.auth.signOut().then(
      () => {
      console.log('User logged out successfully.');
      this.router.navigateByUrl('/sign-in');
    });
  }

  updateUser(displayname, username, status) {
    const updateRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.currentUser.uid}`);
    this.updateData = {
      userName: username,
      status: status,
      displayName: displayname,
      roles: {
        user: true
      }
    };
    return updateRef.update(this.updateData);
  }

  isUserAdmin(userUid) {
    return this.afs.doc<User>(`users/${userUid}`).valueChanges();
  }

  updatePhotoURL(photourl) {
    const updateRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.currentUser.uid}`);
    this.updateData = {
      photoURL : photourl
    };
    return updateRef.update(this.updateData);
  }
  checkNotLogin() {
    this.afAuth.authState.subscribe(
      user => {
        if (user) {
          this.router.navigateByUrl('/home');
        }
      });
  }

  checkLogin() {
    this.afAuth.authState.subscribe(
      user => {
        if (!user) {
          this.router.navigateByUrl('/sign-in');
        }
      });
  }
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  

}
