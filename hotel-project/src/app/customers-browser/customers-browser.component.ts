import { Component } from '@angular/core';

@Component({
    selector: 'customers-browser',
    templateUrl: './customers-browser.component.html',
    styleUrls: ['./customers-browser.component.css']
})
export class CustomersBrowserComponent {
    title = "List of Customers"
    customers = ["Wawrzyniec", "Maurycy", "Stanisław", "Krzysztof"]
}