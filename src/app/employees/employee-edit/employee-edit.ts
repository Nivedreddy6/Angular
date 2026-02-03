import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { EmployeeService } from '../../core/services/employee';
import { Employee } from '../../core/models/employee.model';

@Component({
  standalone: true,
  selector: 'app-employee-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './employee-edit.html',
  styleUrls: ['./employee-edit.css']
})
export class EmployeeEditComponent implements OnInit {

  form!: FormGroup;
  employeeId?: number;
  isEditMode = false;
  isSaving = false;

  departments = ['IT', 'HR', 'Finance', 'Sales'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!idParam;

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      active: [true]
    });

    if (this.isEditMode) {
      this.employeeId = Number(idParam);

      this.employeeService
        .getEmployeeById(this.employeeId)
        .subscribe(emp => {
          if (!emp) {
            this.router.navigate(['/employees']);
            return;
          }
          this.form.patchValue(emp);
        });
    }
  }

  save(): void {
    if (this.form.invalid || this.isSaving) return;

    this.isSaving = true;

    const employee: Employee = {
      id: this.isEditMode ? this.employeeId! : 0,
      ...this.form.value
    };

    if (this.isEditMode) {
      this.employeeService.updateEmployee(employee);
    } else {
      this.employeeService.addEmployee(employee);
    }

    this.router.navigate(['/employees']);
  }

  delete(): void {
    if (!this.isEditMode || !this.employeeId || this.isSaving) return;

    if (!confirm('Are you sure you want to deactivate this employee?')) return;

    this.isSaving = true;
    this.employeeService.softDeleteEmployee(this.employeeId);

    this.router.navigate(['/employees']);
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}