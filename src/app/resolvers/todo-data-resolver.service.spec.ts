import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TodoDataResolverService } from './todo-data-resolver.service';

describe('TodoDataResolverService', () => {
  let service: TodoDataResolverService;
  let httpClientStub: Partial<HttpClient>;
  let matSnackbarStub: Partial<MatSnackBar>;
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
});
