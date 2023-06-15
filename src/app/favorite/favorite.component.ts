import { Component } from "@angular/core";
import { Museums } from "../models/museums";

@Component({
  selector: "app-favorite",
  templateUrl: "./favorite.component.html",
  styleUrls: ["./favorite.component.scss"],
})
export class FavoriteComponent {
  updateFavorite: Museums[] = [];

  handleFavoriteAdded(favorite: any): void {
    console.log("Coucou");

    if (!this.updateFavorite.includes(favorite)) {
      this.updateFavorite.push(favorite);
      console.log("Musée favori ajouté dans le parent :", this.updateFavorite);
    }
  }
  testing(fi: string) {
    alert(fi);
  }
}
