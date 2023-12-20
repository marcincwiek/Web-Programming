import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { Customer } from './customer-form/customer';
import { DuplicateRecordError } from './common/duplicate-record-error';
import { AppError } from './common/app-error';



@Injectable()
export class CustomersService {

  getCustomers() {
    return ["Wawrzyniec", "Maurycy", "Stanisław", "Krzysztof"]
  }

  async getPost(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(Response => {
        resolve(Object.values(Response));
      });
    })
  }

  async getReservation(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.http.get('http://213.248.166.144:7070/customer/lastReservations').subscribe(Response => {
        resolve(Object.values(Response));
      });
    })
  }

  constructor(private http: HttpClient) {

  }

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
}




