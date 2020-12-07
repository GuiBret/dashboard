import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { Todo } from '../../models/todo';
import { TodoListService } from '../../services/todo-list.service';

import { TodoListComponent } from './todo-list.component';

const mockTodoList: Array<Todo> = [
  {
    _id: "a",
    title: "My title 1",
    content: "My content 1",
    status: false,
    __v: 1234
  },
  {
    _id: "b",
    title: "My title 1",
    content: "My content 1",
    status: false,
    __v: 1234
  },
  {
    _id: "c",
    title: "My title 1",
    content: "My content 1",
    status: false,
    __v: 1234
  },
  {
    _id: "d",
    title: "My title 1",
    content: "My content 1",
    status: false,
    __v: 1234
  },
];

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let httpClientStub: Partial<HttpClient>;
  let matSnackbarStub: Partial<MatSnackBar>;
  let todoSvcStub: Partial<TodoListService>;
  httpClientStub = {
    get: jasmine.createSpy().and.returnValue(new Observable()),
    post: jasmine.createSpy().and.returnValue(new Observable()),

  }

  matSnackbarStub = {
    open: jasmine.createSpy()
  }

  todoSvcStub = {
    saveTodoList: jasmine.createSpy().and.returnValue(new Observable((observer) => {
      observer.next({status: 'OK'});
    })),
    fetchTodosAndThemes: jasmine.createSpy(),
    todoListChanged: new Subject(),
    deleteTodo: jasmine.createSpy()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      providers: [
        {useValue: httpClientStub, provide: HttpClient},
        {useValue: matSnackbarStub, provide: MatSnackBar},
        { useValue: todoSvcStub, provide: TodoListService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Save todo list', () => {
    it('should call onTodoListSaved', () => {

      spyOn(component, 'onTodoListSaved');
      component.saveTodoList();
      expect(component.onTodoListSaved).toHaveBeenCalledWith({status: 'OK'});

    });

  });

  describe('On todolist saved', () => {
    it('should display a snackbar for 2 seconds', () => {
      component.onTodoListSaved({status: 'OK'});
      expect(matSnackbarStub.open).toHaveBeenCalledWith('Todo List saved succesfully.', '', {
        duration: 2000
      });
    });

    // TODO : develop that
    it('should display an error for 2 seconds', () => {
      component.onTodoListSaved({status: 'KO'});
    });
  });

  describe('Delete todo', () => {
    it('should have called deleteTodo with the provided todo ID', () => {
      component.deleteTodo("abc1234");

      expect(todoSvcStub.deleteTodo).toHaveBeenCalledWith("abc1234");
    })
  })
});
