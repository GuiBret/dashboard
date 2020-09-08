import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';
import { TodoListService } from 'src/app/services/todo-list.service';
import { Todo } from 'src/app/models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {


  todoListChanged$: Subscription;
  todos: Array<Todo> = [];
  themes: Array<string> = [];
  displayedColumns = ['theme', 'title', 'content', 'controls'];


  constructor(private titleService: Title,
              private todoSvc: TodoListService,
              private _snackbar: MatSnackBar) { }

  ngOnInit(): void {

    this.titleService.setTitle('TodoList - List');

    // TODO : à enlever
    this.todoSvc.fetchTodosAndThemes().subscribe((response: {todos: Array<Todo>, themes: Array<string> }) => {

      this.todos = response.todos;
      this.themes = response.themes;
    });

    this.todoListChanged$ = this.todoSvc.todoListChanged.subscribe((newTodoList: Array<Todo>) => {

      this.todos = newTodoList;
    })
  }

  ngOnDestroy() {
    this.todoListChanged$.unsubscribe();
  }

  saveTodoList() {
    this.todoSvc.saveTodoList().subscribe((response: any) => {
      if(response.status === 'OK') {
        this._snackbar.open('Todo List saved succesfully.', '', {
          duration: 2000
        });
      } else {

      }
    });
  }

}
