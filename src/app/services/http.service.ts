import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../TodoList/models/todo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {

  }

  /**
   * Calls SERVER_ROOT/todos, fetches the whole todo-list from Mongo
   */
  getTodoList() {
    const reqOpts = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST'
      })
    };


    return this.http.get<Array<Todo>>(environment.serverRoot + '/todos', reqOpts);

  }

  /**
   * Saves the current todo-list
   * @param todoList The todo-list which will be save
   */
  saveTodoList(todoList: Array<Todo>) {

    const reqOpts = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST'
      })
    };


    return this.http.post(environment.serverRoot + '/todos', {todos: todoList}, reqOpts);
  }

  /**
   * Calls the server which will search idTodo and replace its content by todoData
   * @param idTodo The ID of the todo to edit
   * @param todoData The content of the todo to edit
   */
  editTodo(idTodo: string, todoData: Todo) {
    const reqOpts = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      })
    };


    return this.http.put(environment.serverRoot + '/todos/' + idTodo, {todo: todoData}, reqOpts);
  }

  /**
   * Calls the server which will delete the todo with the id idTodo
   * @param idTodo The id of the todo to delete
   */
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

  /**
   * Calls the server to perform a precheck of Spotify (if the clientID and clientSecret are present)
   * If not, return error
   * If token missing, returns the Spotify login url
   */
  checkSpotifyStatus() {
    return this.http.get(environment.serverRoot + '/spotify/precheck');
  }

  /**
   * Calls the server, which will call Spotify's API to regenerate a token
   * @param refreshToken The refresh token
   */
  refreshSpotifyToken(refreshToken: string) {
    return this.http.get(environment.serverRoot + '/spotify/refresh-token/' + refreshToken);
  }
  /**
   * Calls the server to retrieve Spotify's auth url
   */
  getSpotifyAuthUrl() {
    return this.http.get(environment.serverRoot + '/spotify/get-url');
  }

  getGmailAuthUrl() {
    const reqOpts = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT,DELETE'
      })
    };

    return this.http.get(environment.serverRoot + '/gmail/get-url', reqOpts);
  }

  getEmailList(limit: number, token: string, query: string = null) {

    const params = new URLSearchParams();

    params.append('max_results', limit.toString());
    const reqOpts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('gmailToken')
      })
    };

    if(token) {
      params.append('pageToken', token);
    }

    if(query) {
      params.append('q', query);
    }

    params.append("labelIds", "INBOX");

    return this.http.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages?` + params.toString(), reqOpts);
  }

  getIndividualEmailInfo(emailId: string) {
    const reqOpts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('gmailToken')
      })
    };


    return this.http.get("https://gmail.googleapis.com/gmail/v1/users/me/messages/" + emailId, reqOpts);

  }


  modifyEmail(id: string, form: object) {

    const reqOpts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('gmailToken')
      })
    };

    return this.http.post('https://gmail.googleapis.com/gmail/v1/users/me/messages/' + id + '/modify', form, reqOpts);
  }

  /**
   *
   * @param payload The emails to delete
   */
  deleteMultipleEmails(payload: object) {

    const reqOpts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('gmailToken')
      })
    };

    return this.http.post('https://gmail.googleapis.com/gmail/v1/users/me/messages/batchDelete', payload, reqOpts);
  }

  batchModifyEmails(payload: object) {
    const reqOpts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('gmailToken')
      })
    };

    return this.http.post('https://gmail.googleapis.com/gmail/v1/users/me/messages/batchModify', payload, reqOpts);
  }
}
