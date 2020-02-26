import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
    employees: Employee[] = [
        {
            id: 1,
            name: 'Mark',
            gender: 'Male',
            contactPreference: 'Email',
            email: 'mark@pragimtech.com',
            dateOfBirth: new Date('10/25/1988'),
            department: '3',
            isActive: true,
            photoPath: 'assets/images/mark.png'
        },
        {
            id: 2,
            name: 'Mary',
            gender: 'Female',
            contactPreference: 'Phone',
            phoneNumber: 2345978640,
            dateOfBirth: new Date('11/20/1979'),
            department: '2',
            isActive: true,
            photoPath: 'assets/images/mary.png'
        },
        {
            id: 3,
            name: 'John',
            gender: 'Male',
            contactPreference: 'Phone',
            phoneNumber: 5432978640,
            dateOfBirth: new Date('3/25/1976'),
            department: '3',
            isActive: false,
            photoPath: 'assets/images/john.png'
        }
    ];

    getEmployees(): Observable<Employee[]> {
        return of(this.employees).pipe(delay(2000));
    }

    getEmployee(id: number): Employee {
        return this.employees.find(x => x.id === id);
    }

    saveEmployee(employee: Employee) {
        if (employee.id === null) {

            const maxId = this.employees.reduce(function (e1, e2) {
                return (e1.id > e2.id) ? e1 : e2;
            }).id;
            employee.id = maxId;
            this.employees.push(employee);
        } else {
            const foundIndex = this.employees.findIndex(x => x.id === employee.id);
            this.employees[foundIndex] = employee;
        }
    }

    deleteEmployee(id: number) {
        const i = this.employees.findIndex(x => x.id === id);
        if (i !== -1) {
            this.employees.splice(i, 1);
        }
    }
}
