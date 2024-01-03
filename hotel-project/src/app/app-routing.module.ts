import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { HomeComponent } from './home/home.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { CustomersBrowserComponent } from './customers-browser/customers-browser.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'customer-form', component: CustomerFormComponent },
  { path: 'reservation-form', component: ReservationFormComponent },
  { path: 'customer-browser', component: CustomersBrowserComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
