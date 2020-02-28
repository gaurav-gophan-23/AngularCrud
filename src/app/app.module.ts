import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive';
import { EmployeeService } from './employee/employee.service';
import { DisplayEmployeeComponent } from './employee/display-employee/display-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './shared/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeFilterPipe } from './employee/employee-filter.pipe';
import { EmployeeListResolverService } from './employee/employee-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeDetailsGuardService } from './employee/employee-details-guard.service';
import { AccordionComponent } from './shared/accordion/accordion.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeCreateComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService, EmployeeListResolverService, EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
