import { FormGroup } from '@angular/forms'

export const isPasswordConfirmed = (formGroup: FormGroup) => {
    return formGroup.get('password').value === formGroup.get('passwordConfirm').value
        ? null : { 'mismatch': true };
}