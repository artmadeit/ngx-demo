import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ValidationMessagesService } from '../ngx-validation-messagex'
import { isUnique } from './custom-validators/is-unique'

import {
  ValidationRuleMessage,
  validationRuleMessages,
  displayName
} from '../validation-messages'

const customValidationRuleMessage = new ValidationRuleMessage('isUnique',
  (error, displayName) => `Sorry your ${displayName} cannot be ${error.value}, it's already taken :(`
)
validationRuleMessages.add(customValidationRuleMessage)

// Custom display name
displayName.for('email', 'E-mail Address')


const passwordMatchValidator = (g: FormGroup) => {
  return g.get('password').value === g.get('passwordConfirm').value
    ? null : { 'mismatch': true };
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  personForm: FormGroup;
  registerUserForm: FormGroup;
  errors: any;

  constructor(public validationMessages: ValidationMessagesService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm()
  }

  private createForm() {
    this.personForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      alias: ['', [Validators.required, isUnique]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]]
    });

    this.registerUserForm = this.fb.group({
      username: ['', Validators.required],
      confirmPasswordGroup: this.fb.group({
        password: ['', Validators.minLength(6)],
        passwordConfirm: ['', Validators.minLength(6)]
      }, { validator: passwordMatchValidator })
    });

    this.errors = this.buildErrorMessages(this.personForm)
  }

  default = (control: AbstractControl) => control.invalid && (control.dirty || control.touched)

  buildErrorMessages(form: FormGroup, trigger = this.default) {
    const subControls = this.getSubControls(form)
    return subControls.reduce((errors, subControl) => {
      errors[subControl.key] = new ValidationError(subControl, trigger, this.validationMessages)
      return errors;
    }, {});
  }

  getSubControls(form: FormGroup) {
    return Object.keys(form.controls).filter(key => form.controls[key] instanceof FormControl)
      .map(key => ({ key, control: form.controls[key] }))
  }
}

class ValidationError {

  constructor(private pair, private trigger, private validationMessages) {
  }

  get exist() {
    return this.trigger(this.pair.control)
  }

  get message() {
    return this.validationMessages.ofControl(this.pair.key, this.pair.control)
  }
}

