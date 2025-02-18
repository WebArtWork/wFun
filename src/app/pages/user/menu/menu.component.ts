import { Component } from '@angular/core';
import { FungameService } from 'src/app/modules/fungame/services/fungame.service';
import { Fungame } from 'src/app/modules/fungame/interfaces/fungame.interface';

@Component({
  standalone: false,
  
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  get menus(): Fungame[] {
    return this._fungameService.fungame;
  }
  
  isMenuOpen = false;

  constructor(private _fungameService: FungameService) {}
}
