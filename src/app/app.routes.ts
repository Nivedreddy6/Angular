import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login';
import { DashboardComponent } from './dashboard/dashboard';
import { EmployeeListComponent } from './employees/employee-list/employee-list';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'employees',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EmployeeListComponent },
      {
        path: 'add',
        component: EmployeeEditComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'edit/:id',
        component: EmployeeEditComponent,
        canActivate: [RoleGuard]
      }
    ]
  },

  // 🔥 ANY RANDOM URL → DASHBOARD
  { path: '**', redirectTo: 'dashboard' }
];