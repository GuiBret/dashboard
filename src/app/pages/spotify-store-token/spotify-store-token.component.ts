import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-spotify-store-token',
  templateUrl: './spotify-store-token.component.html',
  styleUrls: ['./spotify-store-token.component.css']
})
export class SpotifyStoreTokenComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if(params.token && params.refresh) {
        localStorage.setItem('spotifyToken', params.token);
        localStorage.setItem('spotifyRefresh', params.refresh);

        this.router.navigate(['spotify']);
      }

    })
  }

}
