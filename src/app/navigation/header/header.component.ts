import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output()
  sidenavToggle = new EventEmitter<any>();

  isAuth: boolean;

  subs$: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subs$ = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = !!authStatus;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
