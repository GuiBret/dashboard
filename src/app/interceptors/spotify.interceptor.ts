import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SpotifyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.includes('spotify')) {
      console.log(localStorage.getItem('spotifyToken'));
      if(localStorage.getItem('spotifyToken')) {

        request = request.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + localStorage.getItem('spotifyToken')
          }
        });
      }
    }
    return next.handle(request);
  }
}
