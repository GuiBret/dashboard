import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { TodoListService } from '../services/todo-list.service';

import { TodoDataResolverService } from './todo-data-resolver.service';

describe('TodoDataResolverService', () => {

  const getTodoListSpy = jasmine.createSpy().and.returnValue(new Observable());
  const getTodoSpy = jasmine.createSpy();

  let service: TodoDataResolverService;
  let httpServiceStub: Partial<HttpService>;
  let matSnackbarStub: Partial<MatSnackBar>;
  let todoSvcStub: Partial<TodoListService>;

  httpServiceStub = {
    getTodoList: getTodoListSpy
  };

  todoSvcStub = {
    getTodo: getTodoSpy
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {useValue: httpServiceStub, provide: HttpService},
        {useValue: matSnackbarStub, provide: MatSnackBar},
        {useValue: {snapshot: {paramMap: convertToParamMap({id: null})}}, provide: ActivatedRoute}
      ]
    });
    service = TestBed.inject(TodoDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should have return an empty Todo object since todoId is not provided', () => {
    const route = TestBed.inject(ActivatedRoute);
    getTodoListSpy.calls.reset();
    getTodoSpy.calls.reset();

    service.resolve(route.snapshot, null);

    expect(getTodoSpy).not.toHaveBeenCalled();
    expect(getTodoListSpy).not.toHaveBeenCalled();
  });

  // it('should return the required todo since there are some in the list', () => {
  //   TestBed.overrideProvider(ActivatedRoute, {
  //     useValue: {snapshot: {paramMap: convertToParamMap({id: 'abcd'})}}
  //   });

  //   getTodoSpy.calls.reset();
  //   getTodoListSpy.calls.reset();

  //   // tslint:disable-next-line: no-string-literal
  //   todoSvcStub['todos'] = [
  //     {
  //       _id: 'abc',
  //       title: 'TItle 1',
  //       content: 'My content',
  //       status: false,
  //       __v: 1
  //     },
  //     {
  //       _id: 'abcd',
  //       title: 'TItle 2',
  //       content: 'My content 2',
  //       status: false,
  //       __v: 1
  //     },
  //   ];
  //   const route = TestBed.inject(ActivatedRoute);

  //   console.log(route.snapshot.paramMap.get('id'));
  //   service.resolve(route.snapshot, null);

  //   expect(getTodoListSpy).not.toHaveBeenCalled();
  //   expect(getTodoSpy).toHaveBeenCalledWith('abcd');


  //   // todoSvcStub[''];

  // });
});
