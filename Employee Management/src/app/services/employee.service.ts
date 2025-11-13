import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Employee, EmployeeCreateRequest } from '../models/employee.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Azure API URLs
  private apiBaseUrl = '';
  
  private corsProxy = '';
  private apiUrl = this.corsProxy + this.apiBaseUrl;
  
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  public employees$ = this.employeesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    
    this.http.get<Employee[]>(this.apiUrl)
      .pipe(
        tap(employees => {
          this.employeesSubject.next(employees);
          this.loadingSubject.next(false);
        }),
        catchError(error => {
          console.error('Error loading employees:', error);
          this.errorSubject.next('Failed to load employees');
          this.loadingSubject.next(false);
          return of([]);
        })
      )
      .subscribe();
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: EmployeeCreateRequest): Observable<Employee> {
    this.loadingSubject.next(true);
    return this.http.post<Employee>(this.apiUrl, employee)
      .pipe(
        tap(() => this.loadEmployees()),
        catchError(error => {
          console.error('Error creating employee:', error);
          this.errorSubject.next('Failed to create employee');
          this.loadingSubject.next(false);
          throw error;
        })
      );
  }

  updateEmployee(id: number, employee: Partial<Employee>): Observable<Employee> {
    this.loadingSubject.next(true);
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee)
      .pipe(
        tap(() => this.loadEmployees()),
        catchError(error => {
          console.error('Error updating employee:', error);
          this.errorSubject.next('Failed to update employee');
          this.loadingSubject.next(false);
          throw error;
        })
      );
  }

  deleteEmployee(id: number): Observable<void> {
    this.loadingSubject.next(true);
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => this.loadEmployees()),
        catchError(error => {
          console.error('Error deleting employee:', error);
          this.errorSubject.next('Failed to delete employee');
          this.loadingSubject.next(false);
          throw error;
        })
      );
  }

  setApiUrl(url: string): void {
    this.apiUrl = url;
    this.loadEmployees();
  }
}
