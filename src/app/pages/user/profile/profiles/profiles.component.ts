import { Component, Input } from '@angular/core';
import { Fungame } from 'src/app/modules/fungame/interfaces/fungame.interface';
@Component({
  selector: 'app-profiles',
  standalone: false,
  
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss'
})
export class ProfilesComponent {
  @Input() profiles: Fungame

}

