import { Injectable } from '@angular/core';
import { PropertyError } from '../validation-messages'
import { ValidationErrors, FormGroup, AbstractControl } from '@angular/forms';

interface HasErrors {
  errors: ValidationErrors | null;
}

@Injectable()
export class ValidationMessagesService {

  constructor() { }

  of(name: string, parent: FormGroup): string {
    const control = parent.get(name)

    return this.ofControl(name, control)
  }

  ofControl(name: string, control: AbstractControl) {
    if (control.valid) return ''
    const errorKey = Object.keys(control.errors)[0]
    const error = Object.assign({}, { key: errorKey }, control.getError(errorKey))

    return new PropertyError(name, error).message;
  }
}