import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  Index: number = 1;
  Timeout: any = 0; // Change this you little piece of shit !

  ngOnInit() {
    this.Carrousel();
  }

  Carrousel() {
    this.Timeout = setTimeout(() => {
      document.getElementById('nav-' + this.Index)?.click();
      this.Index++;
      if (this.Index > document.getElementsByClassName("slider-element").length) {
        this.Index = 1;
      }
      this.Carrousel();
    }, 15000);
  }

  manualTravel(id: number) {
    clearTimeout(this.Timeout);
    this.Index = id;
    this.Carrousel();
  }
}
