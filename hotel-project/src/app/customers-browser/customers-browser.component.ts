import { Component } from '@angular/core';
import { CustomersService } from '../customers.service';

@Component({
    selector: 'customers-browser',
    templateUrl: './customers-browser.component.html',
    styleUrls: ['./customers-browser.component.css']
})


export class CustomersBrowserComponent {
    title = "List of Customers"
    customers;

    constructor(private service: CustomersService) {
        this.customers = service.getCustomers();
    }
}