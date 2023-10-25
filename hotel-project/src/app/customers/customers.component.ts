import { CustomersService } from './customers.service';
import { Component } from '@angular/core';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  title = "List of Customers"
  customers;

  constructor(service: CustomersService) {
    // let service = new CustomersService();
    this.customers = service.GetCustomers();
  }
}
