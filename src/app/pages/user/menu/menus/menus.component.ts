import { Component, Input } from '@angular/core';
import { Fungame } from 'src/app/modules/fungame/interfaces/fungame.interface';

@Component({
  selector: 'app-menus',
  standalone: false,
  
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss'
})
export class MenusComponent {
  @Input() menu: Fungame;
}


