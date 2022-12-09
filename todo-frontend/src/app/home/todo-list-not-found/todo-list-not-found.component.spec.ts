import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListNotFoundComponent } from './todo-list-not-found.component';

describe('TodoListNotFoundComponent', () => {
  let component: TodoListNotFoundComponent;
  let fixture: ComponentFixture<TodoListNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
