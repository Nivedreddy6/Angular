import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

const STORAGE_KEY = 'employees';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private employeesSubject: BehaviorSubject<Employee[]>;

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);

    const initialData: Employee[] = stored
      ? JSON.parse(stored)
      : [
          { id: 1, name: 'Ravi', email: 'ravi@test.com', department: 'IT', active: true },
          { id: 2, name: 'Sita', email: 'sita@test.com', department: 'HR', active: true },
          { id: 3, name: 'Arjun', email: 'arjun@test.com', department: 'Finance', active: false }
        ];

    this.employeesSubject = new BehaviorSubject<Employee[]>(initialData);
  }

  
  private persist(data: Employee[]): void {
    const cloned = [...data];              
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cloned));
    this.employeesSubject.next(cloned);
  }

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  
  getEmployeeById(id: number): Observable<Employee | undefined> {
    return this.employeesSubject.pipe(
      map(list => list.find(e => e.id === id))
    );
  }

  
  addEmployee(emp: Employee): void {
    const list = this.employeesSubject.value;

    const nextId =
      list.length === 0 ? 1 : Math.max(...list.map(e => e.id)) + 1;

    this.persist([
      ...list,
      { ...emp, id: nextId, active: true }
    ]);
  }

  updateEmployee(emp: Employee): void {
    const updated = this.employeesSubject.value.map(e =>
      e.id === emp.id ? { ...emp } : e
    );
    this.persist(updated);
  }


  softDeleteEmployee(id: number): void {
    const list = this.employeesSubject.value;

  
    const target = list.find(e => e.id === id);
    if (!target || !target.active) {
      return;
    }

    const updated = list.map(e =>
      e.id === id ? { ...e, active: false } : e
    );

    this.persist(updated);
  }
}