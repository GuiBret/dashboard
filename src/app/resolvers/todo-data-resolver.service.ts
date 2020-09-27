import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Todo } from '../models/todo';
import { TodoListService } from '../services/todo-list.service';
import { HttpService } from '../services/http.service';
import { map } from 'rxjs/operators';
/**
 * Resolver for a todo's data, used when entering todolist/:id/edit or todolist/add without context
 * if todolist/add :
 *    we create a new empty todo
 * if todolist/:id/edit :
 *    we check if we have some todo data in the service, if not, we'll call the server which will fetch the list and get what we need
 */
@Injectable({
  providedIn: 'root'
})


export class TodoDataResolverService implements Resolve<Todo> {

  /**
   *
   * @param todoSvc The todo service, used to check if there is some todo data in it
   * @param http The HTTP service, used to get the todo data if it is missing from the service
   */
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
