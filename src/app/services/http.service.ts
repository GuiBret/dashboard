import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/todo';
import { environment } from '../../environments/environment';

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


    return this.http.get<Array<Todo>>(environment.serverRoot + '/todos', reqOpts);

  }

  saveTodoList(todoList: Array<Todo>) {

    const reqOpts = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST'
      })
    };


    return this.http.post(environment.serverRoot + '/todos', {todos: todoList}, reqOpts);
  }

  editTodo(idTodo: string, todoData: Todo) {
    const reqOpts = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      })
    };


    return this.http.put(environment.serverRoot + '/todos/' + idTodo, {todo: todoData}, reqOpts);
  }

  deleteTodoElement(idTodo: string) {
    const reqOpts = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT,DELETE'
      })
    };
    return this.http.delete(environment.serverRoot + '/todos/' + idTodo, reqOpts);
  }

  addNewTodo(newTodoData: Todo) {
    const reqOpts = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE'
      })
    };
    return this.http.post(environment.serverRoot + '/todos/', {todo: newTodoData}, reqOpts);
  }

  checkSpotifyStatus() {
    return this.http.get(environment.serverRoot + '/spotify/precheck');
  }

  refreshSpotifyToken(refreshToken: string) {
    return this.http.get(environment.serverRoot + '/spotify/refresh-token/' + refreshToken);
  }

  getSpotifyAuthUrl() {
    return this.http.get(environment.serverRoot + '/spotify/get-url');
  }
}
