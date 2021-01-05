import { Component, OnInit } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const validationPattern = /^((([A-Z]){3}([0-9]){3})|(([0-9]){3}([A-Z]){2})|(([0-9]){2}([A-Z]){2,3}))$/;

@Component({
  selector: 'app-car-reg-input',
  templateUrl: './car-reg-input.component.html',
  styleUrls: ['./car-reg-input.component.scss']
})
export class CarRegInputComponent implements OnInit {

  public carRegNumber = new FormControl('');

  constructor(private router: Router) { }

  ngOnInit(): void {
    const regNumberValidators: ValidatorFn[] = [
      Validators.required,
      Validators.pattern(validationPattern),
    ];
    this.carRegNumber.setValidators(regNumberValidators);
  }

  capitalize(control: FormControl): void {
    const currentValue: string = control.value;
    control.setValue(currentValue.toUpperCase());
  }
  submit() {
    if (this.carRegNumber.valid) {
      this.router.navigate(['./set-location']);
    }
  }

}
