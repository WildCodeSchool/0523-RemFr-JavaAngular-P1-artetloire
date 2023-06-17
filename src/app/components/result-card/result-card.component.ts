import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Museums } from "src/app/models/museums";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-result-card",
  templateUrl: "./result-card.component.html",
  styleUrls: ["./result-card.component.scss"],
})
export class ResultCardComponent {
  constructor(private router: Router, private toastr: ToastrService) {}

  @Output() favoriteAdded: EventEmitter<Museums> = new EventEmitter<Museums>();

  @Input() filteredMuseums: Museums[] = [];
  @Input() labelMuseums: Museums[] = [];
  @Input() HandiLabelMuseums: Museums[] = [];
  @Input() themeMuseums: Museums[] = [];
  @Input() item!: string;

  selectedMuseum!: Museums;
  showDetails = false;
  favoriteMuseum!: Museums;
  session!: string;
  dataList: object[] = [];

  toggleDetails(selectedMuseum: Museums) {
    this.selectedMuseum = selectedMuseum;
    return this.selectedMuseum;
  }

  addFavorite(favori: Museums): void {
    const sessionData: string | null = localStorage.getItem("session");
    if (sessionData) {
      this.dataList = JSON.parse(sessionData);
      const isFavoriteInList = this.dataList.some((item: any) => {
        return item.recordid === favori.recordid;
      });
      if (isFavoriteInList) {
        this.toastr.error("Ce musée est déjà dans votre liste de favoris");

        return;
      }
    }
    if (favori.favorite !== favori.favorite) {
      this.favoriteMuseum;
    } else {
      if (this.favoriteMuseum) {
        this.favoriteMuseum.favorite = false;
      }
      this.favoriteMuseum = favori;
      this.favoriteAdded.emit(this.favoriteMuseum);
      this.saveData(this.favoriteMuseum);
      this.goToFavorites();
    }
  }
  goToFavorites() {
    this.router.navigate(["/favorite"]);
  }
  saveData(favori: Museums) {
    if (!this.dataList) {
      this.dataList = [];
    }
    const sessionData: string | null = localStorage.getItem("session");
    if (sessionData) {
      this.dataList = JSON.parse(sessionData);
    }
    this.dataList.push({
      id: favori.identifiant,
      nom_offre: favori.nom_offre,
      commune: favori.commune,
      site_web: favori.site_web,
      recordid: favori.recordid,
    });

    localStorage.setItem("session", JSON.stringify(this.dataList));
  }

  toggleFavorite(museum: Museums) {
    this.addFavorite(museum);
  }
}
