import { Component, OnInit } from "@angular/core";
import { searchService } from "src/services/search.service";
import { Museums } from "src/app/models/museums";
import { Api, Fields } from "src/app/models/api";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class searchComponent implements OnInit {
  museum: Museums[] = [];
  museumData!: Fields[];
  museeTheme = "";
  museumName = "";
  museumLabelHandi = "";
  museumLabel = "";
  themeOptions!: any[];
  filteredMuseums: Museums[] = [];
  labelMuseums: any[] = [];
  HandiLabelMuseums: any[] = [];
  themeMuseums: any[] = [];

  constructor(private searchService: searchService) {}

  ngOnInit() {
    this.getMuseumData();
    this.filteredMuseums = this.getMuseumByTheme(this.museeTheme);
  }

  getMuseumData(): void {
    this.searchService.getMuseums().subscribe(
      (data: Api) => {
        this.museumData = data.records;
        this.themeOptions = [
          ...new Set(
            this.museumData.map((museum: any) => museum.fields.theme_musee)
          ),
        ];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getMuseumByTheme(newList: any): any[] {
    const filteredMuseum: any[] = [];

    this.museumData.forEach((museumData) => {
      if (museumData.fields.theme_musee === newList) {
        filteredMuseum.push(museumData);
      }
      console.log("Liste", newList);
    });

    return filteredMuseum;
  }

  onThemeChange() {
    this.themeMuseums = this.getMuseumByTheme(this.museeTheme);
  }

  getMuseumByName() {
    this.filteredMuseums = this.museumData
      .filter((museum) => {
        return museum.fields.nom_offre
          .toLowerCase()
          .includes(this.museumName.toLowerCase());
      })
      .map((museum) => museum.fields);
    console.log("Musées filtrés", this.filteredMuseums);
  }

  getMuseumByLabelHandi(labelHandi: any): any[] {
    const filteredMuseumLabelHandi: any[] = [];

    this.museumData.forEach((museumData) => {
      const handiLabel = museumData.fields.label_tourisme_handicap;
      if (handiLabel === labelHandi) {
        filteredMuseumLabelHandi.push(museumData);
      }
      console.log("Label", labelHandi);
    });

    return filteredMuseumLabelHandi;
  }

  onLabelHandiChange() {
    this.HandiLabelMuseums = this.getMuseumByLabelHandi(this.museumLabelHandi);
  }

  getMuseumByLabel(label: any): any[] {
    const filteredMuseumLabel: any[] = [];
    this.museumData.forEach((museumData) => {
      if (museumData.fields.labels === label) {
        filteredMuseumLabel.push(museumData);
      }
      console.log("Label", label);
    });
    return filteredMuseumLabel;
  }

  onLabelChange() {
    this.labelMuseums = this.getMuseumByLabel(this.museumLabel);
  }
}
