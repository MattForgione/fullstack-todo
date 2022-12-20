import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-create-todo-list-form',
  templateUrl: './create-todo-list-form.component.html',
  styleUrls: ['./create-todo-list-form.component.scss'],
})
export class CreateTodoListFormComponent {
  createTodoListForm = this.fb.group({
    title: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  async onSubmit() {
    const { title } = this.createTodoListForm.value as { title: string };
    console.log(title);
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
