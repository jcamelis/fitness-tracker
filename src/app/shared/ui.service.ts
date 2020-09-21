import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadingStateChanged: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
