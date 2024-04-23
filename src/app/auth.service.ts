import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { } 

  private userIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  userId$: Observable<number | null> = this.userIdSubject.asObservable();

  setUserId(userId: number) {
    this.userIdSubject.next(userId);
  }
  getUserId(): Observable<number | null> {
    return this.userId$;
  }
  public isLoggedIn(){
    return this.getUserId !== null ; // true or false 
  }
  public logout(){
    return this.getUserId == null ; // true or false 
  }
}
