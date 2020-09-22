import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class SpotifyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.url.includes('spotify')) {
      if(localStorage.getItem('spotifyToken')) {
        // const expDate = jwt_decode.
        request = request.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + localStorage.getItem('spotifyToken')
          }
        });
      } else {
        // return false;
      }
    }
    return next.handle(request);
  }
}
