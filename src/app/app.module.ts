import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule, routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarRegInputComponent } from './components/car-reg-input/car-reg-input.component';
import { LocationSelectionComponent } from './components/location-selection/location-selection.component';
import { WorkerTrackingComponent } from './components/worker-tracking/worker-tracking.component';
import { GeolocationService } from './services/geolocation.service';
import { MapsService } from './services/maps.service';




@NgModule({
  declarations: [
    AppComponent,
    CarRegInputComponent,
    LocationSelectionComponent,
    WorkerTrackingComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [GeolocationService, MapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
