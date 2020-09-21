import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date;

  loading = false;

  private loadingSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.loadingSubscription = this.uiService.loadingStateChanged
      .subscribe(loading => this.loading = loading);
  }

  submit(form) {
    if (form.valid) {
      this.authService.registerUser({
        email: form.value.email,
        password: form.value.password
      });
    }
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
