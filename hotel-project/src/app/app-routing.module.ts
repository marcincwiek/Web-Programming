import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reservation', component: ReservationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
