import {
    Component,
    Input,
    ContentChild,
    TemplateRef
} from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms'
import { ValidationMessagesService } from '../../ngx-validation-messagex';

@Component({
    selector: 'display-error',
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.scss']
})
export class DisplayErrorComponent {

    @Input() control: FormControl;
    @Input() key: string;
    @ContentChild('templateError') templateError: TemplateRef<any>;
    constructor(public validationMessages: ValidationMessagesService) {

    }

    default = (control: AbstractControl) => control.invalid && (control.dirty || control.touched);

    get errorExists() {
        return this.default(this.control)
    }

    get message() {
        return this.validationMessages.ofControl(this.key, this.control)
    }
}
