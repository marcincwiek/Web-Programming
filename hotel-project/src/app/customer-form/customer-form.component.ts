import { NgModel } from '@angular/forms';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerValidator } from './customer.validator';
import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {

  constructor(private http: HttpClient) { }

  SaveData() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.http.post('https://213.248.166.144:7070/swagger-ui/index.html', formData)
        .subscribe(
          (response: any) => {
            console.log('API response:', response);
            this.form.reset();
          },
          (error: any) => {
            console.error('Error submitting data:', error);
          }
        );
    } else {
      this.markFormGroupTouched(this.form);
    }
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

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
