import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-dashadmin',
  templateUrl: './sidebar-dashadmin.component.html',
  styleUrls: ['./sidebar-dashadmin.component.css']
})
export class SidebarDashadminComponent implements OnInit {
  isUser: boolean;
  userName;
  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }
  logout() {
    this.isUser = false;
    this.auth.logout();
  }
  sendTo(path) {
    if (path === 'update') {
      this.router.navigateByUrl('update-dashboard-admin');
    }
    if (path === 'dashboard') {
      this.router.navigateByUrl('dashboard-admin/' + this.userName);
    }
    if (path === 'userlist') {
      this.router.navigateByUrl('user-list');
    }
    if (path === 'appointments') {
      this.router.navigateByUrl('appointments');
    }
    if (path === 'news') {
      this.router.navigateByUrl('news-list');
    }
  }

}

