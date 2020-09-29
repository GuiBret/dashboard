import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlayerService {

  constructor(private http: HttpClient) { }

  pauseSong(with_device: string = '') {
    return this.http.put('https://api.spotify.com/v1/me/player/pause', {});
  }

  playSong(with_device: string = '') {
    return this.http.put('https://api.spotify.com/v1/me/player/play', {});
  }

  goToNextSong(with_device: string = '') {
    return this.http.post('https://api.spotify.com/v1/me/player/next', {});
  }

  goToPreviousSong(with_device: string = '') {
    return this.http.post('https://api.spotify.com/v1/me/player/previous', {});
  }

  getInfoOnPlayback() {
    return this.http.get('https://api.spotify.com/v1/me/player/currently-playing', {observe: 'response'}).pipe(map((response: any) => {
      if(response.status === 200) {
        const item = response.body.item;

        return {
          title: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          imageUrl: item.album.images[item.album.images.length - 1].url
        };

      }
    }));
  }

  getAvailableDevices() {

  }


}
