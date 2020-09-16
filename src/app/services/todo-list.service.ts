import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, Subject } from 'rxjs';
import { Todo } from '../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  todos: Array<Todo> = [
    {
      _id: null,
      title: "My title 1",
      theme: "Thème 1",
      content: "Contenu 1",
      status: true
    },
    {
      _id: null,
      title: 'My title 2',
      theme: "Thème 2",
      content: "Contenu 2",
      status: false
    },

  ];
  themes: Array<string> = ['Dummy 1', 'Dummy 2'];

  todoListChanged = new Subject<Array<Todo>>();
  constructor(private http: HttpService, private snackbar: MatSnackBar) { }

  fetchTodosAndThemes() {

    this.http.getTodoList().subscribe((response: any) => {
      this.todos = response;
      this.themes = [];

      this.todoListChanged.next([...this.todos]);

    })
  }

  getTodo(id: string) {
    return this.todos.find((elem) => {
      console.log(elem._id);
      return elem._id === id;

    });


  }

  fetchTodoList() {
    return this.http.getTodoList().subscribe((response: any) => {
      if(status === 'OK') {

        this.todoListChanged.next(response.todos);
      }
    })
  }

  editTodo(newTodo: Todo) {
    const _id = newTodo._id;

    this.http.editTodo(_id, newTodo).subscribe((response) => {
      console.log(response);
    });
    // this.todos = this.todos.map((currTodo: Todo) => {
    //   if(currTodo._id === _id) {

    //     return newTodo;
    //   }

    //   return currTodo;
    // });


    // this.todoListChanged.next([...this.todos]);

  }

  /**
   * Saves the current todo list
   */
  saveTodoList() {
    return this.http.saveTodoList(this.todos);

  }

  displaySnackbar(message: string) {
    this.snackbar.open(message, null, {
      duration: 2000
    });
  }
}
