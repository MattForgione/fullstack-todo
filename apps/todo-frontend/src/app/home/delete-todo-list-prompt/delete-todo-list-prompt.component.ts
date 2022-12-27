import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DialogComponent,
  DialogData,
} from '../../shared/dialog/dialog.component';
import { TodoListsActions } from '../../../store/todo-lists/todo-lists.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-delete-todo-list-prompt',
  templateUrl: './delete-todo-list-prompt.component.html',
  styleUrls: ['./delete-todo-list-prompt.component.scss'],
})
export class DeleteTodoListPromptComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onDeleteClick() {
    this.store.dispatch(
      TodoListsActions.deleteTodoList({ todoListId: this.data.todoListId })
    );

    this.dialogRef.close();
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
