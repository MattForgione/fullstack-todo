import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListIndexComponent } from './todo-list-index.component';

describe('TodoListIndexComponent', () => {
  let component: TodoListIndexComponent;
  let fixture: ComponentFixture<TodoListIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
