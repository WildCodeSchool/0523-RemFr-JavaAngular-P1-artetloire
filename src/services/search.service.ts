import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Api } from "src/app/models/api";

@Injectable({
  providedIn: "root",
})
export class searchService {
  private museumDataUrl =
    "https://data.centrevaldeloire.fr/api/records/1.0/search/?dataset=monuments-sites-musees-en-region-centre-val-de-loire&q=&rows=49&facet=departement&facet=type_equipement&facet=theme_musee&facet=labels&facet=acces_handicap&refine.departement=INDRE+ET+LOIRE&refine.type_equipement=Mus%C3%A9e";

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.museumDataUrl);
  }

  getMuseums(): Observable<Api> {
    return this.http.get<Api>(this.museumDataUrl);
  }
}
