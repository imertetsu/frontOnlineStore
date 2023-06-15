import { Component, OnInit } from '@angular/core';
import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnExit{

  ngOnInit(): void {
    console.log("");
  }
  onExit(){
    const rta = confirm('Logica desde com, estas seguro salir?');
    return rta;
  }
}
