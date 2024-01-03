import { Component } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Router } from '@angular/router';
import { Customer } from '../customer-form/customer';

@Component({
    selector: 'customers-browser',
    templateUrl: './customers-browser.component.html',
    styleUrls: ['./customers-browser.component.css']
})


export class CustomersBrowserComponent {
    customers: Customer[] = [];

    constructor(
        private customerService: CustomersService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadCustomers();
    }

    loadCustomers() {
        this.customerService.getAllCustomers()
            .subscribe(customers => this.customers = customers);
    }

    onSelectCustomer(customerId: number): void {
        this.customerService.setSelectedCustomerId(customerId);
        this.router.navigate(['/reservation-form']);
    }
}