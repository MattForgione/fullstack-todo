import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() form!: FormGroup;
  @Input() buttonDisabled?: boolean;
  @Input() title?: string;
  @Input() buttonText = 'Go!';
  @Input() autocomplete?: string;
  @Input() login? = false;
  @Input() isDialog = false;
  @Output() submitEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  constructor() {}

  submitted() {
    this.submitEvent.emit();
  }

  onCancel() {
    this.cancelEvent.emit();
  }
}
