import { TestBed, inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidationMessagesService } from './validation-messages.service';

describe('ValidationMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationMessagesService, FormBuilder]
    });
  });

  it('should be created', inject([ValidationMessagesService], (service: ValidationMessagesService) => {
    expect(service).toBeTruthy();
  }));


  it('of', inject([ValidationMessagesService, FormBuilder],
    (validationMessage: ValidationMessagesService, fb: FormBuilder) => {
      const personForm = fb.group({
        name: ['', [Validators.required, Validators.minLength(10)]]
      });

      expect(validationMessage.of('name', personForm))
        .toBe('The name field is required.');

      personForm.get('name').setValue(':P')
      expect(validationMessage.of('name', personForm))
        .toBe('The name must be at least 10 characters long, but was 2.');

      personForm.get('name').setValue('a valid name')
      expect(validationMessage.of('name', personForm)).toBe('');
    }));
});
