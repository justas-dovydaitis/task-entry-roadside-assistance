import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MapsService } from 'src/app/services/maps.service';

let WORKER_POSITION = new google.maps.LatLng(54.92517297199271, 23.891781208517333);

@Component({
  selector: 'app-worker-tracking',
  templateUrl: './worker-tracking.component.html',
  styleUrls: ['./worker-tracking.component.scss']
})
export class WorkerTrackingComponent implements AfterViewInit {

  @ViewChild("mapContainer", { static: false }) googleMap!: ElementRef;

  private _workerMarker: google.maps.Marker;

  constructor(
    private _maps: MapsService,
    private _router: Router,
  ) {
    if (!_maps.initialized) {
      this._router.navigate(['/']);
    }
    this._workerMarker = new google.maps.Marker({
      draggable: false,
      icon: 'assets/military-helicopter-bottom-view.png',
      title: 'Tech. pagalba',
      position: WORKER_POSITION
    });
  }

  ngAfterViewInit(): void {

    if (!this._maps.getMarker(1)) {
      this._maps.addMarker(this._workerMarker);
    }
    this._maps.getMarker().setDraggable(false)

    this._maps.initializeMap(this.googleMap);

    this.move(WORKER_POSITION.toJSON());

  }

  move(currentPosition: google.maps.LatLngLiteral): void {
    const userPosition = this._maps.getMarker().getPosition();
    const workerPosition = this._workerMarker.getPosition()!;
    const deltaX = userPosition!.lng() - workerPosition.lng();
    const deltaY = userPosition!.lat() - workerPosition.lat();

    const newX = currentPosition.lng + deltaX / 500;
    const newY = currentPosition.lat + deltaY / 500;

    const newLocation = { lat: newY, lng: newX }
    this._workerMarker.setPosition(newLocation);

    setTimeout(() => this.move(newLocation), 300);

  }
}
