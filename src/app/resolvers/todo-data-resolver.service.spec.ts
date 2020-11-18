import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';

import { TodoDataResolverService } from './todo-data-resolver.service';

describe('TodoDataResolverService', () => {
  let service: TodoDataResolverService;
  let httpClientStub: Partial<HttpClient>;
  let matSnackbarStub: Partial<MatSnackBar>;
  let actRouteStub: Partial<ActivatedRoute>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {useValue: httpClientStub, provide: HttpClient},
        {useValue: matSnackbarStub, provide: MatSnackBar},
      ]
    });
    service = TestBed.inject(TodoDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // it('should have return an empty Todo object since todoId is not provided', () => {
  //   let route: Partial<ActivatedRouteSnapshot = {
  //     paramMap: of(convertToParamMap({
  //       id: null
  //     }))
  //   };

  //   service.resolve(route, null);
  // });
});
