import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
    baseUrl: string = 'https://angular-demo-service.firebaseio.com/employees';
    itemDeleted: Subject<boolean> = new Subject<boolean>();

    constructor(private http: HttpClient) { }

    getEmployees(): Observable<any[]> {
        return this.http.get<{ a: Employee }[]>(this.baseUrl + ".json")
            .pipe(
                map((x) => {
                    const employees: Employee[] = [];
                    for (const a of Object.keys(x)) {
                        employees.push(
                            Object.assign(x[a], { id: a })
                        );
                    }
                    return employees;
                }),
                catchError(this.handleError));
        // return of(this.employees).pipe(delay(2000));
    }

    private handleError(httpError: HttpErrorResponse) {
        if (httpError.error instanceof ErrorEvent) {
            console.log('Client side Error ', httpError.error.message);
        } else {
            console.log('Server side Error ', httpError);
        }
        return throwError('There is an error');
    }

    getEmployee(id: string): Observable<Employee> {
        return this.http.get<Employee>(this.baseUrl + '/' + id + '.json')
            .pipe(
                map((x) => {
                    x.id = id;
                    return x;
                }),
                catchError(this.handleError));
        // return this.employees.find(x => x.id === id);
    }

    saveEmployee(employee: Employee): Observable<Employee | void> {
        if (employee.id === null) {

            // const maxId = this.employees.reduce(function (e1, e2) {
            //     return (e1.id > e2.id) ? e1 : e2;
            // }).id;
            // employee.id = maxId;
            // this.employees.push(employee);

            return this.http.post<Employee>(this.baseUrl + '.json', employee,
                { headers: new HttpHeaders({ 'content-type': 'application/json' }) })
                .pipe(catchError(this.handleError));
        } else {
            // const foundIndex = this.employees.findIndex(x => x.id === employee.id);
            // this.employees[foundIndex] = employee;

            return this.http.put<void>(this.baseUrl + '/' + employee.id + '.json', employee,
                { headers: new HttpHeaders({ 'content-type': 'application/json' }) })
                .pipe(catchError(this.handleError));
        }
    }

    deleteEmployee(id: string) {
        return this.http.delete(this.baseUrl + '/' + id + '.json')
            .pipe(catchError(this.handleError));
    }
}
