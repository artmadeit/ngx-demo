import { validationRuleMessages } from './rule-message'
import { displayName } from './display-name'
import { ValidationErrors } from './validation-errors'

export class PropertyError {
    constructor(public readonly propertyName: string, private error: ValidationErrors) {
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