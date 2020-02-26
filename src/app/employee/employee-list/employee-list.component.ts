import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  searchTerm: string;
  constructor(private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('EmployeeListComponent');
    this.route.queryParamMap.subscribe(x => {
      if (x.has('searchTerm')) {
        this.searchTerm = x.get('searchTerm');
      }
      this.employees = this.route.snapshot.data['employeeList'];
      // this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      //   this.employees = employees;
      // });
    });
  }

  // onEmployeeClick(id: number) {
  //   this.router.navigate(['/employee', id], { queryParams: { searchTerm: this.searchTerm } });
  // }

}
