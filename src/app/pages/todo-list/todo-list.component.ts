import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  todoListChanged$: Subscription;
  todos: Array<any>;
  themes: Array<any>;
  constructor(private titleService: Title, private http: HttpService) { }

  ngOnInit(): void {

    this.titleService.setTitle('TodoList - List');

    this.todoListChanged$ = this.http.getTodoList().subscribe(() => {

    });
  }

  ngOnDestroy() {
    this.todoListChanged$.unsubscribe();
  }

}
