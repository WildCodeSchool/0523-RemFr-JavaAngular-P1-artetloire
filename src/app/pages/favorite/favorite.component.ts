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
  shouldAnimate = false;
  session: any;
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    const data: any = localStorage.getItem("session");
    this.session = JSON.parse(data);
    this.shouldAnimate = false;
  }
  clear() {
    localStorage.clear();
    this.favorite = [];
    this.toastr.success("Votre liste de musées favoris est vide :(");
    this.shouldAnimate = false;
    setTimeout(() => {
      this.shouldAnimate = true;
    }, 100);
  }
  removeItem(item: any) {
    const { commune, id, nom_offre, recordid, site_web } = item;

    const index = this.session.findIndex(
      (sessionItem: any) =>
        sessionItem.commune === commune &&
        sessionItem.id === id &&
        sessionItem.nom_offre === nom_offre &&
        sessionItem.recordid === recordid &&
        sessionItem.site_web === site_web
    );

    if (index !== -1) {
      this.session.splice(index, 1);
      localStorage.setItem("session", JSON.stringify(this.session));
      localStorage.removeItem(item);
    }

    this.toastr.success("Supprimé de vos musées favoris");
  }
}
