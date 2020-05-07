import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/shared/model/news';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  constructor(public news: NewsService) { }
  newss: News[]
  ngOnInit() {
    this.news.getNews().subscribe(data => {
      this.newss = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as News
        } 
      })
    });
  }


  onEditNews(news: News) {
    console.log('Edit post', news);
    this.openDialog(news);
  }
  openDialog(news?: News): void {
    const config = {
      data: {
        message: news ? 'Edit Post' : 'New Post',
        content: news
      }
    };
  }


}
