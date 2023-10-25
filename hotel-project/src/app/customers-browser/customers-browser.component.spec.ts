import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersBrowserComponent } from './customers-browser.component';

describe('CustomersBrowserComponent', () => {
  let component: CustomersBrowserComponent;
  let fixture: ComponentFixture<CustomersBrowserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersBrowserComponent]
    });
    fixture = TestBed.createComponent(CustomersBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
