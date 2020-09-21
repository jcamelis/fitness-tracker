import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthData } from './auth-data.model';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new BehaviorSubject<boolean>(false);

  private storageKey = 'fitness_tracker_user';

  private isAuthenticated: boolean;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private uiService: UiService
  ) {
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
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.createUserWithEmailAndPassword(
      userData.email, userData.password
    ).then(result => {
      console.log('SIGN_SUCCESS', result);
      this.uiService.loadingStateChanged.next(false);
    }).catch(error => {
      console.log('SIGN_ERROR', error);
      this.uiService.loadingStateChanged.next(false);
      this.snackBar.open(error.message, null, { duration: 3000 });
    });
  }

  login(userData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.signInWithEmailAndPassword(
      userData.email,
      userData.password
    ).then(result => {
      this.uiService.loadingStateChanged.next(false);
      console.log('LOGIN_SUCCESS', result);
    }).catch(error => {
      console.log('LOGIN_ERROR', error);
      this.uiService.loadingStateChanged.next(false);
      this.snackBar.open(error.message, null, { duration: 3000 });
    });
  }

  logout() {
    this.afAuth.signOut();
  }

  isAuth(): boolean {
    return !!this.isAuthenticated;
  }

}
