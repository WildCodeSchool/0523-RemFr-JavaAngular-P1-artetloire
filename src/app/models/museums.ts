export class Museums {
  constructor(
    public id: string,
    public nom_offre: string,
    public duree_visite_individuel_en_h: string,
    public equipements: string,
    public code_postal: number,
    public identifiant: string,
    public longitude_googlemap: number,
    public latitude_googlemap: number,
    public visite_libre_en_permanence_groupe: string,
    public theme_musee: string,
    public commune: string,
    public langues_parlees: string,
    public visite_guidee_sur_demande_groupe: string,
    public groupements: string,
    public duree_visite_groupe_en_h: number,
    public position_geographique: number[],
    public acces_handicap: boolean,
    public animaux_acceptes: string,
    public site_web: string,
    public adresse1: string,
    public services: string,
    public labels: string,
    public activite_sur_place: string,
    public telephone: string,
    public label_tourisme_handicap: string
  ) {}
}
