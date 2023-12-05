import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerFormComponent } from './customer-form/customer-form.component';



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


}




