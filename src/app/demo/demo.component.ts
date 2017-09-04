import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationMessagesService } from '../ngx-validation-messagex'

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  personForm: FormGroup;

  constructor(public validationMessages: ValidationMessagesService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm()
  }

  private createForm() {
    this.personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]]
    });
  }

  get name() { return this.personForm.get('name'); }
  get email() { return this.personForm.get('email'); }
  get age() { return this.personForm.get('age'); }
}
