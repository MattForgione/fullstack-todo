import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoListsActions } from '../../store/actions/todoLists.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(TodoListsActions.onHomePageEntered());
  }
}
