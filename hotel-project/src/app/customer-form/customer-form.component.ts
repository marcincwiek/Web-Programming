import { NgModel } from '@angular/forms';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerValidator } from './customer.validator';

@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {

  SaveData() {
    console.log(this.form.value);
  }

  form = new FormGroup({

    firstName: new FormControl('', [Validators.required, Validators.minLength(3), CustomerValidator.cannotContainSpace]),

    lastName: new FormControl('', [Validators.required, Validators.minLength(3), CustomerValidator.cannotContainSpace]),

    price: new FormControl('', [Validators.required, CustomerValidator.minPrice]),

    roomType: new FormControl('', [Validators.required]),

    roomNumber: new FormControl('', [Validators.required]),

    comment: new FormControl('')

  });
  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get roomType() {
    return this.form.get('roomType');
  }
  get roomNumber() {
    return this.form.get('roomNumber');
  }

  get price() {
    return this.form.get('price');
  }

}
