import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { TodoListService } from '../../services/todo-list.service';
import { Todo } from '../../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';


/**
 * The page containing the todo-list
 */
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {


  /**
   * Subscription linked to todoSvc.todoListChanged, passes the new todo list
   */
  todoListChanged$: Subscription;

  requestMade = false;

  /**
   * The current todo-list
   */
  todos: Array<Todo> = [];

  /**
   * The current themes (not used yet)
   */
  themes: Array<string> = [];

  /**
   * Used by ng-material, defines the columns which are displayed in the table
   */
  displayedColumns = ['theme', 'title', 'content', 'status', 'controls'];


  /**
   *
   * @param titleService The title service, used to define the title
   * @param todoSvc The TodoService, used to perform operations
   * @param _snackbar The snackbar
   */
  constructor(private titleService: Title,
              private todoSvc: TodoListService,
              private _snackbar: MatSnackBar) { }

  /**
   * On init, sets the title and fetches the todos
   */
  ngOnInit(): void {

    this.titleService.setTitle('TodoList - List');

    // TODO : à enlever
    this.todoSvc.fetchTodosAndThemes();

    // TODO: Handle error
    this.todoListChanged$ = this.todoSvc.todoListChanged.subscribe((newTodoList: Array<Todo>) => {

      this.requestMade = true;
      this.todos = newTodoList;

    })
  }

  /**
   * On destroy, cleanup function
   */
  ngOnDestroy() {
    this.todoListChanged$.unsubscribe();
    this.requestMade = false;
  }

  /**
   * Saves the todo-list, if OK, displays a snackbar
   */
  saveTodoList() {

    this.todoSvc.saveTodoList().subscribe(this.onTodoListSaved.bind(this));
  }

  onTodoListSaved(response: { status: string}) {
    if(response.status === 'OK') {
      this._snackbar.open('Todo List saved succesfully.', '', {
        duration: 2000
      });
    } else {

    }
  }

  /**
   * Deletes a todo with id idTodo
   * @param idTodo The todo's id to delete
   */
  deleteTodo(idTodo: string) {
    this.todoSvc.deleteTodo(idTodo);
  }

}
