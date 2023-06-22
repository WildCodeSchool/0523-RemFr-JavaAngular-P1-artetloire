import { Component, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from './hammer-config';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ]
})
export class CarouselComponent implements OnInit, OnDestroy {
  public Index: number = 1;
  private Interval: number = 8000;
  private Timeout: any = 0;

  @Input()
  museumSample: any[] = [];

  constructor(@Inject(HAMMER_GESTURE_CONFIG) private hammerConfig: HammerGestureConfig){

  }

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearTimeout(this.Timeout);
  }

  startAutoSlide() {
    this.Timeout = setTimeout(() => {
      this.Index = (this.Index + 1) % this.museumSample.length;
      this.slideToCurrentIndex();
      this.startAutoSlide();
    }, this.Interval);
  }

  stopAutoSlide() {
    clearTimeout(this.Timeout);
  }

  goToSlide(index: number) {
    this.stopAutoSlide();
    this.Index = index;
    this.slideToCurrentIndex();
    this.startAutoSlide();
  }

  slideToCurrentIndex() {
    const sliderElement: HTMLElement = document.querySelector('.slider') as HTMLElement;
    const slideWidth = sliderElement.offsetWidth;
    sliderElement.style.transform = `translateX(-${slideWidth * this.Index}px)`;
  }
}
