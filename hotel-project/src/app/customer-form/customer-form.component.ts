import { DuplicateRecordError } from './../common/duplicate-record-error';
import { CustomersService } from './../customers.service';
import { NgForm, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CustomerValidator } from './customer.validator';
import { Customer } from './customer';
import { AppError } from '../common/app-error';

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

  errors!: {};

  constructor(private service: CustomersService) { }

  async onSubmit(form: NgForm) {
    this.errors = {};
    console.log(this.customer);
    const cst = await this.service.checkIfCustomerAlreadyExist(this.customer.tcNo, this.customer.email);
    console.log(cst);
    if (cst != null) {
      this.errors = { CustomerExist: 'Error 409: Customer already exist. Verify TC No and Email' };
      alert('Error 409: Customer already exist. Verify TC No and Email');
    } else {
      this.service.createCustomer(this.customer).subscribe({
        next: (value: any) => {
          alert("Customer is saved ");
        },
        error: (reason: any) => {
          console.log("Rejected because " + reason);
          if (reason instanceof DuplicateRecordError) {
            this.errors = { CustomerExist: reason.message };
            alert(reason.message);
          }
          this.errors = { RejectedByServer: "Rejected due to a server error" };
          alert('Rejected due to a server error');
        }
      });
    }
  }

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



