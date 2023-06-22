import { Menu } from "./menu.model";

const accueil = new Menu('Accueil', '/', 'assets/icon/accueil.png')
const search = new Menu('Recherche', '/search', 'assets/icon/recherche2.png')
const map = new Menu('Carte', '/map', 'assets/icon/carte.png')
const visites = new Menu('Visites', '/favorite', 'assets/icon/favorite.png')
const aPropos = new Menu('A Propos', '/support', 'assets/icon/a_propos.png')

export const MENU_LIST: Menu[] = [
  accueil,
  search,
  map,
  visites,
  aPropos
]
