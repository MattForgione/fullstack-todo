import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListResolverService } from './todo-list-resolver.service';
import { DashboardPlaceholderComponent } from './dashboard-placeholder/dashboard-placeholder.component';
import { TodoListNotFoundComponent } from './todo-list-not-found/todo-list-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardPlaceholderComponent,
      },
      {
        path: 'todo-list/:id',
        component: TodoListComponent,
        resolve: {
          todos: TodoListResolverService,
        },
      },
      {
        path: 'todo-list-not-found',
        component: TodoListNotFoundComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
