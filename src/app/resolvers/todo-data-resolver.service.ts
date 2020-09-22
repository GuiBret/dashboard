import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Todo } from '../models/todo';
import { TodoListService } from '../services/todo-list.service';
import { HttpService } from '../services/http.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TodoDataResolverService implements Resolve<Todo> {

  constructor(private todoSvc: TodoListService, private http: HttpService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Todo | import("rxjs").Observable<Todo> | Promise<Todo> {
    const todoId = route.paramMap.get('id');

    if(!todoId) {
      return {_id: null, title: '', content: '', status: false, __v: 0};
    }
    if(this.todoSvc.todos.length !== 0) {

      return this.todoSvc.getTodo(todoId);
    } else {
      return this.http.getTodoList().pipe(map((data: Array<Todo>) => {
        let todo: Todo = data.find((currTodo) => currTodo._id === todoId);
        return todo;
      }));
    }
  }
}
