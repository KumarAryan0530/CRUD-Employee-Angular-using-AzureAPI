import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Employee, EmployeeCreateRequest } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.scss']
})
export class EmployeeFormDialogComponent {
  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee | null
  ) {
    this.isEditMode = !!data;
    this.form = this.createForm();
    
    if (data && data.employeeDateOfBirth) {
      // Convert API date string (YYYY-MM-DD) to Date object for datepicker
      const dateObj = new Date(data.employeeDateOfBirth + 'T00:00:00Z');
      this.form.patchValue({
        empName: data.empName,
        employeeDateOfBirth: dateObj
      });
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      empName: ['', [Validators.required, Validators.minLength(2)]],
      employeeDateOfBirth: ['', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      
      // Convert Date object back to YYYY-MM-DD string for API
      const submitData: any = { ...formValue };
      if (submitData.employeeDateOfBirth instanceof Date) {
        const date = submitData.employeeDateOfBirth;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        submitData.employeeDateOfBirth = `${year}-${month}-${day}`;
      }
      
      this.dialogRef.close(submitData);
    }
  }

  get empNameError(): string {
    const control = this.form.get('empName');
    if (control?.hasError('required')) return 'Employee name is required';
    if (control?.hasError('minlength')) return 'Employee name must be at least 2 characters';
    return '';
  }

  get dateOfBirthError(): string {
    const control = this.form.get('employeeDateOfBirth');
    if (control?.hasError('required')) return 'Date of birth is required';
    return '';
  }
}
