export interface Employee {
  id: number;
  empName: string;
  employeeDateOfBirth: string;
}

export interface EmployeeCreateRequest {
  empName: string;
  employeeDateOfBirth: string;
}
