import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

/**
 * The service that handles all playback actions with Spotify
 */
@Injectable({
  providedIn: 'root'
})
export class SpotifyPlayerService {

  private playerID: string = "";

  constructor(private http: HttpClient) { }

  /**
   * Pauses the playback
   * @param with_device The device ID that we want to perform the request with
   */
  pauseSong(with_device: string = '') {
    return this.http.put('https://api.spotify.com/v1/me/player/pause', {});
  }

  /**
   * Plays the playback
   * @param with_device The device ID that we want to perform the request with
   */
  playSong(with_device: string = '') {
    return this.http.put('https://api.spotify.com/v1/me/player/play', {});
  }

  /**
   * Goes to the next song
   * @param with_device The device ID that we want to perform the request with
   */
  goToNextSong(with_device: string = '') {
    return this.http.post('https://api.spotify.com/v1/me/player/next', {});
  }

  goToPreviousSong(with_device: string = '') {
    return this.http.post('https://api.spotify.com/v1/me/player/previous', {});
  }

  getInfoOnPlayback() {
    return this.http.get('https://api.spotify.com/v1/me/player/currently-playing', {observe: 'response'})
                    .pipe(map(this.onInfoOnPlaybackReceived.bind(this)));
  }

  onInfoOnPlaybackReceived(response: {status: number, body?: any}) {
    if(response.status === 200) {
      const item = response.body.item;

      return {
        title: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        imageUrl: item.album.images[item.album.images.length - 1].url
      };

    }
  }

  // TODO : implement it
  getAvailableDevices() {

  }

  setVolume(value: number) {
    this.http.put('https://api.spotify.com/v1/me/player/volume?volume_percent=' + value, {}).subscribe(() => {});

  }

  setPlayerID(newPlayerID: string) {
    this.playerID = newPlayerID;
  }

  getPlayerID() : string {
    return this.playerID;
  }




}
