import { Component, OnInit } from '@angular/core';
import { HeaderParam, LIST_HEADER_VALUES } from 'src/app/models/header.model';
import { Menu } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-burger',
  templateUrl: './menu-burger.component.html',
  styleUrls: ['./menu-burger.component.scss']
})
export class MenuBurgerComponent implements OnInit {

  // Is menu burger visible
  isVisible: boolean = false;

  // Get list of values initialized in models/header.model.ts
  values : HeaderParam = LIST_HEADER_VALUES[Number(this.isVisible)];

  // Init an empty list of menu
  menus: Menu[] = [];

  constructor(private MenuService: MenuService) {}

  ngOnInit(): void {
    // Get values of burger menu or bottom navigation menu
    this.menus = this.MenuService.getMenus();
  }

  toggleIsVisible() {
    this.isVisible = !this.isVisible;
    this.values = LIST_HEADER_VALUES[Number(this.isVisible)];
  }
}
