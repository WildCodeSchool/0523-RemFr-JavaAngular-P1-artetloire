import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Observable, map } from 'rxjs';

interface Museum {
  uuid: string
  nom: string;
  coords: [number, number];
  site: string;
  adresse: string;
  codePostal: string;
  ville: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  showModal = false;
  museumInfo: any;

  constructor(private http: HttpClient) { }
  
  getData() {
    const api = "https://data.centrevaldeloire.fr/api/records/1.0/search/?dataset=monuments-sites-musees-en-region-centre-val-de-loire&q=&rows=49&facet=departement&facet=type_equipement&facet=theme_musee&facet=labels&facet=acces_handicap&refine.departement=INDRE+ET+LOIRE&refine.type_equipement=Mus%C3%A9e"
    return this.http.get(api);
  }

  getAllMuseumData(): Observable<Museum[]> {
    return this.getData().pipe(
      map((res: any) => {
        return res.records.map((record: any) => {
          return {
            uuid: record.recordid,
            nom: record.fields.nom_offre,
            coords: record.fields.position_geographique,
            site: record.fields.site_web,
            adresse: record.fields.adresse1,
            codePostal : record.fields.code_postal,
            ville : record.fields.commune
          };
        });
      })
    );
  }
  
  makeCapitalMarkers(map: L.Map): void {
    this.getAllMuseumData().subscribe((museums: Museum[]) => {
      museums.forEach((museum: Museum) => {
        const [lat, lon] = museum.coords;
        const marker = L.marker([lat, lon]);
        marker.addTo(map);
        marker.on("click", () => {
          this.showModal = true;
          this.museumInfo = museum;
        });
      });
    });
  }
}