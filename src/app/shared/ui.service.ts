import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadingStateChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(message, action, duration) {
    this.snackBar.open(message, action, duration);
  }
}
