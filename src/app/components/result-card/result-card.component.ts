import { Component, Input } from "@angular/core";
import { Museums } from "src/app/models/museums";

@Component({
  selector: "app-result-card",
  templateUrl: "./result-card.component.html",
  styleUrls: ["./result-card.component.scss"],
})
export class ResultCardComponent {
  @Input() filteredMuseums: Museums[] = [];
  @Input() labelMuseums: Museums[] = [];
  @Input() HandiLabelMuseums: Museums[] = [];
  @Input() themeMuseums: Museums[] = [];
}
