import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ){
    this.buildForm();
  }

  ngOnInit(): void {
    this.nameField?.valueChanges
    .subscribe(value => {
      console.log(this.nameField);
    });
    this.agreeField?.valueChanges
    .subscribe(value => {
      console.log(this.agreeField);
    });
    this.formGroup.valueChanges
    .subscribe(value => {
      console.log(value);
    });
  }

  getNameFieldValue(){
    console.log(this.nameField);
    console.log(this.nameField?.value);
  }

  save(event:Event) {
    if (this.formGroup.valid){
      console.log(this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25), Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?){2,4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      number: ['', [Validators.required, Validators.min(18), Validators.max(60)]],
      date: [''],
      color: ['#000000'],
      category: ['category-2'],
      agree: [false, [Validators.requiredTrue]],
      gender: [''],
    });
  }

  get nameField() {
    return this.formGroup.get('name');
  }

  get emailField() {
    return this.formGroup.get('email');
  }

  get phoneField() {
    return this.formGroup.get('phone');
  }

  get colorField() {
    return this.formGroup.get('color');
  }

  get dateField() {
    return this.formGroup.get('date');
  }

  get numberField() {
    return this.formGroup.get('number');
  }

  get categoryField() {
    return this.formGroup.get('category');
  }

  get agreeField() {
    return this.formGroup.get('agree');
  }

  get genderField() {
    return this.formGroup.get('gender');
  }


}
