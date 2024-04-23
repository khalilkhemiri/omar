import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { Zone1 } from './zone1';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8081/api/v1/employees";

  constructor(private httpClient: HttpClient,private authService: AuthService) { }
  
  getEmployeesByUserId(userId: number): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}/users/${userId}`);
  }

  createEmployee(employee: Employee): Observable<any>{
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployees(employeeId: number, employee: Employee): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/${employeeId}`, employee);
  }
  
  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  getPrimeByZoneAndAge(zone: string, age: number): Observable<number> {
    const url = `${this.baseURL}/${zone}/${age}`;
    return this.httpClient.get<number>(url);
}

generatepdfs (id: number): Observable<any>{
  return this.httpClient.get<any>(`${this.baseURL}/reports/${id}`);
}
generatepdf(id: number): Observable<any> {
  return this.httpClient.get(`${this.baseURL}/reports/${id}`, { responseType: 'json' });
}
}