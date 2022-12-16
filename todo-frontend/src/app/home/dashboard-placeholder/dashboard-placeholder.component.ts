import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoListsActions } from '../../../store/actions/todoLists.actions';

@Component({
  selector: 'app-dashboard-placeholder',
  templateUrl: './dashboard-placeholder.component.html',
  styleUrls: ['./dashboard-placeholder.component.scss'],
})
export class DashboardPlaceholderComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(TodoListsActions.resetCurrentlySelected());
  }
}
