import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {
  museumList: any[] = [];
  museumSample: any[] = [];

  constructor(private dataSet : HomeService) {
    
  }

  ngOnInit() {
    this.dataSet.getAll().subscribe((museums: any[]) => {
      this.museumList = museums;
  
      while (this.museumSample.length != 4) {
        let tempElement: any = this.museumList[Math.floor(Math.random() * this.museumList.length)];
        if (!this.museumSample.some((element: any) => element.uuid === tempElement.uuid)) {
          this.museumSample.push(tempElement);
        }
      }
    });
  }
}
