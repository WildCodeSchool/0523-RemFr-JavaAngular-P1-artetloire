import { Component, OnInit } from "@angular/core";
import { searchService } from "src/app/services/search.service";
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
  labelOptions!: string[];
  labelHandiOptions!: string[];
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

        this.themeOptions = Array.from(
          new Set(
            this.museumData.reduce((themes: string[], museum: Fields) => {
              const theme = museum.fields.theme_musee;
              if (theme && theme !== "") {
                themes.push(...theme.split(";"));
              }
              return themes;
            }, [])
          )
        ).sort();

        this.labelOptions = Array.from(
          new Set(
            this.museumData.reduce((labels: string[], museum: Fields) => {
              const label = museum.fields.labels;
              if (label && label !== "") {
                labels.push(...label.split(";"));
              }
              return labels;
            }, [])
          )
        ).sort();
        this.labelHandiOptions = Array.from(
          new Set(
            this.museumData.reduce(
              (label_tourisme_handicap: string[], museum: Fields) => {
                const labelHandic = museum.fields.label_tourisme_handicap;
                if (labelHandic && labelHandic !== "") {
                  label_tourisme_handicap.push(...labelHandic.split(";"));
                }
                return label_tourisme_handicap;
              },
              []
            )
          )
        ).sort();
      },
      (error) => {
        console.error("Erreur lors de la récupération des options", error);
      }
    );
  }
  getMuseumByTheme(newList: string): Museums[] {
    const filteredMuseum: Museums[] = [];

    this.museumData.map((museumData) => {
      if (museumData.fields.theme_musee == newList) {
        filteredMuseum.push(museumData.fields);
      }
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
      if (
        labelHandi == "Handicap mental" ||
        labelHandi == "Handicap visuel" ||
        labelHandi == "Handicap auditif" ||
        labelHandi == "Handicap moteur"
      ) {
        filteredMuseumLabelHandi.push(museumData.fields);
      }
    });

    return filteredMuseumLabelHandi;
  }

  onLabelHandiChange() {
    this.HandiLabelMuseums = this.getMuseumByLabelHandi(this.museumLabelHandi);
  }

  getMuseumByLabel(label: string): Museums[] {
    const filteredMuseumLabel: Museums[] = [];

    this.museumData.forEach((museumData) => {
      if (museumData.fields.labels == label) {
        filteredMuseumLabel.push(museumData.fields);
      }
    });

    return filteredMuseumLabel;
  }

  onLabelChange() {
    this.labelMuseums = this.getMuseumByLabel(this.museumLabel);
  }
}
