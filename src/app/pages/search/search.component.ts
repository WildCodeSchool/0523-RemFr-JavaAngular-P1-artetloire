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
  themeOptions!: string[];
  filteredMuseums: Museums[] = [];
  labelMuseums: Museums[] = [];
  HandiLabelMuseums: Museums[] = [];
  themeMuseums: Museums[] = [];

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
            this.museumData
              .map((museum: Fields) => museum.fields.theme_musee)
              .filter((theme: string) => theme !== "")
          ),
        ].sort();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getMuseumByTheme(newList: string): Museums[] {
    const filteredMuseum: Museums[] = [];

    this.museumData.forEach((museumData) => {
      if (museumData.fields.theme_musee === newList) {
        filteredMuseum.push(museumData.fields);
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

  getMuseumByLabelHandi(labelHandi: string): Museums[] {
    const filteredMuseumLabelHandi: Museums[] = [];

    this.museumData.forEach((museumData) => {
      const handiLabel = museumData.fields.label_tourisme_handicap;
      if (handiLabel === labelHandi) {
        filteredMuseumLabelHandi.push(museumData.fields);
      }
      console.log("Label", labelHandi);
    });

    return filteredMuseumLabelHandi;
  }

  onLabelHandiChange() {
    this.HandiLabelMuseums = this.getMuseumByLabelHandi(this.museumLabelHandi);
  }

  getMuseumByLabel(label: string): Museums[] {
    const filteredMuseumLabel: Museums[] = [];
    this.museumData.forEach((museumData) => {
      if (museumData.fields.labels === label) {
        filteredMuseumLabel.push(museumData.fields);
      }
      console.log("Label", label);
    });
    return filteredMuseumLabel;
  }

  onLabelChange() {
    this.labelMuseums = this.getMuseumByLabel(this.museumLabel);
  }
}
