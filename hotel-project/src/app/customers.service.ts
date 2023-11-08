import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



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

  constructor(private http: HttpClient) {

  }

}




