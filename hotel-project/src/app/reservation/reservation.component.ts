import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  reservations: any;

  constructor(private service: CustomersService) {
    this.service.getReservation().then(
      (data) => {
        this.reservations = data;
        this.filterReservationsForLastWeek();
      }
    )
  }
  filterReservationsForLastWeek() {
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    this.reservations = this.reservations.filter((reservation: any) => {
      const updateDate = new Date(reservation.dateUpdated);
      return updateDate >= lastWeek;
    });
  }

  toggleNoteEdit(index: number): void {
    this.reservations[index].editing = !this.reservations[index].editing;
  }

  saveNote(index: number): void {
    const upadateNote = this.reservations[index].newNote;
    this.reservations[index].notes = upadateNote.split('\n').filter((note: string) => note.trim() !== '');
    this.reservations[index].editing = false;

  }
}
