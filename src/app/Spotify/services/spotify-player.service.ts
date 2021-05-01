import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

enum RepeatState {
  NO_REPEAT = 'off',
  REPEAT_ONE = 'track',
  REPEAT_ALL = 'context'
}


/**
 * The service that handles all playback actions with Spotify
 */
@Injectable({
  providedIn: 'root'
})
export class SpotifyPlayerService {

  private playerID = '';

  private playbackMetadataChangedSource = new Subject();

  private seekPositionInSongSource = new Subject();

  onSeekPositionRequested = this.seekPositionInSongSource.asObservable();

  onPlaybackMetadataChanged  = this.playbackMetadataChangedSource.asObservable();

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  /**
   * Pauses the playback
   * @param withDevice The device ID that we want to perform the request with
   */
  pauseSong(withDevice: string = '') {
    return this.http.put('https://api.spotify.com/v1/me/player/pause', {});
  }

  /**
   * Plays the playback
   * @param withDevice The device ID that we want to perform the request with
   */
  playSong(withDevice: string = '') {
    return this.http.put('https://api.spotify.com/v1/me/player/play', {});
  }

  /**
   * Goes to the next song
   * @param withDevice The device ID that we want to perform the request with
   */
  goToNextSong(withDevice: string = '') {
    return this.http.post('https://api.spotify.com/v1/me/player/next', {});
  }

  goToPreviousSong(withDevice: string = '') {
    return this.http.post('https://api.spotify.com/v1/me/player/previous', {});
  }

  getInfoOnPlayback() {
    return this.http.get('https://api.spotify.com/v1/me/player/currently-playing', {observe: 'response'})
                    .pipe(map(this.onInfoOnPlaybackReceived.bind(this)));
  }

  // TODO: change function name
  getRepeatStateStrFromRepeatModeValue(repeatModeValue: number) {
    switch (repeatModeValue) {
      case 1:
        return RepeatState.REPEAT_ALL;
      case 2:
        return RepeatState.REPEAT_ONE;
      default:
        return RepeatState.NO_REPEAT;
    }
  }

  onInfoOnPlaybackReceived(response: {status: number, body?: any}) {
    if (response.status === 200) {
      const item = response.body.item;

      return {
        title: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        imageUrl: item.album.images[item.album.images.length - 1].url
      };

    }
  }

  // TODO: implement it
  getAvailableDevices() {

  }

  setVolume(value: number) {
    this.http.put('https://api.spotify.com/v1/me/player/volume?volume_percent=' + value, {}).subscribe(() => {});

  }

  setPlayerID(newPlayerID: string) {
    this.playerID = newPlayerID;
  }

  getPlayerID(): string {
    return this.playerID;
  }

  pushPlaybackMetadataChanged(newPlaybackData: any): void {
    this.playbackMetadataChangedSource.next(newPlaybackData);
  }

  displaySnackbar(message) {
    this.snackbar.open(message);

  }

  seekPositionInSong(positionInMilliseconds: number) {
    this.seekPositionInSongSource.next(positionInMilliseconds);
  }

  toggleShuffle(newState: boolean) {
    return this.http.put('https://api.spotify.com/v1/me/player/shuffle?state=' + newState, {});
  }

  toggleRepeat(repeatMode: string) {
    return this.http.put('https://api.spotify.com/v1/me/player/repeat?state=' + repeatMode, {});
  }




}
