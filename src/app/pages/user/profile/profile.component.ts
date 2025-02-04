import { Component } from '@angular/core';
import { FungameService } from 'src/app/modules/fungame/services/fungame.service'; 
import { Fungame } from 'src/app/modules/fungame/interfaces/fungame.interface'; 


@Component({
  templateUrl: './profiles.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false
})
export class ProfileComponent {
  get profile(): Fungame[] {
    return this._fungameServise.fungame;
  }
  
  isMenuOpen = false;

  constructor(private _fungameServise: FungameService) {}
}