import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavComponent } from './nav/nav.component';
import { AuthComponent } from './auth/auth.component';
import { HotelsComponent } from './hotels/hotels.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { HotelOneComponent } from './hotel-one/hotel-one.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'hotels', component: HotelsComponent },
    { path: 'hotels/:hotelId/edit', component: AdminComponent },
    { path: 'hotels/:hotelId', component: HotelOneComponent },
    { path: 'add', component: AddHotelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
