import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

 
  
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService,private authService: AuthService ) { }
  public employee: Employee | undefined;
  ngOnInit(): void {
    this.getEmployeeDetail();
  }

  getEmployeeDetail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getEmployeeById(id).subscribe(
      (data: Employee) => {
        console.log(data.nom);
        this.employee = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  
  }
