import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employee } from '../models/employee';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[] | string> {
    constructor(private employeeService: EmployeeService) {

    }
    resolve(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<Employee[] | string> {
        return this.employeeService.getEmployees()
            .pipe(
                catchError((error: string) => of(error))
            );
    }
}
