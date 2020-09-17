import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  fetchAutocomplete(query: string) {
    return this.http.get('http://localhost:3000/spotify/autocomp/' + query);
  }
}
