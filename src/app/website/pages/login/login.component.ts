import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorFlag = '';

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ){}


  submitData(event: Event){

    console.log(this.loginForm.value);
    this.authService.loginAndGet(`${this.loginForm.value.email}`, `${this.loginForm.value.password}`)
      .subscribe(() => {
      this.router.navigate(['/profile']);

    },(error) => {
      console.log(error);
      this.errorFlag = error;
    });

  }


}
