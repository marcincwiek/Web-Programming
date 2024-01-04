import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { HttpClient } from '@angular/common/http';
import { AppError } from '../common/app-error';
import { catchError } from 'rxjs';
import { DuplicateRecordError } from '../common/duplicate-record-error';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  roomTypes: any[] = [];
  reservations: any[] = [];
  information: any[] = [];
  reservationForm: FormGroup = new FormGroup({});
  errors: any = {};

  constructor(
    private service: CustomersService,
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();

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
    );

    const selectedCustomerId = this.service.getSelectedCustomerId();
    this.reservationForm.get('customerId')!.setValue(selectedCustomerId !== null ? selectedCustomerId : 0);

    this.service.getAllRooms().subscribe(
      (data) => {
        this.information = data;
      },
      (error) => {
        console.error('Error fetching room information', error);
      }
    );
  }

  initForm() {
    this.reservationForm = this.fb.group({
      id: [0],
      customerId: [0],
      room: ['', Validators.required],
      roomType: ['', Validators.required],
      dateArrival: [null, Validators.required],
      dateDeparture: [null, Validators.required],
      selectTour: [0, Validators.required],
      notes: ''
    });
  }

  private createReservation(reservationData: any) {
    this.service.createReservation(reservationData)
      .pipe(
        catchError((error: AppError) => {
          if (error instanceof DuplicateRecordError) {
            this.errors = { DuplicateRecord: 'A duplicate record exists.' };
          } else {
            this.errors = { UnknownError: 'An unknown error occurred.' };
          }
          console.error('Error creating reservation:', error);
          alert('Error creating reservation.');
          return [];
        })
      )
      .subscribe((response: any) => {
        console.log('Reservation created successfully:', response);
        alert('Reservation is saved');
        this.reservationForm.reset();
      });
  }

  onSubmit(form: FormGroup) {
    console.log(this.reservationForm.value);
    this.errors = {};
    this.createReservation(this.reservationForm.value);
  }
  getAvailableRooms() {
    return this.information.filter(room => room.type === this.reservationForm.get('roomType')!.value);
  }
}