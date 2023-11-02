import { Component } from '@angular/core';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  isActive = true;

  onDivClicked() {
    console.log("Div was clicked");
  }

  onSave(event: any) {
    event.stopPropagation();
    console.log("Button was clicked", event);
  }

  onKeyUp() {
    console.log("Enter was pressed");
  }
  email = "me@example.com";
  onKeyUpEmail() {
    console.log(this.email);
  }
  customers = {
    title: "Hotel Details:",
    rating: 4.87,
    rooms: 21,
    price: 37,
    freeDay: new Date(2023, 11, 7)
  }

  text = " dadadadadadda dudududu tututut dadadada aaaa!"
}
