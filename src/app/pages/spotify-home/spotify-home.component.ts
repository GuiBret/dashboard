import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-spotify-home',
  templateUrl: './spotify-home.component.html',
  styleUrls: ['./spotify-home.component.css']
})
export class SpotifyHomeComponent implements OnInit {
  needsLogin = false;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.checkSpotifyStatus().subscribe((response: any) => {
      if(response.status !== 'OK') {
        this.needsLogin = true;
      }
    });
  }

}
