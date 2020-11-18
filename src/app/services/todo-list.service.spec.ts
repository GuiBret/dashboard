import { HttpClient } from '@angular/common/http';
import { componentFactoryName } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { Todo } from '../models/todo';
import { HttpService } from './http.service';

import { TodoListService } from './todo-list.service';

describe('TodoListService', () => {
  let service: TodoListService;
  let httpServiceStub: Partial<HttpService>;
  let matSnackbarStub: Partial<MatSnackBar>;

  httpServiceStub = {
    editTodo: jasmine.createSpy(),
    saveTodoList: jasmine.createSpy(),
    getTodoList: jasmine.createSpy().and.returnValue(new Observable()),
    deleteTodoElement: jasmine.createSpy().and.returnValue(new Observable()),
    addNewTodo: jasmine.createSpy()
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
  ];

  const mockTodoList2: Array<Todo> = [
    {
      _id: "e",
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
    }
  ];

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
  });

  describe('Get todo', () => {
    it('should return a valid todo since it exists', () => {
      service['todos'] = mockTodoList;
      const todoReturned = service.getTodo("a");

      expect(todoReturned.title).toEqual('My title 1');
    });

    it('should return undefined since we found no existing todo', () => {
      const todoReturned = service.getTodo("e");

      expect(todoReturned).toEqual(undefined);
    })
  });

  describe('Fetch todo list', () => {
    it('should call http.getTodoList', () => {

      service.fetchTodoList();
      expect(httpServiceStub.getTodoList).toHaveBeenCalled();
    });
  })

  describe('Edit todo', () => {
    it('should call the httpService with correct parameters', () => {
      const todoToEdit = mockTodoList[0];
    const idTodoToEdit = todoToEdit._id;

    service.editTodo(todoToEdit);

    expect(httpServiceStub.editTodo).toHaveBeenCalledWith(idTodoToEdit, todoToEdit);

    });

  });

  describe('On todolist fetched', () => {
    it('should have called todoListChanged.next since the response was valid', () => {
      service['todoListChanged'] = new Subject();
      spyOn(service.todoListChanged, 'next');
      service.onTodoListFetched({status: 'OK', todos: mockTodoList});

      expect(service['todoListChanged'].next).toHaveBeenCalledWith(mockTodoList);
    });

    it('should not have done anything since the response was not valid', () => {
      service['todoListChanged'] = new Subject();
        spyOn(service.todoListChanged, 'next');
        service.onTodoListFetched({status: 'KO'});

        expect(service['todoListChanged'].next).not.toHaveBeenCalled();
    });
  });

  describe('Delete todo', () => {
    it('should have called deleteTodoElement', () => {
      service.deleteTodo('a');

      expect(httpServiceStub.deleteTodoElement).toHaveBeenCalledWith('a');
    });
  });

  describe('On todo element deleted', () => {
    it('should have set the new list and displayed a success message since the response is valid', () => {

      service['todoListChanged'] = new Subject();
      spyOn(service.todoListChanged, 'next');


      service['todos'] = mockTodoList;
      spyOn(service, 'displaySnackbar');

      service.onTodoElementDeleted({status: 'OK', newList: mockTodoList2});

      expect(service.todos).toEqual(mockTodoList2);
      expect(service.todoListChanged.next).toHaveBeenCalledWith(mockTodoList2);
      expect(service.displaySnackbar).toHaveBeenCalledWith('Todo succesfully deleted');
    });

    it('should have displayed an error message since the response is not valid', () => {
      service['todoListChanged'] = new Subject();
      spyOn(service.todoListChanged, 'next');


      service['todos'] = mockTodoList;
      spyOn(service, 'displaySnackbar');

      service.onTodoElementDeleted({status: 'KO'});

      expect(service.todos).toEqual(mockTodoList);
      expect(service.todoListChanged.next).not.toHaveBeenCalled();
      expect(service.displaySnackbar).toHaveBeenCalledWith('Todo not found');
    });
  });

  describe('Add todo data', () => {
    it('should have called httpService.addNewTodo with the provided data', () => {
      service.addTodo(mockTodoList[0]);

      expect(httpServiceStub.addNewTodo).toHaveBeenCalledWith(mockTodoList[0]);
    })
  });





});
