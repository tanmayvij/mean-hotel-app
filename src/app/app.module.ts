import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelOneComponent } from './hotel-one/hotel-one.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AuthComponent,
    AdminComponent,
    HotelsComponent,
    HotelOneComponent,
    AddHotelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
