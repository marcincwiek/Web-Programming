import { Component } from '@angular/core';
import { OnInit, Input, Output, EventEmitter } from '@angular/core'
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  @Input() isSelected: boolean = false;
  @Output() change = new EventEmitter();

  constructor() {

  }
  ngOnInit() {

  }
  onClick() {
    this.isSelected = !this.isSelected;
    this.change.emit({ favourite: this.isSelected });
  }

}
