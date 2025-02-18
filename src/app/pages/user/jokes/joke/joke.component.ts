import { Component, Input } from '@angular/core';
import { Funjoke } from 'src/app/modules/funjoke/interfaces/funjoke.interface';

@Component({
  selector: 'app-joke',
  standalone: false,
  
  templateUrl: './joke.component.html',
  styleUrl: './joke.component.scss'
})
export class JokeComponent {
  @Input () joke: Funjoke;

}
