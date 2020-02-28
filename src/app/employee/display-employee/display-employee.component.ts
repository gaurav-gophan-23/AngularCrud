import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.scss']
})
export class DisplayEmployeeComponent implements OnInit {
  private _employee: Employee;
  public selectedEmployee: string;
  @Input() searchTerm: string;

  @Input()
  set employee(value: Employee) {
    this._employee = value;
  }
  get employee(): Employee {
    return this._employee;
  }
  constructor(private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.selectedEmployee = this.route.snapshot.paramMap.get('id');
  }

  getEmployeeNameAndGender(): string {
    return this.employee.name + ' ' + this.employee.gender;
  }

  onViewEmployee() {
    this.router.navigate(['employee', this.employee.id], { queryParams: { searchTerm: this.searchTerm } });
  }

  onEditEmployee() {
    this.router.navigate(['edit', this.employee.id]);
  }

  onDeleteEmployee() {
    if (confirm('Are you sure you want to delete employee with name ' + this.employee.name + '?')) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe((res) => {
        this.employeeService.itemDeleted.next(true);
        this.router.navigateByUrl('/list');
      },
        (err: string) => {
          console.log(err);
        });
      // return true;
    } else {
      // return false;
    }
  }

}
