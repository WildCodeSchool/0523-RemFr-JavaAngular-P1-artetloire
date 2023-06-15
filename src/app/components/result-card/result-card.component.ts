import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Museums } from "src/app/models/museums";
import { FavoriteService } from "src/app/services/favorite.service";

@Component({
  selector: "app-result-card",
  templateUrl: "./result-card.component.html",
  styleUrls: ["./result-card.component.scss"],
})
export class ResultCardComponent implements OnInit {
  constructor(private favoriteService: FavoriteService) {}

  @Output() favoriteAdded: EventEmitter<any> = new EventEmitter<any>();
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

  toggleDetails(selectedMuseum: Museums) {
    this.selectedMuseum = selectedMuseum;
    return this.selectedMuseum;
  }

  ngOnInit(): void {
    this.favoriteService.getFavorites().subscribe((favoris) => {
      this.favoris = favoris;
      console.log("musées favoris", this.favoris);
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
      console.log("Inint");
      this.test();
      this.favoriteAdded.emit(this.favoriteMuseum);
    }
    console.log("musées ajoutés", this.favoriteMuseum);
  }
  test() {
    this.testEmit.emit("hello");
  }
}
