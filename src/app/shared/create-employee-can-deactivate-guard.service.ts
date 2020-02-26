import { CanDeactivate } from '@angular/router';
import { EmployeeCreateComponent } from '../employee/employee-create/employee-create.component';

export class CreateEmployeeCanDeactivateGuardService implements CanDeactivate<EmployeeCreateComponent> {
    canDeactivate(component: EmployeeCreateComponent): boolean {
        if (component.frmEmployee.dirty) {
            return confirm('Are you sure you want to discard your changes?');
        }
        return true;
    }
}
