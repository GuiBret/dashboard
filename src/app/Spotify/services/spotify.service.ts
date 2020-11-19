import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private playbackChangedSource = new Subject();


  onPlaybackChanged = this.playbackChangedSource.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Check Spotify's status, returns true if :
   * 1. there is a token
   * 2. This token is still valid (expDate > new Date().getTime())
   */
  checkSpotifyStatus() {
    return localStorage.getItem('spotifyToken') != null && parseInt(localStorage.getItem('spotifyExp')) > (new Date().getTime());
  }

  fetchAutocomplete(query: string, filterParams: {albums: boolean, songs: boolean, artists: boolean}) {
    // TODO : rewrite that
    let params = [];
    if(filterParams.albums) {
      params.push('album');
    }

    if(filterParams.artists) {
      params.push('artist');
    }

    if(filterParams.songs) {
      params.push('track');
    }

    return this.http.get(environment.serverRoot + '/spotify/autocomp/' + query + '?type=' + params.join(','));
  }

  playElement(uri: string) {

    this.http.put('https://api.spotify.com/v1/me/player/play', {context_uri: uri}).subscribe(() => {
      this.playbackChangedSource.next();
    });
  }
}
