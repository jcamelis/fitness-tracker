import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new BehaviorSubject<boolean>(false);

  private storageKey = 'fitness_tracker_user';

  private user: User;

  constructor(private router: Router) {
    this.authChange.subscribe(status => console.log('AUTH::STATUS', status));
    this.checkForStorageUser();
  }

  registerUser(userData: AuthData) {
    this.user = {
      email: userData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
    this.authSuccessfully();
  }

  login(userData: AuthData) {
    this.user = {
      email: userData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    localStorage.setItem(this.storageKey, JSON.stringify(userData));
    this.authChange.next(true);
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    localStorage.removeItem(this.storageKey);
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser(): User {
    return this.isAuth() ? { ...this.user } : null;
  }

  isAuth(): boolean {
    return !!this.user;
  }

  private checkForStorageUser() {
    const storageUser = localStorage.getItem(this.storageKey);
    if (storageUser) {
      const authData = JSON.parse(storageUser) as AuthData;
      this.login(authData);
    }
  }

  private authSuccessfully() {
    this.router.navigate(['/training']);
  }
}
