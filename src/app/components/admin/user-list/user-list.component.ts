import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  items:Observable<any[]>
  constructor(db: AngularFirestore) {
    this.items=db.collection('users').valueChanges();
   }

  ngOnInit() {
  }

  

}
