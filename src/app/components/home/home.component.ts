import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>
  constructor(
    private titleService: Title,
    afs: AngularFirestore
  ) {
    this.items = afs.collection('home').valueChanges();
  }
  ngOnInit() {
    this.titleService.setTitle('Home');
    
  }

}

 
