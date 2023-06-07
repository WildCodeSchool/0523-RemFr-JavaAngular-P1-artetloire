import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  
  constructor(private http: HttpClient) { }
  
  makeCapitalMarkers(map: L.Map): void {
    this.getData().subscribe((res: any) => {
      const positions = res.records.map((record: any) => record.fields.position_geographique);
      for (const position of positions) {
        const lat = position[0];
        const lon = position[1];
        const marker = L.marker([lat, lon]);
        marker.addTo(map);
      }
      console.log(positions);
    });
  }

  getData() {
    const api = "https://data.centrevaldeloire.fr/api/records/1.0/search/?dataset=monuments-sites-musees-en-region-centre-val-de-loire&q=&rows=49&facet=departement&facet=type_equipement&facet=theme_musee&facet=labels&facet=acces_handicap&refine.departement=INDRE+ET+LOIRE&refine.type_equipement=Mus%C3%A9e"

    return this.http.get(api);
  }
}