import { Component } from '@angular/core';
import { UserTodoList } from '../../interfaces';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  selected: UserTodoList | undefined;
  todoLists!: UserTodoList[];

  constructor(private todoListService: TodoListService) {
    this.todoListService.getUserTodoLists().subscribe(result => {
      this.todoLists = result;
      console.log(this.todoLists);
    });
  }

  onSelect(todoList: UserTodoList) {
    this.selected = todoList;
    console.log(this.selected);
  }
}
