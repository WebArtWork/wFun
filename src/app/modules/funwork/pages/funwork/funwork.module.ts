import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { FunworkComponent } from './funwork.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: FunworkComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [FunworkComponent],
	providers: []
})
export class FunworkModule {}
