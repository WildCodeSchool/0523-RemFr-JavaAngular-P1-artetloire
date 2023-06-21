import { Menu } from "./menu.model";

const accueil = new Menu('Accueil', '/', 'assets/icons/accueil.png')
const search = new Menu('Recherche', '/search', 'assets/icons/recherche2.png')
const map = new Menu('Carte', '/map', 'assets/icons/carte.png')
const visites = new Menu('Visites', '/favorite', 'assets/icons/favorite.png')
const aPropos = new Menu('A Propos', '/support', 'assets/icons/a_propos.png')

export const MENU_LIST: Menu[] = [
  accueil,
  search,
  map,
  visites,
  aPropos
]
