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
  museumTheme = "";
  museumName = "";
  museumLabelHandi = "";
  museumLabel = "";
  themeOptions!: string[];
  labelOptions!: string[];
  labelHandiOptions!: string[];
  filteredMuseums: Museums[] = [];
  nameMuseums: Museums[] = [];
  labelMuseums: Museums[] = [];
  HandiLabelMuseums: Museums[] = [];
  themeMuseums: Museums[] = [];
  showSeeMore = false;
  animate = false;
  favList: Museums[] = [];
  visitList: Museums[] = [];
  selectedTheme!: string;
  selectedLabel!: string;
  selectedLabelHandi!: string;
  constructor(private searchService: searchService) {}

  ngOnInit() {
    this.getMuseumData();
    this.filteredMuseums = this.getMuseumByTheme(this.museumTheme);
  }

  getMuseumData(): void {
    this.searchService.getMuseums().subscribe((data: Api) => {
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
    });
  }
  getMuseumByTheme(newList: string): Museums[] {
    const filteredMuseum: Museums[] = [];
    if (this.museumData) {
      this.museumData.map((museumData) => {
        if (
          museumData.fields.theme_musee &&
          museumData.fields.theme_musee.includes(newList)
        ) {
          const museum: Museums = museumData.fields;
          museum.recordid = museumData.recordid;
          filteredMuseum.push(museum);
        }
      });
    }
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
    }, 5000);
    return filteredMuseum;
  }

  onThemeChange() {
    this.resetOtherFilters("theme");
    this.selectedTheme = this.museumTheme;
    this.themeMuseums = this.getMuseumByTheme(this.museumTheme).slice(0, 2);
    this.showSeeMore = true;
  }

  getMuseumByName() {
    if (this.museumData) {
      this.museumData.map((museumData) => {
        const dataMuseum: Museums = museumData.fields;
        dataMuseum.recordid = museumData.recordid;
      });
      this.nameMuseums = this.museumData
        .filter((museum) => {
          const museumFields: Museums = museum.fields;
          const museumName = museumFields.nom_offre.toLowerCase();
          const searchQuery = this.museumName.toLowerCase();
          return museumName.substring(1).includes(searchQuery);
        })
        .map((museum) => museum.fields);
      this.animate = true;
      setTimeout(() => {
        this.animate = false;
      }, 5000);
      this.museumName = "";
    }
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
        const museum: Museums = museumData.fields;
        museum.recordid = museumData.recordid;
        filteredMuseumLabelHandi.push(museum);
      }
    });
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
    }, 5000);
    return filteredMuseumLabelHandi;
  }

  onLabelHandiChange() {
    this.resetOtherFilters("labelHandi");
    this.selectedLabelHandi = this.museumLabelHandi;
    this.HandiLabelMuseums = this.getMuseumByLabelHandi(
      this.museumLabelHandi
    ).slice(0, 2);
    this.showSeeMore = true;
  }

  getMuseumByLabel(label: string): Museums[] {
    const filteredMuseumLabel: Museums[] = [];

    this.museumData.forEach((museumData) => {
      const museum: Museums = museumData.fields;
      museum.recordid = museumData.recordid;
      if (museum.labels && museum.labels.includes(label)) {
        filteredMuseumLabel.push(museum);
      }
    });
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
    }, 5000);
    return filteredMuseumLabel;
  }

  onLabelChange() {
    this.resetOtherFilters("label");
    this.selectedLabel = this.museumLabel;
    this.labelMuseums = this.getMuseumByLabel(this.museumLabel).slice(0, 2);
    this.showSeeMore = true;
  }
  seeMore() {
    this.showSeeMore = false;
    if (this.museumLabel.length > 2) {
      this.labelMuseums = this.getMuseumByLabel(this.museumLabel);
    } else if (this.museumTheme) {
      this.themeMuseums = this.getMuseumByTheme(this.museumTheme);
    } else {
      this.HandiLabelMuseums = this.getMuseumByLabelHandi(
        this.museumLabelHandi
      );
    }
  }
  handleFavoriteAdded(favorite: Museums): void {
    if (!this.favList.includes(favorite)) {
      this.favList.push(favorite);
    }
  }

  handleMuseumsVisitedAdded(visitedMuseums: Museums): void {
    if (!this.visitList.includes(visitedMuseums)) {
      this.visitList.push(visitedMuseums);
    }
  }
  resetOtherFilters(filter: string) {
    if (filter !== "theme") {
      this.museumTheme = "";
      this.selectedTheme = "";
      this.themeMuseums = [];
    }

    if (filter !== "labelHandi") {
      this.museumLabelHandi = "";
      this.selectedLabelHandi = "";
      this.HandiLabelMuseums = [];
    }

    if (filter !== "label") {
      this.museumLabel = "";
      this.selectedLabel = "";
      this.labelMuseums = [];
    }
  }
}
