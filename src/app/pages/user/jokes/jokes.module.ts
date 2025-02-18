import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { JokesComponent } from '../jokes/jokes.component';
import { JokeComponent } from './joke/joke.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: JokesComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes), CoreModule],
  declarations: [JokesComponent, JokeComponent]
})

export class JokesModule { }
