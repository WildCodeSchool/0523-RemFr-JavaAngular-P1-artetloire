import { Component, Input, OnInit } from "@angular/core";
import { Museums } from "../../models/museums";
import { ToastrService } from "ngx-toastr";

type Item = {
  commune: string;
  id: number;
  nom_offre: string;
  recordid: string;
  site_web: string;
};

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
    this.shouldAnimate = true;
  }
  clear() {
    localStorage.clear();
    this.favorite = [];
    this.toastr.success("Votre liste de musées favoris est vide :(");
    this.shouldAnimate = false;
    setTimeout(() => {
      this.shouldAnimate = true;
    }, 2000);
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
  removeItem(item: Item) {
    const { commune, id, nom_offre, recordid, site_web } = item;

    const index = this.session.findIndex(
      (sessionItem: Item) =>
        sessionItem.commune === commune &&
        sessionItem.id === id &&
        sessionItem.nom_offre === nom_offre &&
        sessionItem.recordid === recordid &&
        sessionItem.site_web === site_web
    );

    if (index !== -1) {
      this.session.splice(index, 1);
      localStorage.setItem("session", JSON.stringify(this.session));

      const historyData: any = localStorage.getItem("history");
      const history: Item[] = historyData ? JSON.parse(historyData) : [];

      history.push(item);
      localStorage.setItem("history", JSON.stringify(history));

      localStorage.removeItem(recordid);
    }

    this.toastr.success("Supprimé de vos musées favoris");
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}
