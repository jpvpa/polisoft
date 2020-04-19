import { Component, OnInit } from '@angular/core';
import { News } from '../../../../shared/model/news';
import { NewsService } from '../news.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {
  image: any;
  constructor(
    public news : NewsService
  ) { }

  booking(data: News) { 
    this.news.preAddAndUpdateNews(data, this.image);
    console.log(this.image);
    console.log(data);
  }
  serviceForm = new FormGroup ({
    title : new FormControl ('', [
      Validators.required
    ]),
    price : new FormControl ('',[
      Validators.required
    ]),
    description : new FormControl('',[
      Validators.required
    ]),
    newsPhoto : new FormControl ('', [
      Validators.required
    ])
  });

  get title(){
    return this.serviceForm.get('title');
  }
  get price (){
    return this.serviceForm.get('price');
  }
  get description (){
    return this.serviceForm.get('description');
  }
  get newsPhoto (){
    return this.serviceForm.get('newsPhoto')
  }

    

  ngOnInit() {
  }

}
