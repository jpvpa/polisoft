import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /* onEditPost(news: News) {
    console.log('Edit post', news);
    this.openDialog(news);
  } */

}
