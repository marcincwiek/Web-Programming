import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {

  log(x: any) {
    console.log(x);
  }
  submit(f: any) {
    console.log(f);
  }

}
