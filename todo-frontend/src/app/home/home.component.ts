import { Component } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Router } from '@angular/router';
import { UserTodoList } from '../../interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  selectedTodoList!: UserTodoList;
  todoLists!: UserTodoList[];

  constructor(
    private todoListService: TodoListService,
    private router: Router
  ) {
    this.todoListService.getUserTodoLists().subscribe(result => {
      this.todoLists = result;
    });
  }

  onSelect(todoList: UserTodoList) {
    this.selectedTodoList = todoList;
    this.router.navigateByUrl(`todo-list/${todoList.id}`);
  }
}
