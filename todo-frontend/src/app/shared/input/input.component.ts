import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() labelText!: string;
  @Input() inputType = 'text';
  @Input() placeholder = '';
  @Input() textArea = false;

  constructor() {}

  getError(control: FormControl) {
    const extractError = function (errorType: string) {
      return control.hasError(errorType);
    };

    let error = '';
    if (extractError('required')) {
      error = 'You must enter a value';
    } else if (extractError('email')) {
      error = 'Not a valid email';
    } else if (extractError('minlength')) {
      const required = control.getError('minlength').requiredLength;
      error = `Password must be at least ${required} characters`;
    }

    return error;
  }
}
