import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[appSelectValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: SelectRequiredValidatorDirective,
        multi: true
    }]
})
export class SelectRequiredValidatorDirective implements Validator {
    @Input('appSelectValidator') defaultValue: string;
    validate(control: AbstractControl): { [key: string]: boolean } | null {
        return control.value === this.defaultValue ? { defaultSelected: true } : null;
    }
}
