import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { EmployeeService } from '../../core/services/employee';
import { Employee } from '../../core/models/employee.model';
import { AuthService, Role } from '../../core/services/auth';

@Component({
  standalone: true,
  selector: 'app-employee-details',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './employee-details.html',
  styleUrls: ['./employee-details.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee?: Employee;
  role: Role | null = null; 

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole(); 

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeService.getEmployeeById(id).subscribe(emp => {
      this.employee = emp;
    });
  }

  isAdmin(): boolean {
    return this.role === 'admin'; 
  }
}