import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  selected: number | undefined;
  nums: number[] = [];

  constructor() {
    for (let i = 1; i < 101; i++) {
      this.nums.push(i);
    }
  }

  onSelect(i: number) {
    this.selected = i;
  }
}
