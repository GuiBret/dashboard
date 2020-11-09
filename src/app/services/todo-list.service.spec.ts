import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../models/todo';
import { HttpService } from './http.service';

import { TodoListService } from './todo-list.service';

describe('TodoListService', () => {
  let service: TodoListService;
  let httpServiceStub: Partial<HttpService>;
  let matSnackbarStub: Partial<MatSnackBar>;

  httpServiceStub = {
    saveTodoList: jasmine.createSpy()
  }
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
  ]

  matSnackbarStub = {
    open: jasmine.createSpy('snackbarOpen')
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {useValue: httpServiceStub, provide: HttpService},
        {useValue: matSnackbarStub, provide: MatSnackBar},
      ]
    });
    service = TestBed.inject(TodoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Display snackbar', () => {
    it('should display a snackbar for 2 seconds', () => {

      service.displaySnackbar('Random message');

      expect(matSnackbarStub.open).toHaveBeenCalledWith('Random message', null, {duration: 2000});
    })
  });

  describe('Save todo list', () => {
    it('should have called the http service with the provided todo list', () => {
      service['todos'] = mockTodoList;
      service.saveTodoList();

      expect(httpServiceStub.saveTodoList).toHaveBeenCalledWith(mockTodoList);
    })
  })


});
