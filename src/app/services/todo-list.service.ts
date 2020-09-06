import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private http: HttpService) { }

  fetchTodosAndThemes(): Observable<Array<Todo>> {
    return new Observable((observer) => {
      const dummyData = [
      {
        _id: "Dummy 1",
        theme: "Thème 1",
        content: "Contenu 1",
      },
      {
        _id: "Dummy 2",
        theme: "Thème 2",
        content: "Contenu 2",
      },

    ]

      observer.next(dummyData);
    })
  }
}
