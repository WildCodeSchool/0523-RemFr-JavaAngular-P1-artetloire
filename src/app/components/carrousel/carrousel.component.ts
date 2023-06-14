import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {
  Index: number = 1;

  ngOnInit() {
    this.Carrousel();
  }

  Carrousel() {
    setTimeout(() => {
      document.getElementById('nav-' + this.Index)?.click();
      this.Index++;
      if (this.Index > document.getElementsByClassName("slider-element").length) {
        this.Index = 1;
      }
      this.Carrousel();
    }, 5000);
  }
}
