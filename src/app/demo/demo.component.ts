import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ValidationMessagesService } from '../ngx-validation-messagex'

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  personForm: FormGroup;
  errors: any;

  constructor(public validationMessages: ValidationMessagesService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm()
  }

  private createForm() {
    this.personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]]
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

  get onDisplay() {
    return this.trigger(this.pair.control)
  }

  get message() {
    return this.validationMessages.ofControl(this.pair.key, this.pair.control)
  }
}

