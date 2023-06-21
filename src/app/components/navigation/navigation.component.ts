import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  menus: Menu[] = [];

  constructor(private MenuService: MenuService) {}

  ngOnInit(): void {
    this.menus = this.MenuService.getMenus();
  }
}
