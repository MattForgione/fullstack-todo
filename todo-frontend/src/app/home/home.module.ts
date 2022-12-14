import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DashboardPlaceholderComponent } from './dashboard-placeholder/dashboard-placeholder.component';
import { TodoListNotFoundComponent } from './todo-list-not-found/todo-list-not-found.component';
import { TodoListIndexComponent } from './todo-list-index/todo-list-index.component';

@NgModule({
  declarations: [
    HomeComponent,
    NotFoundComponent,
    TodoListComponent,
    DashboardPlaceholderComponent,
    TodoListNotFoundComponent,
    TodoListIndexComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
  ],
})
export class HomeModule {}
