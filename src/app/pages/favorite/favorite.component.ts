import { Component, Input, OnInit } from "@angular/core";
import { Museums } from "../../models/museums";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-favorite",
  templateUrl: "./favorite.component.html",
  styleUrls: ["./favorite.component.scss"],
})
export class FavoriteComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  @Input() updateFavorite: Museums[] = [];
  favorite: Museums[] = [];
  session: any;
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    const data: any = localStorage.getItem("session");
    this.session = JSON.parse(data);
  }
  clear() {
    localStorage.clear();
    this.favorite = [];
    this.toastr.success("Votre liste de musées favoris est vide :(");
    this.loadData();
  }
  removeItem(item: any) {
    const { commune, id, nom_offre, recordid, site_web } = item;

    this.favorite = this.favorite.filter(
      (favoriteItem) =>
        favoriteItem.commune !== commune ||
        favoriteItem.id !== id ||
        favoriteItem.nom_offre !== nom_offre ||
        favoriteItem.recordid !== recordid ||
        favoriteItem.site_web !== site_web
    );

    localStorage.removeItem(id);
    this.toastr.success("Supprimé de vos musées favoris");
  }
}
