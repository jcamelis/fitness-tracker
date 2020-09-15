import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form;

  constructor(protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      // Submit form
      console.log(this.form.value);
    }
  }

}
