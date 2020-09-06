import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  todos: Array<Todo> = [
    {
      _id: "Dummy1",
      title: "My title 1",
      theme: "Thème 1",
      content: "Contenu 1",
    },
    {
      _id: "Dummy2",
      title: 'My title 2',
      theme: "Thème 2",
      content: "Contenu 2",
    },

  ];
  themes: Array<string> = ['Dummy 1', 'Dummy 2'];
  constructor(private http: HttpService) { }

  fetchTodosAndThemes(): Observable<{todos: Array<Todo>, themes: Array<string>}> {
    return new Observable((observer) => {
      const dummyData = {
        todos: [...this.todos],
        themes: [...this.themes]


      };

      observer.next(dummyData);
    });
  }

  getTodo(id: string) {
    return this.todos.find((elem) => {

      return elem._id === id;

    });


  }
}
