import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  Index: number = 1;
  Interval: number = 15000;
  Timeout: any = 0; // Change this you little piece of shit !

  @Input()
  museumSample: any[] = [];

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
      this.manualClick(this.Index);
    }, this.Interval);
  }

  manualClick(id: number, manual: boolean = false) {
    clearTimeout(this.Timeout);
    this.Index = id;
    const element = document.getElementById('slider-element-' + id);
    if (element) {
      const Yreset = window.scrollY;
      element.scrollIntoView({behavior: 'smooth'});
      if (!manual) {
        window.scrollTo(0, Yreset);
      }
    }
    this.startCarousel();
  }
}
