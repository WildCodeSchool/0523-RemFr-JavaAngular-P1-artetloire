import { Component, Input, OnInit } from "@angular/core";
import { Museums } from "../models/museums";

@Component({
  selector: "app-favorite",
  templateUrl: "./favorite.component.html",
  styleUrls: ["./favorite.component.scss"],
})
export class FavoriteComponent implements OnInit {
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
}
