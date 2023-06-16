import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  Index: number = 1;
  Timeout: any = 0; // Change this you little piece of shit !

  @Input()
  museumSample: any[] = [];

  /*ngOnInit() {
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
  }*/

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    clearTimeout(this.Timeout);
  }

  startCarousel() {
    this.Timeout = setTimeout(() => {
      this.Index++;
      if (this.Index > document.getElementsByClassName("slider-element").length) {
        this.Index = 1;
      }
      this.manualTravel(this.Index);
    }, 5000);
  }

  manualTravel(id: number) {
    clearTimeout(this.Timeout);
    this.Index = id;
    const element = document.getElementById('slider-element-' + id);
    if (element) {
      const Yreset = window.scrollY;
      element.scrollIntoView();
      window.scrollTo(0, Yreset);
    }
    this.startCarousel();
  }
}
