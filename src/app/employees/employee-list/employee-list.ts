import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { EmployeeService } from '../../core/services/employee';
import { Employee } from '../../core/models/employee.model';
import { AuthService } from '../../core/services/auth';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'department', 'status'];
  isAdmin = false;

  constructor(
    private employeeService: EmployeeService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.auth.getRole() === 'admin'; 

    if (this.isAdmin) {
      this.displayedColumns.push('actions');
    }

    this.employeeService.getEmployees().subscribe(list => {
      this.employees = list;
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  addEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  editEmployee(emp: Employee): void {
    this.router.navigate(['/employees/edit', emp.id]);
  }

  deleteEmployee(emp: Employee): void {
    if (!emp.active) return;

    if (!confirm('Are you sure you want to deactivate this employee?')) return;

    this.employeeService.softDeleteEmployee(emp.id);
  }

  logout(): void {
    this.auth.logout();
  }
}