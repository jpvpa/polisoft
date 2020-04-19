import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-dashboard',
  templateUrl: './sidebar-dashboard.component.html',
  styleUrls: ['./sidebar-dashboard.component.css']
})
export class SidebarDashboardComponent implements OnInit {
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
      this.router.navigateByUrl('update-dashboard');
    }
    if (path === 'dashboard') {
      this.router.navigateByUrl('dashboard/' + this.userName);
    }
  }
}
