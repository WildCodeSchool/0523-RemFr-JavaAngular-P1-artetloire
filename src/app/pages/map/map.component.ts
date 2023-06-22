import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  museumInfo: any;

  museumAll!: any;
  museumNameTab!: string[];
  museumCoordTab!: [number, number][];
  inputV = "";
  filteredMuseum: string[] = [];
  isListOpen = true;

  addedCards: any[] = [];

  constructor(public markerService: MarkerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getLocation().subscribe(pos => {
      console.log(pos);
    });
    this.markerService.getAllMuseumData().subscribe((museums: any[]) => {
      this.museumAll = museums;
      this.museumNameTab = museums.map(museum => museum.nom);
      this.museumCoordTab = museums.map(museum => museum.coords);
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

  closeModal():void {
    this.markerService.showModal = false;
  }

  centerOnUser(): void {
    if (navigator.geolocation && this.userLocation) {
      this.map.panTo(this.userLocation);
    }
  }

  searchMuseum(): void {
    this.filteredMuseum = this.museumNameTab.filter((museum: string) =>
      museum.toLowerCase().includes(this.inputV.toLowerCase())
    );
    this.isListOpen = true;
  }

  selectMuseum(museum: string): void {
    const indexMuseum = this.museumNameTab.indexOf(museum);
    if (indexMuseum >= 0) {
      const museumCoords = this.museumCoordTab[indexMuseum];
      const position = L.latLng(museumCoords[0], museumCoords[1])
      this.map.panTo(position);
      this.isListOpen = false;
    } else {
      this.toastr.error('Pas trouvé', 'Non');
    }
  }

  onKeyUp(event: KeyboardEvent, museum: string): void {
    if (event.key === 'Enter') {
      this.selectMuseum(museum);
    }
  }

  onRightButtonClick(): void {
    const carteContainerIn = document.querySelector('.carte-model-container');
    const carteModel = document.querySelector('.carte-model') as HTMLElement;
  
    if (carteContainerIn && carteModel) {
      const carteModelStyle = getComputedStyle(carteModel);
      const carteModelWidth = carteModel.offsetWidth + parseFloat(carteModelStyle.marginLeft) + parseFloat(carteModelStyle.marginRight);
      carteContainerIn.scrollLeft += carteModelWidth;
    }
  }

  onLeftButtonClick(): void {
    const carteContainerIn = document.querySelector('.carte-model-container');
    const carteModel = document.querySelector('.carte-model') as HTMLElement;
  
    if (carteContainerIn && carteModel) {
      const carteModelStyle = getComputedStyle(carteModel);
      const carteModelWidth = carteModel.offsetWidth + parseFloat(carteModelStyle.marginLeft) + parseFloat(carteModelStyle.marginRight);
      carteContainerIn.scrollLeft -= carteModelWidth;
    }
  }

  onCardInfo(museumInfo: any): void {
    this.addedCards.push(museumInfo);
  }

  openModal(museum: any): void {
    this.markerService.showModal = true;
    this.markerService.museumInfo = museum;
  }
}
