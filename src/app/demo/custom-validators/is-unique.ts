import { AbstractControl } from '@angular/forms'

export const isUnique = (control: AbstractControl) => {
    const existingAliases = [
        'sponge bob',
        'patrick star',
        'squidward tentacles',
        'sandy cheeks',
        'mr. krabs',
        'gary'
    ]

    return existingAliases.map(x => x.toUpperCase()).includes((control.value as string).toUpperCase())
        ? { 'isUnique': { value: control.value } } : null;
}