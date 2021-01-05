import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const DEFAULT_USER_POSITION = new google.maps.LatLng(54.920727, 23.952737);

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private userPosition!: BehaviorSubject<google.maps.LatLng>;

  constructor() {
    this.userPosition = new BehaviorSubject(this.getApproximatePosition());

    if (!navigator.geolocation) {
      alert('Jūsų naršyklė nepalaiko vietos nustatymo;');

    }

  }

  getApproximatePosition(): google.maps.LatLng {
    let approxPostion!: google.maps.LatLng;

    navigator.geolocation.getCurrentPosition(
      position => {
        approxPostion = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        this.userPosition.next(approxPostion);
      },
      () => {
        const message = `Nepavyko gauti jūsų vietos. Įsitikinkite, kad davėte leidimą naudoti vietos nustatymą. \r\n
        Spauskite ok, jei norite pabandyti dar kartą`
        const retry = confirm(message);
        retry ? this.getApproximatePosition() : alert("Dabar jau teks patiems nusirodyti savo buvimo vietą :)");

      }
    );
    return approxPostion || DEFAULT_USER_POSITION
  }
  getUserPosition(): Observable<google.maps.LatLng> {
    return this.userPosition.asObservable();
  }
  setUserPosition(newPosition: google.maps.LatLng) {
    this.userPosition.next(newPosition);
  }
}
