import { Customer, Tours } from './../customer-form/customer';
import { Component } from '@angular/core';
import { CustomersService } from '../customers.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {


  tour: Tours = {

    selectTour: 0
  }
  tours: any[] = [];

  constructor(private service: CustomersService, private http: HttpClient) { }
  ngOnInit() {
    this.service.getTours().subscribe(
      (data) => {
        this.tours = data;
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
  }
}
