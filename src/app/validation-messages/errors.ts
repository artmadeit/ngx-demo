import { PropertyError } from './property-error'

// TODO: test it
export class Errors {
    constructor(...errors: PropertyError[]) {
        errors.forEach(x => {
            this[x.propertyName] = x
        });
    }
}