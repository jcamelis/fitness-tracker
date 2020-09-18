import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output()
  sidenavClose = new EventEmitter<any>();

  subs$: Subscription;

  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subs$ = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = !!authStatus;
    });
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onSidenavClose();
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}
