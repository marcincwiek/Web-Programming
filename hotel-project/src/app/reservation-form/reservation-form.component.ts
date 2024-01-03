import { Customer, Tours } from './../customer-form/customer';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { HttpClient } from '@angular/common/http';
import { ReservationForm } from './reservation-form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  roomTypes: any[] = [];
  reservations: any[] = [];
  information: any[] = [];


  reservation: ReservationForm = {
    id: 0,
    customerId: 0,
    roomNumber: '',
    roomType: '',
    arrivalDate: 0,
    departureDate: 0,
    selectTour: 0,
  };

  constructor(
    private service: CustomersService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.service.getTours().subscribe(
      (data) => {
        this.reservations = data;
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
    this.service.getRoomTypes().subscribe(
      (data) => {
        this.roomTypes = data;
      },
      (error) => {
        console.error('Error fetching rooms types', error);
      }
    )
    const selectedCustomerId = this.service.getSelectedCustomerId();
    this.reservation.customerId = selectedCustomerId !== null ? selectedCustomerId : 0;
    this.service.getAllRooms().subscribe(
      (data) => {
        this.information = data;
      },
      (error) => {
        console.error('Error fetching room information', error);
      }
    );
  }
  getAvailableRooms() {
    return this.information.filter(room => room.type === this.reservation.roomType);
  }
}
