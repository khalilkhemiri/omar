import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee'
import { EmployeeService } from '../employee.service'
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../auth.service';
import {NgAlertBoxComponent} from "ng-alert-box-popup";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedEmployees: Employee[] = []; // Ajoutez cette ligne pour déclarer la propriété displayedEmployees

  employees!: Employee[] ;
  employeesPerPage = 5; // Nombre d'employés à afficher par page
  currentPage = 1; // Page actuelle
  constructor(private employeeService: EmployeeService,private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.authService.getUserId().subscribe(
      (userId) => {
        if (userId) {
          this.employeeService.getEmployeesByUserId(userId).subscribe(
            (data) => {
              this.employees = data;
  
              const startIndex = (this.currentPage - 1) * this.employeesPerPage;
              const endIndex = startIndex + this.employeesPerPage;
              this.displayedEmployees = this.employees.slice(startIndex, endIndex);
            },
            (error) => console.log(error)
          );
        }
      },
      (error) => console.log(error)
    );
  }
  
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.getEmployees();
  }
  addNewEmployee(){
    this.router.navigate(['createemployee']);
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }
  detail(id: number){
    this.router.navigate(['detail', id]);
  }
  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })
  }
  exportpdf(id:number){
    
    this.employeeService.generatepdf(id).subscribe((Response)=>
    console.log("merci "));
  

  }
  generatePdf(id: number): void {
    // L'ID de l'employé que vous voulez générer le rapport
    this.employeeService.generatepdf(id).subscribe(
      (response: any) => {
        console.log(response.message); // Affiche le message de succès
  
        // Affiche une alerte de succès
        alert('Succès : ' + response.message);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  
}