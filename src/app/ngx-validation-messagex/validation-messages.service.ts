import { Injectable } from '@angular/core';
import { PropertyError } from '../validation-messages'
import { ValidationErrors, FormGroup } from '@angular/forms';

interface HasErrors {
  errors: ValidationErrors | null;
}

@Injectable()
export class ValidationMessagesService {

  constructor() { }

  of(name: string, parent: FormGroup): string {
    const control = parent.get(name)
    
    if(control.valid) return ''
    const errorKey = Object.keys(control.errors)[0]
    const error = Object.assign({}, { key: errorKey }, control.getError(errorKey))
    
    return new PropertyError(name, error).message;
  }
}