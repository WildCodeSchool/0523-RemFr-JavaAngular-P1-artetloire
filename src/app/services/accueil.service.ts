import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

interface Museum {
  uuid: string;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccueilService {
  private museumDataUrl =
    `https://data.centrevaldeloire.fr/api/records/1.0/search/?dataset=monuments-sites-musees-en-region-centre-val-de-loire&q=&rows=49&facet=departement&facet=type_equipement&facet=theme_musee&facet=labels&facet=acces_handicap&refine.departement=INDRE+ET+LOIRE&refine.type_equipement=Mus%C3%A9e`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Museum[]> {
    return this.http.get<any[]>(this.museumDataUrl).pipe(
      map((res: any) => {
        return res.records.map((record: any) => {
          return {
            uuid: record.recordid,
            nom: record.fields.nom_offre
          };
        });
      })
    );
  }
}
