import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { CreateEmployeeCanDeactivateGuardService } from './shared/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeListResolverService } from './employee/employee-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmployeeDetailsGuardService } from './employee/employee-details-guard.service';


const routes: Routes = [
  { path: 'list', component: EmployeeListComponent, resolve: { employeeList: EmployeeListResolverService } },
  { path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeDetailsGuardService] },
  { path: 'edit/:id', component: EmployeeCreateComponent, canDeactivate: [CreateEmployeeCanDeactivateGuardService] },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'notfound', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
