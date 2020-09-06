import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {

  }

  getTodoList() {

    return new Observable((observer) => {
      observer.next({
        todos: [],
        themes: []
      });
    });

  }
}
