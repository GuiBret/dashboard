import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened = true;
  title = 'dashboard';
  isSmallScreen = false;
  constructor(private bpObserver: BreakpointObserver) {
    this.isSmallScreen = bpObserver.isMatched('(max-width: 599px)');
  }

  toggleSidenav() {
    this.opened = !this.opened;
  }
}
