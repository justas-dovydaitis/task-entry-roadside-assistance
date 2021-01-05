import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { MapsService } from 'src/app/services/maps.service';
import { finalize, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.scss']
})
export class LocationSelectionComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild("mapContainer", { static: false }) googleMap!: ElementRef;
  $subscriptions = new Subscription();

  constructor(
    private geolocation: GeolocationService,
    private maps: MapsService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    const userLocationMarkerOptions: google.maps.MarkerOptions = {
      crossOnDrag: true,
      title: 'Jūsų vieta',
    }
    const userLocationMarker = new google.maps.Marker(userLocationMarkerOptions);

    let init: boolean = true;

    const $subscription = this.geolocation.getUserPosition().pipe(
      map((position) => {
        if (init) {
          if (!this.maps.getMarker()) {
            this.maps.addMarker(userLocationMarker);
          }
          this.maps.initializeMap(this.googleMap);

          init = false;
        }

        userLocationMarker.setPosition(position);
        this.maps.setMapCenter(position);
      })
    ).subscribe();

    this.$subscriptions.add($subscription);
    this.maps.getMarker().setDraggable(true);
  }
  ngOnInit() {

  }
  ngOnDestroy() {
    this.$subscriptions.unsubscribe();
  }

  submit() {
    const geolocation = this.geolocation;
    this.maps.getMarker().addListener("dragend", function () {
      geolocation.setUserPosition(this.getPosition()!);
    });
    this.router.navigate(['./worker-tracking']);
  }



}
