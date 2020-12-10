import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SpotifyService } from './Spotify/services/spotify.service';
import { HttpService } from './services/http.service';
import { Router, NavigationEnd } from '@angular/router';
import { GmailService } from './gmail/services/gmail.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  opened = true;
  title = 'dashboard';
  isLoggedOnSpotify = false;
  isLoggedOnGmail = false;
  isSmallScreen = false;
  color = 'black';
  constructor(private bpObserver: BreakpointObserver, private gmailSvc: GmailService, private spotifySvc: SpotifyService, private http: HttpService, private router: Router) {

    this.router.events.subscribe(this.onRouterEventReceived.bind(this));
  }



  ngAfterViewInit() {
    this.isSmallScreen = this.bpObserver.isMatched('(max-width: 599px)');
    this.isLoggedOnSpotify = this.spotifySvc.checkSpotifyStatus();
  }

  onRouterEventReceived(val: any) {


    if(val instanceof NavigationEnd) {
      if(val.url.includes('/spotify/logged')) {
        this.isLoggedOnSpotify = this.spotifySvc.checkSpotifyStatus();
        this.router.navigate(['spotify'])
      } else if(val.url.includes('/gmail/logged')) {
        this.isLoggedOnGmail = this.gmailSvc.checkGmailStatus();
        this.router.navigate(['gmail']);
      }
    }
  }

  toggleSidenav() {
    this.opened = !this.opened;
  }

  triggerLoginProcedure() {
    this.http.getSpotifyAuthUrl().subscribe((response: any) => {
      window.location.href = response.url;
    })
  }

  triggerGmailLoginProcedure() {
    this.http.getGmailAuthUrl().subscribe((response: any) => {
      window.location.href = response.url;
    })
  }
}
