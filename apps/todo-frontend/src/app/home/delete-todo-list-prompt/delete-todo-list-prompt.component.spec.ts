import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTodoListPromptComponent } from './delete-todo-list-prompt.component';

describe('DeleteTodoListPromptComponent', () => {
  let component: DeleteTodoListPromptComponent;
  let fixture: ComponentFixture<DeleteTodoListPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTodoListPromptComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteTodoListPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
