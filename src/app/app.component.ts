import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SpotifyService } from './services/Spotify/spotify.service';
import { HttpService } from './services/http.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  opened = true;
  title = 'dashboard';
  isLoggedOnSpotify = false;
  isSmallScreen = false;
  constructor(private bpObserver: BreakpointObserver, private spotifySvc: SpotifyService, private http: HttpService, private router: Router) {
    this.isSmallScreen = bpObserver.isMatched('(max-width: 599px)');

    this.router.events.subscribe((val: any) => {

      if(val instanceof NavigationEnd) {

        if(val.url.includes('/spotify/logged')) {
          this.isLoggedOnSpotify = this.spotifySvc.checkSpotifyStatus();
        }
      }
    });
  }

  ngOnInit() {





  }

  toggleSidenav() {
    this.opened = !this.opened;
  }

  triggerLoginProcedure() {
    this.http.getSpotifyAuthUrl().subscribe((response: any) => {
      window.location.href = response.url;
    })
  }
}
