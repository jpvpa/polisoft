import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NewsService } from '../admin/news/news.service';
import { News } from 'src/app/shared/model/news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private titleService: Title, public news: NewsService) { }
  newss: News[]
  ngOnInit() {
    this.titleService.setTitle('News');
    this.news.getNews().subscribe(data => {
      this.newss = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as News
        } 
      })
    });
  }

}
