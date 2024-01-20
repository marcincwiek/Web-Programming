import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from './customer-form/customer';
import { DuplicateRecordError } from './common/duplicate-record-error';
import { AppError } from './common/app-error';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';



@Injectable()
export class CustomersService {

  private selectedCustomerId: number | null = null;

  async getPost(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(Response => {
        resolve(Object.values(Response));
      });
    })
  }

  // async getReservation(): Promise<Array<any>> {
  //   return new Promise((resolve, reject) => {
  //     // this.http.get('http://213.248.166.144:7070/customer/reservations').subscribe(Response => {
  //     this.http.get('http://localhost:7070/Reservations').subscribe(Response => {
  //       resolve(Object.values(Response));
  //     });
  //   })
  // }
  getReservation() {
    return this.http.get<any[]>('http://localhost:7070/Reservations').pipe(
      catchError((error) => {
        console.error('Error fetching tours:', error);
        return throwError(error);
      })
    );
  }

  constructor(private http: HttpClient) { }

  checkIfCustomerAlreadyExist(tcNo: string, email: string): Promise<any> {
    var params = new HttpParams();
    if (tcNo != null) params = params.append("tcNo", tcNo);
    if (email != null) params = params.append("email", email);
    console.log(params.toString());

    return new Promise((resolve, reject) => {
      this.http.get('http://213.248.166.144:7070/customer/getCustomerByTcNoEmail', { params }).subscribe({
        next: response => resolve(response),
        error: err => reject(err)
      });
    });
  }
  createCustomer(customer: Customer) {
    console.log(customer);
    return this.http.post('http://213.248.166.144:7070/customer/createCustomer', customer).
      pipe(catchError((response: HttpErrorResponse) => {
        if (response.status === 409) {
          return throwError(() => new DuplicateRecordError('Error 409: Customer already exist. Verify TC No and Email'));
        }
        return throwError(() => new AppError('Rejected due to a server error'));
      }));
  }
  getTours() {
    return this.http.get<any[]>('http://localhost:7070/tours').pipe(
      catchError((error) => {
        console.error('Error fetching tours:', error);
        return throwError(error);
      })
    );
  }

  getRoomTypes() {
    return this.http.get<any[]>('http://213.248.166.144:7070/customer/getRoomTypes').pipe(
      catchError((error) => {
        console.error('Error getting room type', error);
        return throwError(error);
      })
    )
  }
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('http://213.248.166.144:7070/customer/search');
  }
  setSelectedCustomerId(customerId: number): void {
    this.selectedCustomerId = customerId;
  }
  getSelectedCustomerId(): number | null {
    return this.selectedCustomerId;
  }
  private apiUrl = 'http://213.248.166.144:7070/customer/allRooms';

  getAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createReservation(reservation: ReservationFormComponent) {
    return this.http.post('http://213.248.166.144:7070/customer/createReservation', reservation)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          if (response.status === 409) {
            return throwError(() => new DuplicateRecordError('Duplicated Error'));
          }
          return throwError(() => new AppError('Unknown error occurred'));
        })
      );
  }
}




