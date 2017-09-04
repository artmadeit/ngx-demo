import { validationRuleMessages } from './rule-message'
import { displayName } from './display-name'
import { ValidationError } from './validation-rule'

export class PropertyError {
    constructor(public readonly propertyName: string, private error: ValidationError) {
    }

    get message() {
        return validationRuleMessages
            .get(this.error)
            .message(this.error, this.displayName)
    }

    get displayName() {
        return displayName.of(this.propertyName)
    }
}

// TODO test
export class Errors {
    constructor(...errors: PropertyError[]) {
        errors.forEach(x => {
            this[x.propertyName] = x
        });
    }
}