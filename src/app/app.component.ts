import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Odin V1';

  isLoginRoute: boolean;
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private router: Router) {
    this.isLoginRoute = this.router.url === '/login';
    this.router.events.subscribe((val) => {
      this.isLoginRoute = this.router.url === '/login';
      if (!this.isLoginRoute) {
        this.isSideNavCollapsed = false;
        this.screenWidth = 0;
      }
    });
  }


  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
