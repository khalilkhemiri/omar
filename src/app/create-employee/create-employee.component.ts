import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  
  
  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService,
    private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    
  }
  

  age!: number ;
  prim!: number ;
  
  calculateAge(event: MatDatepickerInputEvent<Date>) {
    const birthdate = event.value;
  
    if (birthdate) {
      const birthYear = birthdate.getFullYear();
      const birthMonth = birthdate.getMonth();
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
  
      this.age = currentYear - birthYear;
  
      const monthDifference = currentMonth - birthMonth;
  
      if (monthDifference > 6 || (monthDifference === 6 && birthdate.getDate() <= new Date().getDate())) {
        this.age += 1; // Increment age if the month difference is more than 6 or exactly 6 but birth day is today or earlier
      }
    }
  }
  

// Composant où vous créez un employé
saveEmployees() {
  this.authService.getUserId().subscribe(
    (userId) => {
      if (userId !== null) { // Vérifiez si userId n'est pas null
        this.employee.userid = userId;
this.employee.age=this.age;
this.employee.primettc=this.prim;
        this.employeeService.createEmployee(this.employee).subscribe(
          (data) => {
          
            console.log(data);
            this.router.navigateByUrl('/employees');
          },
          (error) => console.log(error)
        );
      } else {
        console.log("User ID is null.");
        // Gérer le cas où userId est null, peut-être afficher un message d'erreur
      }
    },
    (error) => console.log(error)
  );
}
    
  logout() {
    this.authService.logout(); // Appeler la fonction de déconnexion de votre service d'authentification
    this.router.navigate(['/login']); // Rediriger vers la page de connexion
  }

  onSubmit(){
    console.log(this.age);
    console.log(this.employee.tel);
    this.saveEmployees();
    
  }
  getPrime(event :Event) {
    event.preventDefault()
    event.stopPropagation();
    if (this.age !== undefined && this.employee.zone) {
        this.employeeService.getPrimeByZoneAndAge(this.employee.zone, this.age)
            .subscribe(
                (primeBrute) => {
                   this.prim = primeBrute;
                   this.employee.primettc=primeBrute;
                },
                (error) => {
                    console.error('Error fetching prime: ', error);
                }
            );
    }
  } 
  
}