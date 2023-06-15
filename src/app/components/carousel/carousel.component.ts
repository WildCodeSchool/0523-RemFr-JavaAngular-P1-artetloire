import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  Index: number = 1;
  Timeout: number = 0;

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
    }, 25000);
  }

  /*ManualTravel() {
    function() {
      clearTimeout(this.Timeout);
    }
  }

  showMore() {
    let more = document.querySelectorAll('.more');
    for (let i = 0; i != more.length; i++) {
      more[i].addEventListener('click', function(){
        more[i].classList.toggle('active');
      })
    }
  }*/
}
