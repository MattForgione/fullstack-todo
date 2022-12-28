import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiModule } from '@fullstack-todo/shared-ui';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { todoListReducer } from '../store/todo-lists/todo-lists.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoListsEffects } from '../store/todo-lists/todo-lists.effects';
import { appReducer } from '../store/app/app.reducer';
import { authReducer } from '../store/auth/auth.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedUiModule,
    MatTabsModule,
    HttpClientModule,
    StoreModule.forRoot({
      todos: todoListReducer,
      app: appReducer,
      auth: authReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([TodoListsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
