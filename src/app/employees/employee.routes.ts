import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';

import { EmployeeListComponent } from './employee-list/employee-list';
import { EmployeeEditComponent } from './employee-edit/employee-edit';

export const EMPLOYEE_ROUTES: Routes = [

  
  {
    path: '',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'add',
    component: EmployeeEditComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },

  
  {
    path: ':id/edit',
    component: EmployeeEditComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  }
];