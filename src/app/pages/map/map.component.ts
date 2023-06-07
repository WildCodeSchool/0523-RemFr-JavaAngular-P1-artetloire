import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';
import { Observable } from 'rxjs';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {
  private map!: L.Map;
  private userLocation!: L.LatLng;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 47.3130666, 0.6839873 ],
      zoom: 10,
      zoomControl: false,
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.map.addControl(L.control.zoom({position: "bottomright"}));
    tiles.addTo(this.map);
  }

  showModal = false;

  constructor(public markerService: MarkerService) { }

  ngOnInit(): void {
    this.getLocation().subscribe(pos => {
      console.log(pos);
    });
  }

  getLocation(): Observable<L.LatLng> {
    return Observable.create((observer: { next: (arg0: GeolocationPosition) => void; complete: () => void; error: (arg0: GeolocationPositionError) => void; }) => {
      window.navigator.geolocation.getCurrentPosition(position => {
        this.userLocation = L.latLng(position.coords.latitude, position.coords.longitude);
        observer.next(position);
        observer.complete();
      },
      error => observer.error(error));
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
  }

  centerOnUser(): void {
    if (navigator.geolocation && this.userLocation) {
      this.map.panTo(this.userLocation);
    }
  }

  closeModal():void {
    this.markerService.showModal = false;
  }
}
