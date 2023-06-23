import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.scss']
})
export class CarouselCardComponent  {
  @Input() museumInfo: any;

  @Output() openModalEvent = new EventEmitter<any>();
  @Output() removeFavoriteEvent = new EventEmitter<any>();

  openModal(): void {
    this.openModalEvent.emit(this.museumInfo);
  }
  
  removeFavorite(): void {
    this.removeFavoriteEvent.emit(this.museumInfo);
  }
}
