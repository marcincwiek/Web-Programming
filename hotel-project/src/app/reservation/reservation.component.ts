import { HttpClient } from '@angular/common/http';
import { FavouriteComponent } from './../favourite/favourite.component';
import { Component, OnInit, Input } from '@angular/core';
import { CustomersService } from '../customers.service';
import { filter } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  reservations: any[] = [];
  noteVisible: boolean = true;
  showFavouritesOnly = false;
  showFilter = true;

  constructor(private service: CustomersService) {
    // this.service.getReservation().then(
    //   (data) => {
    //     this.reservations = data;
    //     this.filterReservationsForLastWeek();
    //   }
    // )
  }
  ngOnInit() {
    this.service.getReservation().subscribe(
      (data) => {
        this.reservations = data;
      },
      (error) => {
        console.error('Error fetching tours:', error);
      }
    );
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
    this.showNote();
  }


  goBack(index: number): void {
    this.reservations[index].editing = false;
    this.showNote();
  }

  hideNote() {
    this.noteVisible = false;
  }

  showNote() {
    this.noteVisible = true;
  }
  onFavouriteChange(eventArgs: any) {
    console.log("Favourite changed ", eventArgs);
  }


}
