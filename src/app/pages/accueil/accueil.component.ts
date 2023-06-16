import { Component, OnInit } from '@angular/core';
import { AccueilService } from 'src/app/services/accueil.service';

@Component({
  selector: 'app-accueil-page',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilPageComponent implements OnInit {
  museumList: any[] = [];
  museumSample: any[] = [];

  constructor(private dataSet : AccueilService) {
    
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
