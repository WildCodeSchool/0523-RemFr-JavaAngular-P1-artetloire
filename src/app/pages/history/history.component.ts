import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Museums } from "src/app/models/museums";

type Item = {
  commune: string;
  id: number;
  nom_offre: string;
  recordid: string;
  site_web: string;
};
@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  constructor(private toastr: ToastrService, private router: Router) {}

  @Input() updateWithFavorite: Museums[] = [];

  historyMuseums: Museums[] = [];
  history: Item[] = [];
  ngOnInit() {
    this.loadDataHistory();
  }
  loadDataHistory() {
    const dataHistory: any = localStorage.getItem("history");
    this.history = JSON.parse(dataHistory);
  }
  clear() {
    localStorage.clear();
    this.history = [];
    this.toastr.success("Votre liste de musées visités est vide :(");
    setTimeout(() => {
      this.redirectToHomePage();
    }, 1000);
  }
  redirectToHomePage() {
    this.router.navigate(["home"]);
  }
  removeVisited(visitedMuseums: Item) {
    const { commune, id, nom_offre, recordid, site_web } = visitedMuseums;

    const index = this.history.findIndex(
      (visited: Item) =>
        visited.commune === commune &&
        visited.id === id &&
        visited.nom_offre === nom_offre &&
        visited.recordid === recordid &&
        visited.site_web === site_web
    );

    if (index !== -1) {
      this.history.splice(index, 1);
      localStorage.setItem("history", JSON.stringify(this.history));
      localStorage.removeItem(visitedMuseums.recordid);
    }

    this.toastr.success("Supprimé de vos musées visités");
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}
