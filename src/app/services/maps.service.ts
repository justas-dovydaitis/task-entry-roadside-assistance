import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  initialized = false;

  private _map!: google.maps.Map;
  private _markers: google.maps.Marker[] = [];

  constructor() { }

  setMap(map: ElementRef) {
    this._map = new google.maps.Map(map.nativeElement);
  }
  setMapCenter(position: google.maps.LatLng) {
    if (this._map)
      this._map.setCenter(position);
  }

  addMarker(marker: google.maps.Marker): number {
    return this._markers.push(marker);
  }

  getMarker(index: number = 0): google.maps.Marker {
    return this._markers[index];
  }


  initializeMap(
    map: ElementRef,
    mapOptions: google.maps.MapOptions = {
      zoom: 16,
      center: this._markers[0].getPosition()!
    }
  ): void {
    this._map = new google.maps.Map(map.nativeElement, mapOptions);

    this._markers.forEach(marker => {
      marker.setMap(this._map)
    })

    this.initialized = true;
  }
}
