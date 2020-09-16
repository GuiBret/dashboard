import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {

  }

  getTodoList() {
    const reqOpts = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST'
      })
    };


    return this.http.get('http://localhost:3000/todos', reqOpts);

  }

  saveTodoList(todoList: Array<Todo>) {

    const reqOpts = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST'
      })
    };


    return this.http.post('http://localhost:3000/todos', {todos: todoList}, reqOpts);
  }

  editTodo(idTodo: string, todoData: Todo) {
    const reqOpts = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST'
      })
    };


    return this.http.post('http://localhost:3000/todos/' + idTodo + '/edit', {todo: todoData}, reqOpts);
  }
}
