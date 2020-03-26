import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Polisoft';
  //Remove icon --> faCoffee = faCoffee; --> Reference: https://golb.hplar.ch/2019/02/fa.html

  constructor() { }
  ngOnInit() { }
}