import { Component, OnInit } from '@angular/core';
import { OnExit } from 'src/app/guards/exit.guard';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnExit{

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
    console.log("");
  }
  onExit(){
    const rta = confirm('Logica desde com, estas seguro salir?');
    return rta;
  }

  save(event:Event){
    console.log(this.registerForm);
  }

}
