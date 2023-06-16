import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Museums } from "src/app/models/museums";
import { FavoriteService } from "src/app/services/favorite.service";

@Component({
  selector: "app-result-card",
  templateUrl: "./result-card.component.html",
  styleUrls: ["./result-card.component.scss"],
})
export class ResultCardComponent implements OnInit {
  constructor(
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  @Output() favoriteAdded: EventEmitter<Museums> = new EventEmitter<Museums>();
  @Output() testEmit: EventEmitter<string> = new EventEmitter<string>();

  @Input() filteredMuseums: Museums[] = [];
  @Input() labelMuseums: Museums[] = [];
  @Input() HandiLabelMuseums: Museums[] = [];
  @Input() themeMuseums: Museums[] = [];
  @Input() item: any;

  selectedMuseum!: Museums;
  showDetails = false;
  favoriteMuseum!: Museums;
  favoris!: Museums[];
  favList: Museums[] = [];
  session: any;
  toggleDetails(selectedMuseum: Museums) {
    this.selectedMuseum = selectedMuseum;
    return this.selectedMuseum;
  }

  ngOnInit(): void {
    this.favoriteService.getFavorites().subscribe((favoris) => {
      this.favoris = favoris;
    });
  }

  favoriteList() {
    return this.favList;
  }

  addFavorite(favori: Museums): void {
    if (favori.favorite) {
      this.favoriteMuseum;
    } else {
      if (this.favoriteMuseum) {
        this.favoriteMuseum.favorite = false;
      }
      favori.favorite = true;
      this.favoriteMuseum = favori;
      this.favList.push(this.favoriteMuseum);
      this.test();
      this.favoriteAdded.emit(this.favoriteMuseum);
      this.saveData(this.favoriteMuseum);
      this.goToFavorites(this.favoriteMuseum);
    }
  }
  test() {
    this.testEmit.emit("hello");
  }
  goToFavorites(favoriteMuseum: any) {
    this.router.navigate(["/favorite"]);
  }
  removeFavorite(favori: Museums) {
    const index = this.favList.findIndex((m) => m === favori);
    if (index !== -1) {
      this.favList.splice(index, 1);
      favori.favorite = false;
    }
  }
  saveData(favori: Museums) {
    const data = {
      id: favori.identifiant,
      nom_offre: favori.nom_offre,
      commune: favori.commune,
      site_web: favori.site_web,
    };
    localStorage.setItem("session", JSON.stringify(data));
  }
  toggleFavorite(museum: Museums) {
    if (museum.favorite) {
      this.removeFavorite(museum);
    } else {
      this.addFavorite(museum);
    }
  }
}
