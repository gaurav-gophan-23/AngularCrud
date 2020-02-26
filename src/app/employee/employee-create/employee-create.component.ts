import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
  @ViewChild('frmEmployee', { static: true }) public frmEmployee;
  panelText: string;
  frmEmp: FormGroup;
  gender = 'female';
  isActive = true;
  department = '3';
  employee: Employee;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' }
  ];

  datePickerConfig: Partial<BsDatepickerConfig>;
  dateOfBirth: string;
  photoPath: string;
  previewPhoto = false;

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      const id = +param.get('id');
      if (id === 0) {
        this.employee = {
          id: null,
          name: null,
          gender: null,
          contactPreference: null,
          email: null,
          dateOfBirth: null,
          department: '-1',
          isActive: null,
          photoPath: null,
          password: null,
          confirmPassword: null
        };
        this.frmEmployee.reset();
        this.panelText = 'Create Employee';
      } else {
        this.employee = Object.assign({}, this.employeeService.getEmployee(id));
        this.panelText = 'Edit Employee';
      }
    });
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        // minDate:new Date(2019,0,1),
        // maxDate:new Date(2019,11,31),
        // dateInputFormat:"DD/MM/YYYY"
      });

    this.frmEmp = new FormGroup({
      firstName: new FormControl('', Validators.required)
    });
  }

  onEmpSubmit(): void {
    this.employeeService.saveEmployee(Object.assign({}, this.employee));
    this.frmEmployee.reset();
    this.router.navigate(['list']);
  }

  toggelPhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  freEmpSubmit(frmEmp: FormGroup) {
    console.log(frmEmp);
  }

}
