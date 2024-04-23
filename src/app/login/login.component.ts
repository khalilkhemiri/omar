import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { LoginuserService } from '../loginuser.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = new User()
  constructor(private loginuserservice:LoginuserService , private router:Router,private authService: AuthService) { }

  ngOnInit(): void {
  }userlogin() {
    console.log(this.user.id);
  
    this.loginuserservice.loginUser(this.user).subscribe(
      (user: User) => {
        const userId = user.nom;
        console.log("User ID:", userId);
         this.authService.setUserId(userId);
        // Vous pouvez maintenant utiliser userId comme nécessaire dans votre application
        // Redirection vers la page '/employees' par exemple
        this.router.navigateByUrl('/employees');
      },
      (error) => {
        alert("Login failed");
      }
    );
  }
  
  
}
