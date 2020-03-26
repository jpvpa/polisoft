import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  valueDate = '';
  cite: Observable<any[]>; //Array to push

  constructor(public db: AngularFireDatabase) {
    this.cite = db.list('cite').valueChanges();
  }
 
  onSubmit() {
    this.db.list('cite').push({ content: this.valueDate});
    this.valueDate = '';
  }

  ngOnInit() {
  }
}