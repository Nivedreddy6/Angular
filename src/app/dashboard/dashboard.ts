import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { EmployeeService } from '../core/services/employee';
import { Employee } from '../core/models/employee.model';
import { AuthService } from '../core/services/auth';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  totalEmployees = 0;
  activeCount = 0;
  inactiveCount = 0;

  departmentCounts: { department: string; count: number }[] = [];
  pieColors = ['#3f51b5', '#009688', '#ff9800', '#9c27b0'];

  isDark = false;

  constructor(
    private employeeService: EmployeeService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.totalEmployees = employees.length;
      this.activeCount = employees.filter(e => e.active).length;
      this.inactiveCount = employees.filter(e => !e.active).length;

      const map: Record<string, number> = {};
      employees.forEach(e => {
        map[e.department] = (map[e.department] || 0) + 1;
      });

      this.departmentCounts = Object.entries(map).map(([department, count]) => ({
        department,
        count
      }));
    });
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-theme', this.isDark);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getPieStyle(): string {

  
  if (!this.departmentCounts.length) {
    return '#e0e0e0';
  }

  const total = this.departmentCounts.reduce((s, d) => s + d.count, 0);


  if (total === 0) {
    return '#e0e0e0';
  }

  let angle = 0;

  const gradient = this.departmentCounts.map((d, i) => {
    const start = angle;
    const slice = (d.count / total) * 360;
    angle += slice;

    const color = this.pieColors[i % this.pieColors.length];

    return `${color} ${start}deg ${angle}deg`;
  }).join(', ');

  return `conic-gradient(${gradient})`;
}
}