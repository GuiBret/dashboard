import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  /**
   * Check Spotify's status, returns true if :
   * 1. there is a token
   * 2. This token is still valid (expDate > new Date().getTime())
   */
  checkSpotifyStatus() {
    return localStorage.getItem('spotifyToken') != null && parseInt(localStorage.getItem('spotifyExp')) > (new Date().getTime());
  }

  fetchAutocomplete(query: string) {
    return this.http.get('http://localhost:3000/spotify/autocomp/' + query);
  }
}
