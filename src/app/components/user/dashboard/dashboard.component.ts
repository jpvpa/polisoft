import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { Router } from "@angular/router";
//New dashboard
import { NavbarServiceService } from 'src/app/shared/services/navbar-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  //¿Estoy o no estoy? => private isButtonVisible = true;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public nav: NavbarServiceService
  ) { }

  ngOnInit() {
    /* this.nav.hide(); */
  }
}