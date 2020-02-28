import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  private id: number;
  employee: Employee;
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.employeeService.getEmployee(this.id).subscribe((employee: Employee) => {
        this.employee = employee;
      },
        (err: string) => {
          console.log(err);
        });
    });
  }

  onViewNextEmployee() {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      const empCount = employees.length;
      this.id = this.id >= empCount ? (this.id + 1) % empCount : this.id + 1;
      this.router.navigate(['/employee', this.id]);
    });
  }

}
