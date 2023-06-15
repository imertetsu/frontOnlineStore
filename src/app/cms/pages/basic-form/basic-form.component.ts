import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl('name field');
  emailField = new FormControl('email field');
  phoneField = new FormControl('');
  numberField = new FormControl();
  dateField = new FormControl();
  colorField = new FormControl('#000000');

  categoryField = new FormControl('category-2');
  agreeField = new FormControl(false);
  genderField = new FormControl()

  ngOnInit(): void {
    this.nameField.valueChanges
      .subscribe(value => {
        console.log(value);
      })
  }

  getNameFieldValue(){
    console.log(this.nameField);
    console.log(this.nameField.value);
  }
}
