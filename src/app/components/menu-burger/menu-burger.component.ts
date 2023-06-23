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

  isVisible: boolean = false;

  values : HeaderParam = LIST_HEADER_VALUES[Number(this.isVisible)];

  menus: Menu[] = [];

  constructor(private MenuService: MenuService) {}

  ngOnInit(): void {
    this.menus = this.MenuService.getMenus();
  }

  toggleIsVisible() {
    this.isVisible = !this.isVisible;
    this.values = LIST_HEADER_VALUES[Number(this.isVisible)];
  }
}
