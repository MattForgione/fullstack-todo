import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
  validate(group: AbstractControl): ValidationErrors | null {
    const { password, passwordConfirm } = group.value;

    if (password === passwordConfirm) {
      return null;
    }

    return { responseError: 'Passwords must match' };
  }
}
