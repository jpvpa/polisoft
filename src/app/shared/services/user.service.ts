import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
    providedIn: 'root'
  })
export class UserService {

    constructor(
      private afs: AngularFirestore
    ) { }
  
    retrieveUserDocument(uid) {
      console.log(uid);
      return this.afs.doc<any>('users/' + uid).valueChanges();
    }
  
    retrieveUserDocumentFromUsername(username) {
      console.log(username)
      return this.afs.collection('users', ref => ref.where('userName', '==', username)).valueChanges();
    }
    retrieveUserDocumentFromID(uid) {
      console.log(uid);
      return this.afs.doc<any>('users/' + uid).valueChanges();
    }
  }