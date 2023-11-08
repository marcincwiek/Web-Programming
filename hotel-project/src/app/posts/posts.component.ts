import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any;

  constructor(private service: CustomersService) {
    this.service.getPost().then(
      (data) => {
        this.posts = data;
      }
    )
  }
}
