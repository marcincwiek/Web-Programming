import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomersBrowserComponent } from './customers-browser/customers-browser.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from './customers.service';
import { SummaryPipe } from './summary.pipe';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservationComponent } from './reservation/reservation.component';
import { HomeComponent } from './home/home.component';
import { PanelComponent } from './panel/panel.component';
import { InputFormatDirective } from './input-format.directive';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { FavouriteComponent } from './favourite/favourite.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomersBrowserComponent,
    NavBarComponent,
    SummaryPipe,
    PostsComponent,
    ReservationComponent,
    HomeComponent,
    PanelComponent,
    InputFormatDirective,
    CustomerFormComponent,
    FavouriteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CustomersService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
