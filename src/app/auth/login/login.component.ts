import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = false;

  loadingSusbcription: Subscription;

  form;

  constructor(
    protected formBuilder: FormBuilder,
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.loadingSusbcription = this.uiService.loadingStateChanged
      .subscribe((loading) => this.loading = loading);
    this.form = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      // Submit form
      this.authService.login({
        email: this.form.value.email,
        password: this.form.value.password
      });
    }
  }

  ngOnDestroy() {
    this.loadingSusbcription.unsubscribe();
  }

}
