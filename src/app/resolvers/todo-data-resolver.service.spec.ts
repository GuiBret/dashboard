import { TestBed } from '@angular/core/testing';

import { TodoDataResolverService } from './todo-data-resolver.service';

describe('TodoDataResolverService', () => {
  let service: TodoDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
