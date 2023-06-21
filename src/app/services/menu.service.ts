import { Injectable } from '@angular/core';
import { Menu } from '../models/menu.model';
import { MENU_LIST } from '../models/menu.mock';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenus(): Menu[] {
    return MENU_LIST;
  }
}
