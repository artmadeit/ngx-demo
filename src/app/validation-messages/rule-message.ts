import { ValidationRule, ValidationError } from './validation-rule'

interface GetValidationMessage {
    (error: ValidationError, displayName: string): string;
}

export class ValidationRuleMessage {
    constructor(public readonly key: string,
        private getValidationMessage: GetValidationMessage ) {
    }

    message(error: ValidationError, displayName: string): string {
        return this.getValidationMessage(error, displayName)
    }
}

class ValidationRuleMessages {
    private data = [
        new ValidationRuleMessage('required',
            (error, displayName) => `The ${displayName} field is required.`),
        new ValidationRuleMessage('minlength',
            (error, displayName) => `The ${displayName} must be at least ${error.requiredLength} characters long, but was ${error.actualLength}.`),
        new ValidationRuleMessage('maxlength',
            (error, displayName) => `The ${displayName} cannot be more than ${error.requiredLength} characters long, but was ${error.actualLength}.`),
        new ValidationRuleMessage('pattern',
            (error, displayName) => `The ${displayName} format is invalid.`),
        new ValidationRuleMessage('min',
            (error, displayName) => `The ${displayName} must be at least ${error.min}, but was ${error.actual}.`),
        new ValidationRuleMessage('max',
            (error, displayName) => `The ${displayName} cannot be more than ${error.max}, but was ${error.actual}.`),
        new ValidationRuleMessage('email',
            (error, displayName) => `The ${displayName} must be a valid email address.`)
    ]

    private defaultValidationRuleMessage = new ValidationRuleMessage(
        'default', (error, displayName) => `The ${displayName} field is invalid.`)

    get(validationRule: ValidationRule) {
        return this.data.find(x => x.key === validationRule.key) || this.defaultValidationRuleMessage
    }

    add(validationRuleMessage: ValidationRuleMessage) {
        this.data.push(validationRuleMessage)
    }
}

export const validationRuleMessages = new ValidationRuleMessages()
