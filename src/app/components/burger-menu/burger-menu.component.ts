import { Component } from '@angular/core';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent {
  isActive: boolean = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }
}
