import { Component } from '@angular/core';

@Component({
  selector: 'bootstrap-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {

  cities = [
    { id: 1, name: 'Warszawa' },
    { id: 2, name: 'Gdańsk' },
    { id: 3, name: 'Kraków' },
  ]

  onAdd() {
    this.cities.push({ id: 4, name: 'Wrocław' });
  }

  // onRemove() {
  //   let index = this.cities.indexOf(city);
  //   this.cities.splice(index, 1);
  // }
}
