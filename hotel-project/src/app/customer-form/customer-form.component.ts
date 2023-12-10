import { NgForm, NgModel, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomerValidator } from './customer.validator';
import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {


  customer: Customer = {
    id: 0,
    tcNo: '',
    passportNo: '',
    nationality: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: 0,
    streetAddress: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    notes: '',
  };

  constructor(private http: HttpClient) { }

  onSubmit(form: NgForm) {
    console.log(this.customer);

    this.http.post('http://213.248.166.144:7070/customer/createCustomer', this.customer)
      .subscribe({
        next: response => {
          alert('Customer created successfully')
          console.log('Customer created successfully:', response);

          form.resetForm();
        },
        error: error => {
          if (error.status == 400) {
            alert('Bad request error')
          }
          if (error.status == 500) {
            alert('Duplicated entry error')
          }
          else {
            alert('An unexpected error occurred');
            console.error('An unexpected error occurred', error);
          }

        }
      });
  }


  // customerForm = new FormGroup({

  //   firstName: new FormControl('', [Validators.required, Validators.minLength(3), CustomerValidator.cannotContainSpace]),
  //   lastName: new FormControl('', [Validators.required, Validators.minLength(3), CustomerValidator.cannotContainSpace]),
  //   // price: new FormControl('', [Validators.required, CustomerValidator.minPrice]),
  //   // roomType: new FormControl('', [Validators.required]),
  //   // roomNumber: new FormControl('', [Validators.required]),
  //   notes: new FormControl('')
  // });


  customerForm = new FormGroup({

    firstName: new FormControl('', [Validators.required, Validators.minLength(3), CustomerValidator.cannotContainSpace]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), CustomerValidator.cannotContainSpace]),
    price: new FormControl('', [Validators.required, CustomerValidator.minPrice]),
    roomType: new FormControl('', [Validators.required]),
    roomNumber: new FormControl('', [Validators.required]),
    notes: new FormControl('')

  });

  get firstName() {
    return this.customerForm.get('firstName');
  }
  get lastName() {
    return this.customerForm.get('lastName');
  }
  get roomType() {
    return this.customerForm.get('roomType');
  }
  get roomNumber() {
    return this.customerForm.get('roomNumber');
  }

  get price() {
    return this.customerForm.get('price');
  }
}
