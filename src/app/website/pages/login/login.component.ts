import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorFlag = '';
  formGroup!: FormGroup;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  buildForm(){
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
    });
  }

  submitData(event: Event){
    console.log(this.loginForm.value, "evento:", event);
    this.authService.loginAndGet(`${this.loginForm.value.email}`, `${this.loginForm.value.password}`)
      .subscribe(() => {
      this.router.navigate(['/profile']);
    },(error) => {
      console.log(error);
      this.errorFlag = error;
    });
  }
}
