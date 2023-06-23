import { Component, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu.service';

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
  private MenuList: Menu[] = [];

  @Input()
  museumSample: any[] = [];

  constructor(
    @Inject(HAMMER_GESTURE_CONFIG) private hammerConfig: HammerGestureConfig,
    private MenuService: MenuService
  ){

  }

  ngOnInit(): void {
    this.startAutoSlide();
    this.MenuList = this.MenuService.getMenus();
  }

  ngOnDestroy(): void {
    clearTimeout(this.Timeout);
  }

  startAutoSlide(): void {
    this.Timeout = setTimeout(() => {
      this.Index = (this.Index + 1) % this.museumSample.length;
      this.slideToCurrentIndex();
      this.startAutoSlide();
    }, this.Interval);
  }

  stopAutoSlide(): void {
    clearTimeout(this.Timeout);
  }

  goToSlide(index: number): void {
    this.stopAutoSlide();
    this.Index = index;
    this.slideToCurrentIndex();
    this.startAutoSlide();
  }

  slideToCurrentIndex(): void {
    const sliderElement: HTMLElement = document.querySelector('.slider') as HTMLElement;
    const slideWidth = sliderElement.offsetWidth;
    sliderElement.style.transform = `translateX(-${slideWidth * this.Index}px)`;
  }

  getMenuLink(name: string): string {
    const index = this.MenuList.findIndex(m => m.name == name);
    return (index) ? this.MenuList[index].link : '/';
  }
}
