import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http.service';

/**
 * Checks if the token is still valid, if not, will request a refresh token
 * TODO : rewrite
 */
@Injectable()
export class SpotifyInterceptor implements HttpInterceptor {

  constructor(private httpSvc: HttpService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (req.url.includes('spotify') && !req.url.includes('/auth/refresh')) {
      if (localStorage.getItem('spotifyToken')) {

        // If the token is still valid, we simply push the current token to the headers
        if (parseInt(localStorage.getItem('spotifyExp'), 10) > new Date().getTime()) {
          req = req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + localStorage.getItem('spotifyToken')
            }
          });

        } else { // Otherwise, we will request a new one
          return new Observable<HttpEvent<any>>((observer) => {
            this.httpSvc.refreshSpotifyToken(localStorage.getItem('spotifyRefresh'))
                        .subscribe(this.handleTokenResponse.bind(this, req, next));
          });

        }
      }
    }

    return next.handle(req);
  }

  handleTokenResponse(req: HttpRequest<unknown>, next: HttpHandler, tokenResponse: any) {
    // We store the token, the refresh, etc
    localStorage.setItem('spotifyToken', tokenResponse.token);
    localStorage.setItem('spotifyExp', (new Date().getTime() + (3600 * 1000)).toString());

    // Then we relaunch the request using the new token
    const request = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('spotifyToken')
      }
    });

    return next.handle(request);
  }
}
