import { TestBed } from '@angular/core/testing';

import { TodoListResolverService } from './todo-list-resolver.service';

describe('TodoListResolverService', () => {
  let service: TodoListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
