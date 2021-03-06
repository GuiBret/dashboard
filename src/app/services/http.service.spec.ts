import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../TodoList/models/todo';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpClientStub: Partial<HttpClient>;

  const mockTodoList: Array<Todo> = [
    {
      _id: 'a',
      title: 'My title 1',
      content: 'My content 1',
      status: false,
      __v: 1234
    },
    {
      _id: 'b',
      title: 'My title 1',
      content: 'My content 1',
      status: false,
      __v: 1234
    },
    {
      _id: 'c',
      title: 'My title 1',
      content: 'My content 1',
      status: false,
      __v: 1234
    },
    {
      _id: 'd',
      title: 'My title 1',
      content: 'My content 1',
      status: false,
      __v: 1234
    },
  ];

  const getSpy = jasmine.createSpy().and.returnValue(new Observable());
  const postSpy = jasmine.createSpy().and.returnValue(new Observable());
  const putSpy = jasmine.createSpy().and.returnValue(new Observable());
  const deleteSpy = jasmine.createSpy().and.returnValue(new Observable());
  httpClientStub = {
    get: getSpy,
    post: postSpy,
    put: putSpy,
    delete: deleteSpy,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {useValue: httpClientStub, provide: HttpClient}
      ]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Refresh spotify token', () => {

    it('should have called the server to the correct address with the token', () => {
      getSpy.calls.reset();
      service.refreshSpotifyToken('mycustomtoken');

      expect(httpClientStub.get).toHaveBeenCalledWith(environment.serverRoot + '/spotify/refresh-token/mycustomtoken');
    });
  });

  describe('Get todo list', () => {
    it('should have called the server to retrieve the current todolist', () => {
      getSpy.calls.reset();
      service.getTodoList();

      expect(httpClientStub.get).toHaveBeenCalledWith(environment.serverRoot + '/todos', jasmine.any(Object));


    });
  });

  describe('Save todo list', () => {
    it('should have sent a POST request to the server', () => {
      postSpy.calls.reset();
      service.saveTodoList(mockTodoList);

      expect(httpClientStub.post).toHaveBeenCalledWith(environment.serverRoot + '/todos', {todos: mockTodoList}, jasmine.any(Object));
    });
  });

  describe('Edit todo', () => {
    it('should have sent a PUT request to the server to update a todo', () => {
      putSpy.calls.reset();
      service.editTodo('1', mockTodoList[0]);

      expect(httpClientStub.put).toHaveBeenCalledWith(environment.serverRoot + '/todos/1', {todo: mockTodoList[0]}, jasmine.any(Object));
    });
  });

  describe('Delete todo element', () => {
    it('should have sent a DELETE request to the server to delete a todo', () => {
      service.deleteTodoElement('1');

      expect(httpClientStub.delete).toHaveBeenCalledWith(environment.serverRoot + '/todos/1', jasmine.any(Object));
    });
  });

  describe('Get email list', () => {
    it('should make a call with all params', () => {

      getSpy.calls.reset();
      localStorage.setItem('gmailToken', 'mytoken');

      service.getEmailList(50, 'abcdef', 'myquery');

      expect(httpClientStub.get).toHaveBeenCalledWith('https://gmail.googleapis.com/gmail/v1/users/me/messages?max_results=50&pageToken=abcdef&q=myquery&labelIds=INBOX', jasmine.any(Object));

    });

    it('should ignore the query since it is missing', () => {
      getSpy.calls.reset();
      localStorage.setItem('gmailToken', 'mytoken');

      service.getEmailList(50, 'abcdef');

      expect(httpClientStub.get).toHaveBeenCalledWith('https://gmail.googleapis.com/gmail/v1/users/me/messages?max_results=50&pageToken=abcdef&labelIds=INBOX', jasmine.any(Object));
    });

    it('should ignore the token since it is missing', () => {
      getSpy.calls.reset();
      localStorage.setItem('gmailToken', 'mytoken');

      service.getEmailList(50, null, 'myquery');

      expect(httpClientStub.get).toHaveBeenCalledWith('https://gmail.googleapis.com/gmail/v1/users/me/messages?max_results=50&q=myquery&labelIds=INBOX', jasmine.any(Object));
    });
  });

  describe('Batch modify emails', () => {
    it('should make a POST call with the payload', () => {

      postSpy.calls.reset();
      const mockPayload = {
        ids: ['abc', 'def', 'ghi']
      };

      service.batchModifyEmails(mockPayload);

      expect(postSpy).toHaveBeenCalledWith('https://gmail.googleapis.com/gmail/v1/users/me/messages/batchModify', mockPayload, jasmine.any(Object));
    });
  });
});
