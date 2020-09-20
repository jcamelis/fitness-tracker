import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new BehaviorSubject<boolean>(false);

  private storageKey = 'fitness_tracker_user';

  private isAuthenticated: boolean;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.authChange.subscribe(status => console.log('AUTH::STATUS', status));
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.isAuthenticated = true;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(userData: AuthData) {
    this.afAuth.createUserWithEmailAndPassword(
      userData.email, userData.password
    ).then(result => {
      console.log('SIGN_SUCCESS', result);
    }).catch(error => {
      console.log('SIGN_ERROR', error);
    });
  }

  login(userData: AuthData) {
    this.afAuth.signInWithEmailAndPassword(
      userData.email,
      userData.password
    ).then(result => {
      console.log('LOGIN_SUCCESS', result);
    }).catch(error => {
      console.log('LOGIN_ERROR', error);
    });
  }

  logout() {
    this.afAuth.signOut();
  }

  isAuth(): boolean {
    return !!this.isAuthenticated;
  }

}
