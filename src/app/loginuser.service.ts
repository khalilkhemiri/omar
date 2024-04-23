import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
private baseUrl="http://localhost:8081/user/login"; 
  constructor(private httpclient: HttpClient) { }
  loginUser(user:User):Observable<User>{
    console.log(user.id);
    return this.httpclient.post<User>(`${this.baseUrl}`,user);
  }
}
