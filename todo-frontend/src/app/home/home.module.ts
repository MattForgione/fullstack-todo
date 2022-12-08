import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [HomeComponent, NotFoundComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
