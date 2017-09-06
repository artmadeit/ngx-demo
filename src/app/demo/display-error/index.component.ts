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
    @Input() when: Function = (control: AbstractControl) => control.invalid && (control.dirty || control.touched);
    @ContentChild('templateError') templateError: TemplateRef<any>;
    constructor(public validationMessages: ValidationMessagesService) {
    }


    get errorExists() {
        return this.when(this.control)
    }
    get message() {
        return this.validationMessages.ofControl(this.key, this.control)
    }
}
